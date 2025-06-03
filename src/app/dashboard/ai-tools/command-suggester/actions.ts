// src/app/dashboard/ai-tools/command-suggester/actions.ts
'use server';
import { suggestMaintenanceCommands, type SuggestMaintenanceCommandsInput, type SuggestMaintenanceCommandsOutput } from '@/ai/flows/suggest-maintenance-commands';
import { z } from 'zod'; // Use zod for input validation if needed on action level

const ActionInputSchema = z.object({
  deviceLogs: z.string().min(10, "Device logs must be at least 10 characters long."),
});

export async function getAICommands(input: SuggestMaintenanceCommandsInput): Promise<SuggestMaintenanceCommandsOutput | { error: string }> {
  try {
    // Optional: Validate input using Zod if desired, though Genkit flow already has schema
    const validation = ActionInputSchema.safeParse(input);
    if (!validation.success) {
      return { error: validation.error.errors.map(e => e.message).join(', ') };
    }

    const result = await suggestMaintenanceCommands(validation.data);
    return result;
  } catch (error) {
    console.error("Error getting AI commands:", error);
    let errorMessage = "Failed to get AI command suggestions.";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return { error: errorMessage };
  }
}
