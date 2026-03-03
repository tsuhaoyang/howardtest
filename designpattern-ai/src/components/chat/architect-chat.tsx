"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Bot,
  Loader2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "@/components/chat/chat-message";
import { usePatternStore } from "@/store/pattern-store";
import { cn } from "@/lib/utils";

const QUICK_PROMPTS = [
  "When should I use this pattern?",
  "Compare with similar patterns",
  "Show me a real-world use case",
  "What are the trade-offs?",
];

export function ArchitectChat() {
  const { chatOpen, toggleChat, activePattern } = usePatternStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState("");
  const [apiError, setApiError] = useState<string | null>(null);

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    []
  );

  const { messages, sendMessage, status, error, clearError } = useChat({
    transport,
    onError: (err) => {
      try {
        const parsed = JSON.parse(err.message);
        setApiError(parsed.error || err.message);
      } catch {
        setApiError(err.message);
      }
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (chatOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [chatOpen]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    setApiError(null);
    clearError();
    setInput("");

    await sendMessage(
      { text },
      { body: { patternContext: activePattern } }
    );
  };

  const handleQuickPrompt = async (prompt: string) => {
    if (isLoading) return;
    setApiError(null);
    clearError();
    setInput("");

    await sendMessage(
      { text: prompt },
      { body: { patternContext: activePattern } }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const displayError = apiError || (error ? error.message : null);
  const isApiKeyMissing = displayError?.includes("OPENAI_API_KEY");

  return (
    <AnimatePresence>
      {chatOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleChat}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md glass-strong border-l border-border z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-neon-purple/20 flex items-center justify-center neon-glow-purple">
                  <Bot className="w-4 h-4 text-neon-purple" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-foreground">
                    The Architect
                  </h2>
                  <p className="text-[10px] text-muted-foreground tracking-wider">
                    {activePattern
                      ? `CONTEXT: ${activePattern.toUpperCase()}`
                      : "SYSTEM DESIGN ADVISOR"}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleChat}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && !displayError && (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <div className="w-16 h-16 rounded-2xl bg-neon-purple/10 flex items-center justify-center mb-4 neon-glow-purple">
                    <Sparkles className="w-8 h-8 text-neon-purple" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Ask The Architect
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                    Ask about design patterns, system architecture, or
                    refactoring trade-offs.
                  </p>
                  <div className="grid grid-cols-1 gap-2 w-full max-w-xs">
                    {QUICK_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handleQuickPrompt(prompt)}
                        className="text-left text-xs px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {displayError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "rounded-xl p-4 border",
                    isApiKeyMissing
                      ? "bg-yellow-500/5 border-yellow-500/20"
                      : "bg-destructive/5 border-destructive/20"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle
                      className={cn(
                        "w-5 h-5 flex-shrink-0 mt-0.5",
                        isApiKeyMissing
                          ? "text-yellow-500"
                          : "text-destructive"
                      )}
                    />
                    <div>
                      <p
                        className={cn(
                          "text-sm font-medium mb-1",
                          isApiKeyMissing
                            ? "text-yellow-500"
                            : "text-destructive"
                        )}
                      >
                        {isApiKeyMissing
                          ? "API Key Required"
                          : "Connection Error"}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {isApiKeyMissing ? (
                          <>
                            To use The Architect, create a{" "}
                            <code className="bg-primary/10 text-primary px-1 rounded">
                              .env.local
                            </code>{" "}
                            file in the project root with:
                            <br />
                            <code className="bg-primary/10 text-primary px-1 rounded mt-1 inline-block">
                              OPENAI_API_KEY=sk-...
                            </code>
                            <br />
                            <span className="mt-1 inline-block">
                              Then restart the dev server.
                            </span>
                          </>
                        ) : (
                          displayError
                        )}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Loader2 className="w-4 h-4 animate-spin text-neon-purple" />
                  <span className="text-xs">The Architect is thinking...</span>
                </motion.div>
              )}
            </div>

            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about design patterns..."
                  rows={1}
                  className="flex-1 bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Button
                  type="button"
                  size="icon"
                  disabled={isLoading || !input.trim()}
                  onClick={handleSend}
                  className="rounded-xl bg-neon-purple hover:bg-neon-purple/80 text-white flex-shrink-0 self-end"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-2">
                Powered by OpenAI GPT-4o-mini
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
