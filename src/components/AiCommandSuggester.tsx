"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Wand2, Loader2, AlertTriangle, Lightbulb } from 'lucide-react';
import { getAICommands } from '@/app/dashboard/ai-tools/command-suggester/actions';
import type { SuggestMaintenanceCommandsOutput } from '@/ai/flows/suggest-maintenance-commands';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

export function AiCommandSuggester() {
  const [deviceLogs, setDeviceLogs] = useState('');
  const [suggestions, setSuggestions] = useState<SuggestMaintenanceCommandsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuggestions(null);

    if (!deviceLogs.trim()) {
      setError("Device logs cannot be empty.");
      setIsLoading(false);
      toast({ variant: "destructive", title: "Input Error", description: "Device logs cannot be empty." });
      return;
    }
    
    const result = await getAICommands({ deviceLogs });

    if ('error' in result) {
      setError(result.error);
      toast({ variant: "destructive", title: "AI Suggestion Failed", description: result.error });
    } else {
      setSuggestions(result);
      toast({ title: "Suggestions Loaded", description: "AI has provided maintenance command suggestions." });
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Lightbulb className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">AI Command Suggester</CardTitle>
              <CardDescription>
                Analyze device logs to get smart maintenance command suggestions.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="deviceLogs" className="text-base">Device Logs</Label>
              <Textarea
                id="deviceLogs"
                value={deviceLogs}
                onChange={(e) => setDeviceLogs(e.target.value)}
                placeholder="Paste device logs here... (e.g., ADB logcat output)"
                rows={10}
                className="mt-1 font-mono text-xs"
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Provide detailed logs for more accurate suggestions. Minimum 10 characters.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading} className="text-base py-3 px-6">
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-5 w-5" />
              )}
              Get Suggestions
            </Button>
          </CardFooter>
        </form>
      </Card>

      {error && (
        <Card className="border-destructive shadow-md">
          <CardHeader className="flex flex-row items-center gap-2 text-destructive">
            <AlertTriangle className="h-6 w-6" />
            <CardTitle className="text-lg">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {suggestions && !error && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Suggested Maintenance Commands</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Commands:</h3>
              {suggestions.suggestedCommands.length > 0 ? (
                <ul className="space-y-2">
                  {suggestions.suggestedCommands.map((cmd, index) => (
                    <li key={index} className="p-3 bg-muted rounded-md font-mono text-sm shadow-sm">
                      {cmd}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No specific commands suggested based on the provided logs.</p>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Reasoning:</h3>
              <ScrollArea className="h-40 rounded-md border p-3 bg-muted/50">
                <p className="text-sm whitespace-pre-wrap">{suggestions.reasoning}</p>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
