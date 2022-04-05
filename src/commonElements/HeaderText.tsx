import React from "react";
import { formStyles } from "../components/LoginForm/formStyles.styles";
import Box from "@mui/material/Box";

type HeaderTextPropsType = {};

const HeaderText: React.FC<HeaderTextPropsType> = ({ children }) => {
  return <Box sx={formStyles.headerContainerText}>{children}</Box>;
};

export default HeaderText;
