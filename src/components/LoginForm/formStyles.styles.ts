export const formStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "60px 77px",
  } as const,
  formTitleContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    mt: "80px",
    mb: "48px",
  } as const,
  buttonContainer: {},
  headerText: {
    fontFamily: "Inter",
    fontWeight: "800",
    fontSize: "14px",
    lineHeight: "24px",
    color: "#12222E",
  },
  createAccountStyle: {
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: "800",
    height: "24px",
    color: "#86898B",
    paddingTop: "13px",
    paddingBottom: "10px",
    textDecorationLine: "underline",
    cursor: "pointer",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "128px",
    borderBottom: "1px solid #DBDCE0",
  } as const,
  headerContainerText: {
    marginTop: "55px",
    height: "inherit",
    textAlign: "right",
  } as const,

  logoSignStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  } as const,
  inputStyle: {
    borderTopWidth: "4px!important",
    position: "relative",
    padding: "22px 0px 6px",
    m: "-1px 0px 0px",
    backgroundColor: "#FFFFFF",
    color: "error.main",
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "20px",
    "&.MuiOutlinedInput-root": {
      padding: "22px 0px 6px",
    },
    "& input:focus": {
      oultline: "none",
      border: "none",
    },
  } as const,

  textFieldContainer: {
    position: "relative",
    "& .MuiFormControl-root": {
      position: "relative",
      mb: "30px",
    },
    "& .MuiFormHelperText-root": {
      position: "absolute",
      bottom: "-22px",
      fontFamily: "Inter",
      fontSize: "11px",
      padding: 0,
      margin: 0,
    },
    width: "100%",
    height: "140px",
    mb: "48px",
  } as const,

  textFieldStyle: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderColor: "#12222E",
    boxSizing: "border-box",
    borderRadius: "4px",
    marginBottom: "24px",
    outline: "none",
    padding: "10px",
    fontSize: "5px",
  } as const,
  formContainer: {
    width: "100%",
  } as const,
  registrationForm: {
    padding: "15px",
    "& .MuiStepLabel-root": {
      mb: "12px",
      "& .MuiStepLabel-label": {
        ml: "12px",
        color: "secondary.main",
        fontFamily: "Inter",
        fontWeight: 800,
        fontSize: "14px",
      },

      "& .MuiSvgIcon-root": {
        fontFamily: "Inter",
        fontSize: "22px",
        color: "#091620",
        width: "25px",
      },
      "& .MuiStepIcon-text": {
        fill: "#fff",
      },
      "&:hover": {
        backgroundColor: "secondary.contrastText",
        cursor: "pointer",
      },
    },
    "& .MuiStepContent-root": {
      paddingTop: "10px",
      paddingLeft: "30px",
    },
    "& .MuiFormHelperText-root": {
      fontFamily: "Inter",
      fontSize: "11px",
      padding: 0,
      margin: 0,
    },
    "& .MuiButton-root": {
      fontFamily: "Inter",
      fontSize: "12px",
      fontWeight: 800,
      color: "secondary.main",
      textTransform: "none",
      padding: "10px",
      "&:hover": {
        backgroundColor: "secondary.contrastText",
      },
    },
  },
  loadingStyle: {
    filter: window.blur()
  } as const,
};
