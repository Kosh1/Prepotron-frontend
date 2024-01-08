import { useState, useCallback, useReducer, useEffect } from 'react';
import {
  Stack,
  Snackbar,
  Alert,
  CircularProgress,
  CssBaseline,
} from '@mui/material';
import { ChatRole } from '../../api/postChatMessage';
import { useStartLesson } from './hooks/useStartLesson';
import { useSendMessage } from './hooks/useSendMessage';
import { ChatContainer } from '../../components/Chat/ChatContainer';
import { ProblemView } from '../ProblemView/ProblemView';
import { SuccessModal } from './components/SuccessModal';
import { lessonStateReducer } from './reducers/LessonStateReducer';
import { useCompleteProblem } from './hooks/useCompleteProblem';
import { MathjaxRefresh } from './utils/mathjaxRefresh';
import { AnimatedWrapper } from '../../components/AnimatedWrapper/AnimatedWrapper';
import { useListenMessageStream } from './hooks/listenMessageStream';

export const USER_ID_TMP = 'USER_ID_TMP' + Math.random();

export const Lesson = () => {
  const [state, dispatch] = useReducer(lessonStateReducer, {
    messages: [],
    problem: null,
    canRequestHint: true,
  });

  useListenMessageStream(dispatch, USER_ID_TMP);

  const preventRequestHint = useCallback((value: boolean) => {
    dispatch({
      canRequestHint: value,
      type: 'canRequestHint',
    });
  }, []);

  const { lesson, isError } = useStartLesson(USER_ID_TMP, dispatch);

  const { isLoading: isMessageSending, sendMessage } = useSendMessage(dispatch);
  const sendChatMessage = useCallback(
    (message: string) => {
      dispatch({
        message: { content: message, role: ChatRole.user },
        type: 'newMessage',
      });
      dispatch({ canRequestHint: true, type: 'canRequestHint' });
      sendMessage(message, lesson?.id);
    },
    [lesson?.id, sendMessage]
  );

  const { isLoading: isNewProblemFetching, completeProblem } =
    useCompleteProblem(dispatch, USER_ID_TMP);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const onCorrectAnswer = useCallback(() => {
    setIsSuccess(true);
    completeProblem(lesson?.id, state.problem?.id);
    setTimeout(() => {
      setIsSuccess(false);
    }, 1500);
  }, [completeProblem, lesson, state.problem?.id]);

  useEffect(MathjaxRefresh, [state.messages.length, state.problem?.id]);

  const canDisplay = state.messages.length > 0;

  return (
    <Stack>
      <CssBaseline />
      {canDisplay ? (
        <Stack
          direction="row"
          sx={{
            alignItems: 'flex-start',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <ChatContainer
            messages={state.messages}
            onMessageSend={sendChatMessage}
            isLoading={isMessageSending}
          />
          <AnimatedWrapper hasContent={!!state.problem} placeholderWidth={600}>
            {state.problem && (
              <ProblemView
                lessonId={lesson?.id || ''}
                problem={state.problem}
                onCorrectAnswer={onCorrectAnswer}
                onWrongAnswer={dispatch}
                isLoading={isNewProblemFetching}
                changeCanRequestHint={preventRequestHint}
                canRequestHint={state.canRequestHint}
              />
            )}
          </AnimatedWrapper>
        </Stack>
      ) : (
        <CircularProgress
          color="primary"
          size={40}
          sx={{ mt: 40, alignSelf: 'center' }}
        />
      )}

      <SuccessModal isSuccess={isSuccess} onClose={() => setIsSuccess(false)} />

      <Snackbar open={isError}>
        <Alert severity="error" sx={{ width: '100%' }}>
          Error loading data
        </Alert>
      </Snackbar>
    </Stack>
  );
};
