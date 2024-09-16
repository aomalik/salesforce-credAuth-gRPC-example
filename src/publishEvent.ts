import PubSubApiClient from 'salesforce-pubsub-api-client';
import { z } from 'zod';

async function publishEvent() {
  const client = new PubSubApiClient();
  await client.connect();

  const payload = {
    CreatedDate: new Date().getTime(), // Non-null value required but there's no validity check performed on this field
    CreatedById: '005_________', // Valid user ID
    WorkOrderId__c: { string: 'WO-0001' },
    Status__c: { string: 'In Progress' },
    Description__c: { string: 'This is a test work order' },
    CreatedDate__c: { long: new Date().getTime() },
  };

  try {
    const publishResult = await client.publish(
      '/event/WorkOrderCreatedEvent__e',
      payload,
    );

    console.log('Published event: ', JSON.stringify(publishResult));
  } catch (error) {
    console.error('Error publishing event:', error);
  }
}

publishEvent();
