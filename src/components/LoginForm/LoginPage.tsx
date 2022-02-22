import React, { FC } from "react";
import FormContainer from "./FormContainer";
import { Box } from "@mui/material";
import { Auth } from "./FormBlockContainer";
import HeaderContainerCommon from "../commonElements/HeaderContainerCommon";
import HeaderText from "../commonElements/HeaderText";
import RedirectComponent from "./RedirectComponent";
import { formStyles } from "./formStyles.styles";
import FormTitleBig from "./FormTitleBig";
import FormTitleSmall from "./FormTitleSmall";

type LoginPagePropsType = {};

export const LoginPage: FC<LoginPagePropsType> = () => {
  return (
    <FormContainer>
      <HeaderContainerCommon>
        <HeaderText>
          <Box sx={formStyles.headerText}>{"No account yet?"}</Box>
          <RedirectComponent actionTitle={"Create One"} linkTo={"/register"} />
        </HeaderText>
      </HeaderContainerCommon>
      <Box sx={formStyles.formTitleContainer}>
        <FormTitleBig title="Welcome to Iceberg!" />
        <FormTitleSmall title="Please enter your information" />
      </Box>
      <Auth />
    </FormContainer>
  );
};

export default LoginPage;
