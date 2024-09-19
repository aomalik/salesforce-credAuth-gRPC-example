import { z } from 'zod';
import {
  WorkOrderReadyEvent as WorkOrderProps,
  WorkOrderReadyEventSchema,
  mainSchemaError,
} from './types';
import {
  getSdk,
  CreateJobInput,
  Job,
  CreateJobShareInput,
  JobShare,
} from '../generated/graphql';

const workOrderSchema = z.object({
  externalId: z.string().nonempty('Work Order ID cannot be empty'), // WorkOrderId__c
  assigneeIds: z.array(z.string().email('Invalid email format')),
  jobLocation: z.string().nonempty('Job location cannot be empty'),
  customerName: z.string().nonempty('Customer name is required'), // Customer_Name__c
  workOrderNumber: z.string().nonempty('Work Order Number cannot be empty'), // WorkOrderNumber__c
});

const Scalars = {
  ID: z.string(),
  String: z.string(),
};

// Define the JobShare schema
const JobShareSchema = z.object({
  id: Scalars.ID, // id is a string (based on the ID scalar)
  shareLink: Scalars.String, // shareLink is a string
});

// Define the JobShareResult schema
const JobShareResultSchema = z.object({
  jobShare: JobShareSchema.optional(), // jobShare is optional, based on Maybe<T>
});

// Optionally, if you need to validate the CreateJobShareMutation result
const CreateJobShareMutationSchema = z.object({
  createJobShare: JobShareResultSchema,
});

const createJobInputSchema = z.object({
  newJob: workOrderSchema,
});

const jobIdsSchema = z
  .array(z.string().min(1, 'Job ID must be a non-empty string'))
  .nonempty('Job IDs array cannot be empty');
const shareEntireJobSchema = z.boolean();

type SDKProps = ReturnType<typeof getSdk>;

type RequestCreateJob = (sdk: SDKProps) => Promise<Job>;

export const createJob = async (
  workOrder: WorkOrderProps,
): Promise<RequestCreateJob> => {
  const result = WorkOrderReadyEventSchema.safeParse(workOrder);

  if (!result.success) {
    throw new Error(
      'Invalid work order' +
        result.error.errors.map((e) => e.message).join(', '),
    );
  }

  const mappedData = {
    externalId: workOrder.TCSNALA_WorkOrderId__c,
    assigneeIds: [workOrder.TCSNALA_Technician_Email_Address__c],
    jobLocation: `${workOrder.TCSNALA_Job_Location_Street__c}, ${workOrder.TCSNALA_Job_Location_City__c}, ${workOrder.TCSNALA_Job_Location_State__c}, ${workOrder.TCSNALA_Job_Location_PostalCode__c}, ${workOrder.TCSNALA_Job_Location_Country__c}`,
    customerName: workOrder.TCSNALA_Customer_Name__c,
    workOrderNumber: workOrder.TCSNALA_WorkOrderNumber__c,
  };

  const validation = workOrderSchema.safeParse(mappedData);

  if (!validation.success) {
    throw new Error(
      'Invalid work order data' +
        validation.error.errors.map((e) => e.message).join(', '),
    );
  }

  return async (sdk: SDKProps): Promise<Job> => {
    const input: CreateJobInput = {
      newJob: mappedData,
    };

    const inputValidation = createJobInputSchema.safeParse(input);
    if (!inputValidation.success) {
      console.error('Input validation errors:', inputValidation.error.format());
      throw new Error('Invalid job input data');
    }

    try {
      const result = await sdk.CreateJob({ input });

      //TODO: add validation for the result using Zod
      return result.createJob.job;
    } catch (error) {
      const validation = mainSchemaError.safeParse(error);

      if (validation.success) {
        // If the error matches the GraphQL error structure, process the errors
        validation.data.response?.errors?.forEach(
          (graphQLError, index: number) => {
            console.log(`Error #${index + 1}:`);
            console.log('Message:', graphQLError.message);
            console.log('Path:', graphQLError.path);
            console.log('Error Type:', graphQLError.errorType);
            console.log('Error Info:', graphQLError.errorInfo);
            console.log('Locations:', graphQLError.locations);
            console.log('---');
          },
        );
      } else {
        // If the error doesn't match the expected structure, print the default error message
        console.log('Error message:', (error as Error).message);
      }

      throw error;
    }
  };
};

export const createJobShare = async (
  jobIds: string[],
  shareEntireJob: boolean,
  sdk: SDKProps,
): Promise<JobShare> => {
  const jobIdsValidation = jobIdsSchema.safeParse(jobIds);

  if (!jobIdsValidation.success) {
    throw new Error(
      'Invalid job IDs: ' +
        jobIdsValidation.error.errors.map((e) => e.message).join(', '),
    );
  }

  // Validate shareEntireJob using Zod
  const shareEntireJobValidation =
    shareEntireJobSchema.safeParse(shareEntireJob);

  if (!shareEntireJobValidation.success) {
    throw new Error(
      'Invalid value for shareEntireJob: ' +
        shareEntireJobValidation.error.errors.map((e) => e.message).join(', '),
    );
  }

  try {
    const input: CreateJobShareInput = { jobIds, shareEntireJob };

    const result = await sdk.CreateJobShare({ input });
    console.log(':::::=====>result:CreateJobShare', result);
    const validation = CreateJobShareMutationSchema.safeParse(result);

    if (!validation.success) {
      throw new Error(
        'Invalid response from CreateJobShare: ' +
          validation.error.errors.map((e) => e.message).join(', '),
      );
    }

    const { jobShare } = validation.data.createJobShare;

    if (!jobShare) {
      throw new Error('JobShare creation failed');
    }

    return jobShare;
  } catch (error) {
    console.error(':::Error creating job share::::');
    const validation = mainSchemaError.safeParse(error);

    if (validation.success) {
      // If the error matches the GraphQL error structure, process the errors
      validation.data.response?.errors?.forEach(
        (graphQLError, index: number) => {
          console.log(`Error #${index + 1}:`);
          console.log('Message:', graphQLError.message);
          console.log('Path:', graphQLError.path);
          console.log('Error Type:', graphQLError.errorType);
          console.log('Error Info:', graphQLError.errorInfo);
          console.log('Locations:', graphQLError.locations);
          console.log('---');
        },
      );
    } else {
      // If the error doesn't match the expected structure, print the default error message
      console.log('Error message:', (error as Error).message);
    }

    throw error;
  }
};

export const updateWorkOrderWithXOiShareLink = async () => {
  console.log('Updating work order with XOi share link');
};
