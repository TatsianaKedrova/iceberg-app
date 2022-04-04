import React from "react";
import LabelForm from "../../UI/FormComponents/LabelForm";
import PasswordInput from "../../UI/FormComponents/PasswordInput";
import { IStepperFormProps } from "../../UI/FormComponents/formTypes.types";
import { Box, Button } from "@mui/material";
import { useFormContext } from "react-hook-form";

const StepperPasswordConfirmation: React.FC<IStepperFormProps> = ({
  handleNextFunction,
}) => {
  const {
    trigger,
    register,
    formState: { dirtyFields, errors },
  } = useFormContext();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          m: "20px 0px",
        }}
      >
        <PasswordInput
          autoComplete="current-password"
          fullWidth
          size="small"
          label={<LabelForm labelName="Password" isError={errors.password} />}
          placeholder="Enter your password here"
          error={!!errors.password}
          onBlur={async () => await trigger("password")}
          onChange={async () => await trigger("password")}
          sx={(theme) => ({
            caretColor: errors.password ? theme.palette.error.main : null,
            mb: "20px",
          })}
          helperText={errors.password?.message}
          inputProps={register("password", { required: true })}
        />
        <PasswordInput
          fullWidth
          size="small"
          label={
            <LabelForm
              labelName="Password Confirmation"
              isError={errors.passwordConfirmation}
            />
          }
          placeholder="Repeat your password"
          error={!!errors.passwordConfirmation}
          onBlur={async () => await trigger("passwordConfirmation")}
          onChange={async () => await trigger("passwordConfirmation")}
          sx={(theme) => ({
            caretColor: errors.passwordConfirmation
              ? theme.palette.error.main
              : null,
          })}
          helperText={errors.passwordConfirmation?.message}
          inputProps={register("passwordConfirmation", { required: true })}
        />
      </Box>
      <Button
        disabled={
          !(Object.keys(errors).length === 0) ||
          dirtyFields?.password === undefined ||
          dirtyFields?.passwordConfirmation === undefined
        }
        variant="text"
        onClick={handleNextFunction}
      >
        Next step
      </Button>
    </>
  );
};

export default StepperPasswordConfirmation;
