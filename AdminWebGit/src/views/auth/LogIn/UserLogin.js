import {
  Typography,
  Box,
  FormControl,
  Button,
  FormHelperText,
  TextField,
  Link,
  IconButton,
  InputAdornment,
  OutlinedInput,
  CircularProgress,
  Tooltip,
  makeStyles,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import React, { useState, useContext, useEffect } from "react";
import { calculateTimeLeft } from "src/utils";

import { toast } from "react-toastify";
import { Formik } from "formik";
import * as yep from "yup";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useHistory } from "react-router-dom";
import ApiConfig from "src/Config/APIconfig";
import Page from "src/component/Page";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { AuthContext } from "src/context/Auth";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
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
      width: 45,
    },
  },
}));
export default function (props) {
  const auth = useContext(AuthContext);
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [token, setToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingVer, setisLoadingVer] = useState(false);
  const [isLoaderSubmit, setisLoaderSubmit] = useState(false);
  const [timeLeft, setTimeLeft] = useState();
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [isVerified, setIsverified] = useState(false);
  console.log("timeLeft", timeLeft);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const history = useHistory();
  // useEffect(
  //   (element) => {
  //     if (!otp && deletData === 8) {
  //       element.current.focus();
  //     }
  //   },
  //   [otp]
  // );
  const accessToken = window.localStorage.getItem("creatturAccessToken");
  if (accessToken) {
    history.push("/dashboard");
    return <div></div>;
  }
  const [open1, setOpen1] = useState(false);
  const [endTime, setEndtime] = useState();
  const mail = localStorage.getItem("userEmail");
  const verifyOtp = async (email) => {
    const vari = otp.toString();
    setErrorMessage("");
    setisLoadingVer(true);
    try {
      const response = await axios.post(ApiConfig.verifyOTP, {
        email: mail,
        otp: parseInt(vari.replace(/,/g, "")),
      });

      if (response.data.response_code !== 200) {
        toast.error(response.data.response_message);
        // setErrorMessage(response.data.response_message);
        setisLoadingVer(false);
      } else {
        // setOtpSuccess(response.data.response_message);
        toast.success(response.data.response_message);
        setisLoadingVer(false);
        setOpen1(false);
        setIsverified(true);
        // setOpen1(true);
        // handleClickOpen();
      }
    } catch (err) {
      console.error(err.response);
      toast.error(err.message);
      //  setIsLoading(false);
    }
  };
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
  const handleOtp = (element, index) => {
    // if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    //focus next element
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const _onBackSpace = (e) => {
    const keyCode = e.keyCode;
    const prev = e.target.previousSibling;
    if (keyCode === 8 && prev !== null) {
      setTimeout(() => {
        prev.focus();
      });
    }
  };
  useEffect(() => {
    if (open1 && endTime) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(endTime));
      }, 1000);
      return () => clearTimeout(timer);
    }
  });
  return (
    <Page title="Sign In">
      {/* <Box> */}
      <Box
        p={10}
        pt={7}
        pb={0}
        mt={5}
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          height: "100%",
          padding: "45px",
        }}
      >
        <Formik
          initialValues={{
            email: "",
            password: "",
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
              .required("Email address is required"),
            password: yep.string().required("Password is required"),
          })}
          onSubmit={async ({ email, password }) => {
            try {
              setIsLoading(true);
              const response = await axios.post(ApiConfig.userLogin, {
                email: email,
                password: password,
              });

              if (response.data.response_code !== 200) {
                setIsLoading(false);

                console.log(response.data.response_message);
                setErrorMessage(response.data.response_message);
                toast.error(response.data.response_message);
                // handleClickOpen();
              } else {
                if (response.data.result.otpVerification === false) {
                  setOpen1(true);
                  setEndtime(moment().add(5, "m").unix());
                  window.localStorage.setItem(
                    "userEmail",
                    response?.data?.result?.email
                  );

                  setIsLoading(false);
                  toast.success(response.data.response_message);
                } else {
                  toast.success(response.data.response_message);
                  window.localStorage.setItem(
                    "userType",
                    response?.data?.result?.result?.userType
                      ? response?.data?.result?.result?.userType
                      : response?.data?.result?.userType
                  );


                  // auth.userLogIn(true, response.data.data.token);
                  // chk for 2fa in res data then open  popupwith with 3 options viz send sms , google auth , skip (in radio button)
                  auth.userLogIn(
                    true,
                    response?.data?.result?.token
                      ? response?.data?.result?.token
                      : response?.data?.result?.result?.token,

                    response?.data?.result?.userType
                      ? response?.data?.result?.userType
                      : response?.data?.result?.result?.userType, //FREELANCER

                    response.data.result.agencyTeam
                  );
                  setToken(
                    response?.data?.result?.token
                      ? response?.data?.result?.token
                      : response?.data?.result?.result?.token
                  );

                  console.log(
                    "userType----------``~login",
                    response.data.result.userType
                  );

                  window.localStorage.setItem(
                    "userEmail",
                    response?.data?.result?.email
                      ? response?.data?.result?.email
                      : response?.data?.result?.result?.email
                  );
                  console.log(
                    "response.data.result",
                    response.data.result.email
                  );
                  console.log("result on user login", response.data.result);

                  // setIsUpdating(false);

                  console.log("Done");
                }

                // history.push("/dashboard");
              }
            } catch (err) {
              console.error(err.response);
              setIsLoading(false);
              // setIserror(true);
              // setIsSuccess(false);
              // setIsUpdating(false);
              // setAlertMsg(err.response.data.message);
            }
          }}
        // onSubmit={() => {
        //   history.push("/dashboard");
        // }}
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
              <Box textAlign="left">
                <FormControl fullWidth>
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
                    onChange={handleChange}
                  />
                  <FormHelperText error>
                    {touched.email && errors.email}
                  </FormHelperText>
                </FormControl>
              </Box>
              <Box mt={2} textAlign="left">
                <FormControl fullWidth>
                  {/* <Box className="tooltiptext"> */}
                  <Typography>
                    <strong> Password :</strong>
                    <sup style={{ color: "#FF0000", textAlign: "left" }}>*</sup>
                  </Typography>
                  {/* <Tooltip describeChild title="Does not add if it already exists.">
                        <InfoOutlinedIcon  />
                        </Tooltip>
                  
                  </Box> */}
                  <OutlinedInput
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    name="password"
                    margin="dense"
                    value={values.password}
                    error={Boolean(touched.password && errors.password)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          // onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText error>
                    {touched.password && errors.password}
                  </FormHelperText>
                </FormControl>
              </Box>
              <Box textAlign="right">
                <Typography
                  variant="body2"
                // style={{ display: "flex", justifyContent: "center" }}
                >
                  <Link to="/forgot-password" component={RouterLink}>
                    Forgot Password?
                  </Link>
                </Typography>
              </Box>
              <Box mt={3}>
                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                >
                  Login
                  {isLoading && (
                    <Box color="secondary.main" pl={1.5} display="flex">
                      <ButtonCircularProgress />
                    </Box>
                  )}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
        <Box textAlign="center" mt={3}>
          <Typography
            variant="body2"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {" "}
            Don't have an account ? &nbsp;
            <Link to="/registration" component={RouterLink}>
              Create Account
            </Link>
          </Typography>
        </Box>
      </Box>
      {/* </Box> */}

      <Dialog
        open={open1}
        onClose={() => setOpen1(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <form onSubmit={verifyOtp}>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Box align="center">
                <Typography variant="h4">Enter your OTP</Typography>
              </Box>

              <Box mt={3} mb={1} align="center">
                {otp &&
                  otp?.map((data, index) => {
                    return (
                      <input
                        type="text"
                        name="otp"
                        maxLength="1"
                        className={classes.otp}
                        key={index}
                        value={data}
                        onChange={(e) => handleOtp(e.target, index)}
                        onKeyDown={_onBackSpace}
                      // onKeyUp={(e)=> setDeletData(e.keyCode)}
                      // error={isSubmit && otp === ''}
                      // helperText={isSubmit && otp === '' && 'Enter OTP'}
                      // onFocus={(e) => e.target.select()}
                      />
                    );
                  })}

                <Box textAlign="start" mt={1}>
                  {/* {timeLeft && ( */}
                  <Typography variant="body1" style={{ textAlign: "center" }}>
                    {timeLeft && timeLeft.seconds > 0 ? (
                      <>
                        <Typography
                          variant="body1"
                          style={{
                            color: "red",
                            fontSize: "13px",
                            fontWeight: 500,
                          }}
                        // onClick={sendOTP}
                        // disabled={timeLeft && timeLeft.seconds > 0}
                        >
                          Your OTP will expire in {timeLeft?.minutes} m :{" "}
                          {timeLeft?.seconds} s
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
              </Box>
              <Typography
                style={{ color: "green" }}
                variant="body1"
                align="center"
              >
                {/* {OtpSuccess} */}
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={verifyOtp}
              type="submit"
              disabled={isLoadingVer}
              color="primary"
            >
              {" "}
              Verify{isLoadingVer && <ButtonCircularProgress />}
            </Button>

            {/* {isVerified ? (
            <Button onClick={redirect} color="primary">
              Ok
            </Button>
          ) : (
            <Button onClick={verifyOtp} disabled={isLoadingVer} color="primary">
              {" "}
              Verify {isLoadingVer && <ButtonCircularProgress />}
            </Button>
          )} */}
          </DialogActions>
        </form>
      </Dialog>
    </Page>
  );
}
