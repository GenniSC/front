import { Box, Modal, Button, Typography } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  description?: string;
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = 'Deseja salvar as alterações?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}: ConfirmModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Box display="flex" justifyContent="space-between" mt={2} gap={2}>
          <Button variant="contained" onClick={onConfirm}>
            {confirmText}
          </Button>
          <Button variant="outlined" onClick={onClose}>
            {cancelText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
