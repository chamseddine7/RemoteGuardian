"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  QrCode,
  FileArchive,
  BotMessageSquare,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Users,
  ShieldAlert,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar'; //
import { Logo } from '@/components/icons/Logo'; //
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; //
import { Button } from '@/components/ui/button'; //
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'; //
import { ScrollArea } from '@/components/ui/scroll-area'; //
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (path: string, exact = false) => {
    if (exact) return pathname === path;
    return pathname.startsWith(path);
  };

  const [isSessionsOpen, setIsSessionsOpen] = React.useState(isActive('/dashboard/sessions'));
  const [isAiToolsOpen, setIsAiToolsOpen] = React.useState(isActive('/dashboard/ai-tools'));

  return (
    <SidebarProvider defaultOpen>
      <Sidebar variant="sidebar" collapsible="icon" className="border-r">
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <ScrollArea className="flex-grow">
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                {/* MODIFIED LINK START */}
                <SidebarMenuButton isActive={isActive('/dashboard', true)} tooltip="Dashboard" asChild>
                  <Link href="/dashboard" legacyBehavior>
                    <LayoutDashboard />
                    Dashboard
                  </Link>
                </SidebarMenuButton>
                {/* MODIFIED LINK END */}
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setIsSessionsOpen(!isSessionsOpen)}
                  isActive={isActive('/dashboard/sessions')}
                  className="justify-between"
                >
                  <div className="flex items-center gap-2">
                    <FileArchive />
                    Sessions
                  </div>
                  {isSessionsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </SidebarMenuButton>
                {isSessionsOpen && (
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      {/* MODIFIED LINK START */}
                      <SidebarMenuSubButton isActive={isActive('/dashboard/sessions/new')} asChild>
                        <Link href="/dashboard/sessions/new" legacyBehavior>
                          <QrCode size={16}/> New Session (Link)
                        </Link>
                      </SidebarMenuSubButton>
                      {/* MODIFIED LINK END */}
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      {/* MODIFIED LINK START */}
                      <SidebarMenuSubButton isActive={isActive('/dashboard/sessions/mock-session-123')} asChild>
                        <Link href="/dashboard/sessions/mock-session-123/files">
                          Active Session 123
                        </Link>
                      </SidebarMenuSubButton>
                      {/* MODIFIED LINK END */}
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>

              <SidebarMenuItem>
                 <SidebarMenuButton
                  onClick={() => setIsAiToolsOpen(!isAiToolsOpen)}
                  isActive={isActive('/dashboard/ai-tools')}
                  className="justify-between"
                >
                  <div className="flex items-center gap-2">
                    <BotMessageSquare />
                    AI Tools
                  </div>
                  {isAiToolsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </SidebarMenuButton>
                {isAiToolsOpen && (
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      {/* MODIFIED LINK START */}
                      <SidebarMenuSubButton isActive={isActive('/dashboard/ai-tools/command-suggester')} asChild>
                        <Link href="/dashboard/ai-tools/command-suggester">
                          Command Suggester
                        </Link>
                      </SidebarMenuSubButton>
                      {/* MODIFIED LINK END */}
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>

              <SidebarMenuItem>
                {/* MODIFIED LINK START - For disabled/soon links, still apply the pattern if it's a Link */}
                <SidebarMenuButton tooltip="User Management (Soon)" className="cursor-not-allowed opacity-50" asChild>
                  <Link href="#" legacyBehavior>
                    <Users />
                    User Management
                  </Link>
                </SidebarMenuButton>
                {/* MODIFIED LINK END */}
              </SidebarMenuItem>
              <SidebarMenuItem>
                {/* MODIFIED LINK START */}
                <SidebarMenuButton tooltip="Security Logs (Soon)" className="cursor-not-allowed opacity-50" asChild>
                  <Link href="#" legacyBehavior>
                    <ShieldAlert />
                    Security Logs
                  </Link>
                </SidebarMenuButton>
                {/* MODIFIED LINK END */}
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarContent>
        </ScrollArea>
        <SidebarFooter>
            <SidebarMenu>
            <SidebarMenuItem>
              {/* MODIFIED LINK START */}
              <SidebarMenuButton tooltip="Settings (Soon)" className="cursor-not-allowed opacity-50" asChild>
                <Link href="#" legacyBehavior>
                  <Settings />
                  Settings
                </Link>
              </SidebarMenuButton>
              {/* MODIFIED LINK END */}
            </SidebarMenuItem>
            <SidebarMenuItem>
              {/* MODIFIED LINK START */}
              <SidebarMenuButton tooltip="Logout" asChild>
                <Link href="/login" legacyBehavior>
                  <LogOut />
                  Logout
                </Link>
              </SidebarMenuButton>
              {/* MODIFIED LINK END */}
            </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur sm:px-6">
            <div className="md:hidden">
                <SidebarTrigger />
            </div>
            <div className="flex-1">
                {/* Placeholder for breadcrumbs or page title */}
            </div>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="user avatar" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* MODIFIED LINK START - This one is wrapping DropdownMenuItem */}
              <DropdownMenuItem asChild>
                <Link href="/login">Logout</Link>
              </DropdownMenuItem>
              {/* MODIFIED LINK END */}
            </DropdownMenuContent>
           </DropdownMenu>
        </header>
        <main className="flex-1 p-4 sm:p-6 bg-muted/40">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
