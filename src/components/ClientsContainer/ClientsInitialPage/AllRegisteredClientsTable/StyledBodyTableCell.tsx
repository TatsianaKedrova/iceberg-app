import { TableCell } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { clientsStyles } from "../../clientsStyles.styles";

interface StyledBodyTableCellProps {
  cellName?: string | null;
}

const StyledBodyTableCell: React.FC<StyledBodyTableCellProps> = ({
  cellName,
}) => {
  const theme = useTheme();

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
