import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { SYSTEM_PROMPT, buildContextPrompt } from "@/lib/ai-prompts";

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      {
        error:
          "OPENAI_API_KEY is not configured. Please add it to your .env.local file.",
      },
      { status: 500 }
    );
  }

  const { messages, patternContext } = await req.json();

  const systemMessage =
    SYSTEM_PROMPT + buildContextPrompt(patternContext ?? null);

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: systemMessage,
    messages,
  });

  return result.toUIMessageStreamResponse();
}
