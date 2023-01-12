import React from "react";
import { Typography, Box, makeStyles, Grid } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles((theme) => ({
  borderToLeft: {
    borderLeft: "1px solid rgb(146 140 140 / 50%)",
    textAlign: "center",
  },
  paddingTopBottom: {
    padding: "8px 0px",
  },
  table: {
    minWidth: 650,
    "& .tablehead":{
      "& th":{
        minWidth:"16.66%",
        border: "1px solid #ccc",
    fontSize: "13px",
      },
    },
  },
}));

export default function MilestoneData() {
  const classes = useStyles();

  return (
    <Box mb={3}>
      <Typography variant="h3">Milestone</Typography>
      {/* <Box mt={3}> 



      <TableContainer >
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow className="tablehead">
            <TableCell>Milestone</TableCell>
            <TableCell >Name</TableCell>
            <TableCell >Amount</TableCell>
            <TableCell >Due Date</TableCell>
            <TableCell >Email</TableCell>
            <TableCell >Priority</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
      </Box> */}
    </Box>
  );
}
