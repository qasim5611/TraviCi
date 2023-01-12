import {
  Typography,
  Box,
  Grid,
  makeStyles,
  Button,
  Container,
  DialogActions,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Page from "src/component/Page";
import LogoWithName from "src/component/LogoWithName";
import PricingPlan from "./PricingPlan";
import ApiConfig from "src/Config/APIconfig";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import { useHistory, useLocation } from "react-router-dom";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Footer from "../../../layouts/DashboardLayout/TopBar/Footer";

import CompanyLogos from "./CompanyLogos";
import Payment from "../Payment";
import PageLoading from "src/component/PageLoading";
import { toast } from "react-toastify";
const PremiumList = [
  {
    name: "Timeline",
  },
  {
    name: "Dashboard",
  },
  {
    name: "Custom Field",
  },
  {
    name: "Rule",
  },
  {
    name: "Forms",
  },
  {
    name: "Task Dependancies",
  },
  {
    name: "Dependancies data shifting",
  },
  {
    name: "Private projects",
  },
  {
    name: "Start dates",
  },
  {
    name: "Advanced Search and reporting",
  },
  {
    name: "Comment-only projects",
  },
  {
    name: "Google SSO",
  },
];

const BusinessList = [
  {
    name: "Everything in Premium",
  },
  {
    name: "Portfolios",
  },
  {
    name: "Goals",
  },
  {
    name: "Custom rules builder with conditional logic",
  },
  {
    name: "Forms branching & customization",
  },
  {
    name: "Approvals",
  },
  {
    name: "Lock Custom Fields",
  },
  {
    name: "Onboarding & training with Customer Success",
  },
  {
    name: "Workload",
  },
  {
    name: "Integrations with Salesforce, Adobe Creative Cloud, Tableau",
  },
];

const EnterpriseList = [
  { name: "Everything in Premium & Business" },
  { name: "SAML" },
  { name: "User provisioning & deprovisioning (SCIM)" },
  { name: "Data export & deletion" },
  { name: "Custom branding" },
  { name: "Dedicated Customer Success support" },
];
const useStyles = makeStyles((theme) => ({
  setImgFirst: {
    background: "url(/images/BlueBG.png) no-repeat",
    backgroundPosition: "center right",
    // height: '100%',
  },
  sideData: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    textAlign: "left",
    padding: 50,
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  boxBlock: {
    marginLeft: 120,
    marginRight: 120,
    marginTop: 40,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 50,
      marginRight: 50,
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
      marginRight: 0,
    },
    "@media(max-width:400px)": {
      marginLeft: 0,
      marginRight: 0,
    },
  },
}));

