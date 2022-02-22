import { Box, Menu, MenuItem, Stack } from "@mui/material";
import React, { useState } from "react";
import clientsStore from "../../../bll/clients.store";
import { ReactComponent as Users } from "../../assets/menuIcons/usersIcon.svg";
import { ReactComponent as InactiveArrow } from "../../assets/menuIcons/inactiveArrow.svg";
import { ReactComponent as ActiveArrow } from "../../assets/menuIcons/activeArrow.svg";
import { clientsStyles } from "../clientsStyles.styles";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

type SelectedClientSideBarProps = {
  isOpened: boolean;
}

const SelectedClientSideBar: React.FC<SelectedClientSideBarProps> = observer(
  ({isOpened}) => {
    const [isArrowActive, setIsArrowActive] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const selectedClientName = clientsStore.selectedClientName;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
      setIsArrowActive(true);
    };

    const handleClose = () => {
      setAnchorEl(null);
      setIsArrowActive(false);
    };

    const navigateToAllClientsList = () => {
      clientsStore.removeSelectedClientId();
      clientsStore.removeSelectedClientName();
      return navigate("/clients");
    };

    return (
      <>
          <Stack
            direction={"row"}
            id="selectedClientStack"
            spacing={4}
            onClick={handleClick}
            sx={clientsStyles.selectedClientSidebarStyle}
          >
            <Users className="iconMenuStyle" />
            <Stack direction={"column"}>
              <Box sx={[clientsStyles.helloText, { fontSize: "14px", pt: 0 }]}>
                Selected Client
              </Box>
              <Box sx={clientsStyles.selectedClientSideBarStyle}>
                {selectedClientName}
              </Box>
            </Stack>
            <Box>{!isArrowActive ? <InactiveArrow /> : <ActiveArrow />}</Box>
          </Stack>
        <Menu
          transformOrigin={isOpened ? { vertical: 70, horizontal: 0 } : { vertical: 20, horizontal: "right" }}
          autoFocus={false}
          elevation={10}
          sx={clientsStyles.selectedClientMenuStyle}
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "selectedClientStack",
          }}
        >
          <MenuItem
            sx={clientsStyles.selectedClientSideBarStyle}
            onClick={() => navigate("/dashboard", { replace: true })}
          >
            {selectedClientName}
          </MenuItem>
          <MenuItem
            className="viewAllClients"
            sx={clientsStyles.viewAllClientsStyle}
            onClick={navigateToAllClientsList}
          >
            View All Clients
          </MenuItem>
        </Menu>
      </>
    );
  }
);

export default SelectedClientSideBar;
