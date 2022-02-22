import { useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactNode } from "react";
import { dashboardStyles } from "../dashboard.styles";

type ResourcesModelProps = {
  title: string;
  icon: ReactNode;
  data: number | undefined;
  dataPercent: number | undefined;
};

const ResourcesModel: React.FC<ResourcesModelProps> = ({
  data,
  dataPercent,
  icon,
  title,
}) => {
  const theme = useTheme();
  return (
    <>
      <Box sx={[dashboardStyles.lastExecutionDate, { fontSize: "16px" }]}>
        {title}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon}
        <Box
          sx={[
            dashboardStyles.resourcesInfo,
            {
              color: theme.palette.secondary.main,
              ml: "5px",
              textDecorationLine: "underline !important",
              textDecorationColor: theme.palette.secondary.main,
            },
          ]}
        >
          {data}
        </Box>
        <Box
          sx={[
            dashboardStyles.lastExecutionDate,
            { fontSize: "16px", ml: "5px" },
          ]}
        >
          ({dataPercent}%)
        </Box>
      </Box>
    </>
  );
};

export default ResourcesModel;
