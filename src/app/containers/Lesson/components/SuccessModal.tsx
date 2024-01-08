import { Modal, Stack, Typography } from '@mui/material';
import { SuccessAnimation } from '../../../components/SuccessCheckmark/SuccessAnimation';

interface Props {
  isSuccess: boolean;
  onClose: () => void;
}

export const SuccessModal = ({ isSuccess, onClose }: Props) => {
  return (
    <Modal open={isSuccess} onClose={onClose}>
      <Stack
        sx={{
          position: 'absolute',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 8,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          height: 300,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'primary.main',
          boxShadow: 24,
          p: 4,
          color: 'text.primary',
        }}
      >
        <Typography variant="h4">Correct!</Typography>
        <SuccessAnimation />
      </Stack>
    </Modal>
  );
};
