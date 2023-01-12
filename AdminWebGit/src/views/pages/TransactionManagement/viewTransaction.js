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
} from "@material-ui/core";
import { Link as RouterLink } from 'react-router-dom';
import Page from "src/component/Page";
import { Link } from "react-router-dom";
import axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import moment from "moment";
import PageLoading from "src/component/PageLoading";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
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
  const accessToken = window.localStorage.getItem("creatturAccessToken");
  const productId = props.location && props.location.state.data;
  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(false);
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
    setLoader(true);
    // setIsLoading(true);/api/v1/user/viewTransaction
    console.log(productId, accessToken);
    axios
      .get(`${ApiConfig.viewTransaction}?_id=${productId} `, {
        headers: {
          token: accessToken,
        },
      })
      .then((response) => {
        if (response.data.response_code !== 200) {
          setLoader(false);
        } else {
          console.log("data123", response);

          setLoader(false);
          setProductDetails({
            // ...productDetails,
            // CategoryId: response.data.result._id,
            // ProductName: response.data.result.productName,
            // Metric: response.data.result.metric,
            // Price: response.data.result.price,
            // CurrencyType: response.data.result.currencyType,
            // MinimumValueofPurchase: response.data.result.minimumValueOfPurchase,
            // PayoutFrequency: response.data.result.payoutFrequency,
            // ProductImage: response.data.result.image,
          });
          setUser(response.data.result);
        }
      })
      .catch((response) => {
        // setIsUpdating(false);
        setLoader(false);

        console.log("response", response);
      });
  }, []);
  return (
        <Page
          title="View Transaction"
        >
              <Box mb={5}>
            <Typography variant="h3" style={{ marginBottom: "8px" }}>
              <strong>View Transaction</strong>
            </Typography>
            <Divider/>
          </Box>
            {!user ? (
              <>{loader && <CircularProgress style={{ color: "blue" }} />}</>
            ) : (
              <>

                    <Grid
                      container
                      className="centerTable"
                      spacing={2}
                    >
                       <Grid item xs={12} sm={4} md={3}>
                          {" "}
                          <Typography variant="body1">
                            <strong>   Transaction Id : </strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                          <Typography variant="body1">
                          {user?.chargeId}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                          {" "}
                          <Typography variant="body1">
                            <strong>   Plan Name : </strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                          <Typography variant="body1">
                          {user?.subscriptionId?.planName}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                          {" "}
                          <Typography variant="body1">
                            <strong>  Client Name :  </strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                          <Typography variant="body1">
                          {`${user?.userId?.firstName} ${user?.userId?.lastName}`}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                          {" "}
                          <Typography variant="body1">
                            <strong>   Plan Start Date : </strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                          <Typography variant="body1">
                          {moment(user?.paymentDate).format("YYYY-MM-DD")}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                          {" "}
                          <Typography variant="body1">
                            <strong>  Purchased Amount : </strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                          <Typography variant="body1">
                          $ {user.amount}
                          </Typography>
                        </Grid>







                     

                      
                      
                        <Grid item xs={12} sm={12} md={12}>
                          <Box mt={5} mb={1}>
                            <Button
                              variant="contained"
                              color="primary"
                              component={Link}
                              to="/user-transaction"
                              size="medium"
                            >
                               Close
                            </Button>
                          </Box>
                        </Grid>
                    </Grid>
              </>
            )}
        </Page>
  );
};

export default ViewProduct;
