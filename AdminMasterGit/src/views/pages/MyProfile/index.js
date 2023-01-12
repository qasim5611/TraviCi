import { AuthContext } from "src/context/Auth";
import React, { useState, useEffect, useContext } from "react";
import EditIcon from "@material-ui/icons/Edit";
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
  CircularProgress,
  Avatar,
  Divider,
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
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";


const accessToken = window.sessionStorage.getItem("creatturAccessToken");
const useStyles = makeStyles((theme) => ({
  // mainBg:{
  //   backgroundColor:'#f0f0f0',
  //   height:'100vh'
  // },

  inputs: {
    backgroundColor: "#FFFFFF",
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
  profileBox: {
    display: "flex",
    position: "relative",
    left: "44%",
    [theme.breakpoints.down('xs')]: {
      left: "35%",
    },
  },
}));

export default function (props) {
  const [loader, setLoader] = useState(true);
  const [loader1, setLoader1] = useState(false);
  const user = useContext(AuthContext);


  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",

    profilePic: "",
    email: "",
    countryCode: "",
  });
  const [countryCodeNew, setCountryCodeNew] = useState(userData?.countryCode);


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
        setLoader(false);
        // setDisplayname
        // console.log(result)
        console.log(res);
        // setSrc(res.data.result.profilePic);
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
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (accessToken)
      getProfileHandler(accessToken)
  }, [accessToken])









  const imagPic = sessionStorage.getItem("Profile")
  const [isEdit, setIsEdit] = React.useState(true);
  const [confirmation, setConfirmation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [base64Img, setBase64Img] = useState(user?.userData?.profilePic);
  const [profileImage, setprofileImage] = useState("");
  console.log("base64Img", base64Img);
  console.log("userData", userData?.profilePic);

  const handleClose = () => {
    setConfirmation(false);
  };
  const classes = useStyles();
  const history = useHistory();

  function imageUpload(event) {
    // setFile(event.target.files[0]);
    // console.log(URL.createObjectURL(event.target.files[0]))
    let base64img = user.userData.profilePic;
    console.log("base64img", base64img);
    let reader = new FileReader();
    reader.onload = function () {
      base64img = reader.result;
      setBase64Img(base64img);
    };

    reader.readAsDataURL(event.target.files[0]);
  }
  // console.log("userData", userData.profilePic);
  return (
    <>
      {" "}
      <Formik
        initialValues={{
          // oldPassword: "",
          firstName: userData.firstName,
          lastName: userData.lastName,


          profilePic: userData.profilePic,
          email: userData.email,
          countryCode: userData.countryCode,
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
          // .required("Email address required"),
        })}
        onSubmit={async ({
          firstName,
          lastName,
          mobileNumber,
          location,
          profilePic,
          countryCode,
          email,
        }) => {
          try {
            setLoader1(true);
            const formData = new FormData();
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("mobileNumber", mobileNumber);
            formData.append("countryCode", countryCodeNew);

            // formData.append("email",email);
            formData.append("profilePic", base64Img);
            const response = await axios({
              method: "PUT",
              url: ApiConfig.editProfile,
              // data: formData,

              headers: {
                token: accessToken,
              },
              data: {
                firstName: firstName,
                lastName: lastName,
                mobileNumber: mobileNumber.slice(countryCode.length),
                profilePic: base64Img,
                countryCode: countryCodeNew,
              },
            });

            if (response.data.response_code !== 200) {
              setLoader1(false);
            } else if (response.data.response_code === 401) {
              toast.error(response.data.response_message);
              setLoader1(false);
            } else {
              toast.success(response.data.response_message);
              console.log("response", response);
              getProfileHandler(accessToken)

              user.getProfileHandler()

              history.push("/dashboard")
              // setConfirmation(true);
              setLoader1(false);
            }
          } catch (err) {
            toast.error(err);
            console.error(err.response);
            setLoader1(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box mb={5}>
              <Typography variant="h3" style={{ marginBottom: "8px" }}>
                <strong> Admin Profile</strong>
              </Typography>
              <Divider />
            </Box>
            <Box display="flex" justifyContent="center">
              <Box pt={2}>
                {loader ? (
                  <Box pt={5} textAlign="center">
                    <CircularProgress />
                  </Box>
                ) : (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                        paddingTop: "20px",
                      }}
                    >
                      <Box
                        className={classes.profileBox}
                      >
                        <Avatar
                          src={base64Img ? base64Img : user?.userData?.profilePic}
                          style={{
                            userSelect: "none",
                            width: "100px",
                            height: "100px",
                            // value={
                            //   isEdit ? values.firstName : userData.firstName
                            // }
                          }}
                        ></Avatar>
                        <FormControl>
                          <Button
                            component="label"
                            disabled={isEdit}
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
                              multiple
                              accept="image/png, image/gif, image/jpeg"
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
                            values.profilePic = userData?.profilePic;
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
                    <Box display="flex" p={4} alignItems="center">
                      <Box display="flex" flexDirection="column">
                        <Box
                          display="flex"
                          flexDirection="column"
                          //   p={3}
                          //   mt={3}
                          className={classes.inputs}
                        >
                          {/* <Box style={{ textAlign: "end" }}>
                        <Button onClick={() => setIsEdit(!isEdit)}>
                          <Typography variant="h5">Edit </Typography>
                          <EditIcon
                            fontSize="small"
                            style={{ marginLeft: "5px" }}
                          />
                        </Button>
                      </Box> */}

                          <Grid container spacing={3}>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                              <FormControl fullWidth>
                                <Typography variant="body2">
                                  <strong>First Name :</strong>
                                </Typography>

                                <TextField
                                  variant="outlined"
                                  name="firstName"
                                  size="small"
                                  disabled={isEdit}
                                  fullWidth="true"
                                  placeholder={userData.firstName}
                                  value={values.firstName}
                                  // value={
                                  //   isEdit ? values.firstName : userData.firstName
                                  // }
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

                            <Grid item lg={6} md={6} sm={12} xs={12}>
                              <FormControl fullWidth>
                                <Typography variant="body2">
                                  <strong> Last Name</strong>
                                </Typography>

                                <TextField
                                  variant="outlined"
                                  name="lastName"
                                  size="small"
                                  disabled={isEdit}
                                  fullWidth="true"
                                  placeholder={userData.lastName}
                                  value={values.lastName}
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
                              <Box >
                                <FormControl
                                  fullWidth
                                >
                                  <Typography >
                                    <strong>         Mobile Number
                                      <sup style={{ color: "#FF0000" }}>*</sup></strong>
                                  </Typography>
                                  <PhoneInput
                                    // country={"india"}
                                    name="mobileNumber"
                                    // disableAreaCodes
                                    // disableCountryCode
                                    // disableDropdown
                                    // disabled={true}
                                    disabled={isEdit}
                                    fullWidth="true"
                                    // placeholder="Mobile Number "
                                    value={
                                      isEdit
                                        ? userData.mobileNumber
                                        : userData?.mobileNumber
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

                            <Grid item lg={6} md={6} sm={12} xs={12}>
                              <FormControl fullWidth>
                                <Typography variant="body2">
                                  <strong>Email Address :</strong>
                                </Typography>

                                <TextField
                                  variant="outlined"
                                  name="email"
                                  disabled={isEdit}
                                  fullWidth="true"
                                  // disabled={true}
                                  size="small"
                                  placeholder={userData.email}
                                  value={values.email}
                                  error={Boolean(touched.email && errors.email)}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                                <FormHelperText error>
                                  {touched.email && errors.email}
                                </FormHelperText>
                              </FormControl>
                            </Grid>

                            {/* <Grid item md={6}> */}
                            {/* <Typography variant="h6">Password</Typography>
                          <OutlinedInput
                            type={showPassword ? "text" : "password"}
                            disabled={isEdit}
                            variant="outlined"
                            name="password"
                            size='large'
                            fullWidth="true"
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
                                  {showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                         
                          <FormHelperText error>
                            {touched.password && errors.password}
                          </FormHelperText> */}
                            {/* </Grid> */}
                          </Grid>
                        </Box>
                        <Box mt={5} align="center">
                          <Button
                            type="submit"
                            size="medium"
                            variant="contained"
                            disabled={isEdit || loader1}
                            color="primary"
                          >
                            Submit {loader1 && <ButtonCircularProgress />}
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </form>
        )}
      </Formik>
      <Dialog
        open={confirmation}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            <Box mt={3}>
              <Typography variant="body2" style={{ color: "#000" }}> Profile has been successfully updated</Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => history.push("/dashboard")} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
