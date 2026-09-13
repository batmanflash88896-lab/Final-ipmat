"use client";

import {
  CalendarClock,
  GraduationCap,
  Dumbbell,
  Timer,
  Flame,
  MessagesSquare,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Target,
  BookOpen,
  Brain,
  Type,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  CalendarClock,
  GraduationCap,
  Dumbbell,
  Timer,
  Flame,
  MessagesSquare,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Target,
  BookOpen,
  Brain,
  Type,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = MAP[name] ?? Sparkles;
  return <Cmp className={className} strokeWidth={1.6} />;
}
