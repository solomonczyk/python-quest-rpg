import { describe, it, expect } from "vitest";
import { en } from "./en";
import { ru } from "./ru";

function getKeys(obj: unknown, prefix = ""): string[] {
  if (obj === null || typeof obj !== "object") return [prefix];
  const keys: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === "object" && !Array.isArray(v)) {
      keys.push(...getKeys(v, path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}

describe("Dictionary completeness", () => {
  const enKeys = getKeys(en).sort();
  const ruKeys = getKeys(ru).sort();

  it("RU and EN dictionaries have identical keys", () => {
    expect(ruKeys).toEqual(enKeys);
  });
});
