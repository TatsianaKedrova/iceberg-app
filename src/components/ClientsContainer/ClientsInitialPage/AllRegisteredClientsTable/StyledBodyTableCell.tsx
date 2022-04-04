import { TableCell } from "@mui/material";
import { clientsStyles } from "../../styles/clientsStyles.styles";

interface StyledBodyTableCellProps {
  cellName?: string | null;
}

const StyledBodyTableCell: React.FC<StyledBodyTableCellProps> = ({
  cellName,
}) => {

  return (
    <TableCell
    sx={[
      clientsStyles.clientNameCell,
      { fontWeight: 400, textDecorationLine: "none" },
    ]}
  >
    {cellName}
  </TableCell>
  );
};

export default StyledBodyTableCell;
