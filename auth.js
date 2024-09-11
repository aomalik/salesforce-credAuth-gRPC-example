require('dotenv').config();
const axios = require('axios');

// Salesforce credentials (now using environment variables)
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const SALESFORCE_LOGIN_URL = process.env.SALESFORCE_LOGIN_URL;
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