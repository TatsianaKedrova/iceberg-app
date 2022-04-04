import React, { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { FormInputsValidation } from "../UI/FormComponents/ClassValidator";
import { formStyles } from "../LoginForm/formStyles.styles";
import { observer } from "mobx-react-lite";
import { Typography } from "@mui/material";
import { useMutation, useQuery } from "react-query";
import StepperInitial from "./steppers/StepperInitial";
import StepperCodeVerification from "./steppers/StepperCodeVerification";
import { authService, clientService } from "../../services/index";
import { VerifyCodeType } from "../../dtos/authDTO/authentication-result.dto";
import StepperPasswordConfirmation from "./steppers/StepperPasswordConfirmation";
import StepperClientId from "./steppers/StepperClientId";
import AlertMessage from "./AlertMessage";
import authStore from "../../mobX/auth.store";

const steps = [
  {
    label: "Your information",
  },
  {
    label: "Email Confirmation",
    description:
      "We have sent the verification code to your email. Please enter it to continue",
  },
  {
    label: "Password",
    description: ``,
  },
  {
    label: "Client",
    description: ``,
  },
];

const RegistrationForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const methods = useForm<FormInputsValidation>({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      passwordConfirmation: "",
      emailVerificationCode: "",
      clientIdToJoin: "",
    },
    mode: "all",
    resolver: classValidatorResolver(FormInputsValidation),
  });

  const onSubmit: SubmitHandler<FormInputsValidation> = (
    data: FormInputsValidation
  ) => {
    authStore.registerUser({
      ...data,
      clientCreationNeeded: false,
      newClientName: emailValue,
      inviteId: "",
    });
  };

  const isRegistrationWithoutInvitationAllowed = useCallback(async () => {
    const response = await authService.isRegistrationWithoutInvitationAllowed();
    return response;
  }, [authService]);

  const getClientsToJoin = useCallback(async () => {
    const response = await clientService.clientsToJoin();
    return response;
  }, [clientService]);

  //input values
  const emailValue = methods.getValues("email");
  const codeValue = methods.getValues("emailVerificationCode");
  const passwordValue = methods.getValues("password");
  const clientIdValue = methods.getValues("clientIdToJoin");

  //React Query
  const sendVerificationCode = useCallback(async () => {
    const response = await authService.sendVerificationCode(emailValue);
    return response;
  }, [emailValue]);

  const verifyCode = useCallback(async () => {
    const response = await authService.verifyCode({
      email: emailValue,
      code: codeValue,
    } as VerifyCodeType);
    return response;
  }, [emailValue, codeValue]);

  //useQuery Hook
  const registrationWithoutInvitation = useQuery(
    "isRegistrationWithoutInvitationAllowed",
    isRegistrationWithoutInvitationAllowed,
    { refetchOnWindowFocus: false }
  );
  const { data: clientIdInfo } = useQuery("clientsToJoin", getClientsToJoin, {
    refetchOnWindowFocus: false,
  });

  // useMutation Hook
  const sendCodeToEmail = useMutation(sendVerificationCode);
  const verificationCodeInfo = useMutation(verifyCode);

  //handle buttons in stepper
  const handleNext = useCallback(() => {
    if (activeStep === 0) {
      sendCodeToEmail.mutate();
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === 1) {
      const data = verificationCodeInfo.mutateAsync();
      data.then((response) => {
        if (response.data.data === false) {
          return;
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      });
    } else if (activeStep === 2) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  }, [activeStep, sendCodeToEmail, verificationCodeInfo]);

  return (
    <>
      {!registrationWithoutInvitation.isLoading && !registrationWithoutInvitation.data?.data && (
        <AlertMessage message="You need an invite to join the system" />
      )}
      <Box sx={{ width: "inherit", mt: "10px" }}>
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={formStyles.registrationForm}
        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              {sendCodeToEmail.isLoading && "Is Loading..."}
              <StepContent>
                {step.description && (
                  <Typography
                    sx={{
                      color: "secondary.main",
                      fontFamily: "Inter",
                      fontWeight: 300,
                      fontSize: "14px",
                      mb: "20px",
                    }}
                  >
                    {step.description}
                  </Typography>
                )}
                <FormProvider {...methods}>
                  <Box
                    component="form"
                    sx={formStyles.formContainer}
                    onSubmit={methods.handleSubmit(onSubmit)}
                  >
                    {index === 1 ? (
                      <StepperCodeVerification
                        inputValue={codeValue}
                        mutationResult={verificationCodeInfo}
                        handleNextFunction={handleNext}
                      />
                    ) : index === 2 ? (
                      <StepperPasswordConfirmation
                        inputValue={passwordValue}
                        handleNextFunction={handleNext}
                      />
                    ) : index === 3 ? (
                      <StepperClientId
                        handleNextFunction={handleNext}
                        inputValue={clientIdValue}
                      />
                    ) : (
                      <StepperInitial
                        inputValue={emailValue}
                        handleNextFunction={handleNext}
                      />
                    )}
                  </Box>
                </FormProvider>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </>
  );
};

const RegistrationFormObserver = observer(RegistrationForm);
export default RegistrationFormObserver;
