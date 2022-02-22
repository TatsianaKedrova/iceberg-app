import React, { useCallback, useState } from "react";
import {
  InputAdornment,
  OutlinedInputProps,
  TextFieldProps,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import IconButton from "@mui/material/IconButton";
import { StyledTextField } from "./StyledTextField";

const PasswordInput: React.FC<TextFieldProps> = (props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const passwordIcon = (
    <InputAdornment position="end">
      <IconButton onClick={() => handleShowPassword()}>
        {showPassword ? (
          <VisibilityOffOutlinedIcon />
        ) : (
          <VisibilityOutlinedIcon />
        )}
      </IconButton>
    </InputAdornment>
  );

  return (
    <StyledTextField
      type={showPassword ? "text" : "password"}
      color="secondary"
      InputProps={
        {
          notched: false,
          endAdornment: passwordIcon,
        } as Partial<OutlinedInputProps>
      }
      {...props}
    />
  );
};

export default PasswordInput;
