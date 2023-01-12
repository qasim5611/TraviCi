import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import Footer from "./TopBar/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 80,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 240,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    background: "#ffffff",
  },
  content: {
    flex: "1 1 auto",
    overflow: "auto",
    overflowX: "hidden",
    padding: "30px 50px 0",
    position: "relative",
    WebkitOverflowScrolling: "touch",
    // paddingTop: 30,
    paddingBottom: 5,
    [theme.breakpoints.down('xs')]:{
      padding: "30px 15px",
    },
  },
  contentMilestone: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
    position: "relative",
    WebkitOverflowScrolling: "touch",
    padding: 20,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 5,
  },
  mainContant:{
    minHeight: "calc(100vh - 238px)",
    paddingBottom:"50px",
  },
}));

const DashboardLayout = ({ children }) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content} id="main-scroll">
           <div className={classes.mainContant} >
           {children}
           </div>
            <Footer />
          </div>
    
        </div>
      </div>
    
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default DashboardLayout;

export const MileStoneLayout = ({ children }) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.contentMilestone} id="main-scroll">
            {children}
            <Footer />
          </div>
        </div>
      </div>

    
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
