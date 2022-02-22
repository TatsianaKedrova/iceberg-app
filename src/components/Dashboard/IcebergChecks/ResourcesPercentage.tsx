import { Box, Stack, useTheme } from "@mui/material";
import React from "react";
import { dashboardStyles } from "../dashboard.styles";
import { ReactComponent as GreenTick } from "../../assets/dashboardIcons/greenTick.svg";
import { ReactComponent as RedCross } from "../../assets/dashboardIcons/redCross.svg";
import { ReactComponent as HighSeverity } from "../../assets/dashboardIcons/redEllipse.svg";
import { ReactComponent as MediumSeverity } from "../../assets/dashboardIcons/orangeEllipse.svg";
import { ReactComponent as LowSeverity } from "../../assets/dashboardIcons/yellowEllipse.svg";
import { useQuery } from "react-query";
import { cloudAccountsService } from "../../../data-services";
import ResourcesModel from "./ResourcesModel";

const ResourcesPercentage = () => {
  const theme = useTheme();
  const dailyRulesSummaryByResources = useQuery(
    "dailyRulesSummaryByResources",
    async () => cloudAccountsService.getDailyRulesSummaryByResources()
  );

  const dailyRulesSummaryData = dailyRulesSummaryByResources.data?.data.data;

  return (
    <Stack
      direction={"row"}
      sx={[
        dashboardStyles.resourcesInfoContainer,
        { justifyContent: "space-between", pr: "34px", pl: "100px" },
      ]}
    >
      <Box>Total Scanned</Box>
      <Box 
      >
        <Box sx={{ display: "flex", flexDirection: "row", height: "60px" }}>
          <ResourcesModel
            data={dailyRulesSummaryData?.compliantCount}
            icon={<GreenTick />}
            title="Compliant Resources"
            dataPercent={dailyRulesSummaryData?.compliantPercent}
          />
          <ResourcesModel
            data={dailyRulesSummaryData?.nonCompliantCount}
            icon={<RedCross />}
            title="Noncompliant Resources"
            dataPercent={dailyRulesSummaryData?.nonCompliantPercent}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", height: "60px" }}>
          <ResourcesModel
            data={dailyRulesSummaryData?.highSeverityCount}
            icon={<HighSeverity />}
            title="High severity"
            dataPercent={dailyRulesSummaryData?.highSeverityPercent}
          />
          <ResourcesModel
            data={dailyRulesSummaryData?.mediumSeverityCount}
            icon={<MediumSeverity />}
            title="Medium severity"
            dataPercent={dailyRulesSummaryData?.mediumSeverityPercent}
          />
          <ResourcesModel
            data={dailyRulesSummaryData?.lowSeverityCount}
            dataPercent={dailyRulesSummaryData?.lowSeverityPercent}
            icon={<LowSeverity />}
            title="Low severity"
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default ResourcesPercentage;
