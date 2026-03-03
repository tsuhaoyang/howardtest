"use client";

import { SingletonVisualizer } from "./singleton-visualizer";
import { ObserverVisualizer } from "./observer-visualizer";

interface PatternVisualizerProps {
  slug: string;
}

const visualizers: Record<string, React.ComponentType> = {
  singleton: SingletonVisualizer,
  observer: ObserverVisualizer,
};

export function PatternVisualizer({ slug }: PatternVisualizerProps) {
  const Visualizer = visualizers[slug];

  if (!Visualizer) {
    return (
      <div className="glass rounded-xl p-6">
        <h3 className="text-sm font-semibold text-primary tracking-wider uppercase mb-4">
          Interactive Visualizer
        </h3>
        <div className="flex items-center justify-center min-h-[150px] text-muted-foreground text-sm">
          Visualizer for this pattern coming soon...
        </div>
      </div>
    );
  }

  return <Visualizer />;
}
