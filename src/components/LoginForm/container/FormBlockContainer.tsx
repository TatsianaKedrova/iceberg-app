import { useForm, SubmitHandler } from "react-hook-form";
import { formStyles } from "../formStyles.styles";
import Box from "@mui/material/Box";
import { observer } from "mobx-react-lite";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { LoginFormTypes } from "../../../commonElements/FormComponents/ClassValidator";
import authStore from "../../../mobX/auth.store";
import { LogInType } from "../../../dtos/authDTO/authentication-result.dto";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import FormContainerUI from "../client/FormContainerUI";

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
  const { isAuth } = authStore;

  if (isAuth) {
    return <Navigate to="/clients" />;
  }

  return (
    <Box
      component="form"
      sx={formStyles.formContainer}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormContainerUI
        errors={errors}
        trigger={trigger}
        getValues={getValues}
        register={register}
        isDirty={isDirty}
        dirtyFields={dirtyFields}
      />
    </Box>
  );
};

const Auth = observer(FormBlockContainer);
export { Auth };
