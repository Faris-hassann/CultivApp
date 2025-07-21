import React from 'react';
import { Modal, Box, CircularProgress, Typography } from '@mui/material';

const LoadingModal = ({ open, message = 'Loading...' }) => (
  <Modal open={open} sx={{ zIndex: 2000 }}>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
      sx={{ outline: 'none', bgcolor: 'rgba(0,0,0,0.18)' }}
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 4,
          p: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: 220,
        }}
      >
        <CircularProgress color="success" size={48} thickness={4} />
        <Typography mt={3} fontWeight={600} color="text.primary" fontSize={18}>
          {message}
        </Typography>
      </Box>
    </Box>
  </Modal>
);

export default LoadingModal; 