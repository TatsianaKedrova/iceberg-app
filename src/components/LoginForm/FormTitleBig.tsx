import React from "react";
import Typography from "@mui/material/Typography";

type FormTitleBigPropsType = {
  title: string;
};

const FormTitleBig: React.FC<FormTitleBigPropsType> = ({ title }) => {
  return (
    <Typography
      variant="h4"
      color="secondary.main"
      fontFamily={"Inter"}
      fontSize={"38px"}
      fontWeight={700}
      textAlign="right"
    >
      {title}
    </Typography>
  );
};

export default FormTitleBig;
