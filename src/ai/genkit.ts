// src/ai/genkit.ts
// Genkit SDK initialization
import { init } from 'genkit';
import { googleai } from '@genkit-ai/googleai'; // Import the Google AI plugin

// Initialize Genkit
init({
  defaultFlow: 'suggestMaintenanceCommands', // This should match a flow you define
  plugins: [
    googleai({
      apiKey: process.env.GOOGLE_API_KEY, // Access the API key from environment variables
      // Other Google AI configuration options can go here, e.g., default model
    }),
  ],
  // For local development, set the environment to 'dev'
  // For deployment, Genkit will detect the environment
  env: process.env.NODE_ENV === 'production' ? 'prod' : 'dev',
});
