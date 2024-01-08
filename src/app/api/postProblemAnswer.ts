import { ENV } from '../config';
import { USER_ID_TMP } from '../containers/Lesson/Lesson';
import { Message } from './postChatMessage';

export type AnswerCheckResponse = {
  isCorrect: boolean;
  response?: Message;
};

export const postProblemAnswer = async (
  problemId: string,
  lessonId: string,
  answer: string,
  shouldExplain?: boolean
): Promise<AnswerCheckResponse> => {
  const result = await fetch(
    `${ENV.VITE_API_URL}/lesson/${lessonId}/problem/${problemId}/check`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answer, shouldExplain, userId: USER_ID_TMP }),
    }
  );

  return result.json();
};
