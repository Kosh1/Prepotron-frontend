import { Message } from './postChatMessage';

export interface Settings {
  duration: number;
  problemsTotal: number;
  breakFrequency: number;
  fullExplanationTimeout: number;
}

export interface TaskProblem {
  id: string;
  solutionStatus: 'solved' | 'unsolved';
  attempts: number;
}

export enum PromptType {
  Teacher = 'teacher',
  Explain = 'explain',
  Escalate = 'escalate',
}

export interface ChatRoom {
  id: string;
  prompt: PromptType;
  createdAt: Date;
  updatedAt?: Date;
  messages: Message[];
}

export interface Lesson {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  user: string;
  topic: string;
  plan: Array<string>;
  settings: Settings;
  difficulty: string;
  problems: Array<TaskProblem>;
  chatRoom: ChatRoom;
}
