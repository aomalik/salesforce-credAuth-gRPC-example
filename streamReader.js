const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { authenticate } = require("./auth");
const path = require("path");

// Path to your proto file (you need to download the relevant Pub/Sub proto files from Salesforce)
const PROTO_PATH = path.join(__dirname, "/proto/pubsub.proto");

// Load the proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const pubsubProto = grpc.loadPackageDefinition(packageDefinition).eventbus.v1;

// Function to subscribe to events
async function subscribeToEvents(accessToken, instanceUrl) {
  console.log("Subscribing to events...");
  const client = new pubsubProto.PubSub(
    `${instanceUrl}:7443`,
    grpc.credentials.createSsl()
  );
  const metadata = new grpc.Metadata();
  //metadata.add("authorization", `Bearer ${accessToken}`);
  metadata.add(
    "accesstoken",
    "00DQy00000BMqWH!AQEAQAdkyyiyuVzLi2q4iZcyWtH3F0aoge1KszqCZt81hcl7HT_St9J82NQBp360Yd2maOq3qZEAHUUkci9sTY5z.m0I3chI"
  );
  metadata.add("instanceurl", instanceUrl);
  metadata.add("tenantid", "00DQy00000BMqWHMA1");
  const subscriptionRequest = {
    topic_name: "/event/ServiceAppointmentCreatedEvent__e",
    num_requested: 10, // Number of events you want to receive at once
  };
  //client.metadata = metadata;
  console.log("metadata", metadata);
  const stream = client.Subscribe(subscriptionRequest);

  stream.on("data", (response) => {
    console.log("Received event:", response);
  });

  stream.on("error", (err) => {
    console.error("Error subscribing to events:", JSON.stringify(err, null, 2));
  });

  stream.on("end", () => {
    console.log("Event stream ended.");
  });
}

// Authenticate and subscribe to Salesforce events
authenticate()
  .then(({ access_token, instance_url }) => {
    try {
      subscribeToEvents(access_token, "api.pubsub.salesforce.com");
      console.log("Subscribed to events successfully.");
    } catch (error) {
      console.error("Error subscribing to events:", error);
    }
  })
  .catch((error) => {
    console.error("Authentication failed:", error);
  });
