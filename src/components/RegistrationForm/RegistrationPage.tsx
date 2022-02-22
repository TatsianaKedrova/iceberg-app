import { Box } from "@mui/material";
import FormContainer from "../LoginForm/FormContainer";
import RedirectComponent from "../LoginForm/RedirectComponent";
import HeaderContainerCommon from "../commonElements/HeaderContainerCommon";
import FormTitleBig from "../LoginForm/FormTitleBig";
import FormTitleSmall from "../LoginForm/FormTitleSmall";
import { formStyles } from "../LoginForm/formStyles.styles";
import RegistrationFormObserver from "./RegistrationForm";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const RegistrationPage = () => {
  return (
    <FormContainer>
      <HeaderContainerCommon>
        <Box
          sx={[
            formStyles.formTitleContainer,
            { alignItems: "flex-end", letterSpacing: 0.002, mt: "50px" },
          ]}
        >
          <FormTitleBig title="Create account" />
          <FormTitleSmall title="Please enter your information" />
        </Box>
      </HeaderContainerCommon>
      <Box sx={{ mt: "80px" }}>
        <RedirectComponent actionTitle={"Return to login"} linkTo={"/login"} />
      </Box>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <RegistrationFormObserver />
      </QueryClientProvider>
    </FormContainer>
  );
};

export default RegistrationPage;
