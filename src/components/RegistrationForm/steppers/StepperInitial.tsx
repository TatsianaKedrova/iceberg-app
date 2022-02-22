import React, { useCallback } from "react";
import { Box, Button, InputAdornment } from "@mui/material";
import { IStepperFormProps } from "../../UI/FormComponents/formTypes.types";
import LabelForm from "../../UI/FormComponents/LabelForm";
import TextInput from "../../UI/FormComponents/TextInput";
import CircularProgress from "@mui/material/CircularProgress";
import { authService } from "../../../data-services";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";

let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const StepperInitial: React.FC<IStepperFormProps> = ({
  handleNextFunction,
  inputValue,
}) => {
  const {
    register,
    trigger,
    formState: { errors, isDirty, dirtyFields },
  } = useFormContext();

  //callback function for useMutation
  const verifyIsEmailTaken = useCallback(async () => {
    if (inputValue) {
      const response = await authService.verifyIsEmailTaken(inputValue);
      return response;
    }
  }, [inputValue]);

  //useMutation hook
  const checkIsEmailTaken = useMutation(verifyIsEmailTaken);

  const verifyEmailIsTaken = (onChangeValue?: string) => {
    if (onChangeValue?.match(regexEmail)) {
      const response = checkIsEmailTaken.mutate();
      return response;
    }
  };

  const isEmailTakenError = () => {
    if (checkIsEmailTaken?.data !== undefined) {
      if (checkIsEmailTaken?.data?.data.data === false) {
        return true;
      }
    }
  };

  const loadingIcon = (
    <InputAdornment position="end">
      <CircularProgress disableShrink sx={{ marginBottom: "5px" }} size={30} />
    </InputAdornment>
  );

  return (
    <>
      <TextInput
        fullWidth
        size="small"
        label={<LabelForm labelName="Email" isError={errors?.email} />}
        placeholder="Please enter your email here"
        error={!!errors.email || isEmailTakenError()}
        // onBlur={async () => await trigger("email")}
        // onChange={async (e) => {
        //  await verifyEmailIsTaken(e.target.value);
        // }}
        helperText={
          errors.email?.message ||
          (checkIsEmailTaken?.data?.data.data === true &&
            "Email is already in use")
        }
        sx={(theme) => ({
          caretColor: errors.email ? theme.palette.error.main : null,
        })}
        inputProps={register("email", {
          validate: async (v) => {
            console.log("inside validate function");
            return (
              (await (await authService.verifyIsEmailTaken(v)).data.data) ===
              true
            );
          },
        })}
        endAdornment={checkIsEmailTaken?.isLoading && loadingIcon}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          m: "20px 0px",
        }}
      >
        <div style={{ marginRight: "5px" }}>
          <TextInput
            fullWidth
            size="small"
            label={
              <LabelForm labelName="First Name" isError={errors.firstName} />
            }
            helperText={errors.firstName?.message}
            placeholder="Please enter your firstname here"
            error={!!errors.firstName}
            onBlur={async () => await trigger("firstName")}
            sx={(theme) => ({
              caretColor: errors.firstName ? theme.palette.error.main : null,
            })}
            inputProps={register("firstName")}
          />
        </div>
        <div style={{ marginLeft: "5px" }}>
          <TextInput
            fullWidth
            size="small"
            label={
              <LabelForm labelName="Last Name" isError={errors.lastName} />
            }
            placeholder="Please enter your lastname here"
            error={!!errors.lastName}
            onBlur={async () => await trigger("lastName")}
            helperText={errors.lastName?.message}
            sx={(theme) => ({
              caretColor: errors.lastName ? theme.palette.error.main : null,
            })}
            inputProps={register("lastName")}
          />
        </div>
      </Box>
      <Box sx={{ mb: 2 }}>
        <div>
          <Button
            disabled={
              !(Object.keys(errors).length === 0) ||
              isDirty === false ||
              dirtyFields?.email === undefined ||
              dirtyFields.firstName === undefined ||
              dirtyFields?.lastName === undefined ||
              checkIsEmailTaken?.isLoading === true
            }
            variant="text"
            onClick={handleNextFunction}
          >
            Next step
          </Button>
        </div>
      </Box>
    </>
  );
};

export default StepperInitial;
