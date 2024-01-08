import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';

type Props = {
  onMessageSend: (message: string) => void;
  isLoading: boolean;
};

export const MessageBox = ({ onMessageSend, isLoading }: Props) => {
  const [message, setMessage] = useState('');

  return (
    <Stack direction={'row'} gap={1}>
      <TextField
        id="chat-message-box"
        fullWidth
        multiline
        rows={4}
        placeholder="Send a message"
        sx={(theme) => ({
          backgroundColor: 'background',
          '& .MuiInputBase-root': {
            ':hover': {
              '& > fieldset': {
                borderColor: `${theme.palette.primary.main} !important`,
              },
            },
            '& > fieldset': {
              // borderColor: 'primary.400',
            },
          },
        })}
        value={message}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setMessage(event.target.value);
        }}
        onKeyDown={(ev) => {
          if (ev.key === 'Enter') {
            if (isLoading || message.length < 1) return;

            ev.preventDefault();
            onMessageSend(message);
            setMessage('');
          }
        }}
      />
      <Button
        variant="outlined"
        sx={{
          borderColor: 'primary.400',
          borderWidth: 2,
          borderStyle: 'solid',
        }}
        disabled={isLoading || message.length < 1}
        onClick={() => {
          onMessageSend(message);
          setMessage('');
        }}
      >
        {isLoading ? (
          <CircularProgress color="primary" size={20} />
        ) : (
          <SendIcon color="primary" />
        )}
      </Button>
    </Stack>
  );
};
