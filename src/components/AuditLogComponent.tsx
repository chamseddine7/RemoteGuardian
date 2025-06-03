"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileText, Terminal, Download, Trash2, UserCheck, Info } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  actor: string; // 'Controller' or 'Target Device' or 'System'
  action: string; // e.g., 'COMMAND_EXECUTED', 'FILE_DOWNLOADED', 'SESSION_STARTED'
  details: string; // More specific info, e.g., command name, file path
  status?: 'success' | 'failure' | 'info' | 'pending'; // Optional status, added pending
}

const mockLogs: LogEntry[] = [
  { id: 'log1', timestamp: new Date(Date.now() - 5 * 60000).toLocaleString(), actor: 'Controller', action: 'COMMAND_EXECUTED', details: 'Capture Screenshot', status: 'success' },
  { id: 'log2', timestamp: new Date(Date.now() - 10 * 60000).toLocaleString(), actor: 'Controller', action: 'FILE_DOWNLOADED', details: '/photos/vacation.jpg', status: 'success' },
  { id: 'log3', timestamp: new Date(Date.now() - 12 * 60000).toLocaleString(), actor: 'Target Device', action: 'STATUS_REPORTED', details: 'Battery: 70%, Storage: 50GB free', status: 'info' },
  { id: 'log4', timestamp: new Date(Date.now() - 15 * 60000).toLocaleString(), actor: 'Controller', action: 'COMMAND_EXECUTED', details: 'Reboot Device', status: 'pending' },
  { id: 'log5', timestamp: new Date(Date.now() - 20 * 60000).toLocaleString(), actor: 'System', action: 'SESSION_STARTED', details: 'Session ID: mock-session-123', status: 'info' },
  { id: 'log6', timestamp: new Date(Date.now() - 22 * 60000).toLocaleString(), actor: 'Controller', action: 'FILE_DELETED', details: '/temp/old_log.txt', status: 'success' },
  { id: 'log7', timestamp: new Date(Date.now() - 25 * 60000).toLocaleString(), actor: 'Controller', action: 'COMMAND_EXECUTED', details: 'GET_DEVICE_STATUS', status: 'failure' },
];

const ActionIcon = React.memo(({ action, status }: { action: string; status?: LogEntry['status'] }) => {
  if (action.includes('COMMAND')) return <Terminal className={`h-4 w-4 ${status === 'failure' ? 'text-destructive' : 'text-blue-500'}`} />;
  if (action.includes('FILE_DOWNLOADED')) return <Download className="h-4 w-4 text-green-500" />;
  if (action.includes('FILE_DELETED')) return <Trash2 className="h-4 w-4 text-destructive" />;
  if (action.includes('SESSION')) return <UserCheck className="h-4 w-4 text-primary" />;
  return <Info className="h-4 w-4 text-muted-foreground" />;
});
ActionIcon.displayName = 'ActionIcon';

export function AuditLogComponent() {
  const [logs, setLogs] = useState<LogEntry[]>(mockLogs);

  // TODO: In a real application, fetch logs from Firestore for the current session ID.
  // useEffect(() => {
  //   // const fetchLogs = async () => {
  //   //   // Fetch logs for sessionId from Firestore
  //   //   // setLogs(fetchedLogs);
  //   // };
  //   // fetchLogs();
  //   // Setup Firestore listener for real-time updates
  // }, [sessionId]); // Assuming sessionId is available via props or context

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl">Session Activity Log</CardTitle>
        <CardDescription>
          A detailed record of all actions and events performed during this session.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-28rem)] border rounded-md"> {/* Adjust height as needed */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Type</TableHead>
                <TableHead className="w-[180px]">Timestamp</TableHead>
                <TableHead className="w-[120px]">Actor</TableHead>
                <TableHead className="w-[200px]">Action</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="w-[100px] text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.length > 0 ? (
                logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell><ActionIcon action={log.action} status={log.status} /></TableCell>
                    <TableCell className="text-xs">{log.timestamp}</TableCell>
                    <TableCell>
                      <Badge variant={log.actor === 'Controller' ? 'secondary' : 'outline'}>
                        {log.actor}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-xs">{log.action.replace(/_/g, ' ')}</TableCell>
                    <TableCell className="text-xs">{log.details}</TableCell>
                    <TableCell className="text-right">
                      {log.status && (
                        <Badge 
                          variant={log.status === 'failure' ? 'destructive' : log.status === 'success' ? 'default' : log.status === 'pending' ? 'secondary' : 'outline'}
                          className={`${log.status === 'success' ? 'bg-green-600 text-primary-foreground hover:bg-green-600/90' : ''} ${log.status === 'pending' ? 'bg-blue-500 text-primary-foreground hover:bg-blue-500/90' : ''}`}
                        >
                          {log.status}
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    No log entries found for this session.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
        <p className="text-xs text-muted-foreground mt-2">
          Note: This is mock data. In a real application, logs would be fetched from Firestore.
        </p>
      </CardContent>
    </Card>
  );
}
