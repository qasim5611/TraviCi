import React from "react";


import { Grid, Box, Typography, Button } from "@material-ui/core";
import { Container } from "@material-ui/core";

import Page from "src/component/Page";
import { Link } from "react-router-dom";
const ViewMilestone = () => {
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
  const [selectedTab, setTab] = React.useState(0);

  const tabChange = (event, tabName) => {
    setTab(tabName);
  };
  return (
    <>
      <Container maxWidth="xl" style={{ paddingBottom: "60px" }}>
        <Page
          style={{ display: "flex", flexDirection: "column" }}
          title="View User"
        >
          <Box pt={2}>
            <Typography variant="h2">View Milestone</Typography>
          </Box>
          <Box mt={8}>
            <Grid container item md={6} direction="column" spacing={5}>
              <Row field="Contract Name" value="Contract A" />
              <Row field="Milestone 1" value="M1" />
              <Row field="Milestone 2" value="M2" />
              <Row field="Milestone 3" value="M3" />
              <Row field="Milestone 4" value="M4" />
            </Grid>
            <Link to="/milestone-management">
              {" "}
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
        </Page>
      </Container>
    </>
  );
};

export default ViewMilestone;
