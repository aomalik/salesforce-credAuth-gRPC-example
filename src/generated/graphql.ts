import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `AWSDateTime` scalar type provided by AWS AppSync, represents a valid ***extended*** [ISO 8601 DateTime](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) string. In other words, this scalar type accepts datetime strings of the form `YYYY-MM-DDThh:mm:ss.SSSZ`.  The scalar can also accept "negative years" of the form `-YYYY` which correspond to years before `0000`. For example, "**-2017-01-01T00:00Z**" and "**-9999-01-01T00:00Z**" are both valid datetime strings.  The field after the two digit seconds field is a nanoseconds field. It can accept between 1 and 9 digits. So, for example, "**1970-01-01T12:00:00.2Z**", "**1970-01-01T12:00:00.277Z**" and "**1970-01-01T12:00:00.123456789Z**" are all valid datetime strings.  The seconds and nanoseconds fields are optional (the seconds field must be specified if the nanoseconds field is to be used).  The [time zone offset](https://en.wikipedia.org/wiki/ISO_8601#Time_zone_designators) is compulsory for this scalar. The time zone offset must either be `Z` (representing the UTC time zone) or be in the format `±hh:mm:ss`. The seconds field in the timezone offset will be considered valid even though it is not part of the ISO 8601 standard. */
  AWSDateTime: { input: any; output: any; }
  /** The `AWSEmail` scalar type provided by AWS AppSync, represents an Email address string that complies with [RFC 822](https://www.ietf.org/rfc/rfc822.txt). For example, "**username@example.com**" is a valid Email address. */
  AWSEmail: { input: any; output: any; }
};

export type AddWorkflowInput = {
  jobId: Scalars['ID']['input'];
  workflowExternalId: Scalars['ID']['input'];
};

export type AddWorkflowResult = {
  __typename?: 'AddWorkflowResult';
  workflowJobId: Scalars['ID']['output'];
};

export type AdditionalActionsInput = {
  createPublicShare: CreatePublicShareInput;
};

export type AdditionalActionsResults = {
  __typename?: 'AdditionalActionsResults';
  createPublicShare?: Maybe<JobShare>;
};

export type Choice = {
  __typename?: 'Choice';
  chosen?: Maybe<Array<Scalars['String']['output']>>;
  options: Array<Scalars['String']['output']>;
};

export type CreateJobInput = {
  additionalActions?: InputMaybe<AdditionalActionsInput>;
  newJob: NewJobInput;
};

export type CreateJobResult = {
  __typename?: 'CreateJobResult';
  additionalActionsResults?: Maybe<AdditionalActionsResults>;
  job: Job;
};

