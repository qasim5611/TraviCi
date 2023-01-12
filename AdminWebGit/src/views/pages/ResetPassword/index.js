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
  Tooltip,
} from "@material-ui/core";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import React from "react";
import get from "lodash/get";
import { Formik } from "formik";
import * as yep from "yup";
import Visibility from "@material-ui/icons/Visibility";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Link as RouterLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Page from "src/component/Page";
import axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { toast } from "react-toastify";
export default function (props) {
  console.log("props",props);
  const [confirmation, setConfirmation] = React.useState(false);
  const handleClose = () => {
    setConfirmation(false);
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword1, setShowPassword1] = React.useState(false);
  const [isLoader, setisLoader] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const history = useHistory();

  const mail = get(props, "location.state.email", null);
  const userMailForReset = localStorage.getItem("userMailForPaswword")
  console.log(mail);
  return (
    <Page title="Reset Password">
      <Box>
        <Typography variant="h2" paragraph align="center">
          Reset Password
        </Typography>
        {/* <Typography variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          imperdiet nec diam in venenatis. Vestibulum a nunc diam.
        </Typography> */}
        <Box
          p={10}
          pt={7}
          pb={0}
          mt={5}
          style={{ backgroundColor: "white", borderRadius: 10, height: "100%" }}
        >
          <Formik
            initialValues={{
              // oldPassword: "",
              password: "",
              confirmPassword: "",
            }}
            initialStatus={{
              success: false,
              successMsg: "",
            }}
            validationSchema={yep.object().shape({
              // oldPassword: yep
              //   .string()
              //   .required("Please enter your old password")
              //   .matches(
              //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
              //   ),

              password: yep
                .string()
                .required("Please enter your new password")
                .matches(
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character"
                ),
              confirmPassword: yep
                .string()
                .required("password is required")
                .when("password", {
                  is: (val) => (val && val.length > 0 ? true : false),
                  then: yep
                    .string()
                    .oneOf(
                      [yep.ref("password")],
                      "Both password need to be the same"
                    ),
                }),
            })}
            onSubmit={async ({ password, confirmPassword }) => {
              setisLoader(true);
              // debugger
             
                try {
                  const response = await axios.post(ApiConfig.resetPassword, {
                    email:userMailForReset,
                    newPassword: password,
                    confirmPassword,
                  });

                  if (response.data.response_code !== 200) {
                    setisLoader(false);
                    toast.error(response.data.response_message);
                  } else {
                    toast.success(response.data.response_message);
                    console.log("response", response);
              localStorage.removeItem("userMailForPaswword");
                    history.push("/")
                    // setConfirmation(true);
                  }
                } catch (err) {
                    toast.error(err);

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
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Box pt={2}>
                  <FormControl fullWidth>
                  <Box className="tooltiptext">
                  <Typography paragraph><strong>Enter New Password :</strong> </Typography>
                    <Tooltip
                      describeChild
                      title="Must be at least 8 characters long, one uppercase letter, one lowercase letter,  One digit, one special character"
                      placement="top"
                    >
                      <InfoOutlinedIcon />
                    </Tooltip>
                  </Box>
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

                {/* <Box pt={2}>
                  <FormControl fullWidth>
                    <Typography paragraph>Confirm new password </Typography>

                    <OutlinedInput
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      name="confirmPassword"
                      margin="dense"
                      value={values.confirmPassword}
                      error={Boolean(
                        touched.confirmPassword && errors.confirmPassword
                      )}
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
                      {touched.confirmPassword && errors.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Box> */}
                <Box pt={2}>
                  <FormControl fullWidth>
                  <Typography paragraph><strong>Confirm New Password :</strong> </Typography>
                    
                    {/* <Box className="tooltiptext">
                    <Tooltip
                      describeChild
                      title="Both password need to be the same"
                      placement="top"
                    >
                      <InfoOutlinedIcon />
                    </Tooltip>
                  </Box> */}
                    <OutlinedInput
                      // type={showconfirmPassword ? "text" : "confirmPassword"}

                      type={showPassword1 ? "text" : "password"}
                      variant="outlined"
                      name="confirmPassword"
                      margin="dense"
                      value={values.confirmPassword}
                      error={Boolean(
                        touched.confirmPassword && errors.confirmPassword
                      )}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword1(!showPassword1)}
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword1 ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      // endAdornment={
                      //   <InputAdornment position="end">
                      //     <IconButton
                      //       aria-label="toggle password visibility"
                      //       onClick={() =>
                      //         setShowconfirmPassword(!showconfirmPassword)
                      //       }
                      //       // onMouseDown={handleMouseDownPassword}
                      //       edge="end"
                      //     >
                      //       {showconfirmPassword ? (
                      //         <Visibility />
                      //       ) : (
                      //         <VisibilityOff />
                      //       )}
                      //     </IconButton>
                      //   </InputAdornment>
                      // }
                    />
                    <FormHelperText error>
                      {touched.confirmPassword && errors.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Box>

                <Box p={5}>
                  <Button
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                    color="primary"
                    disabled={isLoader}
                  >
                    Submit {isLoader && <ButtonCircularProgress />}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          <Dialog
            open={confirmation}
            // onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <DialogContentText>
                Password has been successfully reset
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => history.push("/")} color="primary">
                Login
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Page>
  );
}
