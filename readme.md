# Salesforce Client Credentials Authentication and gRPC Streaming Sample

## Steps to Run the Project

1. Install the necessary dependencies:
   ```
   npm install
   ```

2. Authenticate with Salesforce:
   ```
   node app.js
   ```

3. Query Salesforce and stream data:
   ```
   node streamReader.js
   ```
   This script implements the logic to read data from Salesforce and stream it using gRPC.