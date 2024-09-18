import { WorkOrderReadyEvent } from './core/types';
import { createJob, createJobShare } from './core';
import { GraphQLClient } from 'graphql-request';
import { getSdk } from './generated/graphql';
import { z } from 'zod';

import 'dotenv/config';

const accessTokenSchema = z.string().min(1, 'Access token is required');
const gqlExternalUrlSchema = z.string().url('XOI_GQL_EXTERNAL_URL is required');

//TODO: this will be use to start the work order ready flow using core functions
export const workOrderReadyFlow = async (
  data: WorkOrderReadyEvent,
): Promise<void> => {
  try {
    //TODO: we need to generate the auth token here
    const accessToken = 'authToken';
    const accessTokenValidation = accessTokenSchema.safeParse(accessToken);

    if (!accessTokenValidation.success) {
      throw new Error(accessTokenValidation.error.message);
    }

    const gqlExternalUrl = process.env.XOI_GQL_EXTERNAL_URL;
    const gqlUrlValidation = gqlExternalUrlSchema.safeParse(gqlExternalUrl);

    if (!gqlUrlValidation.success) {
      throw new Error(gqlUrlValidation.error.message);
    }

    const client = new GraphQLClient(gqlExternalUrl as string, {
      headers: {
        Authorization: accessToken,
      },
    });

    const sdk = getSdk(client);
    //TODO: refactor this to use the core functions
    const request = await createJob(data);
    const job = await request(sdk);

    if (!job) {
      throw new Error('Error creating job');
    }

    await createJobShare([job.id], true, sdk);

    console.log('Starting work order:', request);
  } catch (error) {
    console.error('Error starting work order:', error);
    throw error;
  }
};
