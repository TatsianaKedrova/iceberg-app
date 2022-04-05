import React from "react";
import { IStepperFormProps } from "../../../commonElements/FormComponents/formTypes.types";
import LabelForm from "../../../commonElements/FormComponents/LabelForm";
import TextInput from "../../../commonElements/FormComponents/TextInput";
import Box from "@mui/material/Box";
import { Button, CircularProgress, InputAdornment } from "@mui/material";
import { useQuery } from "react-query";
import authStore from "../../../mobX/auth.store";
import { Navigate } from "react-router-dom";
import { authService } from "../../../services";
import { useFormContext } from "react-hook-form";

const regexClientId =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

const StepperClientId: React.FC<IStepperFormProps> = ({ inputValue }) => {

  const { trigger, register, formState: {errors} } = useFormContext();

  let isClientAllowsToJoin = useQuery(
    ["isClientAllowsToJoin", inputValue],
    async () => {
      console.log("input value: ", inputValue);

      if (inputValue) {
        console.log("we are inside if statement");
        const response = await authService.isClientAllowsToJoin(inputValue);
        return response;
      }
    },
    { enabled: !!inputValue?.match(regexClientId) }
  );

  console.log("isAuthenticated", authStore.isAuthenticated);

  if (authStore.isAuthenticated) {
    <Navigate to={"/login"} />;
  }

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
        label={
          <LabelForm labelName="Client Id" isError={errors.clientIdToJoin} />
        }
        placeholder="Enter an Id of a client you weant to join"
        error={
          !!errors.clientIdToJoin ||
          isClientAllowsToJoin.data?.data.data === false
        }
        onBlur={async () => await trigger("clientIdToJoin")}
        helperText={
          errors.clientIdToJoin?.message ||
          (isClientAllowsToJoin.data?.data.data === false &&
            "No available clients with such id")
        }
        sx={(theme) => ({
          caretColor: errors.clientIdToJoin
            ? theme.palette.error.main
            : null,
        })}
        inputProps={register("clientIdToJoin", {
          required: true,
          validate: async (value) => {
            console.log("validate value: ", value);
            console.log("inside validate function");
            return (await isClientAllowsToJoin.data?.data.data) === true;
          },
        })}
        endAdornment={isClientAllowsToJoin.isLoading && loadingIcon}
      />
      <Box sx={{ m: "20px 0px" }}>
        <Button
          disabled={
            !inputValue ||
            !!errors.clientIdToJoin === true ||
            isClientAllowsToJoin.isLoading === true ||
            isClientAllowsToJoin.data?.data.data === false
          }
          type="submit"
        >
          Finish
        </Button>
      </Box>
    </>
  );
};

export default StepperClientId;
