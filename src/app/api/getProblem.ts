import { ENV } from '../config';

export type Problem = {
  id: string;
  description: string;
  extra: ProblemExtra;
  solution: Solution;
};

export type ChartExtra = { type: 'chart'; points: Array<[number, number]> };
export type FigureExtra = { type: 'figure'; code: string };
export type ProblemExtra = ChartExtra | FigureExtra | null;

export type ProblemResponse = {
  problem: Problem;
};

export type Solution = {
  options: Array<AnswerOption>;
};

export type AnswerOption = {
  id: string;
  description: string;
  extra: ProblemExtra;
};

export type CheckAnswerRequest = {
  shouldExplain: boolean;
  answer: string;
};

export const getProblem = async (): Promise<Problem> => {
  const result = await fetch(`${ENV.VITE_API_URL}/lesson/problem`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!result.ok) {
    throw new Error('Error fetching problem');
  }

  return result.json();
};
