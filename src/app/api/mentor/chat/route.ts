import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY || "",
  baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
});

const SYSTEM_PROMPT = `Ты — внутриигровой наставник Python Quest. Ты помогаешь детям 8–11 лет учить Python.

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

export async function POST(request: Request) {
  try {
    const { messages, mode = "Lexa" } = (await request.json()) as {
      messages: { role: "user" | "assistant"; content: string }[];
      mode?: string;
    };

    if (!process.env.DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { reply: "AI-наставник пока недоступен. Попробуй обратиться к Лексе или Силасу в уроке!" },
        { status: 200 }
      );
    }

    const model = process.env.MENTOR_MODEL || "deepseek-v4-flash";

    const completion = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: `${SYSTEM_PROMPT}\nТекущий режим: ${mode}.` },
        ...messages,
      ],
      max_tokens: 512,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || "Хм, я не уверен. Давай разберём вместе!";
    return NextResponse.json({ reply });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Mentor API error:", message);
    return NextResponse.json(
      { reply: "Связь с наставником прервана. Попробуй позже или спроси подсказку в уроке." },
      { status: 200 }
    );
  }
}
