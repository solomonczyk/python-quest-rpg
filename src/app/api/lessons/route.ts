import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStage1Content } from "@/content/stage1";
import { type Locale, DEFAULT_LOCALE } from "@/i18n/config";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = (searchParams.get("locale") as Locale) || DEFAULT_LOCALE;

  const dbLessons = await prisma.lesson.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const localized = getStage1Content(locale);

  const merged = dbLessons.map((db) => {
    const loc = localized.find((l) => l.slug === db.slug);
    return {
      id: db.id,
      slug: db.slug,
      number: db.number,
      title: loc?.title ?? db.title,
      topic: loc?.topic ?? db.topic,
      stage: db.stage,
      mainCharacter: loc?.mainCharacter ?? db.mainCharacter,
      sortOrder: db.sortOrder,
    };
  });

  return NextResponse.json(merged);
}
