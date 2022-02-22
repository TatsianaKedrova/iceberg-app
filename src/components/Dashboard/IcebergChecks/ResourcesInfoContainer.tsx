import { Box, Stack, useTheme } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { cloudAccountsService } from "../../../data-services";
import { ReactComponent as ResourceEmblem } from "../../assets/dashboardIcons/resourceEmblem.svg";
import { dashboardStyles } from "../dashboard.styles";

const ResourcesInfoContainer = () => {
  const theme = useTheme();

  const dailyChecksAndResourcesCount = useQuery(
    "dailyChecksAndResourcesCount",
    async () => await cloudAccountsService.getDailyChecksAndResourcesCount()
  );

  const dailyChecksResources = dailyChecksAndResourcesCount.data?.data.data;

  return (
    <Box sx={dashboardStyles.resourcesInfoContainer}>
      <Stack direction={"column"}>
        <Box>
          <ResourceEmblem />
        </Box>
        <Box>
          <Box
            component="div"
            sx={[
              dashboardStyles.resourcesInfo,
              { color: theme.palette.secondary.main, mr: "5px" },
            ]}
          >
            {dailyChecksResources?.resourcesCount}
          </Box>
          <Box sx={dashboardStyles.resourcesInfo}>Resources</Box>{" "}
        </Box>

        <Box sx={[dashboardStyles.lastExecutionDate, { fontSize: "16px" }]}>
          Guarded by
        </Box>
        <Box>
          <Box
            sx={[
              dashboardStyles.resourcesInfo,
              { color: theme.palette.secondary.main, mr: "5px" },
            ]}
          >
            {dailyChecksResources?.checksCount}
          </Box>
          <Box sx={dashboardStyles.resourcesInfo}>Daily checks</Box>{" "}
        </Box>
      </Stack>
    </Box>
  );
};

export default ResourcesInfoContainer;
