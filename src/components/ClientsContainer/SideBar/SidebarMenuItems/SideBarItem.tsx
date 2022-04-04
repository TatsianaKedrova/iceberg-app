import { Box } from "@mui/system";
import React from "react";
import { clientsStyles } from "../../clientsContainer-styles/clientsStyles.styles";
import { Stack } from "@mui/material";
import { ReactNode } from "react";

type SideBarItemProps = {
  menuTitle?: string;
  menuIcon?: ReactNode;
  menuIconBlue?: string;
};

const SideBarItem: React.FC<SideBarItemProps> = ({
  menuIcon,
  menuTitle,
}) => {
  return (
    <Stack
    direction={"row"}
    spacing={4}
    sx={clientsStyles.sidebarMenuItemStyle}
  >
    {menuIcon}

    <Box sx={clientsStyles.sidebarMenuItemName} className="menuName">
      {menuTitle}
    </Box>
  </Stack>
  );
};

export default SideBarItem;
