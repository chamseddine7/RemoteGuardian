"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Camera, Smartphone, Trash2, Power, AlertTriangle, Info, CheckCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

interface CommandLog {
  id: string;
  timestamp: string;
  command: string;
  status: 'success' | 'pending' | 'error';
  message: string;
}

export function RemoteCommandsComponent() {
  const [logs, setLogs] = useState<CommandLog[]>([]);
  const [executingCommands, setExecutingCommands] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const executeCommand = (commandName: string, commandDisplayName: string) => {
    setExecutingCommands(prev => new Set(prev).add(commandName));
    const newLog: CommandLog = {
      id: crypto.randomUUID(),
      timestamp: new Date().toLocaleTimeString(),
      command: commandDisplayName,
      status: 'pending',
      message: `Executing "${commandDisplayName}"...`,
    };
    setLogs(prevLogs => [newLog, ...prevLogs]);
    toast({ 
      title: "Command Sent", 
      description: `"${commandDisplayName}" is being executed. This action would be logged to Firestore.` 
    });
    // TODO: Log this action to Firestore: { actor: 'Controller', action: 'COMMAND_SENT', details: commandDisplayName, status: 'pending', commandId: newLog.id, timestamp: new Date().toISOString() }

    // Simulate command execution
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate
      setLogs(prevLogs =>
        prevLogs.map(log =>
          log.id === newLog.id
            ? {
                ...log,
                status: success ? 'success' : 'error',
                message: success
                  ? `"${commandDisplayName}" executed successfully.`
                  : `Failed to execute "${commandDisplayName}". (Mock error)`,
              }
            : log
        )
      );
      if (success) {
        toast({ 
          title: "Command Successful", 
          description: `"${commandDisplayName}" completed. This result would be logged to Firestore.` 
        });
        // TODO: Log result: { actor: 'System', action: 'COMMAND_RESULT', details: commandDisplayName, status: 'success', commandId: newLog.id, timestamp: new Date().toISOString() }
      } else {
        toast({ 
          variant: "destructive", 
          title: "Command Failed", 
          description: `Error executing "${commandDisplayName}". This result would be logged to Firestore.` 
        });
         // TODO: Log result: { actor: 'System', action: 'COMMAND_RESULT', details: commandDisplayName, status: 'failure', commandId: newLog.id, timestamp: new Date().toISOString() }
      }
      setExecutingCommands(prev => {
        const updated = new Set(prev);
        updated.delete(commandName);
        return updated;
      });
    }, 2000 + Math.random() * 2000);
  };

  const commandButtons = [
    { name: 'CAPTURE_SCREENSHOT', label: 'Capture Screenshot', icon: Camera, variant: 'default' as const },
    { name: 'GET_DEVICE_STATUS', label: 'Get Device Status', icon: Smartphone, variant: 'default' as const },
    { name: 'WIPE_CACHE', label: 'Wipe Cache', icon: Trash2, variant: 'outline' as const },
    { name: 'REBOOT_DEVICE', label: 'Reboot Device', icon: Power, variant: 'destructive' as const },
  ];

  const LogIcon = ({ status }: { status: CommandLog['status'] }) => {
    if (status === 'success') return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (status === 'error') return <AlertTriangle className="h-4 w-4 text-destructive" />;
    return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />; // Pending
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 space-y-4">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Available Commands</CardTitle>
            <CardDescription>Select a command to execute on the target device.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {commandButtons.map(cmd => (
              <Button
                key={cmd.name}
                variant={cmd.variant}
                className="w-full justify-start text-base py-3"
                onClick={() => executeCommand(cmd.name, cmd.label)}
                disabled={executingCommands.has(cmd.name)}
              >
                {executingCommands.has(cmd.name) ? 
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : 
                  <cmd.icon className="mr-3 h-5 w-5" />
                } 
                {cmd.label}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card className="shadow-md h-full">
          <CardHeader>
            <CardTitle>Command Log</CardTitle>
            <CardDescription>Real-time log of executed commands and their status.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-26rem)] border rounded-md p-1 bg-muted/30"> {/* Adjust height as needed */}
              {logs.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">No commands executed yet.</p>
                </div>
              ) : (
                <div className="space-y-3 p-3">
                {logs.map((log) => (
                  <div key={log.id} className="p-3 rounded-md border bg-background text-sm shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <LogIcon status={log.status} />
                        <span className="font-semibold">{log.command}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                    </div>
                    <p className={`pl-6 text-xs ${log.status === 'error' ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {log.message}
                    </p>
                  </div>
                ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
