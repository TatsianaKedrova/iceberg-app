import { Box } from "@mui/material";
import React from "react";
import SideBarItem from "./SideBarItem";

const ReportsItems = () => {
  const reportItems = [
    "Cost Opportunities",
    "Rules Report",
    "Budget Report",
    "Cost Report",
  ];

  return (
    <Box>
      {reportItems.map((item) => (
        <SideBarItem menuTitle={item} />
      ))}
    </Box>
  );
};

export default ReportsItems;
