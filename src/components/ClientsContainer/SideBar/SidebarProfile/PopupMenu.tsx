import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { clientsStyles } from "../../styles/clientsStyles.styles";
import authStore from "../../../../mobX/auth.store";
import { useNavigate } from "react-router-dom";

type PopupMenu = {
  anchorElement: null | HTMLElement;
  open: boolean;
  isOpened?: boolean;
  handleClose: () => void;
};

const PopupMenu: React.FC<PopupMenu> = ({
  anchorElement,
  handleClose,
  open,
  isOpened
}) => {
  const navigate = useNavigate();

  const redirectToProfilePage = () => {
    return navigate("/profile");
  };

  const logOut = () => {
    authStore.logOut();
    return navigate("/login");
  };

  return (
    <Menu
      // transformOrigin={{ vertical: "bottom", horizontal: "center" }}
      // transformOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoFocus={false}
      elevation={10}
      sx={isOpened ? clientsStyles.menu : [clientsStyles.menu, {left: "20px", top: "-50"}]}
      id="basic-menu"
      anchorEl={anchorElement}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "stackButton",
      }}
    >
      <MenuItem onClick={redirectToProfilePage}>My Profile</MenuItem>
      <MenuItem onClick={logOut}>Logout</MenuItem>
    </Menu>
  );
};

export default PopupMenu;
