const axios = require('axios');
const { authenticate } = require('./auth');

// Function to query Salesforce
async function querySalesforce(accessToken, instanceUrl) {
  try {
    const queryEndpoint = `${instanceUrl}/services/data/v57.0/query?q=SELECT+Name+FROM+Account+LIMIT+5`;

    const response = await axios.get(queryEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('Salesforce Query Response:', response.data);
  } catch (error) {
    console.error('Error querying Salesforce:', error.response?.data || error.message);
  }
}

// Authenticate and query Salesforce
authenticate().then(({ access_token, instance_url }) => {
  querySalesforce(access_token, instance_url);
}).catch(error => {
  console.error('Authentication failed:', error);
});