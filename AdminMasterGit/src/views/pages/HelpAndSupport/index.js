import React from "react";
import Page from "src/component/Page";
import { Box, Typography, Divider } from "@material-ui/core";

export default function HelpAndSupport() {
  return (
    <Page title="Help and Support">
      <Box mb={5}>
        <Typography variant="h3" style={{ marginBottom: "8px" }}>
          <strong> Help and Support</strong>
        </Typography>
        <Divider />
      </Box>
      <Box mt={3}>
        <Typography variant="body2">
          Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in
          laying out print, graphic or web designs. The passage is attributed to
          an unknown typesetter in the 15th century who is thought to have
          scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a
          type specimen book.
        </Typography>
      </Box>
    </Page>
  );
}
