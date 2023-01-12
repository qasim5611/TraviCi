import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Formik } from "formik";
import {
  Container,
  Divider,
  Box,
  Card,
  Grid,
  CardContent,
  FormControl,
  FormHelperText,
  Typography,
  Button,
  Dialog,
  TextField,
  MenuItem,
} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Page from "src/component/Page";
import * as yep from "yup";
import axios from "axios";
import ApiConfig from "src/Config/APIconfig";

const EditPlan = (props) => {
  const [unit, setUnit] = React.useState("CORPORATE");
  const [isConfirm, setConfirm] = React.useState(false);
  const planId = props?.location?.state?.id || null;
  const openConfirm = () => setConfirm(true);

  const closeConfirm = () => {
    setConfirm(false);
  };
  const history = useHistory();

  const accessToken = window.sessionStorage.getItem("creatturAccessToken");
  const [isEdit, setIsEdit] = React.useState(true);
  const [formData, setFormData] = useState({
    amount: "",
    expiryDate: "12/06/2021",
  });
  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formData, [name]: value };
    setFormData(temp);
  };

  // const submitHandler = async () => {
  // 	try {
  // 		const response = await axios.put(ApiConfig.editPlanPage, {
  // 			_id: planId,
  // 			amount: formData.amount,
  // 			expiryDate: formData.expiryDate,
  // 		});

  // 		if (response.data.response_code !== 200) {
  // 			alert(response.data.response_message);
  // 		} else {
  // 			openConfirm();
  // 			console.log('response', response);
  // 		}
  // 	} catch (err) {
  // 		console.error(err.response);
  // 	}
  // };

  return (
    <>
      <Container maxWidth="xl">
        <Page
          style={{ display: "flex", flexDirection: "column" }}
          title="Create Plan"
        >
          <Box pt={3} mb={8}>
            <Typography variant="h3" style={{ marginBottom: "8px" }}>
              <strong>Edit Plan</strong>
            </Typography>
            <Divider />
          </Box>
          <Box style={{ textAlign: "end" }}>
            <Button onClick={() => setIsEdit(!isEdit)}>
              <Typography variant="h5">Edit </Typography>
              <EditIcon fontSize="small" style={{ marginLeft: "5px" }} />
            </Button>
          </Box>

          <Box mt={2} display="flex" justifyContent="center">
            <Formik
              style={{ width: "70%" }}
              initialValues={{
                amount: "",
                expiryDate: formData.expiryDate,
              }}
              initialStatus={{
                success: false,
                successMsg: "",
              }}
              validationSchema={yep.object().shape({
                amount: yep.number("Enter Valid amount").required(),
                expiryDate: yep.string().required("Enter Date"),
              })}
              onSubmit={async ({ amount, expiryDate }) => {
                try {
                  const response = await axios.put(ApiConfig.editPlanPage, {
                    _id: planId,
                    amount,
                    expiryDate,
                  });

                  if (response.data.response_code !== 200) {
                    alert(response.data.response_message);
                  } else {
                    openConfirm();
                    console.log("response", response);
                  }
                } catch (err) {
                  console.error(err.response);
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
                  <Grid
                    container
                    spacing={5}
                    style={{ marginBottom: "26px" }}
                    direction="column"
                    justify="center"
                  >
                    <Grid item md={12} sm={12} xs={12}>
                      <FormControl fullWidth>
                        <Typography
                          variant="h4"
                          style={{ fontWeight: "bold", marginBottom: "12px" }}
                        >
                          Enter Amount
                        </Typography>
                        <TextField
                          variant="outlined"
                          fullWidth
                          // type="number"
                          name="amount"
                          disabled={isEdit}
                          placeholder="Amount"
                          required
                          error={Boolean(touched.amount && errors.amount)}
                          errorText={"this is required field"}
                          value={values.amount}
                          onChange={handleChange}
                        // error={formData.name !== '' && !isValidAlphabet(formData.name)}
                        // helperText={
                        // 	formData.name !== '' &&
                        // 	!isValidAlphabet(formData.name) &&
                        // 	'please enter valid name'
                        // }
                        />
                        <FormHelperText error>
                          {touched.amount && errors.amount}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                      <FormControl>
                        <Typography
                          variant="h4"
                          style={{ fontWeight: "bold", marginBottom: "12px" }}
                        >
                          Expiry Date
                        </Typography>
                        <KeyboardDatePicker
                          disabled={isEdit}
                          name="expiryDate"
                          placeholder="YYYY-MM-DD"
                          error={Boolean(
                            touched.expiryDate && errors.expiryDate
                          )}
                          value={formData.expiryDate}
                          onChange={(date) => {
                            setFormData({
                              ...formData,
                              expiryDate: new Date(date),
                            });
                          }}
                          format="YYYY-MM-DD"
                          inputVariant="outlined"
                          margin="dense"
                        />
                        <FormHelperText error>
                          {touched.expiryDate && errors.expiryDate}
                        </FormHelperText>
                      </FormControl>
                    </Grid>

                    <Grid item md={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={isEdit}
                        style={{ marginRight: "8px" }}
                        type="submit"
                      >
                        Submit
                      </Button>
                      <Link to="/subscription-management">
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                        >
                          Cancel
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </Box>

          <Dialog
            open={isConfirm}
            onClose={closeConfirm}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Plan edited successfully
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={closeConfirm()}>
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </Page>
      </Container>
    </>
  );
};

export default EditPlan;
