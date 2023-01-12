import { Box, Typography } from "@material-ui/core";
import React from "react";

export default function NoDataFound() {
  return (
    <Box align="center" mt={4} mb={5}>
      <Typography
        variant="h6"
        style={{ color: "gray", marginBottom: "10px", textAlign: "center" }}
      >
        NO DATA FOUND!
      </Typography>
      <img src="images/noresult.png" />
    </Box>
  );
}
