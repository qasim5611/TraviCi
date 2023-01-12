import React from "react";
import GeneralUser from "./Components/GeneralUser";
import Contracts from "./Components/Contracts";

import { Container, Box, Typography, makeStyles, Divider } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Page from "src/component/Page";
// import { useStyles } from "@material-ui/pickers/views/Calendar/SlideTransition";

// const useStyles = makeStyles((thems) => {
const useStyles = makeStyles((theme) => ({
  container: {
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
      "& .MuiCardContent-root": {
        padding: "10px 5px",
      },
      // "& MuiCardContent-root":
    },
  },
}));
const ViewUser = (props) => {
  const classes = useStyles();
  const [selectedTab, setTab] = React.useState(0);
  const userId = props?.location?.state?.data || null;
  const userType = props?.location?.state?.userType || null;
  const email = props?.location?.state?.email || null;
  window.sessionStorage.setItem("userTypes", userId);
  const tabChange = (event, tabName) => {
    setTab(tabName);
  };
  return (
    <Page
      title="View User"
    >
      <Box mb={5}>
        <Typography variant="h3" style={{ marginBottom: "8px" }}>
          <strong> View User</strong>
        </Typography>
        <Divider />
      </Box>
      <Box mt={4} className={classes.container}>
        <Tabs
          value={selectedTab}
          onChange={tabChange}
          aria-label="simple tabs example"
          indicatorColor="secondary"
        >
          <Tab label="General" />
          <Tab label="Contracts" />
        </Tabs>

        {selectedTab === 0 && (
          <GeneralUser userId={userId} userType={userType} />
        )}
        {selectedTab === 1 && (
          <Contracts userId={userId} userType={userType} email={email} />
        )}
      </Box>
    </Page>
  );
};

export default ViewUser;
