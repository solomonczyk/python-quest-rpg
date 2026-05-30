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

  it("has analogyDialogue in all Russian lessons", () => {
    const content = getStage1Content("ru");
    for (const lesson of content) {
      expect(lesson.analogyDialogue, `Missing analogyDialogue in ${lesson.slug}`).toBeDefined();
      expect(lesson.analogyDialogue.length).toBeGreaterThan(0);
    }
  });

  it("has childTakeaway in all Russian lessons", () => {
    const content = getStage1Content("ru");
    for (const lesson of content) {
      expect(lesson.childTakeaway, `Missing childTakeaway in ${lesson.slug}`).toBeDefined();
      expect(lesson.childTakeaway.length).toBeGreaterThan(0);
    }
  });

  it("has analogyQuest in all Russian lessons", () => {
    const content = getStage1Content("ru");
    for (const lesson of content) {
      expect(lesson.analogyQuest, `Missing analogyQuest in ${lesson.slug}`).toBeDefined();
      expect(lesson.analogyQuest.length).toBeGreaterThan(0);
    }
  });

  it("has glitchTrap.analogy in all Russian lessons", () => {
    const content = getStage1Content("ru");
    for (const lesson of content) {
      expect(lesson.glitchTrap.analogy, `Missing glitchTrap.analogy in ${lesson.slug}`).toBeDefined();
      expect(lesson.glitchTrap.analogy.length).toBeGreaterThan(0);
    }
  });

  it("has analogyDialogue in all English lessons", () => {
    const content = getStage1Content("en");
    for (const lesson of content) {
      expect(lesson.analogyDialogue, `Missing analogyDialogue in ${lesson.slug}`).toBeDefined();
      expect(lesson.analogyDialogue.length).toBeGreaterThan(0);
    }
  });

  it("has childTakeaway in all English lessons", () => {
    const content = getStage1Content("en");
    for (const lesson of content) {
      expect(lesson.childTakeaway, `Missing childTakeaway in ${lesson.slug}`).toBeDefined();
      expect(lesson.childTakeaway.length).toBeGreaterThan(0);
    }
  });

  it("has analogyQuest in all English lessons", () => {
    const content = getStage1Content("en");
    for (const lesson of content) {
      expect(lesson.analogyQuest, `Missing analogyQuest in ${lesson.slug}`).toBeDefined();
      expect(lesson.analogyQuest.length).toBeGreaterThan(0);
    }
  });

  it("has glitchTrap.analogy in all English lessons", () => {
    const content = getStage1Content("en");
    for (const lesson of content) {
      expect(lesson.glitchTrap.analogy, `Missing glitchTrap.analogy in ${lesson.slug}`).toBeDefined();
      expect(lesson.glitchTrap.analogy.length).toBeGreaterThan(0);
    }
  });
});
