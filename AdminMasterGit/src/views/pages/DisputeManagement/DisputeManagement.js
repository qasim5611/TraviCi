import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ApiConfig from "../../../Config/APIconfig";
import axios from "axios";

import React, { useState, useEffect } from "react";
import DisputeListData from "./DisputeListData";
import NoDataFound from "src/component/NoDataFound";

import { useLocation } from "react-router-dom";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({}));

export default function DisputeManagement() {
  const location = useLocation();
  console.log("location--", location.state);
  const mileid = location.state;
  const classes = useStyles();
  const [disputedList, setDisputedList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log("disputedList----", disputedList);

  const disputeHandler = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.disputedContractListByMilestoneId,
        headers: {
          token: sessionStorage.getItem("creatturAccessToken"),
        },
        params: {
          contractId: mileid,
        },
      });
      if (res.data.response_code === 200) {
        setDisputedList(res.data.result);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    disputeHandler();
  }, []);

  return (
    <Box>
      <Container>
        {isLoading ? (
          <ButtonCircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      color: "white",
                      backgroundColor: "#C54C82",
                      whiteSpace: "pre",
                    }}
                    className="tableCell"
                    align="left"
                  >
                    Sr. No
                  </TableCell>

                  <TableCell
                    style={{
                      color: "white",
                      backgroundColor: "#C54C82",
                      whiteSpace: "pre",
                    }}
                    className="tableCell"
                    align="left"
                  >
                    Contract Name
                  </TableCell>
                  <TableCell
                    style={{
                      color: "white",
                      backgroundColor: "#C54C82",
                      whiteSpace: "pre",
                    }}
                    className="tableCell"
                    align="left"
                  >
                    Milestone Name
                  </TableCell>
                  <TableCell
                    style={{
                      color: "white",
                      backgroundColor: "#C54C82",
                      whiteSpace: "pre",
                    }}
                    className="tableCell"
                    align="left"
                  >
                    Amount
                  </TableCell>
                  <TableCell
                    style={{
                      color: "white",
                      backgroundColor: "#C54C82",
                      whiteSpace: "pre",
                    }}
                    className="tableCell"
                    align="left"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    style={{
                      color: "white",
                      backgroundColor: "#C54C82",
                      whiteSpace: "pre",
                    }}
                    className="tableCell"
                    align="left"
                  >
                    User Type
                  </TableCell>

                  <TableCell
                    style={{
                      color: "white",
                      backgroundColor: "#C54C82",
                      whiteSpace: "pre",
                    }}
                    className="tableCell"
                    align="left"
                  >
                    Date & Time
                  </TableCell>

                  <TableCell
                    style={{
                      color: "white",
                      backgroundColor: "#C54C82",
                      whiteSpace: "pre",
                    }}
                    className="tableCell"
                    align="left"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {disputedList &&
                  disputedList.map((data, index) => (
                    <DisputeListData
                      data={data}
                      classes={classes}
                      index={index}
                      loading={isLoading}
                      disputeHandler={disputeHandler}
                      mileid={mileid}
                    />
                  ))}
              </TableBody>
            </Table>
            {disputedList && disputedList.length === 0 && <NoDataFound />}
          </TableContainer>
        )}
      </Container>
    </Box>
  );
}
