import { ENV } from '../config';
import { ProblemResponse } from './getProblem';
import { ChatRoomResponse } from './startLessonChat';

export const postCompleteProblem = async (
  lessonId: string,
  problemId: string,
  userId: string
): Promise<ProblemResponse | ChatRoomResponse> => {
  const result = await fetch(`${ENV.VITE_API_URL}/lesson/${lessonId}/proceed`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ problemId, userId }),
  });

  return result.json();
};
