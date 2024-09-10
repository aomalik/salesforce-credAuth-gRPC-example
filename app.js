const axios = require('axios');

// Salesforce credentials (replace with your Connected App details)
const CLIENT_ID = '3MVG9k02hQhyUgQAt35eWv00lVOwIDdu.8MJC3p9BmSRTQKcIm.en23XnvHB5RwHVZX.3kHN2c4YchwtweThB'; // Replace with your Salesforce Connected App client ID
const CLIENT_SECRET = 'F37279927523D6A321C460D7A6DFB69E31920D755309DC672FDED8D4B304673A'; // Replace with your Salesforce Connected App client secret
const SALESFORCE_LOGIN_URL = 'https://saasfactory-dev-ed.develop.my.salesforce.com'; // Use https://test.salesforce.com for sandbox
const AUTH_URL = `${SALESFORCE_LOGIN_URL}/services/oauth2/token`;
// Function to authenticate using client_credentials
async function authenticate() {
  try {
    // Create the request body for client_credentials grant type
    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });

    // Send POST request to Salesforce OAuth endpoint
    const response = await axios.post(AUTH_URL, body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    // Extract access token from the response
    const { access_token, instance_url } = response.data;
    console.log('Access Token:', access_token);
    console.log('Instance URL:', instance_url);

    // Now you can use the access token to make API requests to Salesforce
    return { access_token, instance_url };
  } catch (error) {
    console.error('Error authenticating with Salesforce:', error.response.data);
  }
}

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
    console.error('Error querying Salesforce:', error.response.data);
  }
}

// Authenticate and query Salesforce
authenticate().then(({ access_token, instance_url }) => {
  querySalesforce(access_token, instance_url);
});