import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Chart } from '../Chart/Chart';
import { ProblemExtra } from '../../api/getProblem';
import { Stack } from '@mui/material';

type Props = {
  content: string;
  extra: ProblemExtra;
};

export const ProblemDescription = ({ content, extra }: Props) => {
  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ whiteSpace: 'pre-line', fontWeight: 'bold', marginBottom: 1 }}
      >
        Question:
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ whiteSpace: 'pre-line' }}
      >
        {content}
      </Typography>
      {extra?.type === 'chart' && <Chart data={extra.points} />}
      {extra?.type === 'figure' && (
        <Stack
          sx={{ alignItems: 'center' }}
          dangerouslySetInnerHTML={{ __html: extra.code }}
        />
      )}
    </Box>
  );
};
