import { configureGenkit } from '@genkit-ai/core';
import { googleAI } from '@genkit-ai/googleai';
import { defineModel } from '@genkit-ai/ai';

// Define and export your model
export const geminiProModel = defineModel({
  name: 'gemini-pro', // This is just an identifier for Genkit
  label: 'Google AI - Gemini Pro',
  // Assuming you have GOOGLE_API_KEY in your .env.local for the googleAI plugin
  // The actual model used by the googleAI plugin will be determined by its internal config
  // or you can specify it if the plugin options allow.
  // For direct model usage in generate calls, you often pass the model name string
  // like 'gemini-pro' if the plugin is configured.
});

configureGenkit({
  plugins: [
    googleAI({
      // You might need to specify your API key here if not globally available
      // apiKey: process.env.GOOGLE_API_KEY 
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
