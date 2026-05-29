import { describe, it, expect } from "vitest";
import { getStage1Content } from "./index";

describe("Stage 1 content", () => {
  it("has 10 lessons in Russian", () => {
    const content = getStage1Content("ru");
    expect(content.length).toBe(10);
    expect(content[0].slug).toBe("print");
    expect(content[9].slug).toBe("final-quest");
  });

  it("has 10 lessons in English", () => {
    const content = getStage1Content("en");
    expect(content.length).toBe(10);
    expect(content[0].slug).toBe("print");
    expect(content[9].slug).toBe("final-quest");
  });

  it("has same slugs in both languages", () => {
    const ru = getStage1Content("ru").map((l) => l.slug);
    const en = getStage1Content("en").map((l) => l.slug);
    expect(ru).toEqual(en);
  });

  it("titles differ between languages", () => {
    const ru = getStage1Content("ru");
    const en = getStage1Content("en");
    expect(ru[0].title).not.toBe(en[0].title);
  });
});
