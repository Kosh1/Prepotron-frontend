import { Dispatch, useEffect, useRef } from 'react';
import { LessonStateAction } from '../reducers/LessonStateReducer';
import { SSEMessageConnection } from '../../../api/sseConnection';

export type ChatMessageEvent = {
  type: string;
  content: string;
  isInitial?: boolean;
};

export const useListenMessageStream = (
  dispatch: Dispatch<LessonStateAction>,
  userId: string
) => {
  const listener = useRef<boolean>(false);
  SSEMessageConnection.init(userId);
  const connection = SSEMessageConnection.getEventSource();

  useEffect(() => {
    if (listener.current) return;

    listener.current = true;
    connection.onmessage = ({ data }: { data: string }) => {
      const response: ChatMessageEvent = JSON.parse(data);

      if (response.type === 'new-message') {
        const eventType = response.isInitial
          ? 'addEmptyMessage'
          : 'messagePart';

        dispatch({ content: response.content, type: eventType });
      }
    };
  }, [connection, dispatch]);

  return listener.current;
};
