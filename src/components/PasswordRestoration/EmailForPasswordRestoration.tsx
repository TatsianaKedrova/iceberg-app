import React from "react";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { SubmitHandler, useForm } from "react-hook-form";
import { PasswordRestoreWitEmail } from "../UI/FormComponents/ClassValidator";
import { useNavigate } from "react-router-dom";
import { authService } from "../../data-services";
import { useMutation } from "react-query";
import { Button, CircularProgress, Container, Stack } from "@mui/material";
import ButtonCommon from "../commonElements/ButtonCommon";
import LabelForm from "../UI/FormComponents/LabelForm";
import TextInput from "../UI/FormComponents/TextInput";
import { formStyles } from "../LoginForm/formStyles.styles";
import { Box } from "@mui/system";

const EmailForPasswordRestoration = () => {
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<PasswordRestoreWitEmail>({
    resolver: classValidatorResolver(PasswordRestoreWitEmail),
    mode: "all",
  });

  const onSubmit: SubmitHandler<PasswordRestoreWitEmail> = (
    data: PasswordRestoreWitEmail
  ) => {
    passwordRestorationRequest.mutate();
  };

  const requestPasswordRestoration = () => {
    const response = authService.requestPasswordRestoration(emailValue);
    return response;
  };

  const emailValue = getValues("email");
  const navigate = useNavigate();

  const navigateToLogin = () => {
    console.log("inside navigation function");
    return navigate("/login");
  };

  const passwordRestorationRequest = useMutation(requestPasswordRestoration);
  console.log("errors: ", errors.email);
  if (passwordRestorationRequest.isLoading) {
    console.log("we are inside circular");
    return (
      <CircularProgress
        disableShrink
        size={30}
      />
    );
  }

  if (passwordRestorationRequest.data?.data.data) {
    return (
      <Box
        sx={{
          mt: "100px",
          fontFamily: "Inter",
          fontSize: "38px",
          fontWeight: "800",

        }}
      >
        Restoration link has been sent to your email
      </Box>
    );
  }

  return (
    <Box
      component="form"
      sx={[
        formStyles.formContainer,
        {
          mt: "100px",
          "& .MuiFormHelperText-root": {
            fontFamily: "Inter",
            fontSize: "11px",
            padding: 0,
            margin: 0,
          },
        },
      ]}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        fullWidth
        size="small"
        sx={(theme) => ({
          caretColor: errors.email ? theme.palette.error.main : null,
          mb: "30px",
        })}
        inputProps={register("email", {
          validate: (value) => {
            console.log("we are inside validate");
            return passwordRestorationRequest.data?.data.data === true;
          },
        })}
        onChange={() => {
          if (passwordRestorationRequest.isError) {
            passwordRestorationRequest.reset();
          }
        }}
        placeholder="Please enter the email here"
        error={!!errors.email || passwordRestorationRequest.isError}
        label={<LabelForm labelName="Email" isError={errors.email} />}
        helperText={
          errors.email?.message ||
          (passwordRestorationRequest.isError && "No user with such email")
        }
      />
      <Stack direction={"row"} spacing={1}>
        <ButtonCommon
          disabled={
            !(Object.keys(errors).length === 0) ||
            isDirty === false ||
            passwordRestorationRequest.isError
          }
        >
          Restore
        </ButtonCommon>
        <Button
          variant="outlined"
          sx={{
            borderRadius: "90px",
            width: "130px",
            height: "48px",
            fontFamily: "Inter",
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: "24px",
            color: "primary.main",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "primary.main",
              color: "neutral.main",
            },
          }}
          onClick={navigateToLogin}
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};

export default EmailForPasswordRestoration;
