import React, { useState } from "react";
import { Box, Collapse, Stack } from "@mui/material";
import authStore from "../../../../mobX/auth.store";
import { observer } from "mobx-react-lite";
import { clientsStyles } from "../../clientsStyles.styles";
import PopupMenu from "./PopupMenu";
import { ReactComponent as ChevronLeft } from "../../../assets/menuIcons/chevronLeft.svg";
import clientsStore from "../../../../mobX/clients.store";

type ProfileMenuProps = {
  isOpened?: boolean;
  toggleIsSidebarOpened: () => void;
};

const ProfileMenu: React.FC<ProfileMenuProps> = observer(
  ({ isOpened, toggleIsSidebarOpened }) => {
    const { currentUser } = authStore;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [chevronTransition, setChevronTransition] = useState(false);

    // console.log("chevron: ", chevronTransition);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleChevronOpened = () => {
      toggleIsSidebarOpened()
      setChevronTransition(!chevronTransition);
    };

    return (
      <Box
        sx={{
          position: "absolute",
          top: "530px",
          width: "inherit",
        }}
      >
        <Stack
          aria-haspopup="true"
          id="stackButton"
          direction={"row"}
          spacing={2}
          minHeight={"80px"}
          width={"240px"}
          onClick={handleClick}
          sx={clientsStyles.stack}
        >
          <Box sx={clientsStyles.sidebarProfileBox}>
            <Collapse
              orientation="horizontal"
              collapsedSize={"44px"}
              in={isOpened}
            >
              <img
                className="avatarClass"
                alt="avatar"
                src={
                  currentUser?.picture
                    ? currentUser.picture
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm1fEEPl9CTbuUkYDlyJijx0RjiNRX2I6-mg&usqp=CAU"
                }
                style={clientsStyles.avatarStyle}
              />
            </Collapse>
          </Box>
          <Box>
            <Box className="profileText" sx={clientsStyles.helloText}>
              Hello,
            </Box>
            <Box className="profileText" sx={clientsStyles.sidebarFullName}>
              {currentUser?.fullName}
            </Box>
          </Box>
        </Stack>
        <Box
          sx={clientsStyles.chevronLeft}
          onClick={handleChevronOpened}
          className={chevronTransition ? "chevronCollapsed" : ""}
        >
          <ChevronLeft />
        </Box>

        <PopupMenu
          anchorElement={anchorEl}
          open={open}
          handleClose={handleClose}
          isOpened={isOpened}
        />
      </Box>
    );
  }
);

export default ProfileMenu;
