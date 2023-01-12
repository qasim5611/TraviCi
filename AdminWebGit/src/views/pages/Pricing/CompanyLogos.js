import React from "react";
import { Box, Grid } from "@material-ui/core";

export default function CompanyLogos() {
  return (
    <>
      <Grid container spacing={3} alignItems="center"      justifyContent="center"   > 
        <Grid item lg={2} md={3} sm={4} xs={6}>
          <Box>
            <img src="images/allstate.png" width="100" alt="allstate" />
          </Box>
        </Grid>
        <Grid item lg={2} md={3} sm={4} xs={6}>
          <Box>
            <img
              src="images/new-york-times.png"
              width="100"
              alt="new-york-times"
            />
          </Box>
        </Grid>
        <Grid item lg={2} md={3} sm={4} xs={6}>
          <Box>
            <img src="images/redbull.png" width="100" alt="redbull" />
          </Box>
        </Grid>
        <Grid item lg={2} md={3} sm={4} xs={6}>
          <Box>
            <img src="images/deloitte.png" width="100" alt="deloitte" />
          </Box>
        </Grid>
        <Grid item lg={2} md={3} sm={4} xs={6}>
          <Box>
            <img src="images/airbnb.png" width="100" alt="airbnb" />
          </Box>
        </Grid>
        <Grid item lg={2} md={3} sm={4} xs={6}>
          <Box>
            <img src="images/usaid.png" alt="" width="100" alt="usaid" />
          </Box>
        </Grid>
        <Grid item lg={2} md={3} sm={4} xs={6}>
          <Box>
            <img
              src="images/general-electric.png"
              width="85"
              alt="general-electric"
            />
          </Box>
        </Grid>
        <Grid item lg={2} md={3} sm={4} xs={6}>
          <Box>
            <img src="images/nasa.png" alt="" width="100" alt="nasa" />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

{
  /* <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Box>
          <img src="images/allstate.png" width="100" alt="allstate" />
        </Box>
        <Box>
          {" "}
          <img
            src="images/new-york-times.png"
            width="100"
            alt="new-york-times"
          />
        </Box>
        <Box>
          {" "}
          <img src="images/redbull.png" width="100" alt="redbull" />
        </Box>
        <Box>
          <img src="images/deloitte.png" width="100" alt="deloitte" />
        </Box>
        <Box>
          {" "}
          <img src="images/airbnb.png" width="100" alt="airbnb" />
        </Box>
        <Box>
          <img src="images/usaid.png" alt="" width="100" alt="usaid" />
        </Box>
        <Box>
          {" "}
          <img
            src="images/general-electric.png"
            width="85"
            alt="general-electric"
          />
        </Box>
        <Box>
          <img src="images/nasa.png" alt="" width="100" alt="nasa" />
        </Box>
      </Box> */
}