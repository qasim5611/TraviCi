import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Button } from "@material-ui/core";
import axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import { Link } from "react-router-dom";
const Row = ({ field, value, image }) => (
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
      {image && <img src={image} alt="comp" width="90px" />}
    </Grid>
  </Grid>
);

export default (props) => {
  const [planDetails, setplanDetails] = useState({});
  const planName = props.location && props.location.state.name;
  const planPrice = props.location && props.location.state.price;
  useEffect(() => {
    // setIsLoading(true);
    axios
      .get(`${ApiConfig.viewPlan}?planName=${planName}`)
      .then((response) => {
        if (response.data.response_code !== 200) {
        } else {
          // setDisplayname
          // console.log(result)

          setplanDetails(response.data.result);
          console.log(response);

          // else setHistory(depositFilter);
        }
        // setIsLoading(false);
      })
      .catch((response) => {
        // setIsUpdating(false);

        console.log("response", response);
      });
  }, []);
  return (
    <Box mt={8}>
      <Grid container item md={6} direction="column" spacing={5}>
        <Row field="Plan Name" value={planName} />
        <Row field="Plan price" value={planPrice} />
        <Row field="Status" value={planDetails.status} />
        <Row field="Created At" value={planDetails.createdAt} />
        <Row field="Plan Image :" image={planDetails.planImage} />
      </Grid>
      <Link to="/subscription-management">
        <Button
          variant="contained"
          size="large"
          color="primary"
          style={{ marginTop: "30px" }}
        >
          Back
        </Button>
      </Link>
    </Box>
  );
};

