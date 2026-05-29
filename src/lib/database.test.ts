import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Database configuration", () => {
  it("prisma/schema.prisma uses postgresql provider", () => {
    const schemaPath = path.join(process.cwd(), "prisma/schema.prisma");
    const content = fs.readFileSync(schemaPath, "utf-8");
    expect(content).toContain('provider = "postgresql"');
  });

  it("prisma/schema.sqlite.prisma exists and uses sqlite provider", () => {
    const schemaPath = path.join(process.cwd(), "prisma/schema.sqlite.prisma");
    expect(fs.existsSync(schemaPath)).toBe(true);
    const content = fs.readFileSync(schemaPath, "utf-8");
    expect(content).toContain('provider = "sqlite"');
  });

  it("prisma.config.ts auto-detects database provider", () => {
    const configPath = path.join(process.cwd(), "prisma.config.ts");
    const content = fs.readFileSync(configPath, "utf-8");
    expect(content).toContain("file:");
    expect(content).toContain("schema.sqlite.prisma");
    expect(content).toContain("schema.prisma");
  });

  it("package.json includes db deploy script", () => {
    const pkgPath = path.join(process.cwd(), "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    expect(pkg.scripts["db:deploy"]).toBe("prisma migrate deploy");
    expect(pkg.scripts["db:seed"]).toBeTruthy();
  });
});
