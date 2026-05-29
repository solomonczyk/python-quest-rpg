import { describe, it, expect } from "vitest";
import { GET } from "./route";

describe("GET /api/lessons", () => {
  it("returns an array of lessons", async () => {
    const res = await GET();
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(10);
    expect(data[0]).toHaveProperty("slug");
    expect(data[0]).toHaveProperty("title");
  });
});
