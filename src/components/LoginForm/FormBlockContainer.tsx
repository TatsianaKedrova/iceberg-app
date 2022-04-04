import { useForm, SubmitHandler } from "react-hook-form";
import { formStyles } from "./formStyles.styles";
import Box from "@mui/material/Box";
import { observer } from "mobx-react-lite";
import RedirectComponent from "./RedirectComponent";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Stack } from "@mui/material";
import PasswordInput from "../UI/FormComponents/PasswordInput";
import TextInput from "../UI/FormComponents/TextInput";
import LabelForm from "../UI/FormComponents/LabelForm";
import ButtonCommon from "../commonElements/ButtonCommon";
import { LoginFormTypes } from "../UI/FormComponents/ClassValidator";
import authStore from "../../mobX/auth.store";
import { LogInType } from "../../dtos/authDTO/authentication-result.dto";
import { Navigate } from "react-router-dom";
import logIn from "../assets/authIcons/logIn.svg";
import { useEffect } from "react";

const FormBlockContainer = () => {
  const {
    getValues,
    register,
    handleSubmit,
    trigger,
    formState: { dirtyFields, errors, isDirty },
  } = useForm<LoginFormTypes>({
    resolver: classValidatorResolver(LoginFormTypes),
  });

  useEffect(() => {
    authStore.setUserStorage(null);
    authStore.setToken(null);
  }, []);

  const onSubmit: SubmitHandler<LoginFormTypes> = (data: LoginFormTypes) => {
    const { email, password } = data;
    authStore.logIn({
      login: email,
      password,
    } as LogInType);
  };

  //Auth Store
  const { isAuth, isError } = authStore;

  if (isAuth) {
    return <Navigate to="/clients" />;
  }

  return (
    <Box
      component="form"
      sx={formStyles.formContainer}
      onSubmit={handleSubmit(onSubmit)}
    >
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
    </Box>
  );
};

const Auth = observer(FormBlockContainer);
export { Auth };
