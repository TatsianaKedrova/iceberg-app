import * as React from "react";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

type AlertMessagePropsType = {
  handleClose?: () => void;
  message: string
}

const AlertMessage: React.FC<AlertMessagePropsType> = ({ handleClose, message }) => {
  return (
    <Alert
      severity="error"
      sx={{
        color: "error.main",
        fontFamily: "Inter",
        fontSize: "14px",
        fontWeight: 800,
        m: "10px",
        "& .MuiAlert-icon": {
          color: "error.main",
          mt: "5px",
        },
        "& .MuiAlert-message": {
          mt: "5px",
        },
      }}
      action={
        <IconButton color="error">
          <HighlightOffIcon
            onClick={handleClose}
            sx={{
              width: "25px",
              height: "25px",
            }}
          />
        </IconButton>
      }
    >
      {message}
    </Alert>
  );
};

export default AlertMessage;
