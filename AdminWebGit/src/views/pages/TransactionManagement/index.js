import React, { useEffect, useState } from "react";
// import SearchFilter from "../../../component/SearchFilter";
import {
  Container,
  Dialog,
  Paper,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  Box,
  Link,
  Typography,
  Button,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Table,
  CircularProgress,
  Grid,
  InputBase,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import { usePagination } from "@material-ui/lab/Pagination";
import Pagination from "@material-ui/lab/Pagination";
import Page from "src/component/Page";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { sortAddress } from "src/utils";
import { explorerLink } from "src/constants";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { BiSearchAlt2 } from "react-icons/bi";
import * as XLSX from "xlsx";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
// import { DataGrid } from '@material-ui/data-grid';
const accessToken = window.localStorage.getItem("creatturAccessToken");
const useStyles = makeStyles({
  table: {
    minWidth: 920,
  },
  pdbt: {
    paddingBottom: 68,
    minWidth: "1050px",
    width: "auto",
  },

  button: {
    minWidth: "initial",
    padding: "6px",
    marginLeft: "7px",
  },
  searchSection: {
    marginTop: "1.7rem",
    "@media(max-width:600px)": {
      marginTop: ".7rem",
    },
  },
  field: {
    height: "42px",
    border: "1px solid #52565c",
    padding: "10px 10px 10px 20px",
    borderRadius: "4px",

    fontSize: "14px",
  },
  btnBox: {
    marginTop: "30px",
    "@media(max-width:959px)": {
      marginTop: "0px",
    },
  },
});

export default function (props) {
  const [pages, setPages] = useState(1);
  const lengthCheck = pages === 1 ? 10 : 0;
  const [numpages, setNumpages] = useState(1);
  const [txnData, settxnData] = useState([]);
  const [fromData, setFromData] = useState();
  const [toData, setToData] = useState();
  const [search, setSearch] = useState();
  const classes = useStyles();
  const { items } = usePagination({
    count: 10,
  });
  const [isBlock, setBlock] = React.useState(false);

  const closeBlock = () => {
    setBlock(false);
  };
  const [isDelete, setDelete] = React.useState(false);
  const [userplans1, setUserPlans1] = React.useState(false);

  const closeDelete = () => {
    setDelete(false);
  };
  const [filterData, setFilterData] = useState({
    toDate: "",
    fromDate: "",
    searchKey: "",
  });

  const transactionHandler = async () => {
    try {
      settxnData([]);
      setUserPlans1(true);

      const res = await axios({
        method: "POST",
        url: ApiConfig.blockchainTransactionListForUser,
        headers: {
          token: localStorage.getItem("creatturAccessToken"),
        },
        data: {
          limit: 10,
          page: pages,
          search: search !== "" ? search : null,
          toDate:
            toData !== ""
              ? moment(toData, "dd.MM.yyyy HH:mm:ss").toISOString()
              : null,
          fromDate:
            fromData !== ""
              ? moment(fromData, "dd.MM.yyyy HH:mm:ss").toISOString()
              : null,
        },
      });
      if (res.data.response_code === 200) {
        console.log("resTXn---", res.data.result);
        settxnData(res.data.result.docs);
        setNumpages(res.data.result.pages);
        setUserPlans1(false);
      }
      setUserPlans1(false);
    } catch (error) {
      console.log(error);
      setUserPlans1(false);
    }
  };

  useEffect(() => {
    transactionHandler();
  }, [pages]);
  useEffect(() => {
    if (search || toData || fromData) {
      transactionHandler();
    }
  }, [search || toData || fromData]);

  function getActiveMileStoneData(searchData, searchFor, contractId) {
    try {
      switch (searchFor) {
        case "name":
          const milestonFinderName = searchData?.find((data) => {
            return data?._id?.toLowerCase() === contractId?.toLowerCase();
          });
          return milestonFinderName.milestone;

        case "amount":
          const milestonFinderAmount = searchData?.find((data) => {
            return data?._id?.toLowerCase() === contractId?.toLowerCase();
          });
          return milestonFinderAmount.amount;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(txnData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "txnData");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "user_list.xlsx");
  };
  return (
    <Page
      style={{ display: "flex", flexDirection: "column" }}
      title="User Management"
    >
      <Box mb={5}>
        <Typography variant="h3" style={{ marginBottom: "8px" }}>
          <strong> Transaction Management</strong>
        </Typography>
        <Divider />
      </Box>
      <Grid container spacing={3}>
        <Grid item lg={3} md={3} sm={4} xs={12} className={classes.gridSectio}>
          <Box className={classes.searchSection}>
            <InputBase
              fullWidth
              type="text"
              className={classes.field}
              placeholder="Search by contract name "
              onChange={(e) => setSearch(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <BiSearchAlt2
                    style={{
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                  />
                </InputAdornment>
              }
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={3} lg={3} sm={4} className={classes.gridSectio1}>
          <label>From</label>

          <KeyboardDatePicker
            className={classes.date}
            style={{ width: "100%" }}
            placeholder="DD/MM/YYYY"
            format="DD/MM/YYYY"
            inputVariant="outlined"
            disableFuture
            margin="dense"
            name="dateOfBirth"
            value={fromData}
            onChange={(date) => setFromData(date)}
          />
        </Grid>

        <Grid item xs={12} md={3} lg={3} sm={4} className={classes.gridSectio2}>
          <label>To</label>
          <KeyboardDatePicker
            className={classes.date}
            style={{ width: "100%" }}
            placeholder="DD/MM/YYYY"
            format="DD/MM/YYYY"
            inputVariant="outlined"
            disableFuture
            margin="dense"
            name="dateOfBirth"
            value={toData}
            onChange={(date) => setToData(date)}
          />
        </Grid>
        <Grid item xs={12} md={3} lg={3} sm={6} className={classes.gridSectio3}>
          <Box className={classes.btnBox}>
            <Button variant="contained" color="primary" onClick={downloadExcel}>
              Download CSV
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box mb={1}></Box>
      {!userplans1 ? (
        <>
          {userplans1 ? (
            <>
              <div className="nodata">
                <Typography variant="body2">No Transaction</Typography>
                <img src="images/noData.png" alt="No-Data-Found" />
              </div>
              {/* <Box pt={4} textAlign="center">
                    <Typography variant="body2">No Transaction</Typography>
                  </Box> */}
            </>
          ) : (
            <>
              <TableContainer component={Paper}>
                <Table
                  className={classes.table}
                  aria-label="simple table"
                  id="user_list"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          color: "white",
                          backgroundColor: "#C54C82",
                        }}
                      >
                        Sr. No.
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                          backgroundColor: "#C54C82",
                        }}
                        align="center"
                      >
                        Contract Name
                      </TableCell>

                      <TableCell
                        style={{
                          color: "white",
                          backgroundColor: "#C54C82",
                        }}
                        align="center"
                      >
                        Milestone Name
                      </TableCell>

                      <TableCell
                        style={{
                          color: "white",
                          backgroundColor: "#C54C82",
                        }}
                        align="center"
                      >
                        Amount
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                          backgroundColor: "#C54C82",
                        }}
                        align="center"
                      >
                        Txn Date & Time
                      </TableCell>

                      <TableCell
                        style={{
                          color: "white",
                          backgroundColor: "#C54C82",
                        }}
                        align="center"
                      >
                        Txn. Hash
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                          backgroundColor: "#C54C82",
                        }}
                        align="center"
                      >
                        From
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                          backgroundColor: "#C54C82",
                        }}
                        align="center"
                      >
                        To
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {txnData.map((row, i) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {i + 1}
                        </TableCell>
                        <TableCell align="center">
                          {row?.contractId?.contractName}
                        </TableCell>
                        <TableCell align="center">
                          {row?.contractId?.milestones.length !== 0
                            ? getActiveMileStoneData(
                                row?.contractId?.milestones,
                                "name",
                                row?.milestoneId
                              )
                            : "N/A"}
                        </TableCell>
                        <TableCell align="center">
                          $&nbsp;
                          {row?.contractId?.milestones.length !== 0
                            ? getActiveMileStoneData(
                                row?.contractId?.milestones,
                                "amount",
                                row?.milestoneId
                              )
                            : "N/A"}
                        </TableCell>
                        <TableCell align="center">
                          {moment(row?.updatedAt).format("YYYY-MM-DD")}
                        </TableCell>
                        <TableCell
                          style={{ cursor: "pointer" }}
                          align="center"
                          onClick={() =>
                            window.open(
                              `${explorerLink}${row?.blockchainTransactionHash}`
                            )
                          }
                        >
                          {row?.blockchainTransactionHash
                            ? sortAddress(row?.blockchainTransactionHash)
                            : "N/A"}

                          <CopyToClipboard
                            text={row?.blockchainTransactionHash}
                          >
                            <IconButton style={{ fontSize: ".8rem" }}>
                              <FaCopy onClick={() => toast.info("Copied")} />
                            </IconButton>
                          </CopyToClipboard>
                        </TableCell>
                        <TableCell align="center">
                          {row?.fromAddress
                            ? sortAddress(row?.fromAddress)
                            : "N/A"}
                          <CopyToClipboard text={row?.fromAddress}>
                            <IconButton style={{ fontSize: ".8rem" }}>
                              <FaCopy onClick={() => toast.info("Copied")} />
                            </IconButton>
                          </CopyToClipboard>
                        </TableCell>
                        <TableCell align="center">
                          {row?.toAddress ? sortAddress(row?.toAddress) : "N/A"}
                          <CopyToClipboard text={row?.toAddress}>
                            <IconButton style={{ fontSize: ".8rem" }}>
                              <FaCopy onClick={() => toast.info("Copied")} />
                            </IconButton>
                          </CopyToClipboard>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {txnData && txnData.length === 0 && (
                <div className="nodata">
                  <Typography variant="body2">Data Not Found</Typography>
                  <img src="images/noData.png" alt="No-Data-Found" />
                </div>
              )}
              {txnData && txnData.length >= lengthCheck && (
                <Box pt={2} display="flex" justifyContent="flex-end">
                  <Pagination
                    onChange={(e, v) => setPages(v)}
                    count={parseInt(numpages)}
                    color="primary"
                  />
                </Box>
              )}
            </>
          )}
        </>
      ) : (
        <Box textAlign="center" pt={4}>
          <CircularProgress />
        </Box>
      )}

      <Dialog
        open={isBlock}
        onClose={closeBlock}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to block this User?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary">Yes</Button>
          <Button onClick={closeBlock} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isDelete}
        onClose={closeDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this User?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary">Yes</Button>
          <Button onClick={closeDelete} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  );
}
