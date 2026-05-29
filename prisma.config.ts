
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

function getSchemaPath(): string {
  const url = env("DATABASE_URL") || "";
  if (url.startsWith("file:")) {
    return "prisma/schema.sqlite.prisma";
  }
  return "prisma/schema.prisma";
}

export default defineConfig({
  schema: getSchemaPath(),
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
