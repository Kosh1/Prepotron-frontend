import { useRef, useCallback, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ChatMessage } from './ChatMessage';
import { MessageBox } from '../MessageBox/MessageBox';
import { Message } from 'src/app/api/postChatMessage';

type Props = {
  messages: Array<Message>;
  onMessageSend: (message: string) => void;
  isLoading: boolean;
};

export function ChatContainer({ messages, onMessageSend, isLoading }: Props) {
  const bottomEl = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (bottomEl.current !== null) {
        bottomEl.current.scrollTop = bottomEl.current.scrollHeight;
      }
    }, 10);
  }, [bottomEl]);

  const onMessageSendWithScroll = useCallback(
    (message: string) => {
      onMessageSend(message);
    },
    [onMessageSend]
  );

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'auto',
        flex: 1,
        boxShadow: (theme) => `1px 0px 10px 1px ${theme.palette.grey[300]}`,
        p: (theme) => theme.spacing(2),
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        '::-webkit-scrollbar': {
          display: 'none',
        },
      }}
      ref={bottomEl}
    >
      <CssBaseline />
      <Stack spacing={1} sx={{ paddingBottom: 2 }}>
        {messages.map((message, idx) => (
          <ChatMessage
            content={message.content}
            role={message.role}
            key={`chat-message-${idx}`}
          />
        ))}
      </Stack>
      <Box
        component="footer"
        sx={{
          mt: 'auto',
          position: 'sticky',
          bottom: 0,
        }}
      >
        <MessageBox
          onMessageSend={onMessageSendWithScroll}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
}
