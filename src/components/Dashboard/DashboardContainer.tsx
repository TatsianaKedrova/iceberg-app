import { Box } from "@mui/material";
import { AxiosResponse } from "axios";
import { observer } from "mobx-react-lite";
import React from "react";
import { QueryClient, QueryClientProvider, UseQueryResult } from "react-query";
import { APIResponse } from "../../dtos/authDTO/authentication-result.dto";
import {
  DashboardCostSummaryAndForecast,
  DashboardEstimatedCostSavings,
} from "../../dtos/clientsDTO/clients.dto";
import Calendar from "./Calendar/Calendar";
import CostSavingsContainer from "./CostSummarySavings/CostSavingsContainer";
import CostSummaryContainer from "./CostSummarySavings/CostSummaryContainer";
import { dashboardStyles } from "./dashboard.styles";
import DashboardGraphicsContainer from "./DashboardGraphicsContainer/DashboardGraphicsContainer";
import DashboardItemTitles from "./DashboardItemTitles";
import DashboardOptionsToggle from "./DashboardOptionsToggle";
import IcebergChecks from "./IcebergChecks/IcebergChecks";

type DashboardContainerProps = {
  costSummary: UseQueryResult<
    | AxiosResponse<APIResponse<DashboardCostSummaryAndForecast>, any>
    | undefined,
    unknown
  >;
  costSavings: UseQueryResult<
    AxiosResponse<APIResponse<DashboardEstimatedCostSavings>, any> | undefined,
    unknown
  >;
};

const queryClient = new QueryClient();

const DashboardContainer: React.FC<DashboardContainerProps> = observer(
  ({ costSavings, costSummary }) => {
    return (
      <Box sx={dashboardStyles.dashboardTopBorderStyle}>
        <DashboardItemTitles
          title="Cost Summary and Forecast"
          viewLink="View full report"
        />
        <CostSummaryContainer costSummary={costSummary} />
        <DashboardItemTitles
          title="Estimated Cost Savings"
          viewLink="View cost opportunities"
        />
        <CostSavingsContainer costSavings={costSavings} />

        <DashboardOptionsToggle
          data={["Cost & Usage over Time", "Cost by Service", "Cost by Tags"]}
          fontStyle="20px"
        />
        <QueryClientProvider client={queryClient} contextSharing={true}>
          <Calendar />
        </QueryClientProvider>

        <DashboardItemTitles
          title="Iceberg checks"
          viewLink="View full report"
        />
        <DashboardOptionsToggle
          data={["By Resources", "By Checks"]}
          fontStyle="14px"
        />
        <IcebergChecks />
      </Box>
    );
  }
);

export default DashboardContainer;
