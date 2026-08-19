import type { LucideIcon } from "lucide-react";

export type NormalKey = "hear_about" | "user_role"

export type Role = "trainer" | "student" | "gym_owner";

export type Source =
    | "share_instagram"
    | "share_friends"
    | "other_social"
    | "share_google";

export type QsType =
    | "SINGLE"
    | "MULTIPLE"
    | "TEXT"
    | "SCALE"
    | "BOOLEAN";

export interface Option<TOptionKey extends string> {
    id: number;
    order: number;
    optionKey: TOptionKey;
    optionText: string;
    active: boolean;
    icon?: LucideIcon;
    description?: string;
}

export default interface Questions<TOptionKey extends string = string> {
    id: number;
    order: number;
    questionKey: string;
    questionText: string;
    type: QsType;
    required: boolean;
    active: boolean;
    options: Option<TOptionKey>[];
}


export interface Roles {
  id: Role;
  icon: React.ElementType;
  title: string;
  description: string;
}

export type GoalOptions = {
  id: string; icon: React.ElementType; label: string
}

export interface SourceOptions {
  id: string;
  icon: React.ElementType;
  title: string;
}

export type Community = "yes" | "later";

export interface CommunityStudentOptions {
  id: Community;
  title: string;
  description: string;
}

export interface CommunityTrainerOptions {
  id: Community;
  title: string;
  description: string;
}

export interface NormalQuestionsProps {
  step: number, questions: Questions[]
  source: Source | null, setSource: (source: Source) => void, role: Role | null, setRole: (role: Role) => void
}

export interface StudentQuestions {
  role: Role | null, step: number, goalOptions: GoalOptions[],
  goals: string[], toggleGoal: (goalId: string) => void,
  days: string[], selectedDays: string[], toggleDay: (day: string) => void,
  city: string, setCity: (city: string) => void,
  remindersOn: boolean, setRemindersOn: (on: boolean) => void,
  communityStudentOptions: CommunityStudentOptions[],
  community: Community | null, setCommunity: (communityId: string) => void
}

export interface TrainerQuestionsProps {
  step: number, role: Role | null, experienceLevels: any[],
  experience: number, setExperience: (level: number) => void,
  sessionsPerWeek: number, setSessionsPerWeek: (sessions: number) => void,
  days: string[], selectedDays: string[], toggleDay: (day: string) => void,
  city: string, setCity: (city: string) => void, studentCount: number,
  setStudentCount: (count: number) => void, communityTrainerOptions: CommunityTrainerOptions[],
  community: Community | null, setCommunity: (id: Community) => void
}