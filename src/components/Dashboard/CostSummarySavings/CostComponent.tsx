import { Box, Stack, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { ReactNode, useMemo } from "react";
import { dashboardStyles } from "../dashboard.styles";
import {ReactComponent as ArrowUpp} from "../../../assets/dashboardIcons/arrow-up.svg";

type CostComponentProps = {
  amount?: number;
  costTitle: string;
  subTitle?: string;
  icon: ReactNode;
  amountChangeRange?: number;
};

const CostComponent: React.FC<CostComponentProps> = observer(
  ({ amount, amountChangeRange, costTitle, icon, subTitle }) => {
    const theme = useTheme();

    const amountFormat = useMemo(() => {
      const newSmth = new Intl.NumberFormat().format(amount!);
      return newSmth;
    }, [amount]);

    const amountColor = useMemo(() => {
      if (costTitle === "Estimated savings") {
        return "success.main";
      } else {
        return "secondary.main";
      }
    }, [costTitle]);

    const forecastedRangeColor = useMemo(() => {
      if (amountChangeRange) {
        if (amountChangeRange >= 0) {
          return "success.main";
        } else {
          return "error.main";
        }
      } else return "";
    }, [amountChangeRange]);

    return (
      <Box sx={dashboardStyles.costSummaryAndForcastStyle}>
        <Stack direction="row">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "6px",
              height: "64px",
              width: "48px",
              backgroundColor: "neutral.main",
              pl: "16px",
              pr: "16px",
              mr: "16px !important",
            }}
          >
            {icon}
          </Box>
          <Stack direction="column" spacing={0.1}>
            <Box sx={dashboardStyles.lastExecutionDate}>{costTitle}</Box>
            <Box
              sx={[
                dashboardStyles.lastExecutionDate,
                { color: theme.palette.secondary.main },
              ]}
            >
              {subTitle}
            </Box>
          </Stack>
        </Stack>
        {costTitle === "Forecasted" ? (
          <Stack direction={"column"} sx={{ textAlign: "right" }}>
            <Box sx={{ fontWeight: 800, fontSize: "20px", color: amountColor }}>
              ${amountFormat}
            </Box>
            <Stack direction={"row"}>
              <Box
                sx={[
                  dashboardStyles.forecastedAmountRange,
                  { color: forecastedRangeColor },
                ]}
              >
                {amountChangeRange !== undefined && amountChangeRange >= 0 ? <ArrowUpp /> : icon}
                 
                {amountChangeRange}%
              </Box>
              <Box sx={dashboardStyles.forecastedAmountRange}>
                than prev. month
              </Box>
            </Stack>
          </Stack>
        ) : (
          <Box sx={{ fontWeight: 800, fontSize: "20px", color: amountColor }}>
            ${amountFormat}
          </Box>
        )}
      </Box>
    );
  }
);

export default CostComponent;
