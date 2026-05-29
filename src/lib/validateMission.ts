export interface ValidationRule {
  type: "contains";
  targets: string[];
}

export function validateMission(code: string, ruleRaw: string): { pass: boolean; feedback: string } {
  let rule: ValidationRule;
  try {
    rule = JSON.parse(ruleRaw);
  } catch {
    return { pass: true, feedback: "No validation rule defined." };
  }

  if (!rule || rule.type !== "contains" || !Array.isArray(rule.targets)) {
    return { pass: true, feedback: "No validation rule defined." };
  }

  const missing = rule.targets.filter((t) => !code.includes(t));
  if (missing.length === 0) {
    return { pass: true, feedback: "Spell cast successfully!" };
  }

  return {
    pass: false,
    feedback: `The incantation is incomplete. Missing: ${missing.join(", ")}. Check your syntax.`,
  };
}
