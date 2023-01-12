import React, { useEffect, useState } from "react";
// import ContentLoading from 'src/component/ContentLoading';
// import SearchFilter from '../../../component/SearchFilter';
import {
  Container,
  Dialog,
  Paper,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  Box,
  Typography,
  Button,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Card,
  Grid,
  CardContent,
  Table,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import Footer from "../../../layouts/DashboardLayout/TopBar/Footer";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import ApiConfig from "src/Config/APIconfig";
import { usePagination } from "@material-ui/lab/Pagination";
import Pagination from "@material-ui/lab/Pagination";

import BlockIcon from "@material-ui/icons/Block";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";

import Page from "src/component/Page";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import PageLoading from "src/component/PageLoading";

// import { DataGrid } from '@material-ui/data-grid';
const accessToken = window.localStorage.getItem("creatturAccessToken");
const userType = window.localStorage.getItem("userType");

const useStyles = makeStyles({
  table: {
    minWidth: 320,
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
});

const Row = ({ field, value, image }) => (
  <Grid container md={12}>
    <Grid item md={5}>
      <Box display="flex" justifyContent="space-between" pr={4}>
        <Typography variant="h5">
          {" "}
          <strong>{field}</strong>
        </Typography>
      </Box>
    </Grid>
    <Grid item md={7}>
      <Typography variant="body1">{value}</Typography>
      {image && <img src={image} alt="comp" width="90px" />}
    </Grid>
  </Grid>
);

export default function (props) {
  const [validators, setValidators] = React.useState([]);
  const [plans, setPlans] = React.useState([]);
  const classes = useStyles();
  const hystory = useHistory();
  const [contractAdded, setcontractAdded] = React.useState("");
  const { items } = usePagination({
    count: 10,
  });
  const [isBlock, setBlock] = React.useState(false);

  const openBlock = () => {
    setBlock(true);
  };

  const closeBlock = () => {
    setBlock(false);
  };
  const [validatorId, setValidatorId] = useState();
  const [isDelete, setDelete] = React.useState(false);
  const [userplans, setUserplans] = React.useState(false);
  const [loader, setloader] = React.useState(false);
  const handleDelete = (id) => {
    setValidatorId(id);
    openDelete();
  };
  const openDelete = () => {
    setDelete(true);
  };
  console.log("contractAdded", contractAdded);

  const closeDelete = () => {
    setDelete(false);
  };

  useEffect(() => {
    setloader(true);
    axios
      .get(
        ApiConfig.planList,

        {
          headers: {
            token: accessToken,
          },
        }
      )
      .then((response) => {
        if (response.data.response_code !== 200) {
          setloader(false);
          if (response.data.response_code === 404) {
            setloader(false);
            setUserplans(true);
          }
        } else {
          setloader(false);
          // setDisplayname
          // console.log(result)
          setValidators(response.data.result);
          setPlans(response.data.result);
          console.log(response);
          setcontractAdded(response.data.result[0].contractAdded);
          console.log(
            "is this show 2 or not",
            response.data.result[0].validatorAdded
          );
          if (response.data.result[0].status !== "ACTIVE") {
            setTimeout(function () {
              hystory.push({
                pathname: "/pricing",
              });
            }, 4000);
          }
        }
      })
      .catch((response) => {
        console.log("response", response);
      });
  }, []);

  const creator = () => {};
  function createData(
    Sr_No,
    validatorName,
    validatorEmail,
    mobileNumber,
    createdDate,
    updatedDate
  ) {
    return {
      Sr_No,
      validatorName,
      validatorEmail,
      mobileNumber,
      createdDate,
      updatedDate,
    };
  }
  const handleBlock = (id) => {
    // setUserId(id);
    openBlock();
  };
  console.log(setPlans);

  return (
    <Page title="Validator Management">
      <Box mb={5}>
        <Typography variant="h3" style={{ marginBottom: "8px" }}>
          <strong> My Subscription</strong>
        </Typography>
        <Divider />
      </Box>
      <Box >
        {userplans ? (
          <>
                <div className="nodata">
                 <Typography variant="body2">No Plans</Typography>
               <img src="images/noData.png" alt="No-Data-Found" />
               </div>
            {/* <Box pt={4} textAlign="center">
              <Typography variant="body2">No Plans</Typography>
            </Box> */}
          </>
        ) : (
          ""
        )} 
      </Box>
      {loader && <PageLoading />}
      {plans.map((plan) => (
        <Box>
              {!plan ? (
                <>{loader && <CircularProgress style={{ color: "blue" }} />}</>
              ) : (
                <>
                      <Grid container className="centerTable" spacing={2}>
                        <Grid item xs={12} sm={4} md={3}>
                          {" "}
                          <Typography variant="body1">
                            <strong> Plan Name : </strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                          <Typography variant="body1">
                            {plan.planName}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                          {" "}
                          <Typography variant="body1">
                            <strong> Purchase on :</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                          <Typography variant="body1">
                            {moment(plan.createdAt).format("YYYY-MM-DD")}{" "}
                            {/* {user?.subscriptionId?.planName} */}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                          {" "}
                          <Typography variant="body1">
                            <strong> End Date :</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                          <Typography variant="body1">
                            {moment(plan.endPlans).format("YYYY-MM-DD")}{" "}
                            {/* {user?.subscriptionId?.planName} */}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                          {" "}
                          <Typography variant="body1">
                            <strong> Contract Available :</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                          <Typography variant="body1">
                            {plan.contractAdded}{" "}
                            {/* {`${user?.userId?.firstName} ${user?.userId?.lastName}`} */}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                          {" "}
                          <Typography variant="body1">
                            <strong> Milestones Available :</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                          <Typography variant="body1">
                            {plan.milestoneAdded}{" "}
                            {/* {moment(user?.paymentDate).format("ll")} */}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                          {" "}
                          <Typography variant="body1">
                            <strong> Amount :</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                          <Typography variant="body1">
                            $ {plan.amount}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                          {" "}
                          <Typography variant="body1">
                            <strong> Status :</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                          <Typography variant="body1">{plan.status}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                          {" "}
                          <Typography variant="body1">
                            <strong> Subscriber ID :</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                          <Typography variant="body1">
                            {plan.subscriptionId}{" "}
                            {/* {`${user?.userId?.firstName} ${user?.userId?.lastName}`} */}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                          <Box mt={5} mb={1} >
                            <Button
                              variant="contained"
                              color="primary"
                              component={Link}
                              to="/pricing"
                              size="medium"
                            >
                              Manage
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                </>
              )}
        </Box>
      ))}
    </Page>
  );
}
