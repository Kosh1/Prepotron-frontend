import { useState, useEffect, useRef, Dispatch } from 'react';
import { useMutation } from 'react-query';
import { startLessonChat } from '../../../api/startLessonChat';
import { Lesson } from '../../../api/interfaces';
import { LessonStateAction } from '../../../containers/Lesson/reducers/LessonStateReducer';

export const useStartLesson = (
  userId: string,
  dispatch: Dispatch<LessonStateAction>
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [lesson, setLesson] = useState<Lesson>();

  const mutation = useMutation({
    mutationFn: () => {
      return startLessonChat(userId);
    },
    onSuccess: (data) => {
      setLesson(data.lesson);
      setIsLoading(false);
    },
    onError: (error: Error) => {
      console.log(`Error starting the lesson: ${error.message}`);
      setIsError(true);
    },
  });

  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;

    setIsLoading(true);
    initialized.current = true;
    if (mutation.isIdle) {
      mutation.mutate();
    }
  }, [mutation]);

  return {
    lesson,
    isLoading,
    isError,
  };
};
