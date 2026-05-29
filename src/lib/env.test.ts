import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Environment configuration", () => {
  it(".env.example exists and contains required variables", () => {
    const envPath = path.join(process.cwd(), ".env.example");
    expect(fs.existsSync(envPath)).toBe(true);
    const content = fs.readFileSync(envPath, "utf-8");
    expect(content).toContain("DATABASE_URL");
    expect(content).toContain("DEEPSEEK_API_KEY");
    expect(content).toContain("DEEPSEEK_BASE_URL");
    expect(content).toContain("DEEPSEEK_MODEL");
    expect(content).toContain("NEXT_PUBLIC_DEFAULT_LOCALE");
  });

  it(".env is in .gitignore", () => {
    const gitignorePath = path.join(process.cwd(), ".gitignore");
    const content = fs.readFileSync(gitignorePath, "utf-8");
    expect(content).toContain(".env");
  });

  it("DEEPSEEK_MODEL default is defined in mentor chat", () => {
    const routePath = path.join(process.cwd(), "src/app/api/mentor/chat/route.ts");
    const content = fs.readFileSync(routePath, "utf-8");
    expect(content).toContain('DEEPSEEK_MODEL');
  });
});
