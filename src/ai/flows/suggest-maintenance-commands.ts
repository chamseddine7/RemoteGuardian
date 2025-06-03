// use server'
'use server';

/**
 * @fileOverview AI-powered command suggestion for device maintenance.
 *
 * - suggestMaintenanceCommands - Analyzes device logs and suggests maintenance commands.
 * - SuggestMaintenanceCommandsInput - The input type for the suggestMaintenanceCommands function.
 * - SuggestMaintenanceCommandsOutput - The return type for the suggestMaintenanceCommands function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestMaintenanceCommandsInputSchema = z.object({
  deviceLogs: z
    .string()
    .describe('The logs from the target Android device.'),
});
export type SuggestMaintenanceCommandsInput = z.infer<
  typeof SuggestMaintenanceCommandsInputSchema
>;

const SuggestMaintenanceCommandsOutputSchema = z.object({
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

export async function suggestMaintenanceCommands(
  input: SuggestMaintenanceCommandsInput
): Promise<SuggestMaintenanceCommandsOutput> {
  return suggestMaintenanceCommandsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestMaintenanceCommandsPrompt',
  input: {schema: SuggestMaintenanceCommandsInputSchema},
  output: {schema: SuggestMaintenanceCommandsOutputSchema},
  prompt: `You are an expert Android device maintenance assistant.

  Analyze the provided device logs and suggest a list of maintenance commands to optimize the device's performance and security.
  Explain your reasoning for each suggested command.

  Device Logs:
  {{deviceLogs}}`,
});

const suggestMaintenanceCommandsFlow = ai.defineFlow(
  {
    name: 'suggestMaintenanceCommandsFlow',
    inputSchema: SuggestMaintenanceCommandsInputSchema,
    outputSchema: SuggestMaintenanceCommandsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
