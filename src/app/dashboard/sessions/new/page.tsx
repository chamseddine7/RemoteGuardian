"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Copy, Check, LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function NewSessionPage() {
  const [sessionId, setSessionId] = useState('');
  const [sessionLink, setSessionLink] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const newId = crypto.randomUUID();
    setSessionId(newId);
    // Simulate Firebase Dynamic Link structure (replace with actual Firebase SDK call in a real app)
    // Example: https://yourproject.page.link/?link=https://your-app-domain.com/join?sessionId=NEW_ID_HERE&apn=com.example.targetapp
    // For placeholder, we'll just use a direct link concept
    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://remote-guardian.app';
    setSessionLink(`${currentOrigin}/join-session?sessionId=${newId}`);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(sessionLink)
      .then(() => {
        setCopied(true);
        toast({ title: "Session Link Copied!", description: "The session link has been copied to your clipboard." });
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        toast({ variant: "destructive", title: "Copy Failed", description: "Could not copy session link." });
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Start a New Secure Session</CardTitle>
          <CardDescription>
            Share the secure session link with the target device to establish a connection.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {sessionId && sessionLink ? (
            <>
              <div className="flex flex-col items-center space-y-4 p-6 bg-muted rounded-lg">
                <LinkIcon className="h-12 w-12 text-primary" />
                <p className="text-sm text-center text-muted-foreground">
                  Share this link with the target device. The link contains the secure session ID.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sessionLink">Secure Session Link:</Label>
                <div className="flex items-center space-x-2">
                  <Input id="sessionLink" type="text" value={sessionLink} readOnly className="font-mono text-sm flex-grow"/>
                  <Button variant="outline" size="icon" onClick={handleCopy} aria-label="Copy Session Link">
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  This link should be opened on the target device with the Remote Guardian app installed.
                </p>
              </div>

              <div className="text-sm text-muted-foreground p-4 border border-dashed rounded-md">
                <h4 className="font-semibold mb-1">Instructions for Target Device:</h4>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Ensure the Remote Guardian Target App is installed.</li>
                  <li>Open the shared link on the target device.</li>
                  <li>The Remote Guardian app should automatically detect the session ID from the link.</li>
                  <li>Approve the connection request in the app.</li>
                </ol>
                <p className="mt-2 text-xs">
                  Note: In a production environment, Firebase Dynamic Links would be used to ensure the link opens directly in the app. Session links can be configured to expire for enhanced security.
                </p>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">Generating session details...</p>
            </div>
          )}
        </CardContent>
        {sessionId && (
          <CardContent>
            <Link href={`/dashboard/sessions/${sessionId}/files`} passHref legacyBehavior>
              <Button className="w-full text-lg py-3">
                Proceed to Session Management
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
