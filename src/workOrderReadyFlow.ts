import { WorkOrderReadyEvent } from './core/types';
import { createJob, createJobShare } from './core';
import { GraphQLClient } from 'graphql-request';
import { getSdk } from './generated/graphql';
import { z } from 'zod';

import 'dotenv/config';

const accessTokenSchema = z.string().min(1, 'Access token is required');
const gqlExternalUrlSchema = z.string().url('XOI_GQL_EXTERNAL_URL is required');
const gqlShareExternalUrlSchema = z
  .string()
  .url('XOI_GQL_SHARE_EXTERNAL_URL is required');

//TODO: this will be use to start the work order ready flow using core functions
export const workOrderReadyFlow = async (
  data: WorkOrderReadyEvent,
): Promise<void> => {
  try {
    //TODO: we need to generate the auth token here
    const accessToken = process.env.XOI_ACCESS_TOKEN;
    const accessTokenValidation = accessTokenSchema.safeParse(accessToken);

    if (!accessTokenValidation.success) {
      throw new Error(accessTokenValidation.error.message);
    }

    const gqlExternalUrl = process.env.XOI_GQL_EXTERNAL_URL;
    const gqlUrlValidation = gqlExternalUrlSchema.safeParse(gqlExternalUrl);

    if (!gqlUrlValidation.success) {
      throw new Error(gqlUrlValidation.error.message);
    }

    const gqlShareExternalUrl = process.env.XOI_GQL_SHARE_EXTERNAL_URL;
    const gqlShareValidation =
      gqlShareExternalUrlSchema.safeParse(gqlShareExternalUrl);

    if (!gqlShareValidation.success) {
      throw new Error(gqlShareValidation.error.message);
    }

    const client = new GraphQLClient(gqlExternalUrl as string, {
      headers: {
        Authorization: accessToken as string,
      },
    });

    const sdk = getSdk(client);
    //TODO: refactor this to use the core functions
    const request = await createJob(data);
    const job = await request(sdk);

    if (!job) {
      throw new Error('Error creating job');
    }

    const shareClient = new GraphQLClient(gqlShareExternalUrl as string, {
      headers: {
        Authorization: accessToken as string,
      },
    });

    const shareSdk = getSdk(shareClient);

    const jobIds = [job.id];
    console.log('--->Step 1');
    const entireShare = await createJobShare(jobIds, true, shareSdk);
    console.log('--->Step 2');
    if (!entireShare) {
      throw new Error('EntireShare:Error sharing job');
    }
    console.log('--->Step 3');
    const customerShare = await createJobShare(jobIds, false, shareSdk);
    console.log('--->Step 4');
    if (!customerShare) {
      throw new Error('CustomerShare: Error sharing job');
    }

    console.log('entireShare:', entireShare);
    console.log('customerShare:', customerShare);
  } catch (error) {
    console.error('Error starting work order:', error);
    throw error;
  }
};
