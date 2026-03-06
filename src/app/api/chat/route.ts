import { NextRequest, NextResponse } from "next/server";
import { CHAT_SYSTEM_PROMPT } from "@/lib/chat-system-prompt";
import { rateLimit } from "@/lib/rate-limit";
import { validateOrigin, getClientIp } from "@/lib/api-guard";

export async function POST(request: NextRequest) {
  const originError = validateOrigin(request);
  if (originError) return originError;

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "AI not configured" },
      { status: 503 }
    );
  }

  // IP-based rate limiting: 15 requests per minute
  const ip = getClientIp(request);
  const { success } = rateLimit(`chat:${ip}`, { max: 15, windowMs: 60_000 });
  if (!success) {
    return NextResponse.json(
      { error: "Rate limit exceeded", rateLimited: true },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { messages, sessionId } = body as {
      messages: { role: string; content: string }[];
      sessionId: string;
    };

    if (!messages || !Array.isArray(messages) || !sessionId) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    // Validate individual messages
    const ALLOWED_ROLES = new Set(["user", "assistant"]);
    const MAX_MESSAGE_LENGTH = 1000;
    for (const msg of messages) {
      if (
        typeof msg.role !== "string" ||
        typeof msg.content !== "string" ||
        !ALLOWED_ROLES.has(msg.role) ||
        msg.content.length > MAX_MESSAGE_LENGTH
      ) {
        return NextResponse.json(
          { error: "Invalid message format" },
          { status: 400 }
        );
      }
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: CHAT_SYSTEM_PROMPT },
          ...messages.slice(-10), // Keep last 10 messages for context
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("OpenAI API error:", response.status, errorData);
      return NextResponse.json(
        { error: "AI service error" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
