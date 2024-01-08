import { useState, useCallback, Dispatch } from 'react';
import { useMutation } from 'react-query';
import { postCompleteProblem } from '../../../api/postCompleteProblem';
import { LessonStateAction } from '../reducers/LessonStateReducer';
import { isChatRoomResponse } from '../../../api/guards';

export const useCompleteProblem = (
  dispatch: Dispatch<LessonStateAction>,
  userId: string
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: ({
      lessonId,
      problemId,
    }: {
      lessonId: string;
      problemId: string;
    }) => postCompleteProblem(lessonId, problemId, userId),
    onSuccess: (data) => {
      setIsLoading(false);
      if (isChatRoomResponse(data)) {
        dispatch({ problem: null, type: 'newProblem' });
      }

      if (data.problem) {
        dispatch({ problem: data.problem, type: 'newProblem' });
      }
    },
  });

  const completeProblem = useCallback(
    async (lessonId?: string, problemId?: string) => {
      setIsLoading(true);

      if (!lessonId) {
        throw new Error('Lesson ID is not defined');
      }

      if (!problemId) {
        throw new Error('Problem ID is not defined');
      }
      mutation.mutate({ lessonId, problemId });
    },
    [mutation]
  );

  return {
    isLoading,
    completeProblem,
  };
};
