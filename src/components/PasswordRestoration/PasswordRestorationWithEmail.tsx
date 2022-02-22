import React from "react";
import { Box } from "@mui/material";
import HeaderContainerCommon from "../commonElements/HeaderContainerCommon";
import FormContainer from "../LoginForm/FormContainer";
import { formStyles } from "../LoginForm/formStyles.styles";
import FormTitleBig from "../LoginForm/FormTitleBig";
import FormTitleSmall from "../LoginForm/FormTitleSmall";
import { QueryClient, QueryClientProvider, useMutation } from "react-query";
import EmailForPasswordRestoration from "./EmailForPasswordRestoration";

const queryClient = new QueryClient();

const PasswordRestorationWithEmail = () => {
  return (
    <FormContainer>
      <HeaderContainerCommon>
        <Box
          sx={[
            formStyles.formTitleContainer,
            {
              alignItems: "flex-end",
              letterSpacing: 0.002,
              mt: "50px",
            },
          ]}
        >
          <FormTitleBig title="Restore Password" />
          <FormTitleSmall title="Please enter your email" />
        </Box>
      </HeaderContainerCommon>
      
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <EmailForPasswordRestoration />
      </QueryClientProvider>
    </FormContainer>
  );
};

export default PasswordRestorationWithEmail;
