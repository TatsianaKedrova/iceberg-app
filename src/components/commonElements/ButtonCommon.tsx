import React from "react";
import { Button, ButtonProps } from "@mui/material";

const ButtonCommon: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      variant="contained"
      type="submit"
      sx={{
        backgroundColor: "primary.main",
        borderRadius: "90px",
        width: "130px",
        height: "48px",
        fontFamily: "Inter",
        fontWeight: 700,
        fontSize: "16px",
        lineHeight: "24px",
        color: "neutral.main",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "primary.contrastText",
          color: "neutral.main",
        },
        "&:disabled": {
          backgroundColor: "primary.light",
          color: "neutral.main"
        },
      }}
      {...props}
    />
  );
};

export default ButtonCommon;
