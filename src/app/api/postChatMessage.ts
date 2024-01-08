import { ENV } from '../config';
import { USER_ID_TMP } from '../containers/Lesson/Lesson';
import { Problem } from './getProblem';
import { ChatRoomResponse } from './startLessonChat';

export enum ChatRole {
  assistant = 'assistant',
  user = 'user',
}

export type Message = {
  role: ChatRole;
  content: string;
  problem?: Problem | null;
};

export const postChatMessage = async (
  message: string,
  chatId: string
): Promise<ChatRoomResponse> => {
  const result = await fetch(`${ENV.VITE_API_URL}/lesson/${chatId}/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId: USER_ID_TMP, message }),
  });

  return result.json();
};
