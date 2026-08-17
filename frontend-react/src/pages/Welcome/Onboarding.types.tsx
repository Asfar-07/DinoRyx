export type Role = "trainer" | "student" | "gym_owner";

export interface Roles {
    id: Role;
      icon: React.ElementType;
      title: string;
      description: string;
}

export type GoalOptions = {
  id: string; icon: React.ElementType; label: string 
}

export type Source = "google" | "friends" | "instagram" | "other_social";

export interface SourceOptions {
  id: Source;
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
    step: number, sourceOptions: SourceOptions[],
    source: Source | null, setSource: (source: Source) => void,
    roles: Roles[], role: Role | null, setRole: (role: Role) => void
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