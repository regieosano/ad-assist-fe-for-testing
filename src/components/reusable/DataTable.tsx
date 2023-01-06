import React from "react";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Table, TableCell, TableBody, Paper } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
 
}));


const DataTable = (props: any) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(event.target.value);
    if (rowsPerPage === 0) {
      setPage(0);
    }
    
  };

  
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 540 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ backgroundColor: " #0000FF"}}>
            <StyledTableRow>
              {props.columns.map((column: any) => (
                <StyledTableCell
                  key={column.id}
                  align="left"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {props.arrayOfData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, index: number) => {
                return (
                  <StyledTableRow hover tabIndex={-1} key={index}>
                    {props.columns.map((column: { id: React.Key }) => {
                      const value = row[column.id];
                      return (
                        <StyledTableCell key={column.id} align="left">
                          {column.id  === "no" ?
                            index + 1 + "."
                            : column.id === "edit" ? 
                              <EditOutlinedIcon 
                                style={{ cursor: "pointer" }}
                                onClick={() => props.handleEditRecord(row)}
                              />
                              : column.id === "delete"
                                ? <DeleteOutlinedIcon
                                  style={{ cursor: "pointer" }}
                                  onClick={() => props.handleDeleteRecord(row)}
                                />
                                : 
                                value
                          }
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[1, 3, 5, 10, 20]}
        component="div"
        count={props.arrayOfData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
    
 
};

export default DataTable;



