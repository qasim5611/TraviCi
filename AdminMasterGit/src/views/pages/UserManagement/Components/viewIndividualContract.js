import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { BsSearch } from "react-icons/bs";
import { Link as RouterLink } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
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
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@material-ui/core";

import ApiConfig from "src/Config/APIconfig";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NoDataFound from "src/component/NoDataFound";
const currencies = [
  {
    value: "Complete",
    label: "Complete",
  },
  {
    value: "Pending",
    label: "Pending",
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
export default (props) => {
  console.log("props", props);
  const [currency, setCurrency] = React.useState("EUR");
  const userId = props?.location?.state?.contractId?._id;
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  console.log("userId", userId);
  console.log("props", props);

  const location = useLocation();
  const history = useHistory();
  const accessToken = window.sessionStorage.getItem("creatturAccessToken");
  const [milestoneView, setMilestone] = useState();
  console.log("milestoneView", milestoneView);
  const [dataLoading, setdataLoading] = useState(true);
  const [milestone1, setMilestone1] = useState();
  const [milStoneDetails, setMilStoneDetails] = useState([]);
  console.log("milStoneDetails", milStoneDetails[0]);

  const [submitLoading, setSubmitLoading] = useState(false);
  console.log("submitLoading", submitLoading);

  // console.log("milestone????", milestone);
  const getuserData = () => {
    console.log(ApiConfig.viewUser);
    axios

      .get(
        // props.userType !== "COMPANY"
        //   ? ApiConfig.listMilestoneForUser:
        ApiConfig.listMilestoneForCompany,

        {
          headers: {
            token: accessToken,
          },
          params: {
            _id: userId,
          },
        }
      )
      .then((response) => {
        if (response.data.response_code === 200) {
          setMilStoneDetails(response.data.result);
          setMilestone(response.data.result[0].milestones);
          setMilestone1(response.data.result);
          setdataLoading(false);
          setSubmitLoading(false);

        } else {
          setdataLoading(false);
          setSubmitLoading(true);
        }
      })
      .catch((response) => {
        // setIsUpdating(false);
        setdataLoading(false);
        setSubmitLoading(true);
        console.log("response", response);
      });
  };
  const getuserDataFreelancer = () => {
    console.log(ApiConfig.viewUser);
    axios

      .get(
        // props.userType !== "COMPANY"
        //   ? ApiConfig.listMilestoneForUser:
        ApiConfig.listMilestoneForUser,

        {
          headers: {
            token: accessToken,
          },
          params: {
            userId: userId,
          },
        }
      )
      .then((response) => {
        if (response.data.response_code !== 200) {
          setdataLoading(false);
        } else {
          setMilStoneDetails(response.data.result.docs);
          setMilestone(response.data.result[0].milestones);
          setMilestone1(response.data.result[0]);
          setdataLoading(false);
        }
      })
      .catch((response) => {
        // setIsUpdating(false);
        setdataLoading(false);
        console.log("response", response);
      });
  };
  console.log("props.userType", window.sessionStorage.getItem("userTypes"));
  useEffect(() => {
    if (window.sessionStorage.getItem("userTypes") !== "COMPANY") {
      getuserDataFreelancer();
    } else {
      getuserData();
    }
  }, []);
  const Row = ({ field, value, image }) => (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4} md={3}>
        <Typography variant="body2">
          {" "}
          <strong>{field}</strong>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8} md={9}>
        <Typography variant="body2">{value}</Typography>
        {image && <img src={image} alt="comp" width="90px" />}
      </Grid>
    </Grid>
  );

  const classes = useStyles();
  console.log("milStoneDetails", milStoneDetails);
  return (
    <div>
      {dataLoading ? (
        <>
          <Box pt={6} textAlign="center" margin={2}>
            <CircularProgress style={{ color: "#C54C82" }} />
          </Box>
        </>
      ) : (
        <>
          <Box mb={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {" "}
                <Row
                  field="Contract Name :"
                  value={
                    props?.location?.state?.contractId?.contractName
                  }
                />
              </Grid>

              <Grid item xs={12}>
                {" "}
                <Row
                  field="Status :"
                  value={props?.location?.state?.contractId?.status}
                />
              </Grid>

              <Grid item xs={12}>
                <Link onClick={history.goBack}>
                  <Button variant="contained" color="primary" size="medium">
                    Close
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
          {submitLoading ? (
            <>
              <NoDataFound />
            </>
          ) : (
            <Box mt={5}>
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
                        Milestone Name
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ color: "white", backgroundColor: "#C54C82" }}
                      >
                        Amount
                      </TableCell>

                      {/* <TableCell
                style={{ color: "white", backgroundColor: "#C54C82" }}
                align="center"
              >
                Validator Approval Status
              </TableCell> */}
                      <TableCell
                        style={{ color: "white", backgroundColor: "#C54C82" }}
                        align="center"
                      >
                        Customer Approval Status
                      </TableCell>

                      <TableCell
                        style={{ color: "white", backgroundColor: "#C54C82" }}
                        align="center"
                      >
                        Due Date
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

                    <>
                      {" "}
                      {milStoneDetails && milStoneDetails[0] && milStoneDetails[0].milestones?.map((row, i) => (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {i + 1}
                          </TableCell>
                          <TableCell align="center">
                            {row?.milestone}
                          </TableCell>
                          <TableCell align="center">${row?.amount}</TableCell>

                          <TableCell align="center">
                            {row?.mileStoneStatus}
                          </TableCell>

                          <TableCell align="center">
                            {moment(row?.dueDate).format("YYYY-MM-DD")}
                          </TableCell>
                          <TableCell style={{ width: 5 }} align="right">
                            <Box display="flex">
                              <Link
                                to={{
                                  pathname: "/contracts-view",
                                  state: {
                                    id: row?._id,
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
                    </>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

        </>
      )}
    </div>
  );
};
