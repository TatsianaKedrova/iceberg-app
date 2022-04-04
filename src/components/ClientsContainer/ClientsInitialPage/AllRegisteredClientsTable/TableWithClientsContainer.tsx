import React from "react";
import clientsStore from "../../../../mobX/clients.store";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Client } from "../../../../dtos/authDTO/authentication-result.dto";
import TableWithClientsUI from "../clientUI/TableWithClientsUI";

interface ITableWithClientsContainerProps {
  availableClients: Client[] | undefined | null;
}

export const TableWithClientsContainer: React.FC<ITableWithClientsContainerProps> =
  observer(({ availableClients }) => {
    const navigate = useNavigate();

    const formatDate = (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(dateString).toLocaleDateString([], options);
    };

    const knowDate = (date: Date): string | undefined => {
      if (date.toString()) {
        return formatDate(date.toString());
      }
    };

    const navigateToSelectedClient = (client: Client) => {
      clientsStore.setSelectedClientId(client.id);
      clientsStore.setSelectedClientName(client.name);
      clientsStore.getCurrentClientAccount();
      return navigate("/dashboard");
    };

    return (
      <TableWithClientsUI
        clients={availableClients}
        knowDate={knowDate}
        navigateToSelectedClient={navigateToSelectedClient}
      />
    );
  });

export default TableWithClientsContainer;
