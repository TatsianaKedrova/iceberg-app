import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import clientsStore from "../../../../bll/clients.store";
import { styled } from "@mui/material/styles";
import { observer } from "mobx-react-lite";
import StyledHeaderTableCell from "./StyledHeaderTableCell";
import StyledBodyTableCell from "./StyledBodyTableCell";
import { clientsStyles } from "../../clientsStyles.styles";
import { useNavigate } from "react-router-dom";
import { Client } from "../../../../dtos/authDTO/authentication-result.dto";

type TableWithClientsProps = {
  availableClients: Client[] | undefined | null;
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.success.light,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const TableWithClients: React.FC<TableWithClientsProps> = observer(
  ({ availableClients }) => {
    const navigate = useNavigate();
    console.log("map result: ", availableClients);

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

    console.log("searchResults:", availableClients);
    return (
      <TableContainer component={Paper}>
        <Table
          sx={{ maxWidth: "1540px", ml: "30px", mr: "30px" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow sx={{ borderTop: "none" }}>
              <StyledHeaderTableCell cellName="Client Name" />
              <StyledHeaderTableCell cellName="Created Date" />
              <StyledHeaderTableCell cellName="Created By" />
            </TableRow>
          </TableHead>
          <TableBody>
            {availableClients?.map((client) => {
              console.log("clients are here");

              return (
                <StyledTableRow key={client.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={clientsStyles.clientNameCell}
                    onClick={() => navigateToSelectedClient(client)}
                  >
                    {client.name}
                  </TableCell>
                  <StyledBodyTableCell cellName={knowDate(client.createdAt)} />
                  <StyledBodyTableCell
                    cellName={client.createdByUser?.fullName}
                  />
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
);

export default TableWithClients;
