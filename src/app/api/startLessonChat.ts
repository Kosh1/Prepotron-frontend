import { ENV } from '../config';
import { Problem } from './getProblem';
import { Lesson } from './interfaces';
import { Message } from './postChatMessage';

export interface ChatRoomResponse {
  lesson: Lesson;
  response: Message;
  problem: Problem | null;
}

export const startLessonChat = async (
  userId: string
): Promise<ChatRoomResponse> => {
  const result = await fetch(`${ENV.VITE_API_URL}/lesson/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });

  return result.json();
};
