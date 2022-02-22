import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, InputAdornment, Typography } from "@mui/material";
import TextInput from "../../../UI/FormComponents/TextInput";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "react-query";
import TableWithClients from "./TableWithClients";
import { observer } from "mobx-react-lite";
import LoadingIcon from "../../../commonElements/LoadingIcon";
import { authService, clientService } from "../../../../data-services";

const AllRegisteredClientsContainer = observer(() => {

  useEffect(() => {
    authService.getCurrentUser();
  }, []);

  //useState
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const getAllClients = useQuery(
    ["getAllClients", searchTerm],
    async () =>
      await clientService.getAllRegisteredClients(0, 0, true, searchTerm)
  );

  const allClients = getAllClients?.data?.data?.data?.list;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const searchIcon = (
    <InputAdornment position="end">
      <SearchIcon sx={{ width: "23px", height: "23px" }} />
    </InputAdornment>
  );

  if (getAllClients?.isLoading) {
    return <LoadingIcon />;
  }

  return (
    <>
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
      <TableWithClients availableClients={allClients} />
    </>
  );
});

export default AllRegisteredClientsContainer;
