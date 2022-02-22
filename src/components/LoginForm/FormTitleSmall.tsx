import React from "react";
import Typography from "@mui/material/Typography";

type FormTitleSmallPropsType = {
  title: string;
};

const FormTitleSmall: React.FC<FormTitleSmallPropsType> = ({ title }) => {
  return (
    <Typography
      variant="h6"
      color="secondary.light"
      fontFamily={"Inter"}
      fontSize={"16px"}
      fontWeight={"400"}
      mt={"16px"}
      textAlign={"right"}
    >
      {title}
    </Typography>
  );
};

export default FormTitleSmall;
