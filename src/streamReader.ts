import PubSubApiClient from 'salesforce-pubsub-api-client';
import { z } from 'zod';

const eventPayloadSchema = z.object({
  replayId: z.number(),
  payload: z.object({
    CreatedDate: z.number(),
    CreatedById: z.string(),
    WorkOrderId__c: z.string(),
    Status__c: z.string(),
    Description__c: z.string(),
    CreatedDate__c: z.number(),
  }),
});

async function run() {
  try {
    const client = new PubSubApiClient();
    await client.connect();

    // Subscribe to account change events
    const eventEmitter = await client.subscribe(
      '/event/WorkOrderCreatedEvent__e',
    );

    // Handle incoming events
    eventEmitter.on('data', (event) => {
      const validationResult = eventPayloadSchema.safeParse(event);

      if (!validationResult.success) {
        console.error('Invalid event format:', validationResult.error);
      } else {
        if (event.payload && event.payload.ChangeEventHeader) {
          console.log(
            `Handling ${event.payload.ChangeEventHeader.entityName} change event ` +
              `with ID ${event.replayId} ` +
              `on channel ${eventEmitter.getTopicName()} ` +
              `(${eventEmitter.getReceivedEventCount()}/${eventEmitter.getRequestedEventCount()} ` +
              `events received so far)`,
          );
        } else {
          console.info(
            'Failed to handle event: ChangeEventHeader is missing or invalid.',
          );
        }
      }

      // Safely log event as a JSON string

      console.log(
        JSON.stringify(
          event,
          (key, value) =>
            /* Convert BigInt values into strings and keep other types unchanged */
            typeof value === 'bigint' ? value.toString() : value,
          2,
        ),
      );
    });
  } catch (error) {
    console.error(error);
  }
}

run();
