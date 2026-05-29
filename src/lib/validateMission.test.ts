import { describe, it, expect } from "vitest";
import { validateMission } from "./validateMission";

describe("validateMission", () => {
  it("passes when all required tokens are present", () => {
    const rule = JSON.stringify({ type: "contains", targets: ['print("'] });
    const result = validateMission('print("hello")', rule);
    expect(result.pass).toBe(true);
  });

  it("fails when a required token is missing", () => {
    const rule = JSON.stringify({ type: "contains", targets: ["print(", "input("] });
    const result = validateMission('print("hello")', rule);
    expect(result.pass).toBe(false);
    expect(result.feedback).toContain("input(");
  });

  it("passes gracefully with empty rule", () => {
    const result = validateMission("anything", "");
    expect(result.pass).toBe(true);
  });

  it("checks multiple targets correctly", () => {
    const rule = JSON.stringify({ type: "contains", targets: ["if", ":", "print("] });
    const pass = validateMission('if x > 5:\n    print("yes")', rule);
    const fail = validateMission('if x > 5\n    print("yes")', rule);
    expect(pass.pass).toBe(true);
    expect(fail.pass).toBe(false);
  });
});
