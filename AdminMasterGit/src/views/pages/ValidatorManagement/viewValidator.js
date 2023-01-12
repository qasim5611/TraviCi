import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Divider,
  Button,
  makeStyles,
  Container,
  CardContent,
} from "@material-ui/core";
import axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import { Link, useLocation, useHistory } from "react-router-dom";
import moment from "moment";
import { CircularProgress } from "@material-ui/core";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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

export default (props) => {
  const location = useLocation();
  const classes = useStyles();
  const history = useHistory;

  const [user, setshowdata] = React.useState([]);
  // const [showdata1, setshowdata1] = React.useState(false);

  const [userLoader, setshowdata1] = useState(true);
  console.log("mydatatdata", user);
  const accessToken = window.sessionStorage.getItem("creatturAccessToken");
  const viewValidator = async (id) => {
    setshowdata1(true);
    await axios
      .get(ApiConfig.viewValidator, {
        params: {
          _id: id,
        },
        headers: {
          token: `${accessToken}`,
        },
      })
      .then(async (res) => {
        if (res.data.response_code === 200) {
          setshowdata(res.data.result);
          setshowdata1(false);
        } else {
          setshowdata1(setshowdata1);
        }
        setshowdata1(false);
      });
  };
  useEffect(() => {
    if (location.search.substring(1, location.search.length)) {
      const id = location.search.substring(1, location.search.length);
      viewValidator(id);
    }
  }, [location]);

  return (
    <>
      <Box mb={5}>
        <Typography variant="h3" style={{ marginBottom: "8px" }}>
          <strong> View Validator</strong>
        </Typography>
        <Divider />
      </Box>

      {userLoader ? (
        <>
          <Box pt={4} textAlign="center" margin={2}>
            <CircularProgress style={{ color: "#C54C82" }} />
          </Box>
        </>
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={3}>
              <Typography variant="body1">First Name:</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Typography
                variant="body2"
                style={{ textTransform: "capitalize" }}
              >
                {user?.firstName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Typography variant="body1">Last Name:</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Typography
                variant="body2"
                style={{ textTransform: "capitalize" }}
              >
                {user?.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              {" "}
              <Typography variant="body1">Email Address :</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Typography style={{ overflow: "auto" }} variant="body2">
                {user?.email}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              {" "}
              <Typography variant="body1">Phone Number :</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Typography variant="body2">
                {user?.countryCode}&nbsp; {user?.mobileNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              {" "}
              <Typography variant="body1">Registration Date :</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Typography variant="body2">
                {moment(user.regDate).format("YYYY-MM-DD , h:mm:ss a")}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              {" "}
              <Typography variant="body1"> Status :</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              {" "}
              <Typography variant="body2">{user?.status}</Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Typography variant="body1"> User Type :</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Typography variant="body2">{user?.userType}</Typography>
            </Grid>

            <Grid item lg={12} xs={12} sm={12} md={12}>
              <Box mt={3}>
                <Button
                  component={Link}
                  to="/validatore-management"
                  variant="contained"
                  size="medium"
                  color="primary"
                >
                  Back
                </Button>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
