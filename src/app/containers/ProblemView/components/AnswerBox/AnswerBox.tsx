import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Solution } from 'src/app/api/getProblem';
import CircularProgress from '@mui/material/CircularProgress';
import { ClickableBlock } from '../../../../components/ClickableBlock/ClickableBlock';
import { Chart } from '../../../../components/Chart/Chart';
import { Box } from '@mui/material';
import { indexToLetter } from '../../utils/indexToLetter';

type Props = {
  solution: Solution;
  onAnswerCheck: (answer: string) => void;
  isLoading: boolean;
};

export const AnswerBox = ({ solution, onAnswerCheck, isLoading }: Props) => {
  const [answer, setAnswer] = useState<string>();

  const checkAnswer = useCallback(() => {
    if (answer) onAnswerCheck(answer);
  }, [answer, onAnswerCheck]);

  return (
    <Stack
      sx={{
        backgroundColor: 'background.default',
        width: '100%',
        py: 3,
        gap: 2,
      }}
    >
      {solution.options.map((option, idx) => (
        <ClickableBlock
          key={`answer-input-${option.id}`}
          onClick={() => setAnswer(option.id)}
          isActive={option.id === answer}
          sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
          color="primary"
        >
          <Box alignSelf={'flex-start'}>
            <Typography
              variant="body2"
              color="grey.500"
              sx={{
                whiteSpace: 'pre-line',
                alignSelf: 'flex-start',
                fontWeight: 'bold',
              }}
              display="inline"
            >
              {indexToLetter(idx)}.{' '}
            </Typography>
            {option.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  whiteSpace: 'pre-line',
                  alignSelf: 'flex-start',
                }}
                display="inline"
              >
                {option.description}
              </Typography>
            )}
          </Box>
          {option.extra?.type === 'chart' && (
            <Chart
              data={option.extra.points}
              style={{ height: 100 }}
              smallSplit
            />
          )}
          {option.extra?.type === 'figure' && (
            <Stack
              sx={{ alignItems: 'center' }}
              dangerouslySetInnerHTML={{ __html: option.extra.code }}
            />
          )}
        </ClickableBlock>
      ))}
      <Button
        variant="outlined"
        sx={{
          borderColor: 'primary.400',
          backgroundColor: 'background.default',
          borderWidth: 2,
          ':hover': {
            borderWidth: 2,
          },
        }}
        disabled={isLoading}
        onClick={checkAnswer}
      >
        {isLoading ? (
          <CircularProgress color="primary" size={20} />
        ) : (
          <Typography>Submit</Typography>
        )}
      </Button>
    </Stack>
  );
};
