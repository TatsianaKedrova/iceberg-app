import { Box } from '@mui/material';
import React from 'react';
import { clientsStyles } from '../ClientsContainer/styles/clientsStyles.styles';
import { dashboardStyles } from './dashboard.styles';

type DashboardItemTitlesProps = {
    title: string;
    viewLink: string;
}

const DashboardItemTitles: React.FC<DashboardItemTitlesProps> = ({ title, viewLink }) => {
  return (
    <Box
    sx={{ display: "flex", justifyContent: "space-between", mb: "20px", mt: "20px" }}
  >
    <Box sx={dashboardStyles.costAndSummaryHeader}>
      {title}
    </Box>
    <Box sx={[clientsStyles.viewAllClientsStyle, { fontSize: "14px" }]}>
      {viewLink}
    </Box>
  </Box>
  )
}

export default DashboardItemTitles;
