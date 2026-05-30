
import "dotenv/config";
import { defineConfig } from "prisma/config";
import path from "path";

function getSchemaPath(): string {
  const url = process.env.DATABASE_URL || "";
  const schemaFile = url.startsWith("file:") ? "schema.sqlite.prisma" : "schema.prisma";
  return path.join(__dirname, "prisma", schemaFile);
}

const databaseUrl = process.env.DATABASE_URL || "";
const directUrl = process.env.DIRECT_URL || databaseUrl || "";

export default defineConfig({
  schema: getSchemaPath(),
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: directUrl,
  },
});
