import { useState, Dispatch } from 'react';
import { useMutation } from 'react-query';
import { useDebouncedCallback } from '../../../hooks/useDebounce';
import { CheckAnswerRequest } from '../../../api/getProblem';
import { postProblemAnswer } from '../../../api/postProblemAnswer';
import { LessonStateAction } from '../../Lesson/reducers/LessonStateReducer';

export const useCheckAnswer = ({
  problemId,
  lessonId,
  onCorrectAnswer,
  onWrongAnswer,
  canRequestHint,
  changeCanRequestHint,
}: {
  problemId: string;
  lessonId: string;
  onCorrectAnswer: VoidFunction;
  onWrongAnswer: Dispatch<LessonStateAction>;
  canRequestHint: boolean;
  changeCanRequestHint: (value: boolean) => void;
}) => {
  const [isWrongAnswer, setIsWrongAnswer] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: ({ shouldExplain, answer }: CheckAnswerRequest) => {
      return postProblemAnswer(problemId, lessonId, answer, shouldExplain);
    },
    onSuccess: (data) => {
      if (data.isCorrect) {
        setIsWrongAnswer(false);
        changeCanRequestHint(true);
        onCorrectAnswer();
      } else {
        setIsWrongAnswer(true);
        changeCanRequestHint(false);
      }
    },
  });

  const onAnswerCheck = useDebouncedCallback((answer: string) => {
    if (!mutation.isLoading) {
      mutation.mutate({
        shouldExplain: canRequestHint,
        answer,
      });
    }
  }, 500);

  return {
    isChecking: mutation.isLoading,
    isWrongAnswer,
    setIsWrongAnswer,
    onAnswerCheck,
  };
};
