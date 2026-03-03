"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Eye, Radio } from "lucide-react";

interface ObserverNode {
  id: number;
  name: string;
  notified: boolean;
}

export function ObserverVisualizer() {
  const [observers, setObservers] = useState<ObserverNode[]>([
    { id: 1, name: "Display A", notified: false },
    { id: 2, name: "Display B", notified: false },
    { id: 3, name: "Logger", notified: false },
  ]);
  const [isPulsing, setIsPulsing] = useState(false);

  const notify = () => {
    setIsPulsing(true);
    setObservers((prev) => prev.map((o) => ({ ...o, notified: false })));

    observers.forEach((_, i) => {
      setTimeout(() => {
        setObservers((prev) =>
          prev.map((o, j) => (j === i ? { ...o, notified: true } : o))
        );
      }, 300 * (i + 1));
    });

    setTimeout(() => setIsPulsing(false), 300 * (observers.length + 1));
  };

  const addObserver = () => {
    setObservers((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: `Observer ${prev.length + 1}`,
        notified: false,
      },
    ]);
  };

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-primary tracking-wider uppercase">
          Interactive Visualizer
        </h3>
        <div className="flex gap-2">
          <Button size="sm" onClick={notify} className="text-xs">
            Emit Event
          </Button>
          <Button size="sm" variant="outline" onClick={addObserver} className="text-xs">
            Add Observer
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-around min-h-[200px]">
        <motion.div
          animate={isPulsing ? { scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: isPulsing ? Infinity : 0, duration: 0.6 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-20 h-20 rounded-full bg-neon-purple/20 border-2 border-neon-purple flex items-center justify-center neon-glow-purple">
            <Radio className="w-8 h-8 text-neon-purple" />
          </div>
          <span className="text-xs font-mono text-neon-purple">Subject</span>
        </motion.div>

        <div className="space-y-3">
          <AnimatePresence>
            {observers.map((obs) => (
              <motion.div
                key={obs.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  animate={
                    obs.notified
                      ? { backgroundColor: "oklch(0.85 0.18 192 / 20%)" }
                      : {}
                  }
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary text-xs font-mono transition-colors"
                >
                  <Eye
                    className={`w-3 h-3 ${obs.notified ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <span
                    className={
                      obs.notified ? "text-primary" : "text-foreground"
                    }
                  >
                    {obs.name}
                  </span>
                  {obs.notified && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-[10px] text-neon-green ml-1"
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
