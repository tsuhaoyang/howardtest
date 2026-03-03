"use client";

import { Sidebar } from "@/components/sidebar";
import { ArchitectChat } from "@/components/chat/architect-chat";
import { usePatternStore } from "@/store/pattern-store";
import { PanelLeftClose, PanelLeft, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PatternMeta } from "@/store/pattern-store";

interface AppShellProps {
  patterns: PatternMeta[];
  children: React.ReactNode;
}

export function AppShell({ patterns, children }: AppShellProps) {
  const { sidebarOpen, chatOpen, toggleSidebar, toggleChat } =
    usePatternStore();

  return (
    <div className="flex h-screen overflow-hidden bg-background grid-bg">
      <Sidebar patterns={patterns} isOpen={sidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="glass-strong border-b border-border px-4 py-3 flex items-center justify-between flex-shrink-0 z-10">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="text-muted-foreground hover:text-primary"
            >
              {sidebarOpen ? (
                <PanelLeftClose className="w-5 h-5" />
              ) : (
                <PanelLeft className="w-5 h-5" />
              )}
            </Button>
            <span className="text-xs text-muted-foreground tracking-wider">
              DESIGN PATTERNS ENCYCLOPEDIA
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleChat}
              className={cn(
                "transition-colors",
                chatOpen
                  ? "text-neon-purple"
                  : "text-muted-foreground hover:text-neon-purple"
              )}
              title="Ask The Architect"
            >
              <MessageSquare className="w-5 h-5" />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      <ArchitectChat />
    </div>
  );
}
