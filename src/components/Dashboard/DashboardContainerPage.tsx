import { Box, Stack, Typography, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { useQuery } from "react-query";
import { cloudAccountsService } from "../../data-services";
import { ReactComponent as Timer } from "../assets/dashboardIcons/timer.svg";
import { dashboardStyles } from "./dashboard.styles";
import DashboardContainer from "./DashboardContainer";

const DashboardContainerPage = observer(() => {
  const theme = useTheme();

  const getLastRulesExecutionDate = useQuery(
    "getLastRulesExecutionDate",
    async () => await cloudAccountsService.getLastRulesExecutionDate()
  );

  const getCostSummary = useQuery(
    "getCostSummary",
    async () => await cloudAccountsService.getCostSummary()
  );
  const getCostSavings = useQuery(
    "getCostSavings",
    async () => await cloudAccountsService.getCostSavings()
  );

  const lastRulesExecutionDate = getLastRulesExecutionDate.data?.data.data;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString([], options);
  };

  return (
      <Box sx={dashboardStyles.dashboardContainerStyle}>
        <Typography fontFamily="Inter" fontSize="32px" fontWeight={800}>
          Dashboard
        </Typography>
        <Stack direction={"row"} spacing={1} sx={{ alignItems: "center" }}>
          <Timer />
          <Box sx={dashboardStyles.lastExecutionDate}>Last updated:</Box>{" "}
          <Box
            sx={[
              dashboardStyles.lastExecutionDate,
              { color: theme.palette.secondary.main },
            ]}
          >
            {lastRulesExecutionDate &&
              formatDate(lastRulesExecutionDate.toString())}
          </Box>
        </Stack>
        <DashboardContainer
          costSummary={getCostSummary}
          costSavings={getCostSavings}
        />
      </Box>
  );
});

export default DashboardContainerPage;
