"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Diamond, ArrowRight } from "lucide-react";

export function SingletonVisualizer() {
  const [requests, setRequests] = useState<number[]>([]);
  const [instanceCreated, setInstanceCreated] = useState(false);

  const addRequest = () => {
    const id = Date.now();
    if (!instanceCreated) {
      setInstanceCreated(true);
    }
    setRequests((prev) => [...prev, id]);
  };

  const reset = () => {
    setRequests([]);
    setInstanceCreated(false);
  };

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-primary tracking-wider uppercase">
          Interactive Visualizer
        </h3>
        <div className="flex gap-2">
          <Button size="sm" onClick={addRequest} className="text-xs">
            Request Instance
          </Button>
          <Button size="sm" variant="outline" onClick={reset} className="text-xs">
            Reset
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-around min-h-[200px]">
        <div className="space-y-3">
          <AnimatePresence>
            {requests.map((id, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3"
              >
                <div className="px-3 py-2 rounded-lg bg-secondary text-xs text-foreground font-mono">
                  Client {i + 1}
                </div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <ArrowRight className="w-4 h-4 text-primary" />
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
          {requests.length === 0 && (
            <p className="text-xs text-muted-foreground">
              Click &quot;Request Instance&quot; to simulate
            </p>
          )}
        </div>

        <AnimatePresence>
          {instanceCreated && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-20 h-20 rounded-xl bg-primary/20 border-2 border-primary flex items-center justify-center neon-glow-cyan">
                <Diamond className="w-8 h-8 text-primary" />
              </div>
              <span className="text-xs font-mono text-primary">
                Singleton
              </span>
              <span className="text-[10px] text-muted-foreground">
                {requests.length} reference{requests.length !== 1 ? "s" : ""} →
                same object
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
