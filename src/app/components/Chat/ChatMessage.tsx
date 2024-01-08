import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ChatRole } from '../../api/postChatMessage';

type Props = {
  content: string;
  role: ChatRole;
};

export const ChatMessage = ({ content, role }: Props) => {
  const isUser = role === ChatRole.user;
  return (
    <Box
      sx={{
        textAlign: isUser ? 'right' : 'left',
        // Styles for smaller messages
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        width: 'fit-content',
      }}
    >
      <Box
        sx={{
          p: 2,
          backgroundColor: isUser ? 'background.paper' : 'background',
          borderColor: 'background.paper',
          borderWidth: 2,
          borderStyle: 'solid',
          borderRadius: 2,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ whiteSpace: 'pre-line' }}
          dangerouslySetInnerHTML={{ __html: content }}
        ></Typography>
      </Box>
      <Typography
        variant="caption"
        color={isUser ? 'secondary' : 'primary'}
        sx={{ marginTop: 0 }}
      >
        {isUser ? 'You' : 'Prepotron'}
      </Typography>
    </Box>
  );
};
