"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Diamond,
  Eye,
  Factory,
  Cable,
  Route,
  Layers,
  ChevronRight,
  Home,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { PatternMeta } from "@/store/pattern-store";

const iconMap: Record<string, LucideIcon> = {
  diamond: Diamond,
  eye: Eye,
  factory: Factory,
  cable: Cable,
  route: Route,
  layers: Layers,
};

const categoryLabels: Record<string, string> = {
  creational: "Creational",
  structural: "Structural",
  behavioral: "Behavioral",
};

const categoryColors: Record<string, string> = {
  creational: "text-neon-cyan",
  structural: "text-neon-purple",
  behavioral: "text-neon-pink",
};

interface SidebarProps {
  patterns: PatternMeta[];
  isOpen: boolean;
}

export function Sidebar({ patterns, isOpen }: SidebarProps) {
  const pathname = usePathname();

  const grouped = patterns.reduce<Record<string, PatternMeta[]>>(
    (acc, pattern) => {
      const cat = pattern.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(pattern);
      return acc;
    },
    {}
  );

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 280, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="glass-strong h-full overflow-hidden flex-shrink-0"
        >
          <div className="flex flex-col h-full w-[280px]">
            <div className="p-6 border-b border-border">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center neon-glow-cyan">
                  <Diamond className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h1 className="text-sm font-bold tracking-wider text-primary text-glow-cyan">
                    DesignPattern
                    <span className="text-muted-foreground">.ai</span>
                  </h1>
                  <p className="text-[10px] text-muted-foreground tracking-widest uppercase">
                    Pattern Encyclopedia
                  </p>
                </div>
              </Link>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-6">
              <Link
                href="/"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                  pathname === "/"
                    ? "bg-primary/10 text-primary neon-glow-cyan"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <Home className="w-4 h-4" />
                Dashboard
              </Link>

              {(["creational", "structural", "behavioral"] as const).map(
                (category) =>
                  grouped[category] && (
                    <div key={category}>
                      <h3
                        className={cn(
                          "text-xs font-semibold tracking-widest uppercase mb-3 px-3",
                          categoryColors[category]
                        )}
                      >
                        {categoryLabels[category]}
                      </h3>
                      <ul className="space-y-1">
                        {grouped[category].map((pattern) => {
                          const Icon = iconMap[pattern.icon] || Diamond;
                          const isActive =
                            pathname === `/patterns/${pattern.slug}`;
                          return (
                            <li key={pattern.slug}>
                              <Link
                                href={`/patterns/${pattern.slug}`}
                                className={cn(
                                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all group",
                                  isActive
                                    ? "bg-primary/10 text-primary neon-glow-cyan"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                )}
                              >
                                <Icon className="w-4 h-4 flex-shrink-0" />
                                <span className="flex-1">{pattern.title}</span>
                                <ChevronRight
                                  className={cn(
                                    "w-3 h-3 transition-transform",
                                    isActive
                                      ? "opacity-100"
                                      : "opacity-0 group-hover:opacity-50"
                                  )}
                                />
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )
              )}
            </nav>

            <div className="p-4 border-t border-border">
              <div className="text-[10px] text-muted-foreground text-center tracking-wider">
                {patterns.length} PATTERNS LOADED
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
