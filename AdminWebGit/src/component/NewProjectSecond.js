import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {
  Typography,
  Box,
  Button,
  FormControl,
  Grid,
  makeStyles,
  TextField,
  FormHelperText,
  IconButton,
} from "@material-ui/core";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import { Formik, Field } from "formik";
import * as yep from "yup";
import { KeyboardDatePicker } from "@material-ui/pickers";
import CloseIcon from "@material-ui/icons/Close";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  left: {
    background: "url(/images/BlueBG.png) no-repeat",
    backgroundPosition: "center right",
    // height: '100%',
  },
  contactusBox: {
    marginRight: 50,
    marginLeft: 50,
    paddingBottom: 50,
    paddingTop: "50px",
    "& h3": {
      marginBottom: "10px",
    },
    "& h6": {
      fontSize: "14px",
      color: "#C54C82",
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: 30,
      marginLeft: 30,
      paddingBottom: 30,
      paddingTop: "30px",
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: 15,
      marginLeft: 15,
      paddingBottom: 15,
      paddingTop: "15px",
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function NewProjectSecond({ open, handleClose, onSubmit }) {
  const classes = useStyles();
  const [fileUpload, setFileUpload] = React.useState("");
  const [fileUpload2, setFileUpload2] = React.useState("");

  // function uploadFile(event){

  // }
  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent style={{ padding: 0 }}>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <Grid container>
            <Grid item xs={12} sm={12} md={6}>
              <Box className={classes.contactusBox}>
                <Box mb={3}>
                  <Typography variant="h3">
                    New Contract
                  </Typography>

                  <Typography paragraph>Fill Out Details</Typography>
                </Box>
                <Formik
                  initialValues={{
                    validateOnMount: true,
                    startDate: window.localStorage.getItem("startDate")
                      ? window.localStorage.getItem("startDate")
                      : null,
                    endDate: window.localStorage.getItem("endDate")
                      ? window.localStorage.getItem("endDate")
                      : null,
                    contractDocument: [],
                    description: window.localStorage.getItem("description")
                      ? window.localStorage.getItem("description")
                      : "",
                    amount: window.localStorage.getItem("amount")
                      ? window.localStorage.getItem("amount")
                      : "",
                  }}
                  initialStatus={{
                    success: false,
                    successMsg: "",
                  }}
                  validationSchema={yep.object().shape({
                    startDate: yep.date()
                      .required("Start date is required")
                      .nullable()
                      .transform(v => (v instanceof Date && !isNaN(v) ? v : null)),
                    endDate: yep.date()
                      .required("End date is required")
                      .nullable()
                      .transform(v => (v instanceof Date && !isNaN(v) ? v : null)),
                    description: yep
                      .string()
                      .min(15, "Should be 15 character long")
                      .max(1500, "Should not exceed 1500 characters")
                      // .required("Message is required"),
                      .required("Please add description"),
                    // .max(10,"")
                    amount: yep.number().required("Please select the amount")
                      .moreThan(0, "Should be greater than 0").test(
                        'Is positive?',
                        'The number must be greater than 0!',
                        (value) => value > 0
                      ).min(1)

                    ,
                  })}
                  onSubmit={(data) => {
                    if (fileUpload && fileUpload2) {
                      data.contractDocument = fileUpload;
                      data.ymlDocument = fileUpload2;

                      window.localStorage.setItem("amount12", data.amount);
                      window.localStorage.setItem("startDate", data.startDate);
                      window.localStorage.setItem("endDate", data.endDate);


                      onSubmit(data);
                    } else {
                      toast.error("Please select the document");
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
                  }) => (
                    <form noValidate onSubmit={handleSubmit}>

                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                          <Typography >
                            <strong> Add Description :</strong>
                          </Typography>
                          <FormControl fullWidth>
                            <TextField
                              type="text"
                              variant="outlined"
                              size="small"
                              name="description"
                              multiline
                              rows={3}
                              rowsMax={4}
                              value={values.description}
                              error={Boolean(
                                touched.description && errors.description
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <FormHelperText error>
                              {touched.description && errors.description}
                            </FormHelperText>
                          </FormControl>
                        </Grid>


                        <Grid item xs={12} sm={12}>
                          <Typography >
                            <strong> Enter Amount :</strong>
                          </Typography>
                          <TextField
                            fullWidth
                            type="number"
                            name="amount"
                            size="small"
                            variant="outlined"
                            value={values.amount}
                            error={Boolean(touched.amount && errors.amount)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            InputProps={{
                              startAdornment: <Box mr={1}>$</Box>,
                            }}
                          />

                          <FormHelperText error>
                            {touched.amount && errors.amount}
                          </FormHelperText>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>
                            <Typography>
                              <strong>Start Date :</strong>
                            </Typography>
                            <KeyboardDatePicker
                              placeholder="YYYY-MM-DD"
                              value={values.startDate}
                              onChange={(date) => {
                                setFieldValue("startDate", new Date(date));
                              }}
                              format="YYYY-MM-DD"
                              inputVariant="outlined"
                              margin="dense"
                              name="startDate"
                              minDate={new Date()}
                              error={Boolean(
                                touched.startDate && errors.startDate
                              )}
                              helperText={
                                touched.startDate && errors.startDate
                              }
                            />
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>
                            <Typography>
                              {" "}
                              <strong>End Date :</strong>
                            </Typography>
                            <KeyboardDatePicker
                              placeholder="YYYY-MM-DD"
                              value={values.endDate}
                              onChange={(date) => {
                                setFieldValue("endDate", new Date(date));
                              }}
                              format="YYYY-MM-DD"
                              inputVariant="outlined"
                              margin="dense"
                              name="endDate"
                              disabled={values.startDate === undefined || values.startDate === "" || values.startDate === null}
                              minDate={values.startDate}
                              error={Boolean(
                                touched.endDate && errors.endDate
                              )}
                              helperText={touched.endDate && errors.endDate}
                            />
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                          <FormControl fullWidth>
                            <Button
                              variant="outlined"
                              component="label"
                              style={{ justifyContent: "flex-start" }}
                            >
                              {" + Add Document"}
                              <input
                                type="file" accept="image/png, image/gif, image/jpeg"
                                hidden
                                name="file"
                                multiple
                                onChange={(e) =>
                                  setFileUpload(e.currentTarget.files[0])
                                }
                              />
                            </Button>
                          </FormControl>
                          <Typography variant="h6">
                            {fileUpload && fileUpload?.name}

                          </Typography>

                        </Grid>




                        <Grid item xs={12} sm={12}>
                          <FormControl fullWidth>
                            <Button
                              variant="outlined"
                              component="label"
                              style={{ justifyContent: "flex-start" }}
                            >
                              {" + Add YML File"}
                              <input
                                type="file" accept=".travis.yml"
                                hidden
                                name="file"
                                multiple
                                onChange={(e) =>
                                  setFileUpload2(e.currentTarget.files[0])
                                }
                              />
                            </Button>
                          </FormControl>
                          <Typography variant="h6">
                            {fileUpload2 && fileUpload2?.name}

                          </Typography>

                        </Grid>


                      </Grid>











                      {/*                       
                      <Box mt={2}>
                        <FormControl fullWidth>
                          <Button
                            variant="outlined"
                            component="label"
                            style={{ justifyContent: "flex-start" }}
                          >
                            {" + Add Document"}
                            <input
                              type="file"
                              hidden
                              name="file"
                              multiple
                              onChange={(e) =>
                                setFileUpload(e.currentTarget.files[0])
                              }
                            />
                          </Button>
                        </FormControl>
                        <Typography variant="h5">
                          {fileUpload && fileUpload?.name}
                        </Typography>
                      </Box> */}

                      <Box mt={3} align="center">
                        <Button
                          // disabled={!Formik.isValid}
                          type="submit"
                          // onClick={openMilestone}
                          fullWidth
                          size="medium"
                          variant="contained"
                          color="primary"
                        >
                          Next
                        </Button>
                      </Box>
                    </form>
                  )}
                </Formik>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} className={classes.left}>
              {/* <Hidden mdDown> */}
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <img src="images/Contactus.png" width="350" alt="" />
              </Box>
              {/* </Hidden> */}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      {/* <AddMilestone open={isMilestone} /> */}
    </>
  );
}
