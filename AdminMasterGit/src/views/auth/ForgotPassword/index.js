import {
  Typography,
  Box,
  FormControl,
  Button,
  FormHelperText,
  TextField,
  Link,
  CircularProgress,
  Tooltip,
  makeStyles,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Formik } from "formik";
import * as yep from "yup";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import { useHistory } from "react-router-dom";
import Page from "src/component/Page";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { calculateTimeLeft } from "src/utils";
import moment from "moment";
const useStyles = makeStyles(() => ({
  headsectionbox: {
    padding: "56px",
    paddingTop: "56px",
    paddingBotton: "0px",
    marginTop: "40px",
    backgroundColor: "white",
    borderRadius: 10,
    height: "100%",
    "@media(max-width:410px)": { padding: "35px" },
  },
  otp: {
    width: 50,
    height: 35,
    textAlign: "center",
    marginLeft: 10,
    // marginBottom: 10,
    border: "0.8px solid #ccc",
    borderRadius: "3px",
    fontSize: 20,
    "@media (max-width:767px)": {
      width: 44,
    },
  },
}));
export default function (props) {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [loader1, setLoader1] = React.useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [OtpSuccess, setOtpSuccess] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [mail, setMail] = React.useState("");
  const [isVerified, setIsverified] = React.useState(false);
  const redirect = () => {
    history.push({
      pathname: "/reset-password",
      search: "?query=abc",
      state: { email: mail },
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleOtp = (element, index) => {
    // if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    //focus next element
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const [timeLeft, setTimeLeft] = useState();

  console.log("otp", otp);

  const sendOTP = async () => {
    try {
      const response = await axios.post(ApiConfig.sendOTP, {
        email: mail,
      });

      if (response.data.response_code !== 200) {
        toast.error(response.data.response_message);
      } else if (response.data.response_code === 401) {
        setIsLoading(false);
        toast.error(response.data.response_message);
        alert(response.data.message);
      } else {
        setEndtime(moment().add(5, "m").unix());
        toast.success(response.data.response_message);
        setIsLoading(false);
        // openOTPpop();
        console.log("response", response);
      }
    } catch (err) {
      toast.error(err);
      console.error(err.response);
      //  setIsLoading(false);
    }
  };
  const verifyOtp = async (email) => {
    const vari = otp.toString();
    console.log("vari", vari);
    setLoader(true);
    try {
      const response = await axios.post(ApiConfig.verifyOTP, {
        email: mail,
        otp: parseInt(vari.replace(/,/g, "")),
      });

      if (response.data.response_code !== 200) {
        toast.error(response.data.response_message);
        setLoader(false);
      } else {
        toast.success(response.data.response_message);
        console.log("response", response);
        setOtpSuccess(response.data.response_message);
        setIsverified(true);
        // handleClickOpen();
        history.push("/reset-password");
        setLoader(false);
      }
    } catch (err) {
      toast.error(err);
      console.error(err.response);
      //  setIsLoading(false);
    }
  };
  const [endTime, setEndtime] = useState();
  useEffect(() => {
    if (open && endTime) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(endTime));
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  const _onBackSpace = (e) => {
    const keyCode = e.keyCode;
    const prev = e.target.previousSibling;
    if (keyCode === 8 && prev !== null) {
      setTimeout(() => {
        prev.focus();
      });
    }
  };
  return (
    <Page title="Forgot Password">
      <Box align="center">
        <Typography variant="h2" paragraph>
          Forgot Password
        </Typography>
        <Typography variant="body2">
          Enter your email address below and you will receive an OTP
        </Typography>
      </Box>
      <Box p={10} pt={7} pb={0} mt={5} className={classes.headsectionbox}>
        <Formik
          initialValues={{
            email: mail,
          }}
          initialStatus={{
            success: false,
            successMsg: "",
          }}
          validationSchema={yep.object().shape({
            email: yep
              .string()
              .matches(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please enter a valid email address"
              )
              .required("Email address required"),
          })}
          onSubmit={async ({ email }) => {
            try {
              setLoader1(true);
              const response = await axios.post(ApiConfig.forgotPassword, {
                email,
              });

              if (response.data.response_code !== 200) {
                setLoader1(false);
                toast.error(response.data.response_message);
              } else {
                setLoader1(false);
                sessionStorage.setItem("userMailForPaswword", email);
                toast.success(response.data.response_message);
                setEndtime(moment().add(5, "m").unix());
                handleClickOpen();
                // history.push('/reset-password')
              }
            } catch (err) {
              console.error(err.response);
              toast.error(err);

              //  setIsLoading(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Box>
                <FormControl fullWidth>
                  {/* <Typography paragraph>
                      Email Address<span style={{ color: "red" }}>*</span>
                    </Typography> */}
                  <Box className="tooltiptext">
                    <Typography>
                      <strong>
                        {" "}
                        Email Address :<sup style={{ color: "#FF0000" }}>*</sup>
                      </strong>
                    </Typography>
                    <Tooltip
                      describeChild
                      title="There must be only one @ symbol between user name and domain. There should not be any blank space."
                      placement="top"
                    >
                      <InfoOutlinedIcon />
                    </Tooltip>
                  </Box>
                  <TextField
                    type="text"
                    variant="outlined"
                    size="small"
                    name="email"
                    value={values.email}
                    error={Boolean(touched.email && errors.email)}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      setMail(e.target.value);
                    }}
                  />
                  <FormHelperText error>
                    {touched.email && errors.email}
                  </FormHelperText>
                </FormControl>
              </Box>

              <Box mt={3}>
                <Link to="/reset-password">
                  <Button
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                    color="primary"
                    disabled={loader1}
                  >
                    Submit
                    {loader1 && <ButtonCircularProgress />}
                  </Button>
                </Link>
              </Box>
            </form>
          )}
        </Formik>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <form onSubmit={verifyOtp}>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" align="center">
              <Typography variant="h4" style={{ marginBottom: "15px" }}>
                Enter your OTP
              </Typography>
              <Box mt={3} align="center">
                {otp &&
                  otp?.map((data, index) => {
                    return (
                      <input
                        type="text"
                        name="otp"
                        maxLength="1"
                        className={classes.otp}
                        style={{ border: "0.8px solid #ccc" }}
                        key={index}
                        value={data}
                        onChange={(e) => handleOtp(e.target, index)}
                        onKeyDown={_onBackSpace}

                      // error={isSubmit && otp === ''}
                      // helperText={isSubmit && otp === '' && 'Enter OTP'}
                      // onFocus={(e) => e.target.select()}
                      />
                    );
                  })}
                <Box textAlign="start">
                  <Typography
                    style={{
                      color: "red",
                      textAlign: "center",
                      marginTop: "10px",
                    }}
                    variant="body1"
                  ></Typography>
                </Box>
              </Box>
              <Box textAlign="start" mt={1}>
                {/* {timeLeft && ( */}
                <Typography variant="body1" style={{ textAlign: "center" }}>
                  {timeLeft && timeLeft.seconds > 0 ? (
                    <>
                      <Typography variant="body1" style={{ color: "red", fontSize: "13px", fontWeight: 500 }}
                      // onClick={sendOTP}
                      // disabled={timeLeft && timeLeft.seconds > 0}
                      >
                        Your OTP will expire in {timeLeft?.minutes} m : {timeLeft?.seconds} s
                      </Typography>{" "}
                      {/* <span style={{  color:"red" }}>
                      {` in ${timeLeft?.minutes}
                                    m : ${timeLeft?.seconds} s`}
                    </span> */}
                    </>
                  ) : (
                    <Button
                      onClick={sendOTP}
                      disabled={timeLeft && timeLeft.seconds > 0}
                    >
                      {" "}
                      Resend OTP{" "}
                    </Button>
                  )}
                </Typography>
                {/* )} */}
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={verifyOtp}
              color="primary"
              type="submit"
              disabled={loader}
            >
              Verify{loader && <ButtonCircularProgress />}
            </Button>
            {/* {isVerified ? (
            <Button onClick={redirect} color="primary">
              Ok
            </Button>
          ) : (
            <Button onClick={verifyOtp} color="primary" disabled={loader}>
              {" "}
              Verify{loader && <ButtonCircularProgress />}
            </Button>
          )} */}
          </DialogActions>
        </form>
      </Dialog>
    </Page>
  );
}
