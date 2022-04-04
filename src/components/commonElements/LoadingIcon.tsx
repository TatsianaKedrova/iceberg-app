import React from 'react';
import { clientsStyles } from '../ClientsContainer/styles/clientsStyles.styles';
import { Box, CircularProgress } from '@mui/material';

const LoadingIcon = () => {
  return (
    <Box
    sx={[clientsStyles.clientsContainer, {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }]}
  >
    <CircularProgress />
  </Box>
  )
}

export default LoadingIcon;
