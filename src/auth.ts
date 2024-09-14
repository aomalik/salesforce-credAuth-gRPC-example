import axios from 'axios';
import { isError, isAxiosError } from './utils/type-guards';
import dotenv from 'dotenv';

dotenv.config();

// Salesforce credentials (now using environment variables)
const SALESFORCE_CLIENT_ID = process.env.SALESFORCE_CLIENT_ID;
const SALESFORCE_CLIENT_SECRET = process.env.SALESFORCE_CLIENT_SECRET;
const SALESFORCE_LOGIN_URL = process.env.SALESFORCE_LOGIN_URL;
const AUTH_URL = `${SALESFORCE_LOGIN_URL}/services/oauth2/token`;

// Function to authenticate using client_credentials
async function authenticate() {
  if (!SALESFORCE_CLIENT_ID || !SALESFORCE_CLIENT_SECRET) {
    throw new Error(
      'SALESFORCE_CLIENT_ID and SALESFORCE_CLIENT_SECRET must be defined',
    );
  }
  try {
    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: SALESFORCE_CLIENT_ID,
      client_secret: SALESFORCE_CLIENT_SECRET,
    });

    const response = await axios.post(AUTH_URL, body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const { access_token, instance_url } = response.data;
    console.log('Access Token:', access_token);
    console.log('Instance URL:', instance_url);

    return { access_token, instance_url };
  } catch (error) {
    console.error(
      'Error authenticating with Salesforce:',
      isError(error)
        ? error.message
        : isAxiosError(error)
          ? error.response?.data
          : error, // Error handling
    );

    throw error;
  }
}

export { authenticate };
