import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getLessonContent } from "@/content/stage1";
import { type Locale, DEFAULT_LOCALE } from "@/i18n/config";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { searchParams } = new URL(request.url);
  const locale = (searchParams.get("locale") as Locale) || DEFAULT_LOCALE;

  const lesson = await prisma.lesson.findUnique({ where: { slug } });
  if (!lesson) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  const localized = getLessonContent(locale, slug);

  const merged = {
    ...lesson,
    title: localized?.title ?? lesson.title,
    topic: localized?.topic ?? lesson.topic,
    mainCharacter: localized?.mainCharacter ?? lesson.mainCharacter,
    dialogue: localized?.dialogue ? JSON.stringify(localized.dialogue) : lesson.dialogue,
    explanation: localized?.explanation ?? lesson.explanation,
    codeExample: localized?.codeExample ?? lesson.codeExample,
    analogyDialogue: localized?.analogyDialogue ? JSON.stringify(localized.analogyDialogue) : undefined,
    childTakeaway: localized?.childTakeaway ?? undefined,
    analogyQuest: localized?.analogyQuest ?? undefined,
    glitchTrap: localized?.glitchTrap ? JSON.stringify(localized.glitchTrap) : lesson.glitchTrap,
    mission: localized?.mission ?? lesson.mission,
    quiz: localized?.quiz ? JSON.stringify(localized.quiz) : lesson.quiz,
    rewardAbility: localized?.rewardAbility ?? lesson.rewardAbility,
  };

  return NextResponse.json(merged);
}
