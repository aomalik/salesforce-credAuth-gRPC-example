const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { authenticate } = require("./auth");
const path = require("path");

const SALESFORCE_PUBSUB_API_URL = process.env.SALESFORCE_PUBSUB_API_URL;
const TENANT_ID = process.env.TENANT_ID;
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
    SALESFORCE_PUBSUB_API_URL,
    grpc.credentials.createSsl()
  );

  const metadata = new grpc.Metadata();
  metadata.add("accesstoken", accessToken);
  metadata.add("instanceurl", instanceUrl);
  metadata.add("tenantid", TENANT_ID);

  const subscriptionRequest = {
    topic_name: "/event/ServiceAppointmentCreatedEvent__e",
    num_requested: 10, // Number of events you want to receive at once
  };

  client.GetTopic(subscriptionRequest, metadata, (err, response) => {
    console.log("err", err);
    console.log("response", response);
    if (err) {
      console.error(
        "Error subscribing to events:",
        JSON.stringify(err, null, 2)
      );
      return;
    }
    const stream = client.Subscribe(metadata);

    stream.on("data", (response) => {
      console.log("Received event:", response);
    });
    stream.on("error", (err) => {
      console.error(
        "Error subscribing to events:",
        JSON.stringify(err, null, 2)
      );
    });

    stream.on("end", () => {
      console.log("Event stream ended.");
    });

    stream.write(subscriptionRequest);
  });
}

// Authenticate and subscribe to Salesforce events
authenticate()
  .then(({ access_token, instance_url }) => {
    try {
      subscribeToEvents(access_token, instance_url);
      console.log("Subscribed to events successfully.");
    } catch (error) {
      console.error("Error subscribing to events:", error);
    }
  })
  .catch((error) => {
    console.error("Authentication failed:", error);
  });
