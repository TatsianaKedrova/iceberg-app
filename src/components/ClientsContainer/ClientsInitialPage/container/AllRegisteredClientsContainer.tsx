import React, { ChangeEvent, useEffect, useState } from "react";
import { useQuery } from "react-query";
import TableWithClients from "../AllRegisteredClientsTable/TableWithClientsContainer";
import { observer } from "mobx-react-lite";
import LoadingIcon from "../../../commonElements/LoadingIcon";
import { authService, clientService } from "../../../../services";
import AllRegisteredClientsUI from "../clientUI/AllRegisteredClientsUI";

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

  const handleChange = () => (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (getAllClients?.isLoading) {
    return <LoadingIcon />;
  }

  return (
    <>
      <AllRegisteredClientsUI
        searchTerm={searchTerm}
        handleChange={handleChange}
      />
      <TableWithClients availableClients={allClients} />
    </>
  );
});

export default AllRegisteredClientsContainer;
