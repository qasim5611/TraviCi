import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Container,
  CircularProgress,
  makeStyles,
  Divider,
} from "@material-ui/core";
import axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import moment from "moment";
import { Link } from "react-router-dom";
const Row = ({ field, value }) => (
  <Grid item container md={12}>
    <Grid item md={6}>
      <Box display="flex" justifyContent="space-between" pr={4}>
        <Typography variant="h5">
          <strong>{field}</strong>
        </Typography>
      </Box>
    </Grid>
    <Grid item md={6}>
      <Typography variant="body1">{value}</Typography>
    </Grid>
  </Grid>
);

const useStyles = makeStyles((theme) => ({
  contanerBox: {
    border: "1px solid gray:",
    background: "#ffffff85",
    boxShadow:
      "0px 3px 1px -2px rgb(0 0 0 / 20%), 1px 9px 15px 5px rgb(72 9 9 / 14%), 0px 1px 5px 0px rgb(92 20 20 / 12%)",
    "@media (max-width:  500px )": {
      "& p": {
        fontSize: "11px",
      },
      "& .MuiBox-root ": {
        paddingLeft: 0,
        paddingRight: 0,
      },
      "& .MuiContainer-root": {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
  },
}));

const GeneralUser = (props) => {
  const classes = useStyles();
  const userId = props.location.state.id
  console.log("props", props);
  const accessToken = window.sessionStorage.getItem("creatturAccessToken");
  const [user, setUserdata] = useState();
  console.log("user", user);
  const [userLoader, setUserdataLoader] = useState(false);
  const getuserData = () => {
    setUserdataLoader(true);
    axios

      .get(
        ApiConfig.viewparticularMilestone + userId,

        {
          headers: {
            token: accessToken,
          },
        }
      )
      .then((response) => {
        if (response.data.response_code !== 200) {
          setUserdataLoader(false);
        } else {
          setUserdataLoader(false);
          // console.log(result)
          const reqData = response.data.result.milestones[0];
          console.log("reqData", reqData);
          setUserdata(response.data.result.milestones[0]);
          console.log(response);
          console.log(reqData);

          // else setHistory(depositFilter);
        }
        // setIsLoading(false);
      })
      .catch((response) => {
        // setIsUpdating(false);

        console.log("response", response);
      });
  };
  useEffect(() => getuserData(), []);
  console.log("userdata", user);
  return (
    <Box >
      <Box mb={5}   >
        <Typography variant="h3" style={{ marginBottom: "8px" }}>
          <strong> Contracts View</strong>
        </Typography>
        <Divider />
      </Box>
      <>
        <Grid
          container
          spacing={2}
        >
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="body1">Milestone Name	:</Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Typography
              variant="body2"
              style={{ textTransform: "capitalize" }}
            >
              {user?.milestone}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="body1">Amount :</Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Typography variant="body2">
              {user?.amount}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="body1">Customer Approval Status :</Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Typography variant="body2">
              {user?.milestoneChangeApprovalStatus}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="body1">Due Date :</Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Typography variant="body2">

              {moment(user?.dueDate).format("DD-MM-YYYY")}
              {/* {moment(user.regDate).format("ll")} */}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="body1"> description :</Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Typography variant="body2">{user?.description}</Typography>
          </Grid>










          <Grid item lg={12} xs={12} sm={12} md={12} >
            <Box mt={3}>    <Button
              variant="contained"
              size="medium"
              color="primary"
              component={Link}
              to="/view-individual-contract"
            >
              Back
            </Button></Box>
          </Grid>
        </Grid>
      </>
    </Box>
  );
};

export default GeneralUser;
