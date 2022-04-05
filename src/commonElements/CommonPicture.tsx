import { Box } from "@mui/material";
import mainPicture from "../assets/authIcons/mainPicture.jpg";

function CommonPicture() {
  return (
    <Box>
      <img
        src={mainPicture}
        alt="main picture"
        style={{
          width: "100%",
          height: "100vh",
          objectFit: "cover",
        }}
      />
    </Box>
  );
}

export default CommonPicture;
