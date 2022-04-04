import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { clientsStyles } from "../clientsContainer-styles/clientsStyles.styles";
import SideBarContainer from "./SidebarMenuItems/SideBarContainer";
import ProfileMenu from "./SidebarProfile/ProfileMenu";
import { ReactComponent as LogoIceberg } from "../../assets/menuIcons/icebergLogo.svg";
import Collapse from "@mui/material/Collapse";

export default function NewSidebar() {
  const [isChevronOpened, setIsChevronOpened] = useState<boolean>(
    localStorage.getItem("is_sidebar_opened") === "true"
  );

  useEffect(() => {
    localStorage.setItem("is_sidebar_opened", String(isChevronOpened));
  }, [isChevronOpened]);

  const handleChevronMovement = () => {
    setIsChevronOpened(!isChevronOpened);
  };

  return (
    <Collapse
      className="sidebarCollapse"
      orientation="horizontal"
      collapsedSize={"64px"}
      in={isChevronOpened}
      timeout={300}
      sx={clientsStyles.clientsContainerSidebar}
    >
      <Grid item>
        <Container sx={{ mb: "20px" }}>
          <LogoIceberg />
        </Container>
        <SideBarContainer isOpened={isChevronOpened} />
        <ProfileMenu
          toggleIsSidebarOpened={handleChevronMovement}
          isOpened={isChevronOpened}
        />
      </Grid>
    </Collapse>
  );
}
