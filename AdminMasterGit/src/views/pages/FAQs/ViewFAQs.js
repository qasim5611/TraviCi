import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  Divider,
  makeStyles,
  Button
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

import FaqData from "./Faqdata";
import axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const FaqDataList = [
  {
    head: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et elementum ligula. Vestibulum vitae turpis ac leo tincidunt hendrerit. Donec et interdum elit. Proin in augue vel justo maximus gravida. Nam lacus justo, bibendum non nisl eu, accumsan gravida sem. Proin a justo quis libero rutrum aliquam. Pellentesque non fringilla velit.",
  },
  {
    head: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et elementum ligula. Vestibulum vitae turpis ac leo tincidunt hendrerit. Donec et interdum elit. Proin in augue vel justo maximus gravida. Nam lacus justo, bibendum non nisl eu, accumsan gravida sem. Proin a justo quis libero rutrum aliquam. Pellentesque non fringilla velit.",
  },
  {
    head: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et elementum ligula. Vestibulum vitae turpis ac leo tincidunt hendrerit. Donec et interdum elit. Proin in augue vel justo maximus gravida. Nam lacus justo, bibendum non nisl eu, accumsan gravida sem. Proin a justo quis libero rutrum aliquam. Pellentesque non fringilla velit.",
  },
];

const useStyles = makeStyles((theme) => ({
  FAQ: {
    // background: "#000",
    // paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
  extraHeader: {
    "& h2": {
      color: "#fff",
      [theme.breakpoints.down("xs")]: {
        lineHeight: "32px",
        fontSize: "21px",
      },
    },
  },
}));
const Accordion = withStyles({
  root: {
    "&:not(:last-child)": {
      background: "#FFFFFF",
      border: "1px solid #E9E9E9",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      border: " 1px solid #3d3d3d",
      background:
        "linear-gradient( 152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
      backdropFilter: "blur(42px)",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    borderBottom: "0",
    marginBottom: -1,
    backgroundColor: "#C54C82",
    fontWeight: 500,
    fontSize: "24px",
    lineHeight: "36px",
    color: "#fff",
    minHeight: 45,
    "&$expanded": {
      minHeight: 45,
      borderBottom: "0",
      color: "#ffffff",
      backgroundColor: "#C54C82",
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    // background: "rgb(251, 253, 255)",
    backgroundColor: "#fff",
  },
}))(MuiAccordionDetails);
export default function Dashboard(props, index) {
  console.log("index", props);
  const classes = useStyles();
  const UserId = props.location.state.id;
  const [expanded, setExpanded] = React.useState("panel1");


  const [allFaqs, setAllFaqs] = useState([]);
  console.log("allFaqs", allFaqs);
  const accessToken = window.sessionStorage.getItem("creatturAccessToken");

  const viewFaq = async () => {
    // setIsLoading(true);
    const response = await axios({
      method: "GET",
      url: ApiConfig.viewFaq + UserId,
      headers: {
        token: accessToken,
      },
      // params: {
      //   _id: UserId,
      // },
    })
      .then((response) => {
        if (response.data.response_code !== 200) {
        } else {
          console.log(response.data.result);
          setAllFaqs(response.data.result);
          // setIsLoading(false);
          // closeBlock();
          // window.location.reload();
          // setUserId(null);
          // setBlock(false);
          // setBlock(false);
        }
      })
      .catch((response) => {
        // setIsUpdating(false);

        console.log("response", response);
      });
  };
  useEffect(() => {
    viewFaq();
  }, []);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <Box className={classes.FAQ}>
        <Box mb={5}>
          <Typography variant="h3" style={{ marginBottom: "8px" }}>
            <strong> View FAQs</strong>
          </Typography>
          <Divider />
        </Box>
        {/* featured */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} >
            <Accordion
              square
              defaultExpanded
              // defaultExpanded={index == 0 ? true : false}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
              >
                <Typography variant="h6" style={{ fontSize: "14px" }}>
                  {allFaqs.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  style={{ color: "rgb(110 110 110)", fontSize: "14px" }}
                >
                  {allFaqs.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>

      </Box>
      <Button
        component={Link}
        variant="contained"
        color="primary"
        size="medium"
        to="/Faq"
        style={{ marginRight: "10px" }}
      >
        Back
      </Button>
    </>
  );
}