export type CreateJobShareInput = {
  /**   individual job to be shared (use either jobId or jobIds) */
  jobId?: InputMaybe<Scalars['ID']['input']>;
  /**   multiple jobs to be shared (use either jobId or jobIds) */
  jobIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  /**   if true, create a share for the entire job, including content for steps not marked as visible to customers */
  shareEntireJob?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateKnowledgebaseShareInput = {
  knowledgebaseContentIds: Array<Scalars['ID']['input']>;
};

export type CreateKnowledgebaseShareResult = {
  __typename?: 'CreateKnowledgebaseShareResult';
  knowledgebaseShare?: Maybe<KnowledgebaseShare>;
};

export type CreatePublicShareInput = {
  enabled: Scalars['Boolean']['input'];
};

export type DateEntry = {
  __typename?: 'DateEntry';
  value?: Maybe<Scalars['AWSDateTime']['output']>;
};

/**
 *   This allows you to filter your results by the chosen date type,
 *  and return them in either ascending or descending order by that date.
 */
export type DateQueryInput = {
  /**   Defaults to False */
  ascending?: InputMaybe<Scalars['Boolean']['input']>;
  gte?: InputMaybe<Scalars['AWSDateTime']['input']>;
  lte?: InputMaybe<Scalars['AWSDateTime']['input']>;
  /**   If you include a dateQueryInput, you must supply a SortDateType */
  type: SortDateType;
};

export type DeepLink = {
  __typename?: 'DeepLink';
  url: Scalars['String']['output'];
};

export type DeepLinks = {
  __typename?: 'DeepLinks';
  visionMobile?: Maybe<VisionMobileDeepLinks>;
  visionWeb?: Maybe<VisionWebDeepLinks>;
};

export type DeleteJobInput = {
  id: Scalars['ID']['input'];
};

export type DeleteJobResult = {
  __typename?: 'DeleteJobResult';
  id: Scalars['ID']['output'];
};

export type DerivedData = {
  __typename?: 'DerivedData';
  make?: Maybe<Scalars['String']['output']>;
  /**   The manufacture date derived from the data plate, when we can do so. */
  manufacture_date?: Maybe<Scalars['AWSDateTime']['output']>;
  model?: Maybe<Scalars['String']['output']>;
  serial?: Maybe<Scalars['String']['output']>;
  transcript?: Maybe<Scalars['String']['output']>;
};

export type DocumentationConnection = {
  __typename?: 'DocumentationConnection';
  items: Array<Maybe<ListDocumentationItem>>;
  nextToken: Scalars['String']['output'];
};

export type DocumentationItem = {
  __typename?: 'DocumentationItem';
  choice?: Maybe<Choice>;
  contentId?: Maybe<Scalars['String']['output']>;
  date_entry?: Maybe<DateEntry>;
  derivedData?: Maybe<DerivedData>;
  note?: Maybe<Note>;
  number_entry?: Maybe<NumberEntry>;
  /** @deprecated No longer supported */
  sourceId?: Maybe<Scalars['String']['output']>;
  stepIndex?: Maybe<Scalars['Int']['output']>;
  stepName?: Maybe<Scalars['String']['output']>;
  /**   The list of traits from the step that this documentation item is a part of. */
  stepTraits?: Maybe<Array<Scalars['String']['output']>>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  text_entry?: Maybe<TextEntry>;
  traits: Array<DocumentationItemTrait>;
  workSummary?: Maybe<WorkSummary>;
  /**   ID of the workflow job associated with this content */
  workflowJobId?: Maybe<Scalars['ID']['output']>;
  workflowLabel?: Maybe<Scalars['String']['output']>;
  workflowName?: Maybe<Scalars['String']['output']>;
};

export enum DocumentationItemTrait {
  AiGenerated = 'ai_generated',
  Choice = 'choice',
  Dataplate = 'dataplate',
  DateEntry = 'date_entry',
  NotADataplate = 'not_a_dataplate',
  Note = 'note',
  NumberEntry = 'number_entry',
  PartialDataplate = 'partial_dataplate',
  Pending = 'pending',
  Preliminary = 'preliminary',
  Processed = 'processed',
  TextEntry = 'text_entry',
  Transcript = 'transcript',
  UserEdited = 'user_edited',
  UserGenerated = 'user_generated',
  WorkSummary = 'work_summary'
}

export type FilterInput = {
  /**   NOTE: Customer Name searches are limited to single word searches at this time. If multiple words are used, no results will be returned. */
  customerName?: InputMaybe<Scalars['String']['input']>;
  /**   NOTE: Job Location searches are limited to single word searches at this time. If multiple words are used, no results will be returned. */
  jobLocation?: InputMaybe<Scalars['String']['input']>;
  /**   NOTE: Work Order searches are case sensitive */
  workOrderNumber?: InputMaybe<Scalars['String']['input']>;
};

export type GetJobIdByExternalIdInput = {
  externalId: Scalars['ID']['input'];
};

export type GetJobIdByExternalIdResult = {
  __typename?: 'GetJobIdByExternalIdResult';
  jobId: Scalars['ID']['output'];
};

export type GetJobIdsInput = {
  integrationEntityId?: InputMaybe<IntegrationEntityIdInput>;
};

export type GetJobIdsResult = {
  __typename?: 'GetJobIdsResult';
  jobIds: Array<Scalars['ID']['output']>;
};

export type GetJobInput = {
  id: Scalars['ID']['input'];
};

export type GetJobResult = {
  __typename?: 'GetJobResult';
  job: Job;
};

export type GetJobSummaryInput = {
  /**   If true, will return all steps including those that have no documentation or specific step type response */
  includeAllSteps?: InputMaybe<Scalars['Boolean']['input']>;
  jobId: Scalars['ID']['input'];
  nextToken?: InputMaybe<Scalars['String']['input']>;
  /**   If included, will filter to just documentation/steps associated with a specific workflow job */
  workflowJobId?: InputMaybe<Scalars['ID']['input']>;
};

export type GetJobSummaryResult = {
  __typename?: 'GetJobSummaryResult';
  jobSummary: JobSummary;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type GetWorkTypeIdsByExternalIdsInput = {
  externalIds: Array<Scalars['ID']['input']>;
};

export type GetWorkTypeIdsByExternalIdsResult = {
  __typename?: 'GetWorkTypeIdsByExternalIdsResult';
  /**
   *   Only external IDs corresponding to an existing vision work type will be
   *  represented in an ID pair in this response field.
   */
  workTypeIdPairs: Array<WorkTypeIdPair>;
};

export type IntegrationEntityId = {
  __typename?: 'IntegrationEntityId';
  id: Scalars['ID']['output'];
  namespace: Scalars['String']['output'];
};

/**   These two parts of the composite ID must be universally unique */
export type IntegrationEntityIdInput = {
  /**   Your actual ID within your system. Must be unique within the universe of IDs that share the above namespace. */
  id: Scalars['ID']['input'];
  /**   Must be 10 or more characters - should be unique to your integration and must be a single, eternal, shared value across your entire integration. */
  namespace: Scalars['String']['input'];
};

export type InternalNotificationContact = {
  __typename?: 'InternalNotificationContact';
  email: Scalars['AWSEmail']['output'];
  notify_of_events: Array<JobNotificationEventType>;
};

export type InternalNotificationContactInput = {
  email: Scalars['AWSEmail']['input'];
  notify_of_events: Array<JobNotificationEventType>;
};

export type Job = {
  __typename?: 'Job';
  /**   This takes a list of Vision User IDs, but is currently enforced as a single item list. We plan to soon have the ability to have multiple Assignees per Job, so we are ensuring we do not need to change the API when that time comes. */
  assigneeIds: Array<Scalars['ID']['output']>;
  completedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  completedBy?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['AWSDateTime']['output']>;
  createdBy?: Maybe<Scalars['ID']['output']>;
  customerEmail?: Maybe<Scalars['AWSEmail']['output']>;
  customerName?: Maybe<Scalars['String']['output']>;
  deepLinks?: Maybe<DeepLinks>;
  /**   If you include a URL on the XOi Job, a button will appear in XOi Mobile for the technician to easily return to your application. The character limit for the URL is 1024. */
  externalAppUrl?: Maybe<Scalars['String']['output']>;
  externalId?: Maybe<Scalars['ID']['output']>;
  /**   The unique ID generated within XOi Cloud. */
  id: Scalars['ID']['output'];
  /**
   *   The namespaced ID submitted by the integration that created the job
   * @deprecated Deprecated in favor of externalId, which ensures a one-to-one relationship between the job in the external system and the XOi job.
   */
  integrationEntityId?: Maybe<IntegrationEntityId>;
  /**   An optional Note added by a Vision User. You may note that this Note is a Note object and not directly a note string. */
  internalNote?: Maybe<Note>;
  internalNotificationContacts?: Maybe<Array<InternalNotificationContact>>;
  jobLocation?: Maybe<Scalars['String']['output']>;
  /**   The intent of this optional field is to provide a human-friendly label for each Job. It would be best to keep this unique, but we will not enforce that within XOi Cloud. This label will be displayed on the share page. */
  label?: Maybe<Scalars['String']['output']>;
  publicTags?: Maybe<Array<Scalars['String']['output']>>;
  /**   Possible values to be suggested by the mobile app when entering tags */
  tagSuggestions?: Maybe<Array<Scalars['String']['output']>>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  updatedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  workOrderNumber?: Maybe<Scalars['String']['output']>;
  workTypeIds?: Maybe<Array<Scalars['ID']['output']>>;
};

export type JobConnection = {
  __typename?: 'JobConnection';
  items: Array<Job>;
  /**   If this is present and a non-empty string, then there are more results to return. Use that value in a subsequent request to get those additional results. If the nextToken you receive from a query is an empty string then you know you have reached the end of the available items. */
  nextToken?: Maybe<Scalars['String']['output']>;
};

/**
 *   When setting internal notification contacts on a job, these are the events you
 *  can choose for them to be notified of.
 */
export enum JobNotificationEventType {
  WorkflowCustomerApprovalSubmission = 'WORKFLOW_CUSTOMER_APPROVAL_SUBMISSION'
}

export type JobShare = {
  __typename?: 'JobShare';
  id: Scalars['ID']['output'];
  shareLink: Scalars['String']['output'];
};

export type JobShareResult = {
  __typename?: 'JobShareResult';
  jobShare?: Maybe<JobShare>;
};

export type JobSummary = {
  __typename?: 'JobSummary';
  assignees: Array<User>;
  documentation?: Maybe<Array<DocumentationItem>>;
  integrationEntityId?: Maybe<IntegrationEntityId>;
  /**   ID of the job being summarized */
  jobId: Scalars['String']['output'];
  supportStatuses?: Maybe<Array<WorkflowSupportStatus>>;
};

export type KnowledgebaseShare = {
  __typename?: 'KnowledgebaseShare';
  id: Scalars['ID']['output'];
  knowledgebaseContentIds: Array<Scalars['ID']['output']>;
  shareLink: Scalars['String']['output'];
};

export type ListDocumentationInput = {
  dateQuery?: InputMaybe<DateQueryInput>;
  filter?: InputMaybe<FilterInput>;
  /**   If true, will return all steps including those that have no documentation or specific step type response */
  includeAllSteps?: InputMaybe<Scalars['Boolean']['input']>;
  /**   Set to an empty string to get the first subset of items. If you are trying to get the next set of items then you should give the nextToken you received from the last request for this input to get the next set of results. */
  nextToken?: InputMaybe<Scalars['String']['input']>;
};

export type ListDocumentationItem = {
  __typename?: 'ListDocumentationItem';
  choice?: Maybe<Choice>;
  contentId?: Maybe<Scalars['ID']['output']>;
  date_entry?: Maybe<DateEntry>;
  derivedData?: Maybe<DerivedData>;
  jobId?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Note>;
  number_entry?: Maybe<NumberEntry>;
  sourceId?: Maybe<Scalars['String']['output']>;
  stepIndex?: Maybe<Scalars['Int']['output']>;
  /**   The list of traits from the step that this documentation item is a part of. */
  stepTraits?: Maybe<Array<Scalars['String']['output']>>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  text_entry?: Maybe<TextEntry>;
  traits: Array<DocumentationItemTrait>;
  workSummary?: Maybe<WorkSummary>;
  /**   ID of the workflow job associated with this content */
  workflowJobId?: Maybe<Scalars['ID']['output']>;
  workflowLabel?: Maybe<Scalars['String']['output']>;
  workflowName?: Maybe<Scalars['String']['output']>;
};

export type ListDocumentationResult = {
  __typename?: 'ListDocumentationResult';
  documentationConnection?: Maybe<DocumentationConnection>;
};

export type ListJobsInput = {
  dateQuery?: InputMaybe<DateQueryInput>;
  /**   If included, jobs with the supplied IDs will be excluded from the results. Only available if multiple workflows per job is enabled for the api user account. Contact us for details. */
  excludeJobIds?: InputMaybe<Array<Scalars['String']['input']>>;
  filter?: InputMaybe<FilterInput>;
  /**   Set to the maximum number of items that you would like to be returned. */
  limit: Scalars['Int']['input'];
  /**   Set to an empty string to get the first subset of items. If you are trying to get the next set of items then you should give the nextToken you received from the last request for this input to get the next set of results. */
  nextToken?: InputMaybe<Scalars['String']['input']>;
};

export type ListJobsResult = {
  __typename?: 'ListJobsResult';
  jobConnection: JobConnection;
};

export type ListWebhookHistoryInput = {
  dateQuery?: InputMaybe<WebhookHistoryDateQueryInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};

export type ListWebhookHistoryResult = {
  __typename?: 'ListWebhookHistoryResult';
  webhookHistoryConnection?: Maybe<WebhookHistoryConnection>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addWorkflow: AddWorkflowResult;
  createJob: CreateJobResult;
  createJobShare: JobShareResult;
  createKnowledgebaseShare: CreateKnowledgebaseShareResult;
  deleteJob: DeleteJobResult;
  updateJob: UpdateJobResult;
};


export type MutationAddWorkflowArgs = {
  input: AddWorkflowInput;
};


export type MutationCreateJobArgs = {
  input: CreateJobInput;
};


export type MutationCreateJobShareArgs = {
  input: CreateJobShareInput;
};


export type MutationCreateKnowledgebaseShareArgs = {
  input: CreateKnowledgebaseShareInput;
};


export type MutationDeleteJobArgs = {
  input: DeleteJobInput;
};


export type MutationUpdateJobArgs = {
  input: UpdateJobInput;
};

export type NewJobInput = {
  /**   This is an array so that we can allow multiple assignees in the future. Currently only one assignee is supported. */
  assigneeIds: Array<Scalars['ID']['input']>;
  /**   When a customer approval workflow on this job is completed, an approval request will be sent to this email. */
  customerEmail?: InputMaybe<Scalars['AWSEmail']['input']>;
  customerName: Scalars['String']['input'];
  /**   If you include a URL on the XOi Job, a button will appear in XOi Mobile for the technician to easily return to your application. The character limit for the URL is 1024. */
  externalAppUrl?: InputMaybe<Scalars['String']['input']>;
  /**   Optionally provide a unique ID assigned to this job in an external system. */
  externalId?: InputMaybe<Scalars['ID']['input']>;
  /**   You can provide a namespaced id to look up this job with getJobIdsByIntegrationEntityId. */
  integrationEntityId?: InputMaybe<IntegrationEntityIdInput>;
  internalNote?: InputMaybe<NoteInput>;
  /**
   *   Contacts specified here will receive notifications with links to "entire" job shares
   *  containing internal data. Be careful to not include external emails, like
   *  customer emails, if you don't want them to receive all job data.
   */
  internalNotificationContacts?: InputMaybe<Array<InternalNotificationContactInput>>;
  jobLocation: Scalars['String']['input'];
  /**   The intent of this optional field is to provide a human-friendly label for each Job. It would be best to keep this unique, but we will not enforce that within XOi Cloud. This label will be displayed on the share page. */
  label?: InputMaybe<Scalars['String']['input']>;
  publicTags?: InputMaybe<Array<Scalars['String']['input']>>;
  /**   Possible values to be suggested by the mobile app when entering tags */
  tagSuggestions?: InputMaybe<Array<Scalars['String']['input']>>;
  /**   Anything you pass in as a `tag` here will then be searchable via the existing tag-based search capabilities. */
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  workOrderNumber: Scalars['String']['input'];
  workTypeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type Note = {
  __typename?: 'Note';
  /**   If a note is present, it must contain text. That text can be no longer than 3000 characters. */
  text: Scalars['String']['output'];
};

export type NoteInput = {
  /**   If a note is present, it must contain text. That text can be no longer than 3000 characters. */
  text: Scalars['String']['input'];
};

export type NumberEntry = {
  __typename?: 'NumberEntry';
  unit?: Maybe<Scalars['String']['output']>;
  unit_type: Scalars['String']['output'];
  value?: Maybe<Scalars['Float']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getJob: GetJobResult;
  getJobIdByExternalId: GetJobIdByExternalIdResult;
  getJobIdsByIntegrationEntityId: GetJobIdsResult;
  getJobSummary: GetJobSummaryResult;
  getWorkTypeIdsByExternalIds: GetWorkTypeIdsByExternalIdsResult;
  listDocumentation: ListDocumentationResult;
  listJobs: ListJobsResult;
  listWebhookHistory: ListWebhookHistoryResult;
  reserved?: Maybe<Scalars['String']['output']>;
};


export type QueryGetJobArgs = {
  input: GetJobInput;
};


export type QueryGetJobIdByExternalIdArgs = {
  input: GetJobIdByExternalIdInput;
};


export type QueryGetJobIdsByIntegrationEntityIdArgs = {
  input: GetJobIdsInput;
};


export type QueryGetJobSummaryArgs = {
  input: GetJobSummaryInput;
};


export type QueryGetWorkTypeIdsByExternalIdsArgs = {
  input: GetWorkTypeIdsByExternalIdsInput;
};


export type QueryListDocumentationArgs = {
  input: ListDocumentationInput;
};


export type QueryListJobsArgs = {
  input: ListJobsInput;
};


export type QueryListWebhookHistoryArgs = {
  input: ListWebhookHistoryInput;
};

/**   When submitting a dateQuery in a listJobs request, these are your options for sorting the returned jobs. */
export enum SortDateType {
  CompletedAt = 'COMPLETED_AT',
  CreatedAt = 'CREATED_AT'
}

export type SupportRequestAgentInfo = {
  __typename?: 'SupportRequestAgentInfo';
  email: Scalars['String']['output'];
};

export type TextEntry = {
  __typename?: 'TextEntry';
  value?: Maybe<Scalars['String']['output']>;
};

export type UpdateJobFieldsInput = {
  /**   This is an array so that we can allow multiple assignees in the future. Currently only one assignee is supported. */
  assigneeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  /**   If provided, this field must be a non-empty string. */
  customerEmail?: InputMaybe<Scalars['AWSEmail']['input']>;
  /**   If provided, this field must be a non-empty string. */
  customerName?: InputMaybe<Scalars['String']['input']>;
  /**   If you include a URL on the XOi Job, a button will appear in XOi Mobile for the technician to easily return to your application. The character limit for the URL is 1024. */
  externalAppUrl?: InputMaybe<Scalars['String']['input']>;
  internalNote?: InputMaybe<NoteInput>;
  /**
   *   Contacts specified here will receive notifications with links to "entire" job shares
   *  containing internal data. Be careful to not include external emails, like
   *  customer emails, if you don't want them to receive all job data.
   */
  internalNotificationContacts?: InputMaybe<Array<InternalNotificationContactInput>>;
  /**   If provided, this field must be a non-empty string. */
  jobLocation?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  tagSuggestions?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  /**   If provided, this field must be a non-empty string. */
  workOrderNumber?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateJobInput = {
  fieldUpdates: UpdateJobFieldsInput;
  id: Scalars['ID']['input'];
};

export type UpdateJobResult = {
  __typename?: 'UpdateJobResult';
  job: Job;
};

export type User = {
  __typename?: 'User';
  email: Scalars['AWSEmail']['output'];
  family_name: Scalars['String']['output'];
  given_name: Scalars['String']['output'];
  /**   The Vision User ID currently matches the User's email address, but do not rely on that to always be the case. If a User's email address changes after creation, the User ID will not change to match it. In a future release, we will be switching to GUIDs. */
  id: Scalars['ID']['output'];
  phone_number: Scalars['String']['output'];
};

export type VisionMobileDeepLinks = {
  __typename?: 'VisionMobileDeepLinks';
  /**   Use this link to access and join an XOi Job as a contributor. With this link, the user must be online to access the job and the multiple contributors feature must be enabled for the user's organization. */
  contributeToJob?: Maybe<DeepLink>;
  editJob?: Maybe<DeepLink>;
  /**   The requested job will only appear in location search once it is complete. Past completed jobs will still show up. */
  jobLocationActivitySearch?: Maybe<DeepLink>;
  /**   This link is currently only present for a completed job */
  viewJob?: Maybe<DeepLink>;
};

export type VisionWebDeepLinks = {
  __typename?: 'VisionWebDeepLinks';
  /**   This link is currently only present for a completed job */
  viewJob?: Maybe<DeepLink>;
};

export type WebhookHistoryConnection = {
  __typename?: 'WebhookHistoryConnection';
  items: Array<WebhookHistoryRecord>;
  /**   If this is present and a non-empty string, then there are more results to return. Use that value in a subsequent request to get those additional results. If the nextToken you receive from a query is an empty string then you know you have reached the end of the available items. */
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type WebhookHistoryDateQueryInput = {
  /**   Defaults to False */
  ascending?: InputMaybe<Scalars['Boolean']['input']>;
  gte?: InputMaybe<Scalars['AWSDateTime']['input']>;
  lte?: InputMaybe<Scalars['AWSDateTime']['input']>;
};

export type WebhookHistoryRecord = {
  __typename?: 'WebhookHistoryRecord';
  event: Scalars['String']['output'];
  firedAt: Scalars['AWSDateTime']['output'];
  jobId: Scalars['String']['output'];
  orgId: Scalars['String']['output'];
  traits: Array<Scalars['String']['output']>;
  workflowJobId?: Maybe<Scalars['String']['output']>;
};

export type WorkSummary = {
  __typename?: 'WorkSummary';
  summary_text: Scalars['String']['output'];
};

export type WorkTypeIdPair = {
  __typename?: 'WorkTypeIdPair';
  externalId: Scalars['ID']['output'];
  workTypeId: Scalars['ID']['output'];
};

export type WorkflowSupportStatus = {
  __typename?: 'WorkflowSupportStatus';
  agentInfo?: Maybe<SupportRequestAgentInfo>;
  lastSetAt: Scalars['AWSDateTime']['output'];
  status: Scalars['String']['output'];
  workflowJobId: Scalars['String']['output'];
};

export type JobConnectionFieldsFragment = { __typename?: 'JobConnection', nextToken?: string | null, items: Array<{ __typename?: 'Job', id: string, externalId?: string | null, createdAt?: any | null, createdBy?: string | null, updatedAt?: any | null, completedAt?: any | null, completedBy?: string | null, customerName?: string | null, customerEmail?: any | null, jobLocation?: string | null, workOrderNumber?: string | null, assigneeIds: Array<string>, label?: string | null, tags?: Array<string> | null, publicTags?: Array<string> | null, tagSuggestions?: Array<string> | null, workTypeIds?: Array<string> | null, externalAppUrl?: string | null, internalNotificationContacts?: Array<{ __typename?: 'InternalNotificationContact', email: any, notify_of_events: Array<JobNotificationEventType> }> | null, internalNote?: { __typename?: 'Note', text: string } | null, deepLinks?: { __typename?: 'DeepLinks', visionWeb?: { __typename?: 'VisionWebDeepLinks', viewJob?: { __typename?: 'DeepLink', url: string } | null } | null, visionMobile?: { __typename?: 'VisionMobileDeepLinks', viewJob?: { __typename?: 'DeepLink', url: string } | null, editJob?: { __typename?: 'DeepLink', url: string } | null, jobLocationActivitySearch?: { __typename?: 'DeepLink', url: string } | null, contributeToJob?: { __typename?: 'DeepLink', url: string } | null } | null } | null }> };

export type JobFieldsFragment = { __typename?: 'Job', id: string, externalId?: string | null, createdAt?: any | null, createdBy?: string | null, updatedAt?: any | null, completedAt?: any | null, completedBy?: string | null, customerName?: string | null, customerEmail?: any | null, jobLocation?: string | null, workOrderNumber?: string | null, assigneeIds: Array<string>, label?: string | null, tags?: Array<string> | null, publicTags?: Array<string> | null, tagSuggestions?: Array<string> | null, workTypeIds?: Array<string> | null, externalAppUrl?: string | null, internalNotificationContacts?: Array<{ __typename?: 'InternalNotificationContact', email: any, notify_of_events: Array<JobNotificationEventType> }> | null, internalNote?: { __typename?: 'Note', text: string } | null, deepLinks?: { __typename?: 'DeepLinks', visionWeb?: { __typename?: 'VisionWebDeepLinks', viewJob?: { __typename?: 'DeepLink', url: string } | null } | null, visionMobile?: { __typename?: 'VisionMobileDeepLinks', viewJob?: { __typename?: 'DeepLink', url: string } | null, editJob?: { __typename?: 'DeepLink', url: string } | null, jobLocationActivitySearch?: { __typename?: 'DeepLink', url: string } | null, contributeToJob?: { __typename?: 'DeepLink', url: string } | null } | null } | null };

export type AddWorkflowMutationVariables = Exact<{
  input: AddWorkflowInput;
}>;


export type AddWorkflowMutation = { __typename?: 'Mutation', addWorkflow: { __typename?: 'AddWorkflowResult', workflowJobId: string } };

export type CreateJobMutationVariables = Exact<{
  input: CreateJobInput;
}>;


export type CreateJobMutation = { __typename?: 'Mutation', createJob: { __typename?: 'CreateJobResult', job: { __typename?: 'Job', id: string, externalId?: string | null, createdAt?: any | null, createdBy?: string | null, updatedAt?: any | null, completedAt?: any | null, completedBy?: string | null, customerName?: string | null, customerEmail?: any | null, jobLocation?: string | null, workOrderNumber?: string | null, assigneeIds: Array<string>, label?: string | null, tags?: Array<string> | null, publicTags?: Array<string> | null, tagSuggestions?: Array<string> | null, workTypeIds?: Array<string> | null, externalAppUrl?: string | null, internalNotificationContacts?: Array<{ __typename?: 'InternalNotificationContact', email: any, notify_of_events: Array<JobNotificationEventType> }> | null, internalNote?: { __typename?: 'Note', text: string } | null, deepLinks?: { __typename?: 'DeepLinks', visionWeb?: { __typename?: 'VisionWebDeepLinks', viewJob?: { __typename?: 'DeepLink', url: string } | null } | null, visionMobile?: { __typename?: 'VisionMobileDeepLinks', viewJob?: { __typename?: 'DeepLink', url: string } | null, editJob?: { __typename?: 'DeepLink', url: string } | null, jobLocationActivitySearch?: { __typename?: 'DeepLink', url: string } | null, contributeToJob?: { __typename?: 'DeepLink', url: string } | null } | null } | null } } };

export type DeleteJobMutationVariables = Exact<{
  input: DeleteJobInput;
}>;


export type DeleteJobMutation = { __typename?: 'Mutation', deleteJob: { __typename?: 'DeleteJobResult', id: string } };

export type UpdateJobMutationVariables = Exact<{
  input: UpdateJobInput;
}>;


export type UpdateJobMutation = { __typename?: 'Mutation', updateJob: { __typename?: 'UpdateJobResult', job: { __typename?: 'Job', id: string, externalId?: string | null, createdAt?: any | null, createdBy?: string | null, updatedAt?: any | null, completedAt?: any | null, completedBy?: string | null, customerName?: string | null, customerEmail?: any | null, jobLocation?: string | null, workOrderNumber?: string | null, assigneeIds: Array<string>, label?: string | null, tags?: Array<string> | null, publicTags?: Array<string> | null, tagSuggestions?: Array<string> | null, workTypeIds?: Array<string> | null, externalAppUrl?: string | null, internalNotificationContacts?: Array<{ __typename?: 'InternalNotificationContact', email: any, notify_of_events: Array<JobNotificationEventType> }> | null, internalNote?: { __typename?: 'Note', text: string } | null, deepLinks?: { __typename?: 'DeepLinks', visionWeb?: { __typename?: 'VisionWebDeepLinks', viewJob?: { __typename?: 'DeepLink', url: string } | null } | null, visionMobile?: { __typename?: 'VisionMobileDeepLinks', viewJob?: { __typename?: 'DeepLink', url: string } | null, editJob?: { __typename?: 'DeepLink', url: string } | null, jobLocationActivitySearch?: { __typename?: 'DeepLink', url: string } | null, contributeToJob?: { __typename?: 'DeepLink', url: string } | null } | null } | null } } };

export type GetJobQueryVariables = Exact<{
  input: GetJobInput;
}>;


export type GetJobQuery = { __typename?: 'Query', getJob: { __typename?: 'GetJobResult', job: { __typename?: 'Job', id: string, externalId?: string | null, createdAt?: any | null, createdBy?: string | null, updatedAt?: any | null, completedAt?: any | null, completedBy?: string | null, customerName?: string | null, customerEmail?: any | null, jobLocation?: string | null, workOrderNumber?: string | null, assigneeIds: Array<string>, label?: string | null, tags?: Array<string> | null, publicTags?: Array<string> | null, tagSuggestions?: Array<string> | null, workTypeIds?: Array<string> | null, externalAppUrl?: string | null, internalNotificationContacts?: Array<{ __typename?: 'InternalNotificationContact', email: any, notify_of_events: Array<JobNotificationEventType> }> | null, internalNote?: { __typename?: 'Note', text: string } | null, deepLinks?: { __typename?: 'DeepLinks', visionWeb?: { __typename?: 'VisionWebDeepLinks', viewJob?: { __typename?: 'DeepLink', url: string } | null } | null, visionMobile?: { __typename?: 'VisionMobileDeepLinks', viewJob?: { __typename?: 'DeepLink', url: string } | null, editJob?: { __typename?: 'DeepLink', url: string } | null, jobLocationActivitySearch?: { __typename?: 'DeepLink', url: string } | null, contributeToJob?: { __typename?: 'DeepLink', url: string } | null } | null } | null } } };

export type ListDocumentationQueryVariables = Exact<{
  input: ListDocumentationInput;
}>;


export type ListDocumentationQuery = { __typename?: 'Query', listDocumentation: { __typename?: 'ListDocumentationResult', documentationConnection?: { __typename?: 'DocumentationConnection', nextToken: string, items: Array<{ __typename?: 'ListDocumentationItem', jobId?: string | null, workflowName?: string | null, workflowLabel?: string | null, workflowJobId?: string | null, traits: Array<DocumentationItemTrait>, stepIndex?: number | null, stepTraits?: Array<string> | null } | null> } | null } };

export type ListJobsQueryVariables = Exact<{
  input: ListJobsInput;
}>;


export type ListJobsQuery = { __typename?: 'Query', listJobs: { __typename?: 'ListJobsResult', jobConnection: { __typename?: 'JobConnection', nextToken?: string | null, items: Array<{ __typename?: 'Job', id: string, externalId?: string | null, createdAt?: any | null, createdBy?: string | null, updatedAt?: any | null, completedAt?: any | null, completedBy?: string | null, customerName?: string | null, customerEmail?: any | null, jobLocation?: string | null, workOrderNumber?: string | null, assigneeIds: Array<string>, label?: string | null, tags?: Array<string> | null, publicTags?: Array<string> | null, tagSuggestions?: Array<string> | null, workTypeIds?: Array<string> | null, externalAppUrl?: string | null, internalNotificationContacts?: Array<{ __typename?: 'InternalNotificationContact', email: any, notify_of_events: Array<JobNotificationEventType> }> | null, internalNote?: { __typename?: 'Note', text: string } | null, deepLinks?: { __typename?: 'DeepLinks', visionWeb?: { __typename?: 'VisionWebDeepLinks', viewJob?: { __typename?: 'DeepLink', url: string } | null } | null, visionMobile?: { __typename?: 'VisionMobileDeepLinks', viewJob?: { __typename?: 'DeepLink', url: string } | null, editJob?: { __typename?: 'DeepLink', url: string } | null, jobLocationActivitySearch?: { __typename?: 'DeepLink', url: string } | null, contributeToJob?: { __typename?: 'DeepLink', url: string } | null } | null } | null }> } } };

export type JobShareFieldsFragment = { __typename?: 'JobShare', id: string, shareLink: string };

export type JobShareResultFieldsFragment = { __typename?: 'JobShareResult', jobShare?: { __typename?: 'JobShare', id: string, shareLink: string } | null };

export type CreateJobShareMutationVariables = Exact<{
  input: CreateJobShareInput;
}>;


export type CreateJobShareMutation = { __typename?: 'Mutation', createJobShare: { __typename?: 'JobShareResult', jobShare?: { __typename?: 'JobShare', id: string, shareLink: string } | null } };

export const JobFieldsFragmentDoc = gql`
    fragment JobFields on Job {
  id
  externalId
  createdAt
  createdBy
  updatedAt
  completedAt
  completedBy
  customerName
  customerEmail
  internalNotificationContacts {
    email
    notify_of_events
  }
  jobLocation
  workOrderNumber
  assigneeIds
  internalNote {
    text
  }
  label
  tags
  publicTags
  tagSuggestions
  deepLinks {
    visionWeb {
      viewJob {
        url
      }
    }
    visionMobile {
      viewJob {
        url
      }
      editJob {
        url
      }
      jobLocationActivitySearch {
        url
      }
      contributeToJob {
        url
      }
    }
  }
  workTypeIds
  externalAppUrl
}
    `;
export const JobConnectionFieldsFragmentDoc = gql`
    fragment JobConnectionFields on JobConnection {
  items {
    ...JobFields
  }
  nextToken
}
    ${JobFieldsFragmentDoc}`;
export const JobShareFieldsFragmentDoc = gql`
    fragment JobShareFields on JobShare {
  id
  shareLink
}
    `;
export const JobShareResultFieldsFragmentDoc = gql`
    fragment JobShareResultFields on JobShareResult {
  jobShare {
    ...JobShareFields
  }
}
    ${JobShareFieldsFragmentDoc}`;
export const AddWorkflowDocument = gql`
    mutation AddWorkflow($input: AddWorkflowInput!) {
  addWorkflow(input: $input) {
    workflowJobId
  }
}
    `;
export const CreateJobDocument = gql`
    mutation CreateJob($input: CreateJobInput!) {
  createJob(input: $input) {
    job {
      ...JobFields
    }
  }
}
    ${JobFieldsFragmentDoc}`;
export const DeleteJobDocument = gql`
    mutation DeleteJob($input: DeleteJobInput!) {
  deleteJob(input: $input) {
    id
  }
}
    `;
export const UpdateJobDocument = gql`
    mutation UpdateJob($input: UpdateJobInput!) {
  updateJob(input: $input) {
    job {
      ...JobFields
    }
  }
}
    ${JobFieldsFragmentDoc}`;
export const GetJobDocument = gql`
    query GetJob($input: GetJobInput!) {
  getJob(input: $input) {
    job {
      ...JobFields
    }
  }
}
    ${JobFieldsFragmentDoc}`;
export const ListDocumentationDocument = gql`
    query ListDocumentation($input: ListDocumentationInput!) {
  listDocumentation(input: $input) {
    documentationConnection {
      nextToken
      items {
        jobId
        workflowName
        workflowLabel
        workflowJobId
        traits
        stepIndex
        stepTraits
      }
    }
  }
}
    `;
export const ListJobsDocument = gql`
    query ListJobs($input: ListJobsInput!) {
  listJobs(input: $input) {
    jobConnection {
      ...JobConnectionFields
    }
  }
}
    ${JobConnectionFieldsFragmentDoc}`;
export const CreateJobShareDocument = gql`
    mutation CreateJobShare($input: CreateJobShareInput!) {
  createJobShare(input: $input) {
    ...JobShareResultFields
  }
}
    ${JobShareResultFieldsFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    AddWorkflow(variables: AddWorkflowMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddWorkflowMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddWorkflowMutation>(AddWorkflowDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AddWorkflow', 'mutation', variables);
    },
    CreateJob(variables: CreateJobMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateJobMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateJobMutation>(CreateJobDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateJob', 'mutation', variables);
    },
    DeleteJob(variables: DeleteJobMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteJobMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteJobMutation>(DeleteJobDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteJob', 'mutation', variables);
    },
    UpdateJob(variables: UpdateJobMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateJobMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateJobMutation>(UpdateJobDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateJob', 'mutation', variables);
    },
    GetJob(variables: GetJobQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetJobQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetJobQuery>(GetJobDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetJob', 'query', variables);
    },
    ListDocumentation(variables: ListDocumentationQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ListDocumentationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ListDocumentationQuery>(ListDocumentationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ListDocumentation', 'query', variables);
    },
    ListJobs(variables: ListJobsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ListJobsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ListJobsQuery>(ListJobsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ListJobs', 'query', variables);
    },
    CreateJobShare(variables: CreateJobShareMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateJobShareMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateJobShareMutation>(CreateJobShareDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateJobShare', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;