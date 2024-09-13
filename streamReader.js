import PubSubApiClient from "salesforce-pubsub-api-client";

async function run() {
  try {
    const client = new PubSubApiClient();
    await client.connect();

    // Subscribe to account change events
    const eventEmitter = await client.subscribe(
      "/event/WorkOrderCreatedEvent__e"
    );

    // Handle incoming events
    eventEmitter.on("data", (event) => {
      if (event.payload && event.payload.ChangeEventHeader) {
        console.log(
          `Handling ${event.payload.ChangeEventHeader.entityName} change event ` +
            `with ID ${event.replayId} ` +
            `on channel ${eventEmitter.getTopicName()} ` +
            `(${eventEmitter.getReceivedEventCount()}/${eventEmitter.getRequestedEventCount()} ` +
            `events received so far)`
        );
      } else {
        console.error(
          "Failed to handle event: ChangeEventHeader is missing or invalid.",
          event
        );
      }
      // Safely log event as a JSON string
      console.log(
        JSON.stringify(
          event,
          (key, value) =>
            /* Convert BigInt values into strings and keep other types unchanged */
            typeof value === "bigint" ? value.toString() : value,
          2
        )
      );
    });
  } catch (error) {
    console.error(error);
  }
}

run();
