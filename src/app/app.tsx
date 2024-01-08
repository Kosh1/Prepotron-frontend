import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider } from 'react-query';

import { defaultTheme } from './theme';

import { queryClient } from './query-client';
import { GlobalWrapper } from './containers/GlobalWarpper';
import { Lesson } from './containers/Lesson/Lesson';

function CompletedComponentsApp(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalWrapper>
          <Lesson />
        </GlobalWrapper>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default CompletedComponentsApp;
