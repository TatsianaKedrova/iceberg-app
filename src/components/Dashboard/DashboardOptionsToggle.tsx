import { Stack, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

type ResourcesChecksToggleProps = {
  data: string[];
  fontStyle: string;
};

const DashboardOptionsToggle: React.FC<ResourcesChecksToggleProps> = ({
  data,
  fontStyle,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useTheme();

  const handleClick = (index: number) => {
    if (index === activeIndex) {
      return;
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <Stack
      direction={"row"}
      spacing={3}
      sx={{
        fontFamily: "typography.fontFamily",
        fontSize: fontStyle,
        fontWeight: 700,
      }}
    >
      {data.map((field, index) => (
        <Box
          key={field}
          className={index === activeIndex ? "active" : ""}
          onClick={() => handleClick(index)}
          sx={{
            cursor: "pointer",
            color:
              index === activeIndex
                ? theme.palette.secondary.main
                : theme.palette.secondary.light,
          }}
        >
          {field}
        </Box>
      ))}
    </Stack>
  );
};

export default DashboardOptionsToggle;
