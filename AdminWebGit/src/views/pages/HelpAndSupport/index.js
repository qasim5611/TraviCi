import React, { useState,useEffect } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  Link,
  Divider,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import { ToastContainer, toast } from "react-toastify";


import FaqData from "./Faqdata";

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
        fontSize:"21px"
      },
    },
  },
}));

export default function Dashboard() {
  const classes = useStyles();



  const [allFaqs, setAllFaqs] = useState([]);


  const token = window.localStorage.getItem("creatturAccessToken");

  const FaqsList = async () => {
    // setIsLoading(true);
    const response = await axios({
      method: "POST",
      url: ApiConfig.faqsList,
      headers: {
        token: token,
      },
    })
      .then((response) => {
        if (response.data.response_code !== 200) {
          if (response.data.response_code === 404) {
            toast.error(response.data.response_message)
          
          }
        } else {
          setAllFaqs(response.data.result.docs)
          toast.success(response.data.response_message)
        }
      })
      .catch((response) => {
        toast.error(response)
      });
  };

  
  useEffect(() => {
    FaqsList()
  }, []);
  // useEffect(() => {
  //   axios
  //     .post(ApiConfig.faqsList, {
  //       headers: {
  //         token: token,
  //       },
  //     })
  //     .then((response) => {
  //       if (response.data.response_code === 200) {
  //         console.log(response);
  //         setAllFaqs(response.data)
  //       } else  if (response.data.response_code === 401){
  //         toast.error(response.data.response_message);
          
  //       }
  //     })
  //     .catch((response) => {
  //       console.log("response", response);
  //     });
  // }, []);

  return (
    <>
      <Box className={classes.FAQ}>
      <Box mb={5}>
        <Typography variant="h3" style={{ marginBottom: "8px" }}>
          <strong>FAQs</strong>
        </Typography>
        <Divider />
      </Box>
        {/* featured */}
            <Grid container spacing={2}>
              {allFaqs && allFaqs?.map((data, i) => {
                return (
                  <Grid item xs={12} sm={12} md={12} key={i}>
                    <FaqData data={data} index={i} />
                  </Grid>
                );
              })}
            </Grid>
      </Box>
    </>
  );
}
