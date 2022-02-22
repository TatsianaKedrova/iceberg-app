import Stack from "@mui/material/Stack";
import React from "react";
import separator from "../../assets/menuIcons/separator.svg";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { MenuItemType } from "./SidebarMenuItems/SideBarContainer";
import { clientsStyles } from "../clientsStyles.styles";
import SelectedClientSideBar from "./SelectedClientSideBar";
import SideBarItem from "./SidebarMenuItems/SideBarItem";

type SideBarContainerOpenedProps = {
  isOpened: boolean;
  menuItems: MenuItemType[];
};

const SidebarDivider = () => {
  return <Box component="img" alt="separator" src={separator}></Box>;
};

const SideBarContainerOpened: React.FC<SideBarContainerOpenedProps> = observer(
  ({isOpened, menuItems }) => {
    return (
      <>
        <Box>
          <SelectedClientSideBar isOpened={isOpened} />
          <Stack
            direction={"column"}
            sx={clientsStyles.sideBarItemStackStyle}
            divider={<SidebarDivider />}
          >
            {menuItems.map((value, index) => {
              if (index === menuItems.length - 1) {
                return (
                  <>
                    <SideBarItem
                      key={new Date().toString()}
                      menuTitle={value.name}
                      menuIcon={value.icon}
                    />
                    <SidebarDivider />
                  </>
                );
              } else {
                return (
                  <SideBarItem
                    menuTitle={value.name}
                    menuIcon={value.icon}
                  />
                );
              }
            })}
          </Stack>
        </Box>
      </>
    );
  }
);

export default SideBarContainerOpened;
