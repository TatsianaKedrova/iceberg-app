import { Box, Container, Grid } from "@mui/material";
import CommonPicture from "../commonElements/CommonPicture";
import { formStyles } from "./formStyles.styles";

type FormContainerType = {};

const FormContainer: React.FC<FormContainerType> = ({ children }) => {
  return (
    <Box sx={{ maxWidth: "100vw", maxHeight: "100vh" }}>
      <Grid
        container
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"stretch"}
      >
        <Grid item xs={12} sm={4.8} lg={5.5} xl={4.8}>
          <Container maxWidth="sm" disableGutters sx={formStyles.container}>
            {children}
          </Container>
        </Grid>
        <Grid xs sm={7.2} lg={6.5} xl={7.2}>
          <CommonPicture />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormContainer;
