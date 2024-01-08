import * as React from 'react';
import Box from '@mui/material/Box';

type Props = {
  children: React.ReactNode;
};

export const GlobalWrapper = ({ children }: Props) => {
  return (
    <Box overflow={'hidden'} height={'100dvh'}>
      {children}
    </Box>
  );
};
