import { Stack } from "@mui/material";
import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import ResourcesInfoContainer from "./ResourcesInfoContainer";
import ResourcesPercentage from "./ResourcesPercentage";

const queryClient = new QueryClient();

const IcebergChecks = () => {
  
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Stack
        direction={"row"}
        spacing={5}
        sx={{ justifyContent: "space-between", width: "inherit", mt: "20px" }}
      >
        <ResourcesInfoContainer />
        <ResourcesPercentage />
      </Stack>
    </QueryClientProvider>
  );
};

export default IcebergChecks;
