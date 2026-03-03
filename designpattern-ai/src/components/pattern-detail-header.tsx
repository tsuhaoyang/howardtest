"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { PatternMeta } from "@/store/pattern-store";

const categoryColors: Record<string, string> = {
  creational: "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20",
  structural: "bg-neon-purple/10 text-neon-purple border-neon-purple/20",
  behavioral: "bg-neon-pink/10 text-neon-pink border-neon-pink/20",
};

interface PatternDetailHeaderProps {
  meta: PatternMeta;
}

export function PatternDetailHeader({ meta }: PatternDetailHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Link href="/">
        <Button variant="ghost" size="sm" className="mb-6 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </Link>

      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Badge
              variant="outline"
              className={cn(
                "text-[10px] uppercase tracking-wider",
                categoryColors[meta.category]
              )}
            >
              {meta.category}
            </Badge>
            <div className="flex items-center gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    i < meta.complexity ? "bg-primary" : "bg-muted"
                  )}
                />
              ))}
              <span className="text-[10px] text-muted-foreground ml-1">
                Complexity
              </span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {meta.title}{" "}
            <span className="text-primary text-glow-cyan">Pattern</span>
          </h1>
          <p className="text-muted-foreground">{meta.description}</p>
        </div>
      </div>
    </motion.div>
  );
}
