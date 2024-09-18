export const WorkOrder = {
  data: {
    createJob: {
      job: {
        id: 'cjob-i1d281d3798794e44ae478d10856806d7-d9c6';
        createdAt: '2024-09-17T16:50:42.696857Z';
        createdBy: 'saasfactory+prismatic+dev@xoi.io';
        assigneeIds: ['gonzalo.vargas@saasfactory.vc'];
        customerName: 'Some Customer';
        jobLocation: 'Some Location';
        workOrderNumber: 'Some Workorder';
        label: 'A human-friendly identifier';
        tags: ['tag1', 'tag2'];
        tagSuggestions: ['tag3', 'tag4'];
        deepLinks: {
          visionWeb: {
            viewJob: {
              url: 'https://visionweb.dev.xoeye.com/jobactivity/cjob-i1d281d3798794e44ae478d10856806d7-d9c6';
            };
          };
          visionMobile: {
            viewJob: null;
            editJob: {
              url: 'xoi-vision://my-work/edit?payload=%7B%22jobId%22%3A%20%22cjob-i1d281d3798794e44ae478d10856806d7-d9c6%22%2C%20%22jobLocation%22%3A%20%22Some%20Location%22%2C%20%22workOrderNumber%22%3A%20%22Some%20Workorder%22%2C%20%22owner%22%3A%20%22gonzalo.vargas%40saasfactory.vc%22%2C%20%22customerName%22%3A%20%22Some%20Customer%22%2C%20%22supportsMultipleWorkflows%22%3A%20true%2C%20%22externalAppUrl%22%3A%20%22%22%7D';
            };
          };
        };
        integrationEntityId: {
          namespace: 'AtLeast10Characters';
          id: 'ShouldBeUniqueInYourSystem';
        };
        internalNote: {
          text: 'A note about the job.';
        };
      };
      additionalActionsResults: {
        createPublicShare: null;
      };
    };
  };
};
