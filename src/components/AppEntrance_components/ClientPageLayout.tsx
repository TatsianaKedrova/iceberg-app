import { Grid } from "@mui/material";
import React from "react";
import { clientsStyles } from "../ClientsContainer/styles/clientsStyles.styles";
import { Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import NewSidebar from "../ClientsContainer/SideBar/NewSidebar";

const ClientPageLayout = observer(() => {
  return (
    <Grid container direction={"row"} sx={{ overflow: "auto" }}>
      <NewSidebar />
      <Grid item md={10} lg={10} sx={clientsStyles.clientsContainer}>
        <Outlet />
      </Grid>
    </Grid>
  );
});

export default ClientPageLayout;
