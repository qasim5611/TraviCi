import React, { useState } from "react";
import ResponseList from "./ResponseList";
import {
  TableCell,
  TableRow,
  makeStyles,
  Box,
  Grid,
  Avatar,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  Button,
  Typography,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: "1100px",
  },
}));

export default function ResponseData({
  viewDataList,
  viewData,
  requestedData1,
  filterData,
  disputeHandler,
  mileid,
  loading,
  setDeposite
}) {
  const classes = useStyles();
  const [requestedData, setRequestedData] = useState();
  const [openReply, setOpenReply] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDataReply = (data) => {
    setRequestedData(data);
    setOpenReply(true);
  };
  const handleData = (data) => {
    setRequestedData(data);
    setOpen(true);
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell" align="left">
              Sr. No
            </TableCell>
            <TableCell className="tableCell" align="left">
              Document
            </TableCell>
            <TableCell className="tableCell" align="left">
              User Type
            </TableCell>

            <TableCell className="tableCell" align="left">
              Message
            </TableCell>
            <TableCell className="tableCell" align="left">
              Wallet Address
            </TableCell>
            <TableCell className="tableCell" align="left">
              Start Date
            </TableCell>
            <TableCell className="tableCell" align="left">
              End Date
            </TableCell>
            <TableCell className="tableCell" align="left">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {viewDataList &&
            viewDataList.map((data, index) => (
              <ResponseList
                data={data}
                classes={classes}
                index={index}
                viewData={viewData}
                requestedData1={requestedData1}
                filterData={filterData}
                disputeHandler={disputeHandler}
                mileid={mileid}

                loading={loading}
                setDeposite={setDeposite}
              />
            ))}
        </TableBody>
        {viewDataList && viewDataList?.length === 0 && "No Data Found"}
      </Table>
    </TableContainer>
  );
}
