"use client";

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Terminal, Activity, Shield, History } from 'lucide-react'; 

export default function SessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();
  const sessionId = params.sessionId as string;

  const getActiveTab = () => {
    if (pathname.includes('/files')) return 'files';
    if (pathname.includes('/commands')) return 'commands';
    if (pathname.includes('/monitor')) return 'monitor';
    if (pathname.includes('/audit')) return 'audit'; 
    return 'files'; // Default tab
  };

  return (
    <div className="space-y-6">
       <Card className="shadow-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">Session Management</CardTitle>
              <CardDescription>
                Managing session: <span className="font-mono text-primary">{sessionId}</span>
              </CardDescription>
            </div>
            <div className="flex items-center text-sm text-green-600">
              <Shield className="mr-2 h-5 w-5"/> Secure Connection
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={getActiveTab()} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <Link href={`/dashboard/sessions/${sessionId}/files`} passHref legacyBehavior>
                <TabsTrigger value="files" className="text-base py-3" asChild>
                  <a><FileText className="mr-2 h-5 w-5"/> File Browser</a>
                </TabsTrigger>
              </Link>
              <Link href={`/dashboard/sessions/${sessionId}/commands`} passHref legacyBehavior>
                <TabsTrigger value="commands" className="text-base py-3" asChild>
                  <a><Terminal className="mr-2 h-5 w-5"/> Remote Commands</a>
                </TabsTrigger>
              </Link>
              <Link href={`/dashboard/sessions/${sessionId}/monitor`} passHref legacyBehavior>
                <TabsTrigger value="monitor" className="text-base py-3" asChild>
                  <a><Activity className="mr-2 h-5 w-5"/> Device Monitor</a>
                </TabsTrigger>
              </Link>
              <Link href={`/dashboard/sessions/${sessionId}/audit`} passHref legacyBehavior>
                <TabsTrigger value="audit" className="text-base py-3" asChild>
                  <a><History className="mr-2 h-5 w-5"/> Audit Log</a>
                </TabsTrigger>
              </Link>
            </TabsList>
            {children}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
