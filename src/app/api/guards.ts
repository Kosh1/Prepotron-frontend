import { ProblemResponse } from './getProblem';
import { ChatRoomResponse } from './startLessonChat';

export const isChatRoomResponse = (
  response: ChatRoomResponse | ProblemResponse
): response is ChatRoomResponse => {
  return (response as ChatRoomResponse).response !== undefined;
};
