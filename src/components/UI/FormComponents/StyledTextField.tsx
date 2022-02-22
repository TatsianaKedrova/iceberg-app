import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { TextFieldProps } from "@mui/material";

export const StyledTextField = styled((props: TextFieldProps) => (
  <TextField 
    {...props}
  />
))(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 4,
    overflow: "hidden",
    height: 48,
    fontSize: "16px",
    backgroundColor: theme.palette.neutral.main,
    padding: "22px 0px 6px",
  },
  "& .MuiInputLabel-root": {
    top: "3px",
    fontSize: "16px",
    fontFamily: "Inter",
  },
  "& .MuiInputLabel-shrink": {
    top: 13,
    "& #label": {
      color: theme.palette.secondary.light,
    },
  },
  "& .MuiInputAdornment-root": {
    paddingRight: "10px",
    paddingBottom: "10px",
  },
}));
