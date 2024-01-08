import { Problem } from '../../../../app/api/getProblem';
import { ChatRole, Message } from '../../../../app/api/postChatMessage';
import { parseContent } from '../utils/parseContent';

export type LessonStateAction =
  | { type: 'addEmptyMessage'; content: string }
  | { type: 'messagePart'; content: string }
  | { type: 'newMessage'; message: Message }
  | { type: 'newProblem'; problem: Problem | null }
  | { type: 'canRequestHint'; canRequestHint: boolean }
  | { type: 'messageFinished' };
export interface LessonState {
  messages: Array<Message>;
  problem: Problem | null;
  canRequestHint: boolean;
}

export function lessonStateReducer(
  state: LessonState,
  action: LessonStateAction
): LessonState {
  if (action.type === 'addEmptyMessage') {
    const emptyMessage: Message = { content: '', role: ChatRole.assistant };

    return {
      ...state,
      messages: [...state.messages, emptyMessage],
    };
  }
  if (action.type === 'messagePart') {
    const lastMessage = state.messages[state.messages.length - 1];
    const updatedLastMessage = {
      ...lastMessage,
      content: lastMessage.content + action.content,
    };

    const updatedMessages = [
      ...state.messages.slice(0, -1),
      updatedLastMessage,
    ];

    return {
      ...state,
      messages: updatedMessages,
    };
  }
  if (action.type === 'newMessage') {
    return {
      ...state,
      messages: [...state.messages, action.message],
    };
  }
  if (action.type === 'newProblem') {
    return {
      ...state,
      problem: action.problem,
    };
  }

  if (action.type === 'canRequestHint') {
    return {
      ...state,
      canRequestHint: action.canRequestHint,
    };
  }

  if (action.type === 'messageFinished') {
    const lastMessage = state.messages[state.messages.length - 1];
    const updatedLastMessage = {
      ...lastMessage,
      content: parseContent(lastMessage.content),
    };

    const updatedMessages = [
      ...state.messages.slice(0, -1),
      updatedLastMessage,
    ];

    return {
      ...state,
      messages: updatedMessages,
    };
  }

  return state;
}
