import React from "react";
import { Box } from "@mui/material";
import HeaderContainerCommon from "../../../commonElements/HeaderContainerCommon";
import FormContainer from "../FormContainer";
import { formStyles } from "../formStyles.styles";
import FormTitleBig from "../FormTitleBig";
import FormTitleSmall from "../FormTitleSmall";
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
