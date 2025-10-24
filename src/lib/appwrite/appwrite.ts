import { Client, Databases, Account, ID } from 'node-appwrite';

// Validate environment variables
const validateEnvVars = () => {
  const required = [
    'NEXT_PUBLIC_APPWRITE_ENDPOINT',
    'NEXT_PUBLIC_APPWRITE_PROJECT_ID',
    'APPWRITE_API_KEY',
    'APPWRITE_DATABASE_ID',
    'APPWRITE_DEBTS_COLLECTION_ID'
  ];
  
  for (const envVar of required) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }
};

// Server-side Appwrite client
export const createAppwriteClient = () => {
  validateEnvVars();
  
  const client = new Client();
  
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
    .setKey(process.env.APPWRITE_API_KEY as string);
    
  return client;
};

// Database and collection IDs
export const DATABASE_ID = process.env.APPWRITE_DATABASE_ID as string;
export const DEBTS_COLLECTION_ID = process.env.APPWRITE_DEBTS_COLLECTION_ID as string;

// Initialize services
export const databases = new Databases(createAppwriteClient());
export const account = new Account(createAppwriteClient());

// Generate unique ID
export { ID };