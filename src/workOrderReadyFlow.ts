import { WorkOrderReadyEvent } from './core/types';
import axios from 'axios';
import {
  createJob,
  createJobShare,
  updateWorkOrderWithXOiShareLink,
} from './core';
import { GraphQLClient } from 'graphql-request';
import { getSdk } from './generated/graphql';
import { z } from 'zod';

import 'dotenv/config';

const envSchema = z.object({
  XOI_ACCESS_TOKEN: z.string().nonempty('XOI_ACCESS_TOKEN is required'),
  XOI_GQL_EXTERNAL_URL: z
    .string()
    .url('XOI_GQL_EXTERNAL_URL must be a valid URL'),
  XOI_GQL_SHARE_EXTERNAL_URL: z
    .string()
    .url('XOI_GQL_SHARE_EXTERNAL_URL must be a valid URL'),
  SALESFORCE_API_URL: z.string().url('SALESFORCE_API_URL must be a valid URL'),
  SALESFORCE_ACCESS_TOKEN: z
    .string()
    .nonempty('SALESFORCE_ACCESS_TOKEN is required'),
});

//TODO: this will be use to start the work order ready flow using core functions
export const workOrderReadyFlow = async (
  data: WorkOrderReadyEvent,
): Promise<void> => {
  try {
    const envValidation = envSchema.safeParse({
      XOI_ACCESS_TOKEN: process.env.XOI_ACCESS_TOKEN,
      XOI_GQL_EXTERNAL_URL: process.env.XOI_GQL_EXTERNAL_URL,
      XOI_GQL_SHARE_EXTERNAL_URL: process.env.XOI_GQL_SHARE_EXTERNAL_URL,
      SALESFORCE_API_URL: process.env.SALESFORCE_API_URL,
      SALESFORCE_ACCESS_TOKEN: process.env.SALESFORCE_ACCESS_TOKEN,
    });

    if (!envValidation.success) {
      throw new Error(
        'Environment variable validation failed: ' +
          JSON.stringify(envValidation.error.format()),
      );
    }

    //TODO: we need to generate the auth token here
    const accessToken = process.env.XOI_ACCESS_TOKEN;
    const gqlExternalUrl = process.env.XOI_GQL_EXTERNAL_URL;
    const instanceUrlSF = process.env.SALESFORCE_API_URL;
    const accessTokenSF = process.env.SALESFORCE_ACCESS_TOKEN;
    const gqlShareExternalUrl = process.env.XOI_GQL_SHARE_EXTERNAL_URL;

    const client = new GraphQLClient(gqlExternalUrl as string, {
      headers: {
        Authorization: accessToken as string,
      },
    });

    console.log('--->Step 1: Create the job');
    const sdk = getSdk(client);
    //TODO: refactor this to use the core functions
    const request = await createJob(data);
    const job = await request(sdk);

    if (!job) {
      throw new Error('Error creating job');
    }
    console.log('Created job:', job);

    const shareClient = new GraphQLClient(gqlShareExternalUrl as string, {
      headers: {
        Authorization: accessToken as string,
      },
    });

    const shareSdk = getSdk(shareClient);

    const jobIds = [job.id];

    console.log('--->Step 2: Create Customer Job Share');
    const customerShare = await createJobShare(jobIds, false, shareSdk);

    if (!customerShare) {
      throw new Error('CustomerShare: Error sharing job');
    }

    console.log('Created customerShare:', customerShare);

    const entireShare = await createJobShare(jobIds, true, shareSdk);

    console.log('--->Step 3: Create Entire Job Share');

    if (!entireShare) {
      throw new Error('EntireShare:Error sharing job');
    }

    console.log('Created entireShare:', entireShare);

    console.log('--->Step 4: Update Work Order with XOi Share Link');
    const instanceAxios = axios.create({
      headers: {
        baseURL: instanceUrlSF,
        Authorization: `Bearer ${accessTokenSF}`,
        'Content-Type': 'application/json',
      },
    });

    const requestToSF = await updateWorkOrderWithXOiShareLink(
      {
        Job_ID__c: job.id,
        Contributor_Deep_Link__c:
          job.deepLinks?.visionMobile?.contributeToJob?.url,
        Share_Link_One__c: customerShare.shareLink,
        Share_Link_Two__c: entireShare.shareLink,
      },
      instanceAxios,
    );

    const response = await requestToSF();

    console.log('Response from Salesforce:', response);
  } catch (error) {
    console.error('Error starting work order:', error);
    throw error;
  }
};
