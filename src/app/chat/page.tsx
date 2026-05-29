import MentorChatPanel from "@/components/MentorChatPanel";

export default function ChatPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-5 md:px-16 py-12">
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-headline)] text-primary text-3xl font-bold mb-2">
          AI Mentor
        </h1>
        <p className="text-on-surface-variant">
          Ask for hints, explanations, or help with your current lesson. The mentor will guide you step by step.
        </p>
      </div>
      <div className="max-w-3xl">
        <MentorChatPanel />
      </div>
    </div>
  );
}
