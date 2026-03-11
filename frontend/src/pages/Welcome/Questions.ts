export interface Question {
  id: number
  title: string
  options: string[]
  optional?: boolean
}

export const questions:Question[] = [
  {
    id: 1,
    title: "Where did you hear about our website?",
    options: ["Google", "YouTube", "Friend", "Social Media"],
    optional: false,
  },
  {
    id: 2,
    title: "What is your experience level?",
    options: ["Beginner", "Intermediate", "Advanced"],
    optional: false,
  },
  {
    id: 3,
    title: "What topics are you interested in?",
    options: ["Frontend", "Backend", "DevOps", "AI"],
    optional: true,
  },
];