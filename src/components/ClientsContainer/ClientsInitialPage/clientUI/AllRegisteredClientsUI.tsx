import { Box, InputAdornment, Typography } from "@mui/material";
import React from "react";
import TextInput from "../../../UI/FormComponents/TextInput";
import SearchIcon from "@mui/icons-material/Search";

interface AllRegisteredClientsUIProps {
  searchTerm: string | null;
  handleChange: () => void;
}

const AllRegisteredClientsUI: React.FC<AllRegisteredClientsUIProps> = ({
  handleChange,
  searchTerm,
}) => {
  const searchIcon = (
    <InputAdornment position="end">
      <SearchIcon sx={{ width: "23px", height: "23px" }} />
    </InputAdornment>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        m: "30px",
        justifyContent: "space-between",
      }}
    >
      <Typography
        variant="h4"
        component={"div"}
        fontFamily={"typography.fontFamily"}
        fontSize={"32px"}
        fontWeight={700}
      >
        Clients
      </Typography>
      <TextInput
        size="small"
        label={"Search by name"}
        type="text"
        endAdornment={searchIcon}
        value={searchTerm}
        onChange={handleChange}
      />
    </Box>
  );
};

export default AllRegisteredClientsUI;
