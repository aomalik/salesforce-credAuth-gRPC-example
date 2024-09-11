const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { authenticate } = require('./auth');
const path = require('path');

// Path to your proto file (you need to download the relevant Pub/Sub proto files from Salesforce)
const PROTO_PATH = path.join(__dirname, 'pubsub.proto');

// Load the proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const pubsubProto = grpc.loadPackageDefinition(packageDefinition).com.salesforce.eventbus.v1;

// Function to subscribe to events
async function subscribeToEvents(accessToken, instanceUrl) {
  const client = new pubsubProto.PubSub(`${instanceUrl}:443`, grpc.credentials.createSsl());

  const metadata = new grpc.Metadata();
  metadata.add('authorization', `Bearer ${accessToken}`);

  const subscriptionRequest = {
    topic_name: '/event/YourEventName__e',
    num_requested: 10 // Number of events you want to receive at once
  };

  const stream = client.Subscribe(subscriptionRequest, metadata);

  stream.on('data', (response) => {
    console.log('Received event:', response);
  });

  stream.on('error', (err) => {
    console.error('Error subscribing to events:', err);
  });

  stream.on('end', () => {
    console.log('Event stream ended.');
  });
}

// Authenticate and subscribe to Salesforce events
authenticate().then(({ access_token, instance_url }) => {
  subscribeToEvents(access_token, instance_url);
}).catch(error => {
  console.error('Authentication failed:', error);
});
