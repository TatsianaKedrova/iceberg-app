import { TableCell } from "@mui/material";

interface StyledHeaderTableCellProps {
  cellName: string;
}

const StyledHeaderTableCell: React.FC<StyledHeaderTableCellProps> = ({cellName}) => {
  return (
    <TableCell
      align="left"
      sx={{
        // backgroundColor: "blue",
        color: "secondary.light",
        fontSize: "12px",
      }}
    >
      {cellName}
    </TableCell>
  );
};

export default StyledHeaderTableCell;
