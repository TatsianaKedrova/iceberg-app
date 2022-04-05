import React from "react";
import { Box, Stack } from "@mui/material";
import { formStyles } from "../formStyles.styles";
import TextInput from "../../../commonElements/FormComponents/TextInput";
import LabelForm from "../../../commonElements/FormComponents/LabelForm";
import PasswordInput from "../../../commonElements/FormComponents/PasswordInput";
import ButtonCommon from "../../../commonElements/ButtonCommon";
import RedirectComponent from "../RedirectComponent";
import authStore from "../../../mobX/auth.store";
import logIn from "../../../assets/authIcons/logIn.svg";
import {
  FieldErrors,
  FieldNamesMarkedBoolean,
  UseFormTrigger,
  UseFormRegister,
  UseFormGetValues,
} from "react-hook-form";
import { LoginFormTypes } from "../../../commonElements/FormComponents/ClassValidator";

interface IFormContainerUI {
  errors: FieldErrors;
  trigger: UseFormTrigger<LoginFormTypes>;
  getValues: UseFormGetValues<LoginFormTypes>;
  register: UseFormRegister<LoginFormTypes>;
  isDirty: boolean;
  dirtyFields: FieldNamesMarkedBoolean<LoginFormTypes>;
}

const FormContainerUI: React.FC<IFormContainerUI> = ({
  errors,
  trigger,
  getValues,
  register,
  isDirty,
  dirtyFields,
}) => {
  const { isError } = authStore;

  return (
    <>
      <Box sx={formStyles.textFieldContainer}>
        <TextInput
          autoComplete="username"
          fullWidth
          size="small"
          label={<LabelForm labelName="Email" isError={errors.email} />}
          placeholder="Email"
          error={!!errors.email || (isError.isEmailError && true)}
          onBlur={async () => await trigger("email")}
          onChange={async () => await trigger("email")}
          helperText={
            isError.isEmailError && getValues("email") && "User not found"
          }
          sx={(theme) => ({
            caretColor:
              errors.email && getValues("email") === ""
                ? theme.palette.error.main
                : null,
          })}
          inputProps={register("email", { required: true })}
        />
        <PasswordInput
          autoComplete="current-password"
          fullWidth
          size="small"
          label={<LabelForm labelName="Password" isError={errors.password} />}
          placeholder="Password"
          error={!!errors.password || (isError.isPasswordError && true)}
          helperText={
            isError.isPasswordError &&
            getValues("password") &&
            "Incorrect password"
          }
          onBlur={async () => await trigger("password")}
          onChange={async () => await trigger("password")}
          sx={(theme) => ({
            caretColor: errors.password ? theme.palette.error.main : null,
          })}
          inputProps={register("password", { required: true })}
        />
      </Box>
      <Stack direction="row" spacing={5}>
        <ButtonCommon
          disabled={
            !(Object.keys(errors).length === 0) ||
            isDirty === false ||
            dirtyFields.email === undefined ||
            dirtyFields.password === undefined
          }
        >
          <img src={logIn} alt="logo" style={{ marginRight: "8px" }} />
          Log in
        </ButtonCommon>
        <RedirectComponent
          actionTitle={"Forgot password?"}
          linkTo="/restore-password"
        />
      </Stack>
    </>
  );
};

export default FormContainerUI;
