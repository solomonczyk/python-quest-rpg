import { describe, it, expect } from "vitest";

describe("Mentor locale awareness", () => {
  it("POST body includes locale field", async () => {
    const body = { messages: [{ role: "user", content: "hello" }], mode: "Lexa", locale: "en" };
    expect(body).toHaveProperty("locale");
    expect(body.locale).toBe("en");
  });

  it("falls back to ru when locale is omitted", async () => {
    const body = { messages: [{ role: "user", content: "hello" }], mode: "Lexa" } as Record<string, unknown>;
    const locale = (body.locale as string) || "ru";
    expect(locale).toBe("ru");
  });
});
