import { useCallback, SyntheticEvent, Dispatch } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ProblemDescription } from '../../components/ProblemDescription/ProblemDescription';
import { AnswerBox } from './components/AnswerBox/AnswerBox';
import { Problem } from '../../api/getProblem';
import { LessonStateAction } from '../Lesson/reducers/LessonStateReducer';
import { useCheckAnswer } from './hooks/useCheckAnswer';

type Props = {
  lessonId: string;
  onCorrectAnswer: VoidFunction;
  onWrongAnswer: Dispatch<LessonStateAction>;
  problem: Problem;
  isLoading: boolean;
  canRequestHint: boolean;
  changeCanRequestHint: (value: boolean) => void;
};

export const ProblemView = ({
  lessonId,
  onCorrectAnswer,
  onWrongAnswer,
  problem,
  isLoading,
  canRequestHint,
  changeCanRequestHint,
}: Props) => {
  const { isWrongAnswer, isChecking, setIsWrongAnswer, onAnswerCheck } =
    useCheckAnswer({
      problemId: problem.id,
      lessonId,
      onCorrectAnswer,
      onWrongAnswer,
      canRequestHint,
      changeCanRequestHint,
    });

  const handleClose = useCallback(
    (event?: SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') return;
      setIsWrongAnswer(false);
    },
    [setIsWrongAnswer]
  );

  return (
    <Stack
      sx={{
        maxWidth: '600px',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 0,
      }}
    >
      <CssBaseline />

      <>
        <ProblemDescription
          content={problem.description}
          extra={problem.extra}
        />
        <AnswerBox
          solution={problem.solution}
          onAnswerCheck={onAnswerCheck}
          isLoading={isLoading || isChecking}
        />
      </>

      <Snackbar
        onClose={handleClose}
        open={isWrongAnswer}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity="warning"
          sx={{ width: '100%' }}
          style={{
            backgroundColor: 'background.paper',
            color: 'text.primary',
          }}
        >
          Sorry, the answer is incorrect
        </Alert>
      </Snackbar>
    </Stack>
  );
};
