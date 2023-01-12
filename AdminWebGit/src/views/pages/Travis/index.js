import React, { useEffect } from "react";
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



import { getContract } from "src/utils";
import tokenAbi from "src/constants/ABI/token.json";
import { tokenAddress } from "src/constants";


import { useWeb3React } from "@web3-react/core";




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
  const { account, chainId, library } = useWeb3React();

  const contract = getContract(tokenAddress, tokenAbi, library, account);



  const VisualData = async () => {
    const contOwner = await contract.owner();
    const milestonefee = await contract.milestonefee();

    
    // settokenDecimals(tokenDecimals);
    console.log("contOwner", contOwner);
    console.log("milestonefee", milestonefee);


  };

  React.useEffect(() => {
    VisualData();
  }, []);

  const classes = useStyles();
  const [fileUpload, setFileUpload] = React.useState("");
  // function uploadFile(event){

const Reg = async() => {
  const id= "5611";
  const name = "Qasim";
  const email = "qmuhammad144@gmail.com";
  const phoneNo = "03236053422";
  const role = "2";


  if (account) {
    console.log("account connected");
    const Registration = await contract.Registration(id, name, email, phoneNo, role);
  await Registration.wait();
  }
  else{
    console.log("account Not connected");


  }

}

  // }
  return (
    <>
        <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <Box className={classes.contactusBox}>
                <Box mb={3}>
                  <Typography variant="h3">
                    Travis YML
                  </Typography>

                  <button onClick={Reg}>Call Registration</button>


                  <Typography paragraph>Fill Out Details</Typography>
                </Box>
                <Formik
                  initialValues={{
                    projectName: "",
                    DevEmail: "",
                    ProjDetail: "",
                    ymlDocument: [],
                    
               
                  }}
                  initialStatus={{
                    success: false,
                    successMsg: "",
                  }}
                  validationSchema={yep.object().shape({
                    DevEmail: yep
                    .string()
                    .email("Please enter a valid email address")
                    .matches(
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      "Please enter a valid email address"
                    )
                    .required("Developer Email address is required"),
                  
                    ProjDetail: yep
                      .string()
                      .min(15, "Should be 15 character long")
                      .max(1500, "Should not exceed 1500 characters")
                      // .required("Message is required"),
                      .required("Please add Project Detail"),
                    // .max(10,"")

                    projectName: yep
                    .string()
                    .max(30, "Should not exceed 30 characters")
                    .required("Please enter your project Name"),
                
                    
                  })}
                  onSubmit={async ({ projectName, ProjDetail, DevEmail }) => {
                    if (fileUpload) {
                      // data.ymlDocument = fileUpload;
                      // onSubmit(data);
                      console.log("yml file",projectName, ProjDetail, DevEmail );
                      console.log("fileUpload", fileUpload);
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
                       
                       
                      <Grid item xs={12} sm={6}>
                          <Typography >
                            <strong> Project Name :</strong>
                          </Typography>
                          <FormControl fullWidth>
                        
                        <TextField
                          type="text"
                          variant="outlined"
                          size="small"
                          name="projectName"
                          value={values.projectName}
                          error={Boolean(touched.projectName && errors.projectName)}
                          onBlur={handleBlur}
                          onChange={handleChange}

                        />
                        <FormHelperText error>
                          {touched.projectName && errors.projectName}
                        </FormHelperText>
                      </FormControl>
                        </Grid>



                        <Grid item xs={12} sm={6}>
                          <Typography >
                            <strong> Developer Email :</strong>
                          </Typography>
                          <FormControl fullWidth>
                            <TextField
                              type="text"
                              variant="outlined"
                              size="small"
                              name="DevEmail"
                              rowsMax={4}
                              value={values.DevEmail}
                              error={Boolean(
                                touched.DevEmail && errors.DevEmail
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <FormHelperText error>
                              {touched.DevEmail && errors.DevEmail}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                       

                       
                        <Grid item xs={12} sm={12}>
                          <Typography >
                            <strong> Project Detail :</strong>
                          </Typography>
                          <FormControl fullWidth>
                            <TextField
                              type="text"
                              variant="outlined"
                              size="small"
                              name="ProjDetail"
                              multiline
                              rows={3}
                              rowsMax={4}
                              value={values.ProjDetail}
                              error={Boolean(
                                touched.ProjDetail && errors.ProjDetail
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <FormHelperText error>
                              {touched.ProjDetail && errors.ProjDetail}
                            </FormHelperText>
                          </FormControl>
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
                                  setFileUpload(e.currentTarget.files[0])
                                }
                              />
                            </Button>
                          </FormControl>
                          <Typography variant="h6">
                            {fileUpload && fileUpload?.name}

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

            {/* <Grid item xs={12} sm={12} md={6} className={classes.left}>
      
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <img src="images/Contactus.png" width="350" alt="" />
              </Box>
         
            </Grid> */}
          </Grid>
    </>
  );
}
