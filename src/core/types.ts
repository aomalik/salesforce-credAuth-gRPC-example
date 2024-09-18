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
    url: z.string().url(), // URL for accessing the event
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