export default function Pricing() {
  const accessToken = window.localStorage.getItem("creatturAccessToken");
  const [planDetails1, setPlanDetails1] = useState([]);
  const [planDetails, setPlanDetails] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState();
  const [isDisabled, setIsdisabled] = useState(false);
  const [cardDetailsPop, setCardDetails] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const [planId, setPlanId] = useState();
  const [planPrice, setPlanPrice] = useState("");
  const [plans, setPlans] = useState("");
  const [plansType, setPlansType] = useState("");
  const closeCarddetail = () => setCardDetails(false);
  const [popup, setPopup] = useState(false);
  const [popup1, setPopup1] = useState(false);

  useEffect(() => {
    // setIsLoading(true);
    axios
      .get(
        ApiConfig.planList,

        {
          headers: {
            token: accessToken,
          },
        }
      )
      .then((response) => {
        if (response.data.response_code !== 200) {
        } else {
          setPlans(response.data.result[0].status);
          setPlansType(response.data.result[0].planType);

          // setcontractAdded(response.data.result[0].contractAdded);

          if (response.data.result[0].status !== "ACTIVE") {
          }
          // },3000);
          // else setHistory(depositFilter);
        }
        // setIsLoading(false);
      })
      .catch((response) => {
        // setIsUpdating(false);

        console.log("response", response);
      });
  }, []);
const [paymentLoader, setPaymentLoader] =useState(false)
  const madePayment = async (id) => {
    setPaymentLoader(true)
    try {
      const response = await axios.post(
        ApiConfig.madePayment,
        {
          _id: id,
        },
        {
          headers: {
            token: accessToken,
          },
        }
      );

      if (response.data.response_code !== 200) {
    setPaymentLoader(false)

        toast.error(response.data.responseMessage)
        // alert(response.data.message);
      } else {
    setPaymentLoader(false)

        toast.success("Your plan has been subscribed successfully ")
        history.push("/dashboard");
      }
    } catch (err) {
    setPaymentLoader(false)

      toast.error(err)
      console.error(err.response);
    }
  };

  const handleChoosePlan = (id, price) => {
    setPlanId(id);
    setPlanPrice(price);
    setIsdisabled(true);
    setSelectedIndex(id);
    // if (price === 0) history.push("/dashboard");
    setCardDetails(true);
  //   if (plans === "ACTIVE") {
  //     setPopup(true);
  //     console.log("id123", price);
  //   } else {
  //     {
  //       setPlanId(id);
  //       setPlanPrice(price);
  //       setIsdisabled(true);
  //       setSelectedIndex(id);
  //       setCardDetails(true);
  //     }
  //   }
  // };
  }

  const listPlan = async () => {
    try {
      const response = await axios.get(ApiConfig.subscriptionList, {
        headers: {
          token: accessToken,
        },
      });

      if (response.data.response_code !== 200) {
      } else {
        setPlanDetails(response.data.result.docs);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const classes = useStyles();

  useEffect(() => {
    listPlan();
  }, []);
  return (
    <>
      {planDetails.length > 0 ? (
          <Page title="Pricing" id="top">
            <Box >
              <Box mt={2} textAlign="center">
                <Typography variant="h2">
                  <span style={{ color: "#C54C82" }}>Flexible</span> plan
                </Typography>
                <Box display="flex" justifyContent="center" mt={2}>
                  <Box width="100%">
                    <Typography variant="body2">
                      Get the planning, reporting, and security features you
                      need to work more efficiently.
                    </Typography>
                  </Box>
                </Box>
                <Box className={classes.boxBlock}>
                  {/* <Container maxWidth="lg"> */}
                  <Grid container spacing={2}>
                    {planDetails &&
                      planDetails.map((obj) => (
                        <Grid item sm={12} md={6}>
                          <PricingPlan
                          currentPlan={plansType}
                            imgName="premium.png"
                            isDisabled={isDisabled}
                            planName={obj.planType}
                            currency={obj.currency}
                            price={obj.amount}
                            desc={`Easily track team projects and tasks with features like:`}
                            // featuresList={PremiumList}
                            featuresList={[
                              {
                                name: "Contract add",
                                value: obj.contractAdded,
                              },
                              
                              {
                                name: "Validator add",
                                value: obj.validatorAdded,
                              },
                            ]}
                            onClick={() => {
                              if (plansType === "ENTERPRISE") {
                                setPopup1(true);
                              } else {
                                handleChoosePlan(obj._id, obj.amount);
                              }
                            }}
                          />
                        </Grid>
                      ))}
                  </Grid>
                  {/* </Container> */}
                </Box>
                <Box mt={5} mb={5}>
                  <Typography>
                    <span style={{ fontSize: 24,fontWeight: 500, }}>
                      70,000+ paying customers rely on Smartech to reach their
                      goals
                    </span>
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-around"
                  alignItems="center"
                  className={classes.boxBlock}
                >
                  <CompanyLogos />
                </Box>

                  <Box mt={5} mb={5}>
                    <Typography>
                      <span style={{ fontSize: 24,fontWeight: 500, }}>
                        Each plan has features to help your team work more
                        efficiently
                      </span>
                    </Typography>
                  </Box>

                <Box className={classes.boxBlock}>
                  <Grid container spacing={3}     alignItems="center">
                    <Grid item sm={12} md={6}>
                      {/* <Box> */}
                      <img
                        src="images/useasana.png"
                        style={{ display: "block", width: "100%" }}
                        alt=""
                      />
                      {/* </Box> */}
                    </Grid>
                    <Grid item sm={12} md={6}>
                      <Box className={classes.sideData}>
                        <Typography variant="h3" paragraph>
                          Use Asana Premium to hit your deadlines
                        </Typography>
                        <Typography>
                          Use Timeline to plan projects right the first time and
                          keep work on track as things change.
                        </Typography>
                        <Box display="flex" justifyContent="center" mt={4}>
                          <Box fullWidth>
                            <Button
                              fullWidth
                              variant="contained"
                              color="primary"
                              // style={{ backgroundColor: '#C54C82', color: 'white' }}
                              size="medium"
                              href="#top"
                            >
                              Choose Plan
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <Box className={classes.boxBlock}>
                  <Grid container spacing={3}  alignItems="center">
                    <Grid item sm={12} md={6}>
                      <Box className={classes.sideData}>
                        <Typography variant="h3" paragraph>
                          Track key initiatives with Asana Business{" "}
                        </Typography>
                        <Typography>
                          Use Portfolios to track everything in your business,
                          from strategy to execution.
                        </Typography>
                        <Box display="flex" justifyContent="center" mt={4}>
                          <Box fullWidth>
                            <Button
                              fullWidth
                              variant="contained"
                              style={{
                                backgroundColor: "#C54C82",
                                color: "white",
                              }}
                              size="medium"
                              onClick={() => history.push("/contact-us")}
                            >
                              Contact Us
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                    <Dialog
                      open={cardDetailsPop}
                      onClose={closeCarddetail}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogContent
                        style={{
                          background: "#eaf1ef",
                        }}
                      >
                        <Payment
                          planId={planId}
                          paymentLoader={paymentLoader}
                          madePayment={madePayment}
                          planPrice={planPrice}
                        />
                      </DialogContent>
                    </Dialog>

                    <Dialog
                      open={popup}
                      onClose={() => setPopup(false)}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          <Typography variant="body1">
                            {" "}
                            Choose Currect Plans
                          </Typography>
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => setPopup(false)} color="primary">
                          OK
                        </Button>
                      </DialogActions>
                    </Dialog>

                    <Dialog
                      open={popup1}
                      onClose={() => setPopup1(false)}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      fullWidth
                      maxWidth="xs"
                    >
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                         <Box mt={3} align="center">
                         <Typography variant="body1" style={{color:"#000"}}>
                            {" "}
                            You have already Enterprise Plans
                          </Typography>
                         </Box>
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions   style={{ justifyContent: "center",}} >
                        <Button
                          onClick={() => setPopup1(false)}
                          color="primary"
                        >
                          OK
                        </Button>
                      </DialogActions>
                    </Dialog>

                    <Grid item sm={12} md={6}>
                      <img
                        src="images/trackkeyinitiatives.png"
                        style={{ display: "block", width: "100%" }}
                        alt=""
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Page>
      ) : (
        <PageLoading />
      )}
    </>
  );
}
