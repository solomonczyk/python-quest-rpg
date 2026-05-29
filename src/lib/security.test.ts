import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

function getAllFiles(dir: string, extensions: string[]): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "node_modules" && entry.name !== ".next") {
      files = files.concat(getAllFiles(full, extensions));
    } else if (entry.isFile() && extensions.some((ext) => entry.name.endsWith(ext))) {
      files.push(full);
    }
  }
  return files;
}

describe("No unsafe server-side Python execution", () => {
  const forbidden = ["child_process", "spawn(", "exec(", "execSync(", "eval("];
  const srcFiles = getAllFiles(path.join(__dirname, ".."), [".ts", ".tsx"]);

  it("has no forbidden patterns in src/", () => {
    const found: string[] = [];
    for (const file of srcFiles) {
      if (file.endsWith(".test.ts") || file.endsWith(".test.tsx")) continue;
      const content = fs.readFileSync(file, "utf-8");
      for (const pattern of forbidden) {
        if (content.includes(pattern)) {
          found.push(`${file}: contains ${pattern}`);
        }
      }
    }
    expect(found).toEqual([]);
  });
});
