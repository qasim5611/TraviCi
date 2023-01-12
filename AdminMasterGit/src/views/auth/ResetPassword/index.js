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
} from "@material-ui/core";
import React from "react";
import get from "lodash/get";
import { Formik } from "formik";
import * as yep from "yup";
import Visibility from "@material-ui/icons/Visibility";
import { toast } from "react-toastify";
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
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

export default function (props) {
  const [confirmation, setConfirmation] = React.useState(false);
  const handleClose = () => {
    setConfirmation(false);
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const [loader1, setloader1] = React.useState(false);

  const history = useHistory();

  const mail = get(props, "location.state.email", null);
  const userMailForReset = sessionStorage.getItem("userMailForPaswword")

  console.log(mail);
  return (
    <Page title="Reset Password">
      <Box>
        <Typography variant="h2" paragraph>
          Reset Password
        </Typography>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          imperdiet nec diam in venenatis. Vestibulum a nunc diam.
        </Typography>
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
                  "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                ),
              confirmPassword: yep
                .string()
                .required("Please confirm your new password")
                .matches(
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                ),
            })}
            onSubmit={async ({ password, confirmPassword }) => {
              setloader1(true)

              try {
                const response = await axios.post(ApiConfig.resetPassword, {
                  email: userMailForReset,
                  newPassword: password,
                  confirmPassword,
                });
                if (response.data.response_code !== 200) {
                  setloader1(false)
                  toast.error(response.data.response_message)
                } else {
                  // auth.userLogIn(true, response.data.data.token);
                  // chk for 2fa in res data then open  popupwith with 3 options viz send sms , google auth , skip (in radio button)
                  console.log("response", response);
                  sessionStorage.removeItem("userMailForPaswword");
                  toast.success(response.data.response_message)
                  history.push()
                  setConfirmation(true);
                  setloader1(false)
                  history.push("/")
                }
              } catch (err) {
                console.error(err.response);
                toast.error(err)

                setloader1(false)

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
                    <Typography paragraph>
                      Enter New Password<span style={{ color: "red" }}>*</span>{" "}
                    </Typography>

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

                <Box pt={2}>
                  <FormControl fullWidth>
                    <Typography paragraph>
                      Confirm New Password
                      <span style={{ color: "red" }}>*</span>{" "}
                    </Typography>

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
                </Box>

                <Box p={5}>
                  <Button
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                    color="primary"
                    disabled={loader1}
                  >
                    Submit {loader1 && <ButtonCircularProgress />}
                  </Button>
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
