"use client";

import { motion } from "framer-motion";
import { PatternCard } from "@/components/pattern-card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, BookOpen, Cpu, Zap } from "lucide-react";
import type { PatternMeta, PatternCategory } from "@/store/pattern-store";

const categoryLabels: Record<PatternCategory, string> = {
  creational: "Creational",
  structural: "Structural",
  behavioral: "Behavioral",
};

interface DashboardProps {
  patterns: PatternMeta[];
}

export function Dashboard({ patterns }: DashboardProps) {
  const grouped = patterns.reduce<Record<string, PatternMeta[]>>(
    (acc, p) => {
      if (!acc[p.category]) acc[p.category] = [];
      acc[p.category].push(p);
      return acc;
    },
    {}
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <Badge
            variant="outline"
            className="text-[10px] tracking-widest uppercase bg-primary/5 text-primary border-primary/20"
          >
            AI-Powered Learning
          </Badge>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-3">
          Design Pattern{" "}
          <span className="text-primary text-glow-cyan">Encyclopedia</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Master the Gang of Four design patterns through interactive
          visualizations, real-world TypeScript examples, and AI-powered
          mentorship.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
      >
        <div className="glass rounded-xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-neon-cyan" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">
              {patterns.length}
            </div>
            <div className="text-xs text-muted-foreground">
              Patterns Documented
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-neon-purple/10 flex items-center justify-center">
            <Cpu className="w-5 h-5 text-neon-purple" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">
              {Object.keys(grouped).length}
            </div>
            <div className="text-xs text-muted-foreground">
              GoF Categories
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-neon-green/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-neon-green" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">
              Interactive
            </div>
            <div className="text-xs text-muted-foreground">
              Animated Visualizers
            </div>
          </div>
        </div>
      </motion.div>

      {(["creational", "structural", "behavioral"] as const).map(
        (category) =>
          grouped[category] && (
            <motion.section
              key={category}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-10"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {categoryLabels[category]}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {grouped[category].map((pattern, i) => (
                  <PatternCard key={pattern.slug} pattern={pattern} index={i} />
                ))}
              </div>
            </motion.section>
          )
      )}
    </div>
  );
}
