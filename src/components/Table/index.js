import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Tooltip from "@mui/material/Tooltip";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function CustomTableCell({ tooltip, content }) {
  const inner = <TableCell align="center">{content}</TableCell>;

  if (tooltip !== "") {
    return (
      <Tooltip title={`Turma(s) ${tooltip}`} arrow>
        {inner}
      </Tooltip>
    );
  }

  return inner;
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export function CustomTable(props) {
  const rows = props.rows;
  const classes = props.classes;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <colgroup>
          <col width="16.66%" />
          <col width="16.66%" />
          <col width="16.66%" />
          <col width="16.66%" />
          <col width="16.66%" />
          <col width="16.66%" />
        </colgroup>
        <TableHead>
          <TableCell component="th" scope="row" align="center">
            Hora/Dia
          </TableCell>
          <TableCell component="th" scope="row" align="center">
            SEG
          </TableCell>
          <TableCell component="th" scope="row" align="center">
            TER
          </TableCell>
          <TableCell component="th" scope="row" align="center">
            QUA
          </TableCell>
          <TableCell component="th" scope="row" align="center">
            QUI
          </TableCell>
          <TableCell component="th" scope="row" align="center">
            SEX
          </TableCell>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, i) => {
            let time = "";

            switch (i) {
              case 0:
                time = "08h";
                break;
              case 1:
                time = "10h";

                break;
              case 2:
                time = "14h";

                break;
              case 3:
                time = "16h";
                break;
              default:
                time = "XXh";
                break;
            }

            return (
              <TableRow key={"a"}>
                <TableCell align="center">
                  <b>{time}</b>
                </TableCell>
                <CustomTableCell
                  tooltip={classes[page][row[0]]}
                  content={row[0]}
                />
                <CustomTableCell
                  tooltip={classes[page][row[1]]}
                  content={row[1]}
                />
                <CustomTableCell
                  tooltip={classes[page][row[2]]}
                  content={row[2]}
                />
                <CustomTableCell
                  tooltip={classes[page][row[3]]}
                  content={row[3]}
                />
                <CustomTableCell
                  tooltip={classes[page][row[4]]}
                  content={row[4]}
                />
              </TableRow>
            );
          })}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              labelDisplayedRows={({ from, to, count }) => {
                return `${to / 4} of ${count / 4}`;
              }}
              rowsPerPageOptions={[]}
              colSpan={6}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
