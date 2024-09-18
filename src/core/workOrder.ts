import { z } from 'zod';
import {
  WorkOrderReadyEvent as WorkOrderProps,
  WorkOrderReadyEventSchema,
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

const createJobInputSchema = z.object({
  newJob: workOrderSchema,
});

const jobIdsSchema = z
  .array(z.string().min(1, 'Job ID must be a non-empty string'))
  .nonempty('Job IDs array cannot be empty');
const shareEntireJobSchema = z.boolean();

type SDKProps = ReturnType<typeof getSdk>;

type RequestCreateJob = (sdk: SDKProps) => void;

export const createJob = async (
  workOrder: WorkOrderProps,
): Promise<RequestCreateJob> => {
  const result = WorkOrderReadyEventSchema.safeParse(workOrder);

  if (!result.success) {
    throw new Error('Invalid work order');
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
    console.error('Validation errors:', validation.error.format());
    throw new Error('Invalid work order data');
  }

  return async (sdk: SDKProps): Promise<Job> => {
    console.log('Job created', mappedData);

    const input: CreateJobInput = {
      newJob: mappedData,
    };

    const inputValidation = createJobInputSchema.safeParse(input);
    if (!inputValidation.success) {
      console.error('Input validation errors:', inputValidation.error.format());
      throw new Error('Invalid job input data');
    }
    const result = await sdk.CreateJob({ input });
    //TODO: add validation for the result using Zod
    return result.createJob.job;
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
  console.log('Creating custom job share', jobIds);
  console.log('Creating custom job share', shareEntireJob);

  const input: CreateJobShareInput = { jobIds, shareEntireJob };
  console.log('Creating custom job share', input);

  const result = sdk.CreateJobShare({ input });
  if (!result.createJobShare.jobShare) {
    throw new Error('JobShare creation failed');
  }
  return result.createJobShare.jobShare;
};

export const updateWorkOrderWithXOiShareLink = async () => {
  console.log('Updating work order with XOi share link');
};
