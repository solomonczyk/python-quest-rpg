import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const playerId = Number(searchParams.get("playerId"));
  if (!playerId) {
    return NextResponse.json({ error: "playerId required" }, { status: 400 });
  }
  const progress = await prisma.progress.findMany({
    where: { playerId },
    include: { player: true },
  });
  return NextResponse.json(progress);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { playerId, lessonId, status, missionResult, quizResult, unlockedReward } = body;

  if (!playerId || !lessonId) {
    return NextResponse.json({ error: "playerId and lessonId required" }, { status: 400 });
  }

  const progress = await prisma.progress.upsert({
    where: {
      id: body.id || 0,
    },
    update: {
      status: status || undefined,
      missionResult: missionResult !== undefined ? missionResult : undefined,
      quizResult: quizResult !== undefined ? quizResult : undefined,
      unlockedReward: unlockedReward !== undefined ? unlockedReward : undefined,
      completedAt: status === "completed" ? new Date() : undefined,
      attempts: { increment: 1 },
    },
    create: {
      playerId,
      lessonId,
      status: status || "available",
      missionResult,
      quizResult,
      unlockedReward: unlockedReward || false,
      attempts: 1,
    },
  });

  return NextResponse.json(progress);
}
