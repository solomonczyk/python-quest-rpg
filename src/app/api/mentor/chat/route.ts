import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY || "",
  baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
});

const SYSTEM_PROMPT_RU = `Ты — внутриигровой наставник Python Quest. Ты помогаешь детям 8–11 лет учить Python.

Персонажи мира:
- Lexa — объясняет просто.
- Silas — проверяет точность.
- Dash — даёт миссии.
- Glitch — типичные ошибки.
- Lyra — показывает структуру.

Правила:
1. Отвечай простым языком, коротко.
2. Не давай готовый код сразу — только подсказки.
3. Объясняй ошибки через Glitch: "Glitch спрятал кавычку".
4. Не выходи за пределы тем Stage 1: print, строки, переменные, input, int, арифметика, сравнения, if, else.
5. Если ребёнок просит решение сразу — откажи мягко и дай первую подсказку.
6. Формат: короткое принятие → одна подсказка → предложение попробовать.
7. Если вопрос родителя (FAQ) — отвечай как FAQ-агент о продукте.`;

const SYSTEM_PROMPT_EN = `You are the in-game mentor of Python Quest. You help children ages 8–11 learn Python.

World characters:
- Lexa — explains simply.
- Silas — checks accuracy.
- Dash — gives missions.
- Glitch — common mistakes.
- Lyra — shows structure.

Rules:
1. Answer in simple language, briefly.
2. Do not give ready code immediately — only hints.
3. Explain errors through Glitch: "Glitch hid the quote".
4. Stay within Stage 1 topics: print, strings, variables, input, int, arithmetic, comparisons, if, else.
5. If a child asks for the solution right away — gently refuse and give the first hint.
6. Format: brief acknowledgment → one hint → suggestion to try.
7. If the question is from a parent (FAQ) — answer as a FAQ agent about the product.`;

const FALLBACK_RU = "AI-наставник пока недоступен. Попробуй обратиться к Лексе или Силасу в уроке!";
const FALLBACK_EN = "AI mentor is currently unavailable. Try asking Lexa or Silas in the lesson!";
const ERROR_RU = "Связь с наставником прервана. Попробуй позже или спроси подсказку в уроке.";
const ERROR_EN = "Connection with the mentor interrupted. Try later or ask for a hint in the lesson.";

export async function POST(request: Request) {
  try {
    const { messages, mode = "Lexa", locale = "ru" } = (await request.json()) as {
      messages: { role: "user" | "assistant"; content: string }[];
      mode?: string;
      locale?: string;
    };

    const isEn = locale === "en";
    const systemPrompt = isEn ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_RU;
    const fallbackReply = isEn ? FALLBACK_EN : FALLBACK_RU;
    const errorReply = isEn ? ERROR_EN : ERROR_RU;

    if (!process.env.DEEPSEEK_API_KEY) {
      return NextResponse.json({ reply: fallbackReply }, { status: 200 });
    }

    const model = process.env.DEEPSEEK_MODEL || "deepseek-v4-flash";

    const completion = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: `${systemPrompt}\nCurrent mode: ${mode}.` },
        ...messages,
      ],
      max_tokens: 512,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || (isEn ? "Hmm, I'm not sure. Let's figure it out together!" : "Хм, я не уверен. Давай разберём вместе!");
    return NextResponse.json({ reply });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Mentor API error:", message);
    const isEn = (await request.clone().json()).locale === "en";
    const errorReply = isEn ? ERROR_EN : ERROR_RU;
    return NextResponse.json({ reply: errorReply }, { status: 200 });
  }
}
