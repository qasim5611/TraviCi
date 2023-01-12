import React, { useState, useEffect } from "react";
import EditIcon from "@material-ui/icons/Edit";
// import base64Img from 'base64-img'
import {
  Grid,
  makeStyles,
  Link,
  TextField,
  Box,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  FormControl,
  FormHelperText,
  Divider,
  OutlinedInput,
  Container,
  CircularProgress,
} from "@material-ui/core";
import { Formik } from "formik";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import { useHistory } from "react-router-dom";
import * as yep from "yup";
import { Avatar } from "@material-ui/core";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "src/context/Auth";
const accessToken = window.localStorage.getItem("creatturAccessToken");

const useStyles = makeStyles((theme) => ({
  // mainBg:{
  //   backgroundColor:'#f0f0f0',
  //   height:'100vh'
  // },

  inputs: {
    backgroundColor: "#FFFFFF",
    padding: "15px",
  },

  trimmedButtons: {
    borderBottom: "1px Solid",
    borderRadius: "none",
  },

  lessround: {
    borderRadius: "4px",
    backgroundColor: "rgb(36,39,150)",
    color: "white",
  },
  profile: {
    userSelect: "none",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    // backgroundColor: "#c1c1c1",
    overflow: "hidden",
    border: "2px solid #C54C82",
    padding: "2px",
    "& img": {
      borderRadius: "50%",
    },
  },
  profileBox: {
    display: "flex",
    position: "relative",
    left: "44%",
    [theme.breakpoints.down("xs")]: {
      left: "28%",
    },
  },
}));

