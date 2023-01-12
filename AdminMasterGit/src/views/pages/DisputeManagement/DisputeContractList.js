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
  Divider,
} from "@material-ui/core";
import ApiConfig from "../../../Config/APIconfig";
import axios from "axios";

import React, { useState, useEffect } from "react";
import DisputeListData from "./DisputeListData";
import DisputeContractData from "./DisputeContractData";
import NoDataFound from "src/component/NoDataFound";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({}));

export default function DisputeContractList() {
  const classes = useStyles();
  const [disputedList, setDisputedList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const disputeHandler = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.disputedContractList,
        headers: {
          token: sessionStorage.getItem("creatturAccessToken"),
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
      <Box>
        <Box mb={5}>
          <Box className={classes.headingBox} pb={2}>
            <Typography variant="h3" style={{ marginBottom: "8px" }}>
              <strong> Dispute Management</strong>
            </Typography>
          </Box>
          <Divider />
        </Box>
        {isLoading ? (
          <ButtonCircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ color: "white", backgroundColor: "#C54C82" }}
                    className="tableCell"
                    align="left"
                  >
                    Sr. No
                  </TableCell>
                  <TableCell
                    style={{ color: "white", backgroundColor: "#C54C82" }}
                    className="tableCell"
                    align="left"
                  >
                    Document
                  </TableCell>
                  <TableCell
                    style={{ color: "white", backgroundColor: "#C54C82" }}
                    className="tableCell"
                    align="left"
                  >
                    Company Name
                  </TableCell>
                  <TableCell
                    style={{ color: "white", backgroundColor: "#C54C82" }}
                    className="tableCell"
                    align="left"
                  >
                    Contract Name
                  </TableCell>

                  <TableCell
                    style={{ color: "white", backgroundColor: "#C54C82" }}
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
                    <DisputeContractData
                      data={data}
                      classes={classes}
                      index={index}
                      loading={isLoading}
                    />
                  ))}
              </TableBody>
            </Table>
            {disputedList && disputedList.length === 0 && <NoDataFound />}
          </TableContainer>
        )}
      </Box>
    </Box>
  );
}
