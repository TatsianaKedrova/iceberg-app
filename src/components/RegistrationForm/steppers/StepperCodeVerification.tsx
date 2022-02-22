import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { IStepperFormProps } from "../../UI/FormComponents/formTypes.types";
import LabelForm from "../../UI/FormComponents/LabelForm";
import TextInput from "../../UI/FormComponents/TextInput";
import AlertMessage from "../AlertMessage";
import { Button } from "@mui/material";
import { useFormContext } from "react-hook-form";

const StepperCodeVerification: React.FC<IStepperFormProps> = ({

  mutationResult,
  inputValue,
  handleNextFunction,
}) => {

  const {
    trigger,
    register,
    formState: { errors },
  } = useFormContext();


  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (mutationResult?.data?.data.data === false) {
      setOpen(true);
    }
  }, [mutationResult?.data?.data.data]);

  console.log("is code valid?: ", mutationResult?.data?.data);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TextInput
        fullWidth
        size="small"
        label={
          <LabelForm
            labelName="Code"
            isError={errors.emailVerificationCode}
          />
        }
        placeholder="Please enter confirmation code"
        error={!!errors.emailVerificationCode}
        onBlur={async () => await trigger("emailVerificationCode")}
        sx={(theme) => ({
          caretColor: errors.emailVerificationCode
            ? theme.palette.error.main
            : null,
        })}
        inputProps={register("emailVerificationCode", {
          required: true,
        })}
      />
      {open && <AlertMessage handleClose={handleClose} message="Email verification code is invalid" />}

      <Box sx={{ m: "20px 0px" }}>
        <Button disabled={!inputValue} onClick={handleNextFunction}>
          Next step
        </Button>
      </Box>
    </>
  );
};

export default StepperCodeVerification;
