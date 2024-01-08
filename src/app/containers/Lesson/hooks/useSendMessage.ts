import { useState, useCallback, Dispatch } from 'react';
import { useMutation } from 'react-query';
import { postChatMessage } from '../../../api/postChatMessage';
import { LessonStateAction } from '../reducers/LessonStateReducer';
import { MathjaxRefresh } from '../utils/mathjaxRefresh';

export const useSendMessage = (dispatch: Dispatch<LessonStateAction>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: ({
      userMessage,
      lessonId,
    }: {
      userMessage: string;
      lessonId: string;
    }) => postChatMessage(userMessage, lessonId),
    onSuccess: ({ response, problem }) => {
      setIsLoading(false);
      dispatch({ type: 'messageFinished' });
      MathjaxRefresh();
      if (problem) dispatch({ problem: problem, type: 'newProblem' });
    },
  });

  const sendMessage = useCallback(
    async (userMessage: string, lessonId?: string) => {
      setIsLoading(true);

      if (!lessonId) {
        throw new Error('Lesson ID is not defined');
      }
      mutation.mutate({ userMessage, lessonId });
    },
    [mutation]
  );

  return {
    isLoading,
    sendMessage,
  };
};
