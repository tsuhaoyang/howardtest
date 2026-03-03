"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Diamond,
  Eye,
  Factory,
  Cable,
  Route,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

const categoryStyles: Record<string, { border: string; glow: string; badge: string }> = {
  creational: {
    border: "hover:border-neon-cyan/40",
    glow: "hover:neon-glow-cyan",
    badge: "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20",
  },
  structural: {
    border: "hover:border-neon-purple/40",
    glow: "hover:neon-glow-purple",
    badge: "bg-neon-purple/10 text-neon-purple border-neon-purple/20",
  },
  behavioral: {
    border: "hover:border-neon-pink/40",
    glow: "",
    badge: "bg-neon-pink/10 text-neon-pink border-neon-pink/20",
  },
};

interface PatternCardProps {
  pattern: PatternMeta;
  index: number;
}

export function PatternCard({ pattern, index }: PatternCardProps) {
  const Icon = iconMap[pattern.icon] || Diamond;
  const styles = categoryStyles[pattern.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link href={`/patterns/${pattern.slug}`}>
        <div
          className={cn(
            "glass rounded-xl p-6 transition-all duration-300 cursor-pointer group",
            styles.border,
            styles.glow
          )}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <Badge
              variant="outline"
              className={cn("text-[10px] uppercase tracking-wider", styles.badge)}
            >
              {pattern.category}
            </Badge>
          </div>

          <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {pattern.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {pattern.description}
          </p>

          <div className="mt-4 flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full",
                  i < pattern.complexity
                    ? "bg-primary"
                    : "bg-muted"
                )}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-2">
              Complexity
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
