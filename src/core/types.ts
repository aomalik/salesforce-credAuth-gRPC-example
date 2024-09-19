import { z } from 'zod';

export type ErrorResponse = {
  errors: {
    errorType: string;
    message: string;
  }[];
};

export type CreateJobRequest = {
  createJob: {
    input: {
      newJob: {
        assigneeIds: string[];
        customerName: string;
        jobLocation: string;
        workOrderNumber: string;
        label: string;
        tags: string[];
        tagSuggestions: string[];
        integrationEntityId: {
          namespace: string;
          id: string;
        };
        internalNote: {
          text: string;
        };
      };
      additionalActions: {
        createPublicShare: {
          enabled: boolean;
        };
      };
    };
  };
};

export type CreateJobResponse = {
  data: {
    createJob: {
      job: {
        id: string;
        createdAt: string; // ISO 8601 date-time string
        createdBy: string;
        assigneeIds: string[];
        customerName: string;
        jobLocation: string;
        workOrderNumber: string;
        label: string;
        tags: string[];
        tagSuggestions: string[];
        deepLinks: {
          visionWeb: {
            viewJob: {
              url: string;
            };
          };
          visionMobile: {
            viewJob: {
              url: string | null; // Can be a string or null
            };
            editJob: {
              url: string;
            };
          };
        };
        integrationEntityId: {
          namespace: string;
          id: string;
        };
        internalNote: {
          text: string;
        };
      };
      additionalActionsResults: {
        createPublicShare: {
          // Can be null if no result is returned
          id?: string;
          shareLink?: string;
        } | null;
      };
    };
  };
};

export type TestResponse = {
  replayId: number;
  payload: {
    CreatedDate: number; // Timestamp in milliseconds
    CreatedById: string; // Salesforce User ID
    WorkOrderId__c: string; // Custom field for Work Order ID
    Status__c: string; // Status of the Work Order
    Description__c: string; // Description of the task or job
    CreatedDate__c: number; // Custom field for Created Date (timestamp in milliseconds)
  };
};

export const WorkOrderReadyEventSchema = z.object({
  attributes: z.object({
    type: z.string(), // The platform event type, e.g., "TCSNALA_Workorder_XOi__e"
    url: z
      .string()
      .refine((url) => /^https?:\/\//.test(url) || url.startsWith('/'), {
        message: 'Invalid URL: must be a fully qualified or relative URL',
      }), // Allow both full and relative URLs
  }),
  TCSNALA_Customer_Name__c: z.string(), // Customer name, e.g., "Kwik Trip"
  TCSNALA_Job_Location_Street__c: z.string(), // Job location street address
  TCSNALA_XOi_Deep_Link__c: z.string().url(), // XOi deep link URL
  EventUuid: z.string().uuid(), // Unique identifier for the event
  TCSNALA_Job_Location_Country__c: z.string(), // Job location country, e.g., "United States"
  TCSNALA_Job_Location_PostalCode__c: z.string(), // Job location postal code
  TCSNALA_Event_Type__c: z.string(), // Event type, e.g., "XOi:WorkorderReady"
  CreatedById: z.string(), // ID of the user who created the event
  TCSNALA_Job_Location_State__c: z.string(), // Job location state
  ReplayId: z.string(), // Replay ID of the event
  CreatedDate: z.string(), // Date the event was created, in ISO 8601 format (could be transformed into a date)
  TCSNALA_Technician_Email_Address__c: z.string().email(), // Technician email address
  TCSNALA_WorkOrderId__c: z.string(), // Work Order ID
  TCSNALA_WorkOrderNumber__c: z.string(), // Work Order number
  TCSNALA_Job_Location_City__c: z.string(), // Job location city
});

export type WorkOrderReadyEvent = z.infer<typeof WorkOrderReadyEventSchema>;

const errorInfoSchema = z.object({
  aws_request_id: z.string(),
  log_stream_name: z.string(),
  datetime: z.string().datetime(), // datetime validation
  stage: z.string(),
});

const locationSchemaError = z.object({
  line: z.number(),
  column: z.number(),
  sourceName: z.string().nullable(),
});

const errorSchema = z.object({
  path: z.array(z.string()),
  data: z.any().nullable(),
  errorType: z.string(),
  errorInfo: errorInfoSchema,
  locations: z.array(locationSchemaError),
  message: z.string(),
});

const responseSchemaError = z.object({
  data: z.any().nullable(),
  errors: z.array(errorSchema),
  status: z.number(),
  headers: z.object({}).passthrough(), // Allow any additional header properties
});

const jobInputSchema = z.object({
  externalId: z.string(),
  assigneeIds: z.array(z.string()),
  jobLocation: z.string(),
  customerName: z.string(),
  workOrderNumber: z.string(),
});

const requestSchema = z.object({
  query: z.string(),
  variables: z.object({
    input: z.object({
      newJob: jobInputSchema,
    }),
  }),
});

export const mainSchemaError = z.object({
  response: responseSchemaError,
  request: requestSchema,
});
