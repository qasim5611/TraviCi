import React, { useEffect, useState } from "react";
import {
  Container,
  Divider,
  Box,
  Card,
  Grid,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import Page from "src/component/Page";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  buttonIcon: {
    marginLeft: "160px",
    "@media (max-width:  808px )": {
      marginLeft: "0px",
    },
  },
  contanerBox: {
    border: "1px solid gray:",
    background: "#ffffff85",
    boxShadow:
      "0px 3px 1px -2px rgb(0 0 0 / 20%), 1px 9px 15px 5px rgb(72 9 9 / 14%), 0px 1px 5px 0px rgb(92 20 20 / 12%)",
    "@media (max-width:  500px )": {
      "& .MuiContainer-maxWidthSm": { maxWidth: 640 },
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
    "& .MuiContainer-maxWidthSm": { maxWidth: "640px" },
  },
  headbox: {
    width: "70vw",
    border: "1px solid gray:",
    background: "#ffffff85",
    boxShadow:
      "0px 3px 1px -2px rgb(0 0 0 / 20%), 1px 9px 15px 5px rgb(72 9 9 / 14%), 0px 1px 5px 0px rgb(92 20 20 / 12%)",
    "@media(max-width:769px)": { width: "90vw" },
  },
}));

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

const ViewProduct = (props) => {
  const classes = useStyles();

  const [userLoader, setshowdata1] = useState(true);
  const accessToken = window.sessionStorage.getItem("creatturAccessToken");
  const productId = props.location && props.location.state.data;
  const [user, setUser] = useState("");
  // const transaction =
  const [productDetails, setProductDetails] = useState({
    CategoryId: "",
    ProductName: "",
    Metric: "",
    Price: "",
    CurrencyType: "",
    MinimumValueofPurchase: "",
    PayoutFrequency: "",
    ProductImage: "",
  });
  useEffect(() => {
    setshowdata1(true);
    console.log(productId, accessToken);
    axios
      .get(`${ApiConfig.viewTransaction}?_id=${productId?._id} `, {
        headers: {
          token: accessToken,
        },
      })
      .then((response) => {
        if (response.data.response_code !== 200) {
          setshowdata1(false);
        } else {
          console.log("data123", response);
          setProductDetails({});
          setshowdata1(false);
          setUser(response.data.result);
        }
      })
      .catch((response) => {
        // setIsUpdating(false);

        console.log("response", response);
      });
  }, []);
  console.log("dataUser", user);
  const userName = `${productId?.userId?.firstName}  ${productId?.userId?.lastName}`;
  console.log("userName", userName);
  return (
    <>
      <Box mb={5}>
        <Typography variant="h3" style={{ marginBottom: "8px" }}>
          <strong> View Transaction</strong>
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
              <Typography variant="body1">Transaction Id :</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Typography variant="body2">{user?.chargeId}</Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Typography variant="body1">Plan Name :</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Typography style={{ overflow: "auto" }} variant="body2">
                {productId?.subscriptionId?.planName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Typography variant="body1">Client Name :</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Typography
                variant="body2"
                style={{ textTransform: "capitalize" }}
              >
                {userName.substring(0, 10)}
                {/* {userName} */}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Typography variant="body1">Plan Start Date :</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Typography variant="body2">
                {moment(user.paymentDate).format("YYYY-MM-DD")}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Typography variant="body1"> Purchase Amount :</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Typography variant="body2">${user?.amount}</Typography>

            </Grid>













            <Grid item lg={12} xs={12} sm={12} md={12}>
              <Box mt={3}>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  component={Link}
                  to="/transaction-management"
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

export default ViewProduct;
