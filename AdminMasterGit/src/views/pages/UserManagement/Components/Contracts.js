import React, { useState, useEffect } from "react";
import SearchFilter from "../../../../component/SearchFilter";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ContentLoading from "src/component/ContentLoading";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { BsSearch } from "react-icons/bs";
import {
  Box,
  Button,
  Link,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Table,
  TableCell,
  Paper,
  Grid, Typography,
  Dialog,
  CircularProgress,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import BlockIcon from "@material-ui/icons/Block";

import ApiConfig from "src/Config/APIconfig";
import axios from "axios";
import NoDataFound from "src/component/NoDataFound";
import moment from "moment";

const currencies = [
  {
    value: 'Active',
    label: 'Active',
  },
  {
    value: 'Reject',
    label: 'Reject',
  },
];
const useStyles = makeStyles({
  table: {
    minWidth: 320,
  },
  pdbt: {
    paddingBottom: 52,
  },

  button: {
    minWidth: "initial",
    padding: "6px",
    marginLeft: "7px",
  },


  filterBox: {
    border: "1px solid #c4c4c4",
    padding: "15px",
    position: "relative",
    "& h6": {
      position: "absolute",
      top: "-20px",
      backgroundColor: "#ffffff",
      padding: "5px 10px",
      left: "0px",
      fontSize: "19px",
      color: "#C54C82",
      fontWeight: 600,
    },
    "& label": {
      fontSize: "14px",
      fontWeight: 600,
    },
  },
});
const Contracts = (props) => {
  console.log("props", props);
  function createData(Sr_No, contractId, contractName, validatorName, Status) {
    return {
      Sr_No,
      contractId,
      contractName,
      validatorName,
      Status,
    };
  }
  const rows = [
    createData(1, "1245 ", "Mobile App", 124578, "Paras", "Approved"),
    createData(2, "9658 ", "Tourist App", 124578, "Rohit", "Approved"),
    createData(3, "2478 ", "contract 3", 124578, "Zuhaib", "Approved"),
    createData(4, "7534 ", "Contract v1", 124578, "Akshay", "Approved"),
    createData(5, "3698 ", "Unique", 124578, "Dipendra", "Approved"),
  ];
  const [currency, setCurrency] = React.useState('EUR');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const classes = useStyles();
  const [isBlock, setBlock] = React.useState(false);
  const [filterData, setFilterData] = useState({
    fromDate: "05/05/2021",
    toDate: "11/06/2021",
  });
  const closeBlock = () => {
    setBlock(false);
  };
  const openBlock = () => {
    setBlock(true);
  };
  const [selectedTab, setTab] = useState("General");


  const accessToken = window.sessionStorage.getItem("creatturAccessToken");
  const [contract, setContract] = useState([]);
  console.log("contract", contract);
  const [contractLoader, setContractLoader] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const getuserData = () => {
    setContractLoader(true);
    axios

      .get(
        // ApiConfig.listContractForCompany,
        // props.userType !== "COMPANY"
        //   ? ApiConfig.listContractForUser:
        ApiConfig.listContractForCompany,

        {
          headers: {
            token: accessToken,
          },
          params: {
            userId: props.userId,
          },
        }
      )
      .then((response) => {
        if (response.data.response_code !== 200) {
          setContractLoader(false);
          setSubmitLoading(true)
        } else {
          setSubmitLoading(false)

          setContract(response.data.result.docs);
          setContractLoader(false);
        }
      })
      .catch((response) => {
        setContractLoader(false);
        console.log("response", response);
      });
  };
  const getuserDataFreelancer = () => {
    setContractLoader(true);
    axios
      .get(
        ApiConfig.listContractForUser,

        {
          headers: {
            token: accessToken,
          },
          params: {
            email: props.email,
          },
        }
      )
      .then((response) => {
        if (response.data.response_code !== 200) {
          setContractLoader(false);
        } else {
          setContract(response.data.result.docs);
          setContractLoader(false);
        }
      })
      .catch((response) => {
        setContractLoader(false);
        console.log("response", response);
      });
  };
  const userType = props.userType;
  useEffect(() => {
    if (props.userType !== "COMPANY") {
      getuserDataFreelancer();
    } else {
      getuserData();
    }
  }, []);
  return (
    <>
      {/* <Box className={classes.filterBox} mt={5} mb={5}>
    <Typography variant="h6">Filter</Typography>
    <Grid container spacing={2} alignItems="flex-end">
      <Grid item xs={12} sm={4} md={3} lg={2}>
        <label>From</label>
        <TextField id="outlined-basic" type="date" variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={12} sm={4} md={3} lg={2}>
        <label>To</label>
        <TextField id="outlined-basic" type="date" variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={12} sm={4} md={3} lg={2}>
        <label>Status</label>
        <TextField
          id="outlined-select-currency"
          select
          fullWidth
          value={currency}
          onChange={handleChange}
          variant="outlined"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={4} md={3} lg={3}>
        <label>Search </label>
        <TextField id="outlined-basic" type="search" variant="outlined" fullWidth InputProps={{
          endAdornment: <InputAdornment position="end"> <IconButton><BsSearch /></IconButton> </InputAdornment>,
        }} />
      </Grid>
      <Grid item xs={12} sm={4} md={2} lg={1}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
        >
          Apply
        </Button>
      </Grid>
      <Grid item xs={12} sm={4} md={3} lg={2}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
        >
          Download CSV
        </Button>
      </Grid>
    </Grid>
  </Box> */}

      {contractLoader ? (
        <Box mt={5} textAlign="center" margin={2}>
          <CircularProgress style={{ color: "#C54C82" }} />
        </Box>
      ) : (
        <Box mt={5}>
          {submitLoading ? (
            <NoDataFound />
          ) : (<Box style={{ overflow: "auto" }}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{ color: "white", backgroundColor: "#C54C82" }}
                    >
                      Sr.No
                    </TableCell>
                    <TableCell
                      style={{ color: "white", backgroundColor: "#C54C82" }}
                      align="center"
                    >
                      Contract ID
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ color: "white", backgroundColor: "#C54C82" }}
                    >
                      Contract Name
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ color: "white", backgroundColor: "#C54C82", minWidth: "100px" }}
                    >
                      Start Date
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ color: "white", backgroundColor: "#C54C82", minWidth: "100px" }}
                    >
                      End Date
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ color: "white", backgroundColor: "" }}
                    >
                      Amount
                    </TableCell>
                    {/* <TableCell style={{ color: 'white', backgroundColor: '#C54C82' }} align="center">
            Validator Name
          </TableCell> */}
                    <TableCell
                      style={{ color: "white", backgroundColor: "#C54C82" }}
                      align="center"
                    >
                      Status
                    </TableCell>

                    <TableCell
                      style={{ color: "white", backgroundColor: "#C54C82" }}
                      align="center"
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contract &&
                    contract?.map((row, i) =>
                    (
                      <TableRow key={row?.name}>
                        <TableCell component="th" scope="row">
                          {i + 1}
                        </TableCell>
                        <TableCell align="center">
                          {row?.contractId?._id
                            ? row?.contractId?._id
                            : row?._id}
                        </TableCell>

                        <TableCell align="center">
                          {row?.contractId?.contractName &&
                            row?.contractId?.contractName}
                          {row?.contractName}
                        </TableCell>
                        <TableCell align="center">{moment(row?.contractId?.createdAt).format("YYYY-MM-DD")}</TableCell>
                        <TableCell align="center">{moment(row?.milestones[0]?.dueDate).format("YYYY-MM-DD")} </TableCell>
                        <TableCell align="center">${row?.amount ? row?.amount : row?.contractId.amount}</TableCell>
                        <TableCell align="center">{row?.userContractStatus}</TableCell>

                        <TableCell style={{ width: 5 }} align="right">
                          <Box display="flex">
                            <Link
                              to={{
                                pathname: "/view-individual-contract",
                                state: {
                                  data: row,
                                  userType: userType,
                                  contractId: row,
                                },
                              }}
                              component={RouterLink}
                            >
                              <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                              >
                                <VisibilityIcon
                                  style={{ fontSize: "15px" }}
                                />
                              </Button>
                            </Link>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              {/* <ul className={classes.ul}>
      {items.map(({ page, type, selected, ...item }, index) => {
        let children = null;

        if (type === "start-ellipsis" || type === "end-ellipsis") {
          children = "…";
        } else if (type === "page") {
          children = (
            <button
              type="button"
              style={{ fontWeight: selected ? "bold" : undefined }}
              {...item}
            >
              {page}
            </button>
          );
        } else {
          children = (
            <button type="button" {...item}>
              {type}
            </button>
          );
        }

        return <li key={index}>{children}</li>;
      })}
    </ul> */}
            </TableContainer>
            <Dialog
              open={isBlock}
              onClose={closeBlock}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to deactivate this contract?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button color="primary">Yes</Button>
                <Button onClick={closeBlock} color="primary" autoFocus>
                  No
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
          )}

        </Box>
      )}
    </>
  );
};

export default Contracts;
