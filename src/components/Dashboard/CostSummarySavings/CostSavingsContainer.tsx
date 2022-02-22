import React from "react";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import CostComponent from "./CostComponent";
import { ReactComponent as AverageSpend } from "../../assets/dashboardIcons/averageSpent.svg";
import { ReactComponent as EstimatedSavings } from "../../assets/dashboardIcons/estimatedSavings.svg";
import { ReactComponent as EstimatedBill } from "../../assets/dashboardIcons/estimatedBill.svg";
import { UseQueryResult } from "react-query";
import { AxiosResponse } from "axios";
import { dashboardStyles } from "../dashboard.styles";
import { APIResponse } from "../../../dtos/authDTO/authentication-result.dto";
import { DashboardEstimatedCostSavings } from "../../../dtos/clientsDTO/clients.dto";
import LoadingIcon from "../../commonElements/LoadingIcon";

type CostSavingsContainerProps = {
  costSavings: UseQueryResult<
    AxiosResponse<APIResponse<DashboardEstimatedCostSavings>, any> | undefined,
    unknown
  >;
};

const CostSavingsContainer: React.FC<CostSavingsContainerProps> = observer(
  ({ costSavings }) => {
    const data = costSavings.data?.data.data;

    if (costSavings.isLoading) {
      return <LoadingIcon />;
    }
    return (
      <Box sx={dashboardStyles.costContainer}>
        <CostComponent
          amount={data?.averageSpend.amount}
          costTitle="Average spend"
          icon={<AverageSpend />}
          subTitle={data?.averageSpend.periodName}
        />
        <CostComponent
          amount={data?.estimatedSavings.amount}
          costTitle="Estimated savings"
          icon={<EstimatedSavings />}
          subTitle={data?.estimatedSavings.periodName}
        />
        <CostComponent
          amount={data?.estimatedBill.amount}
          costTitle="Estimated bill"
          icon={<EstimatedBill />}
          subTitle={data?.estimatedBill.periodName}
        />
      </Box>
    );
  }
);

export default CostSavingsContainer;
