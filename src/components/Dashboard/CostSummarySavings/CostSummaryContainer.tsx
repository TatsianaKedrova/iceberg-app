import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { ReactComponent as LastMonth } from "../../assets/dashboardIcons/lastMonth.svg";
import { ReactComponent as CostToDate } from "../../assets/dashboardIcons/costToDate.svg";
import { ReactComponent as FastForward } from "../../assets/dashboardIcons/fastForward.svg";
import { UseQueryResult } from "react-query";
import { AxiosResponse } from "axios";

import CostComponent from "./CostComponent";
import { APIResponse } from "../../../dtos/authDTO/authentication-result.dto";
import { DashboardCostSummaryAndForecast } from "../../../dtos/clientsDTO/clients.dto";
import LoadingIcon from "../../commonElements/LoadingIcon";
import { dashboardStyles } from "../dashboard.styles";

type CostSummaryContainerProps = {
  costSummary: UseQueryResult<
    | AxiosResponse<APIResponse<DashboardCostSummaryAndForecast>, any>
    | undefined,
    unknown
  >;
};

const CostSummaryContainer: React.FC<CostSummaryContainerProps> = observer(
  ({ costSummary }) => {

    const data = costSummary.data?.data.data;
    console.log("costSummaryData: ", data);

    if(costSummary.isLoading) {
      return <LoadingIcon />
    }
    return (
      <Box sx={dashboardStyles.costContainer}>
        <CostComponent
          amount={data?.lastMonth.amount}
          costTitle="Last month"
          icon={<LastMonth />}
          subTitle={data?.lastMonth.periodName}
        />
        <CostComponent
          amount={data?.costToDate.amount}
          costTitle="Cost to date"
          icon={<CostToDate />}
          subTitle={data?.costToDate.periodName}
        />
        <CostComponent
          amount={data?.forecast.amount}
          costTitle="Forecasted"
          icon={<FastForward />}
          subTitle={data?.forecast.periodName}
          amountChangeRange={data?.forecast.previousPeriodChangePercent}
        />
      </Box>
    );
  }
);

export default CostSummaryContainer;