export default function (props) {
  const user = useContext(AuthContext);
  console.log("user---", user);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdating1, setIsUpdating1] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    profilePic: "",
    email: "",
    countryCode: "",
  });
  const [countryCodeNew, setCountryCodeNew] = useState(userData?.countryCode);
  const userType = window.localStorage.getItem("userType");

  const getProfileHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getProfile,
        headers: {
          token: accessToken,
        },
      });
      if (res.data.response_code === 200) {
        setIsUpdating1(false);
        // setDisplayname
        // console.log(result)
        console.log(res);
        setSrc(res.data.result.profilePic);
        setCountryCodeNew(res.data.result.countryCode);
        setUserData({
          firstName: res.data.result.firstName,
          lastName: res.data.result.lastName,
          mobileNumber: `${res.data.result.countryCode}${res.data.result.mobileNumber} `,
          profilepic: res.data.result.profilePic,
          email: res.data.result.email,
          countryCode: res.data.result.countryCode,
        });
      }
      setIsUpdating1(false);
    } catch (error) {
      setIsUpdating1(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (accessToken)
      getProfileHandler(accessToken)
  }, [accessToken])


  const [isEdit, setIsEdit] = React.useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const imagPic = localStorage.getItem("Profile");

  const [base64Img, setBase64Img] = useState(user.userData1.profilePic);
  const [file, setFile] = useState(null);
  const [src, setSrc] = useState(user.userData1.profilePic);
  const handleClose = () => {
    setConfirmation(false);
  };
  const classes = useStyles();
  const history = useHistory();

  function imageUpload(event) {
    setFile(event.target.files[0]);
    // console.log(URL.createObjectURL(event.target.files[0]))
    let base64img = user.userData1.profilePic;
    let reader = new FileReader();
    reader.onload = function () {
      base64img = reader.result;
      setBase64Img(base64img);
    };

    reader.readAsDataURL(event.target.files[0]);
  }
  const company12 = window.localStorage.getItem("agencyTeam");
  return (
    <>
      {" "}
      <Formik
        initialValues={{
          // oldPassword: "",
          firstName: "",
          lastName: "",
          location: "",
          profilePic: "",
          email: "",
          countryCode: userData.countryCode,
          // firstName: userData.firstName,
          // lastName: userData.lastName,
          // mobileNumber: userData.mobileNumber,
          // location: userData.location,
          // profilePic: userData.profilepic,
          // email: userData.email,
        }}
        initialStatus={{
          success: false,
          successMsg: "",
        }}
        validationSchema={yep.object().shape({
          firstName: yep
            .string()
            .required("First name is required")

            .min(2, "Should be 2 character long")
            .max(30, "Should not exceed 30 characters")
            .matches(
              /^[A-Za-z]+$/,
              "Only alphabets are allowed for this field "
            ),
          lastName: yep
            .string()
            .required("Last name is required")

            .min(2, "Should be 2 character long")
            .max(30, "Should not exceed 30 characters")
            .matches(
              /^[A-Za-z]+$/,
              "Only alphabets are allowed for this field "
            ),

          email: yep
            .string()
            .matches(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              "Please enter a valid email address"
            ),
          // .required("Email address is required"),
        })}
        onSubmit={async ({
          firstName,
          lastName,
          mobileNumber,
          location,
          profilePic,
          countryCode,
          // email,
        }) => {
          setIsUpdating(true);
          console.log("base64Img", base64Img);

          try {
            console.log("base64Img", base64Img);
            const response = await axios.put(
              ApiConfig.editProfile,
              {
                firstName,
                lastName,
                mobileNumber: mobileNumber.slice(countryCode.length),
                profilePic: base64Img,
                countryCode: countryCodeNew,
                // email,
              },
              {
                headers: {
                  token: accessToken,
                },
              }
            );
            if (response.status !== 200) {
              toast.warn(response.response_message);
            } else if (response.status === 401) {
              toast.success(response.response_message);
              setIsUpdating(false)
              // alert(response.message);
            } else {
              setIsUpdating(false);
              toast.success(response.response_message);
              getProfileHandler(accessToken)
              user.getProfileHandler(accessToken)
              history.push("/dashboard");
              setIsEdit(!isEdit);
            }
          } catch (err) {
            console.log("submitted");
            console.error(err.response);
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
          setFieldValue,
        }) => {
          console.log(values.mobileNumber, "values...........");
          return (
            <form noValidate onSubmit={handleSubmit}>
              {isUpdating1 ? (
                <Box textAlign="center" pt={4}>
                  <CircularProgress />
                </Box>
              ) : (
                <Container maxWidth="xl">
                  <Box>
                    <Grid
                      container
                      direction="column"
                      calssName="login-text"
                      spacing={0}
                    >
                      {userType == "FREELANCER" ? (
                        <Box mb={5}>
                          <Typography
                            variant="h3"
                            style={{ marginBottom: "8px" }}
                          >
                            <strong> Client Profile</strong>
                          </Typography>
                          <Divider />
                        </Box>
                      ) : (
                        // <Grid item>
                        //   <Typography variant="h2">
                        //     Freelancer Profile
                        //   </Typography>
                        // </Grid>
                        <>
                          {userType == "VALIDATOR" ? (
                            <Box mb={5}>
                              <Typography
                                variant="h3"
                                style={{ marginBottom: "8px" }}
                              >
                                <strong> Validator Profile</strong>
                              </Typography>
                              <Divider />
                            </Box>
                          ) : (
                            <>
                              <Box mb={5}>
                                <Typography
                                  variant="h3"
                                  style={{ marginBottom: "8px" }}
                                >
                                  <strong> Company Profile</strong>
                                </Typography>
                                <Divider />
                              </Box>
                            </>
                          )}
                        </>
                      )}
                      {/* <Grid item>
                  <Typography>
                    Lorem ipsum Manage your info, privacy, and security{" "}
                  </Typography>
                </Grid> */}
                    </Grid>
                    <Box display="flex" pt={4} justifyContent="center">
                      <Box display="flex" flexDirection="column">
                        <Box
                          display="flex"
                          flexDirection="column"
                          className={classes.inputs}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "20px",
                            }}
                          >
                            <Box className={classes.profileBox}>
                              <Avatar
                                className={classes.profile}
                                src={base64Img ? base64Img : imagPic}
                              ></Avatar>
                              <FormControl>
                                <Button
                                  component="label"
                                  disabled={!isEdit}
                                  style={{
                                    justifyContent: "flex-start",
                                    position: "relative",
                                    left: "-100px",
                                    color: "transparent",
                                    // border: "1px solid"
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "50%",
                                  }}
                                >
                                  <input
                                    type="file"
                                    hidden
                                    name="file"
                                    accept="image/png, image/gif, image/jpeg"
                                    multiple
                                    onChange={imageUpload}
                                  />
                                </Button>
                              </FormControl>
                            </Box>
                            <Box
                              style={{ textAlign: "end" }}
                              className="d-flex justify-content-between"
                            >
                              <Button
                                onClick={() => {
                                  values.firstName = userData?.firstName;
                                  values.lastName = userData?.lastName;
                                  values.mobileNumber = userData?.mobileNumber;
                                  values.email = userData?.email;
                                  values.profilePic = userData?.profilepic;
                                  values.location = userData?.location;
                                  values.countryCode = userData?.countryCode;
                                  setIsEdit(!isEdit);
                                }}
                              >
                                <Typography variant="h5">Edit </Typography>
                                <EditIcon
                                  fontSize="small"
                                  style={{ marginLeft: "5px" }}
                                />
                              </Button>
                            </Box>
                          </div>

                          <Grid container spacing={3}>
                            <Grid item md={6} lg={6} sm={12} xs={12}>
                              <FormControl fullWidth>
                                <Typography>
                                  <strong> First Name :</strong>
                                </Typography>

                                <TextField
                                  variant="outlined"
                                  name="firstName"
                                  size="small"
                                  disabled={!isEdit}
                                  fullWidth="true"
                                  // placeholder={userData.firstName}
                                  value={
                                    isEdit
                                      ? values.firstName
                                      : userData.firstName
                                  }
                                  error={Boolean(
                                    touched.firstName && errors.firstName
                                  )}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                                <FormHelperText error>
                                  {touched.firstName && errors.firstName}
                                </FormHelperText>
                              </FormControl>
                            </Grid>

                            <Grid item md={6} lg={6} sm={12} xs={12}>
                              <FormControl fullWidth>
                                <Typography>
                                  <strong> Last Name :</strong>
                                </Typography>

                                <TextField
                                  variant="outlined"
                                  name="lastName"
                                  size="small"
                                  disabled={!isEdit}
                                  fullWidth="true"
                                  // placeholder={userData.lastName}
                                  value={
                                    isEdit ? values.lastName : userData.lastName
                                  }
                                  error={Boolean(
                                    touched.lastName && errors.lastName
                                  )}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                                <FormHelperText error>
                                  {touched.lastName && errors.lastName}
                                </FormHelperText>
                              </FormControl>
                            </Grid>

                            <Grid item md={6} lg={6} sm={12} xs={12}>
                              <Box>
                                <FormControl fullWidth>
                                  <Typography>
                                    <strong>
                                      {" "}
                                      Mobile Number
                                      <sup style={{ color: "#FF0000" }}>*</sup>
                                    </strong>
                                  </Typography>
                                  <PhoneInput
                                    // country={"india"}
                                    name="mobileNumber"
                                    // disableAreaCodes
                                    // disableCountryCode
                                    // disableDropdown
                                    disabled={true}
                                    disabled={!isEdit}
                                    fullWidth="true"
                                    // placeholder="Mobile Number "
                                    value={
                                      isEdit
                                        ? values.mobileNumber
                                        : userData.mobileNumber
                                    }
                                    error={Boolean(
                                      touched.mobileNumber &&
                                      errors.mobileNumber
                                    )}
                                    onBlur={handleBlur}
                                    // onChange={(phone) => handlePhoneChange(phone)}
                                    onChange={(phone, e) => {
                                      setCountryCodeNew(e.dialCode);
                                      setFieldValue("mobileNumber", phone);
                                    }}
                                    inputStyle={{
                                      width: "100%",
                                      height: "41px",
                                    }}
                                  // style={{ height: "51px" }}
                                  />
                                  <FormHelperText error>
                                    {touched.mobileNumber &&
                                      errors.mobileNumber}
                                  </FormHelperText>
                                </FormControl>
                              </Box>
                            </Grid>

                            <Grid item md={6} lg={6} sm={12} xs={12}>
                              <FormControl fullWidth>
                                <Typography>
                                  <strong> Email address :</strong>
                                </Typography>

                                <TextField
                                  variant="outlined"
                                  name="email"
                                  disabled={true}
                                  value={isEdit ? values.email : userData.email}

                                  fullWidth="true"
                                  size="small"
                                  // value={isEdit ? values.email : userData.email}
                                  error={Boolean(touched.email && errors.email)}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                                <FormHelperText error>
                                  {touched.email && errors.email}
                                </FormHelperText>
                              </FormControl>
                            </Grid>

                            {userType == "FREELANCER" ? (
                              ""
                            ) : (
                              <>
                                {userType !== "VALIDATOR" && (
                                  <Grid item md={6} sm={12} xs={12}>
                                    <FormControl fullWidth>
                                      <Box>
                                        <Typography>
                                          <strong> Company Name :</strong>
                                        </Typography>
                                      </Box>

                                      <TextField
                                        variant="outlined"
                                        name="email"
                                        disabled={true}
                                        value={company12}

                                        fullWidth="true"
                                        size="small"
                                      // placeholder={userData.email}
                                      // value={isEdit ? values.email : userData.email}
                                      // error={Boolean(touched.agencyTeam && errors.agencyTeam)}
                                      // onBlur={handleBlur}
                                      // onChange={handleChange}
                                      />
                                      <FormHelperText error>
                                        {touched.email && errors.email}
                                      </FormHelperText>
                                    </FormControl>
                                  </Grid>
                                )}
                              </>
                            )}

                          </Grid>
                        </Box>
                        <Box p={1}>
                          <Button
                            type="submit"
                            fullWidth
                            size="large"
                            variant="contained"
                            disabled={!isEdit || isUpdating}
                            color="primary"
                          // onClick={
                          //   setIsUpdating(false)}
                          >
                            Submit{isUpdating && <ButtonCircularProgress />}
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Container>
              )}
            </form>
          );
        }}
      </Formik>
      <Dialog
        open={confirmation}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            <Box mt={3}>Profile has been successfully updated</Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button onClick={() => history.push("/dashboard")} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
