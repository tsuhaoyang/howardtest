"use client";

import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UIMessage } from "ai";

interface ChatMessageProps {
  message: UIMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  const textContent = message.parts
    ?.filter((part): part is Extract<typeof part, { type: "text" }> => part.type === "text")
    .map((part) => part.text)
    .join("") ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}
    >
      <div
        className={cn(
          "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5",
          isUser
            ? "bg-primary/20 text-primary"
            : "bg-neon-purple/20 text-neon-purple"
        )}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      <div
        className={cn(
          "rounded-xl px-4 py-3 max-w-[85%] text-sm leading-relaxed",
          isUser
            ? "bg-primary/10 text-foreground"
            : "bg-secondary text-foreground"
        )}
      >
        <div className="chat-markdown whitespace-pre-wrap break-words">
          <MarkdownText text={textContent} />
        </div>
      </div>
    </motion.div>
  );
}

function MarkdownText({ text }: { text: string }) {
  const segments = text.split(/(```[\s\S]*?```|`[^`]+`|\*\*[^*]+\*\*)/g);

  return (
    <>
      {segments.map((segment, i) => {
        if (segment.startsWith("```") && segment.endsWith("```")) {
          const content = segment.slice(3, -3);
          const newlineIdx = content.indexOf("\n");
          const code = newlineIdx >= 0 ? content.slice(newlineIdx + 1) : content;
          return (
            <pre
              key={i}
              className="bg-[oklch(0.1_0.01_270)] border border-border rounded-lg p-3 my-2 overflow-x-auto text-xs font-mono"
            >
              <code>{code}</code>
            </pre>
          );
        }
        if (segment.startsWith("`") && segment.endsWith("`")) {
          return (
            <code
              key={i}
              className="bg-primary/10 text-primary px-1 py-0.5 rounded text-xs font-mono"
            >
              {segment.slice(1, -1)}
            </code>
          );
        }
        if (segment.startsWith("**") && segment.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-foreground">
              {segment.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{segment}</span>;
      })}
    </>
  );
}
