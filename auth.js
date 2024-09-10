const axios = require('axios');

// Salesforce credentials (replace with your Connected App details)
const CLIENT_ID = '3MVG9k02hQhyUgQAt35eWv00lVOwIDdu.8MJC3p9BmSRTQKcIm.en23XnvHB5RwHVZX.3kHN2c4YchwtweThB';
const CLIENT_SECRET = 'F37279927523D6A321C460D7A6DFB69E31920D755309DC672FDED8D4B304673A';
const SALESFORCE_LOGIN_URL = 'https://saasfactory-dev-ed.develop.my.salesforce.com';
const AUTH_URL = `${SALESFORCE_LOGIN_URL}/services/oauth2/token`;

// Function to authenticate using client_credentials
async function authenticate() {
  try {
    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });

    const response = await axios.post(AUTH_URL, body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const { access_token, instance_url } = response.data;
    console.log('Access Token:', access_token);
    console.log('Instance URL:', instance_url);

    return { access_token, instance_url };
  } catch (error) {
    console.error('Error authenticating with Salesforce:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { authenticate };