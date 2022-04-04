import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { Client } from "../../../../dtos/authDTO/authentication-result.dto";
import { clientsStyles } from "../../clientsContainer-styles/clientsStyles.styles";
import StyledBodyTableCell from "./StyledBodyTableCell";
import StyledHeaderTableCell from "./StyledHeaderTableCell";

interface ITableWithClientsUIProps {
  clients: Client[] | undefined | null;
  knowDate: (date: Date) => string | undefined;
  navigateToSelectedClient: (client: Client) => void;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.success.light,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableWithClientsUI: React.FC<ITableWithClientsUIProps> = ({
  clients,
  knowDate,
  navigateToSelectedClient,
}) => {
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
          {clients?.map((client) => {
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
};

export default TableWithClientsUI;
