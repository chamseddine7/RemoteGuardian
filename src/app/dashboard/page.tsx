import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button'; //
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; //
import { Activity, PlusCircle, BotMessageSquare, ShieldCheck, ListChecks } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  description: string;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = React.memo(({ title, value, icon: Icon, description, className }) => (
  <Card className={className}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-5 w-5 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
));
MetricCard.displayName = 'MetricCard';

interface ActiveSession {
  id: string;
  name: string;
  status: string;
  lastActivity: string;
}

const ActiveSessionItem: React.FC<{session: ActiveSession}> = React.memo(({ session }) => (
  <li className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
    <div>
      <h3 className="font-semibold">{session.name} <span className="text-xs text-muted-foreground">({session.id})</span></h3>
      <p className={`text-sm ${session.status === 'Connected' ? 'text-green-600' : 'text-orange-500'}`}>
        {session.status}
      </p>
      <p className="text-xs text-muted-foreground">Last activity: {session.lastActivity}</p>
    </div>
    {/* MODIFIED LINK START */}
    <Button variant="outline" size="sm" asChild>
      <Link href={`/dashboard/sessions/${session.id}/files`}>Manage</Link>
    </Button>
    {/* MODIFIED LINK END */}
  </li>
));
ActiveSessionItem.displayName = 'ActiveSessionItem';


export default function DashboardPage() {
  const activeSessions: ActiveSession[] = [
    { id: 'mock-session-123', name: 'Living Room Cam', status: 'Connected', lastActivity: '2 mins ago' },
    { id: 'mock-session-456', name: 'Office PC', status: 'Needs Attention', lastActivity: '1 hour ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome to Remote Guardian</h1>
          <p className="text-muted-foreground">Oversee and manage your connected devices with ease.</p>
        </div>
        {/* MODIFIED LINK START */}
        <Button size="lg" asChild>
          <Link href="/dashboard/sessions/new" legacyBehavior>
            <PlusCircle className="mr-2 h-5 w-5" /> Start New Session
          </Link>
        </Button>
        {/* MODIFIED LINK END */}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Active Sessions" value={activeSessions.length.toString()} icon={Activity} description={`+${activeSessions.length > 1 ? '1' : '0'} since last week`} className="shadow-sm hover:shadow-md transition-shadow"/>
        <MetricCard title="AI Suggestions" value="5" icon={BotMessageSquare} description="New insights available" className="shadow-sm hover:shadow-md transition-shadow"/>
        <MetricCard title="Security Alerts" value="0" icon={ShieldCheck} description="All systems nominal" className="shadow-sm hover:shadow-md transition-shadow"/>
        <MetricCard title="Pending Commands" value="1" icon={ListChecks} description="Action required for Office PC" className="shadow-sm hover:shadow-md transition-shadow"/>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Active Sessions Overview</CardTitle>
          <CardDescription>Monitor and manage your currently active remote sessions.</CardDescription>
        </CardHeader>
        <CardContent>
          {activeSessions.length > 0 ? (
            <ul className="space-y-4">
              {activeSessions.map((session) => (
                <ActiveSessionItem key={session.id} session={session} />
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-center py-4">No active sessions. Start a new one to begin.</p>
          )}
        </CardContent>
      </Card>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* MODIFIED LINK START */}
          <Button variant="outline" className="w-full justify-start p-6 text-left h-auto" asChild>
            <Link href="/dashboard/sessions/new" legacyBehavior>
              <div className="flex items-center">
                <PlusCircle className="mr-3 h-6 w-6 text-primary" />
                <div>
                  <h4 className="font-semibold">Pair New Device</h4>
                  <p className="text-xs text-muted-foreground">Generate session link for a new session.</p>
                </div>
              </div>
            </Link>
          </Button>
          {/* MODIFIED LINK END */}
          {/* MODIFIED LINK START */}
          <Button variant="outline" className="w-full justify-start p-6 text-left h-auto" asChild>
            <Link href="/dashboard/ai-tools/command-suggester" legacyBehavior>
              <div className="flex items-center">
                <BotMessageSquare className="mr-3 h-6 w-6 text-primary" />
                <div>
                  <h4 className="font-semibold">AI Command Suggester</h4>
                  <p className="text-xs text-muted-foreground">Get smart maintenance suggestions.</p>
                </div>
              </div>
            </Link>
          </Button>
          {/* MODIFIED LINK END */}
          <Button variant="outline" disabled className="w-full justify-start p-6 text-left h-auto cursor-not-allowed">
            <div className="flex items-center">
              <ShieldCheck className="mr-3 h-6 w-6 text-muted-foreground" />
               <div>
                <h4 className="font-semibold">View Security Report (Soon)</h4>
                <p className="text-xs text-muted-foreground">Check for vulnerabilities.</p>
              </div>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
