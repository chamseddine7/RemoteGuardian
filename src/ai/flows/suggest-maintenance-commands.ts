// src/ai/flows/suggest-maintenance-commands.ts
'use server';

import '@/ai/genkit'; // IMPORTANT: Import for side effect to run configureGenkit()

import { defineFlow, definePrompt } from '@genkit-ai/ai'; // Correct imports
import { z } from 'zod'; // Use zod directly for schema definition

export const SuggestMaintenanceCommandsInputSchema = z.object({
  deviceLogs: z.string().describe('The logs from the target Android device.'),
});
export type SuggestMaintenanceCommandsInput = z.infer<
  typeof SuggestMaintenanceCommandsInputSchema
>;

export const SuggestMaintenanceCommandsOutputSchema = z.object({
  suggestedCommands: z
    .array(z.string())
    .describe(
      'An array of suggested maintenance commands, such as clear cache or remove unused files.'
    ),
  reasoning: z
    .string()
    .describe(
      'The AI explanation for why these commands are suggested based on the logs.'
    ),
});
export type SuggestMaintenanceCommandsOutput = z.infer<
  typeof SuggestMaintenanceCommandsOutputSchema
>;

// Define the prompt using a specific model
const suggestMaintenancePrompt = definePrompt(
  {
    name: 'suggestMaintenanceCommandsPrompt',
    input: { schema: SuggestMaintenanceCommandsInputSchema },
    output: { schema: SuggestMaintenanceCommandsOutputSchema },
    prompt: `You are an expert Android device maintenance assistant.
Analyze the provided device logs and suggest a list of maintenance commands to optimize the device's performance and security.
Explain your reasoning for each suggested command.

Device Logs:
{{deviceLogs}}`,
    model: 'gemini-1.5-flash-latest', // <<-- MAKE SURE THIS IS CORRECTLY PLACED HERE
  }
);
// Define the flow
const suggestMaintenanceCommandsInternalFlow = defineFlow(
  {
    name: 'suggestMaintenanceCommandsInternalFlow',
    inputSchema: SuggestMaintenanceCommandsInputSchema,
    outputSchema: SuggestMaintenanceCommandsOutputSchema,
  },
  async (input) => {
    const result = await suggestMaintenancePrompt.generate({
      input: input,
    });
    return result.output() || { suggestedCommands: [], reasoning: "No output from AI." };
  }
);

// Exported function to be called from your application (e.g., server action)
export async function suggestMaintenanceCommands(
  input: SuggestMaintenanceCommandsInput
): Promise<SuggestMaintenanceCommandsOutput> {
  return suggestMaintenanceCommandsInternalFlow.invoke(input);
}
