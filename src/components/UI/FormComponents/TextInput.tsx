import React from "react";
import { OutlinedInputProps, TextFieldProps } from "@mui/material";
import { StyledTextField } from "./StyledTextField";

type MyTextInputProps = TextFieldProps & { endAdornment?: React.ReactNode }

const TextInput: React.FC<MyTextInputProps> = (props) => {
  return (
    <StyledTextField
      type={"text"}
      color="secondary"
      InputProps={
        {
          notched: false,
          endAdornment: props.endAdornment
        } as Partial<OutlinedInputProps>
      }
      {...props}
    />
  );
};

export default TextInput;
