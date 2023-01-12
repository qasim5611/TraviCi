import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  FormControl,
  FormHelperText,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FieldArray, Form, Formik, getIn } from "formik";
import * as Yup from "yup";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import ApiConfig from "../Config/APIconfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageLoading from "./PageLoading";
import { getContract } from "src/utils";
import { abrarContract } from "src/constants";
import abrarAbi from "src/constants/ABI/abrar.json";

import ButtonCircularProgress from "./ButtonCircularProgress";
import { useWeb3React } from "@web3-react/core";
import { red } from "@material-ui/core/colors";
import ConnectWallet from "./ConnectWallet";
const validationSchema = Yup.object().shape({
  people: Yup.array().of(
    Yup.object().shape({
      email: Yup.string()
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please enter a valid email address"
        )
        .required("Email address is required"),
      name: Yup.string().required("Name is required"),
    })
  ),
});

// const debug = true;

const useStyles = makeStyles((theme) => ({
  contactusBox: {
    marginRight: 50,
    marginLeft: 50,
    paddingBottom: 50,
    paddingTop: "50px",
    "& h3": {
      marginBottom: "20px",
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
  left: {
    background: "url(/images/BlueBG.png) no-repeat",
    backgroundPosition: "center right",
    // minHeight: 600,
    // height: '100%',
  },
  button: {
    fontSize: 22,
    color: "#a1a3af",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const InviteFriend = ({
  open,
  handleClose,
  setIsInvite,
  contractId,
  getmilestoneList,
}) => {
  console.log("contractId----", contractId);
  const [updateMinSatkeOpen, setUpdateMinSatkeOpen] = useState(false);

  const accessToken = window.localStorage.getItem("creatturAccessToken");
  const classes = useStyles();
  const { account, chainId, library } = useWeb3React();
  const [loader, setLoader] = useState(false);
  const shareIdAPIhandler = async (values) => {
    try {
      const mailList = values.people.map((people) => people.email);
      setLoader(true);
      const res = await axios({
        method: "POST",
        url: ApiConfig.shareContractDetails,
        headers: {
          token: accessToken,
        },
        data: {
          maillist: mailList,
          contractId: contractId?._id,
        },
      });
      if (res.data.response_code === 200) {
        shareHandler(contractId?._id);
      }
    } catch (err) {
      toast.error(err.response.data.response_message);
      setLoader(false);
      console.log(err);
    }
  };
  const shareHandler = async (_id) => {
    try {
      const contract = getContract(abrarContract, abrarAbi, library, account);
      console.log("contract----", contract);

      const sendData = await contract.shareOption(
        parseInt(contractId.blockchainContractId),
        _id.toString()
      );
      console.log("sendData----", sendData);
      await sendData.wait();
      getmilestoneList();
      toast.success("Your contract has been shared successfully.");
      setLoader(false);
      handleClose();
    } catch (error) {
      console.log(error, "error");
      setLoader(false);
    }
  };
  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      open={open}
      // onClose={handleClose}
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
          <Grid item xs={12} sm={12} md={7}>
            <Box className={classes.contactusBox}>
              <Typography variant="h3">Invite a friend to contract</Typography>
              <Grid container spacing={2}>
                <Grid item md={5} sm={5} xs={12} style={{ paddingBottom: "0" }}>
                  <Typography>
                    <strong>Email Address :</strong>
                  </Typography>
                </Grid>
                <Grid item md={7} sm={7} xs={12} style={{ paddingBottom: "0" }}>
                  <Typography>
                    <strong>Name :</strong>
                  </Typography>
                </Grid>
              </Grid>

              <Formik
                initialValues={{
                  people: [
                    {
                      id: Math.random(),
                      // id:"",
                      email: "",
                      name: "",
                    },
                  ],
                }}
                validationSchema={validationSchema}
                onSubmit={shareIdAPIhandler}
              >
                {({
                  values,
                  touched,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isValid,
                }) => (
                  <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <FieldArray name="people">
                      {({ push, remove }) => (
                        <div>
                          {values.people.map((p, index) => {
                            const email = `people[${index}].email`;
                            const touchedEmail = getIn(touched, email);
                            const errorEmail = getIn(errors, email);

                            const name = `people[${index}].name`;
                            const touchedName = getIn(touched, name);
                            const errordName = getIn(errors, name);

                            return (
                              <Grid container spacing={2} key={p.id}>
                                <Grid item md={5} sm={5} xs={12}>
                                  <Box>
                                    <FormControl fullWidth>
                                      <TextField
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        name={email}
                                        value={p.email}
                                        required
                                        error={Boolean(
                                          touchedEmail && errorEmail
                                        )}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                      />
                                      <FormHelperText error>
                                        {touchedEmail && errorEmail
                                          ? errorEmail
                                          : ""}
                                      </FormHelperText>
                                    </FormControl>
                                  </Box>
                                </Grid>
                                <Grid item md={7} sm={7} xs={12}>
                                  <Box display="flex">
                                    <Box>
                                      <FormControl fullWidth>
                                        <TextField
                                          type="text"
                                          variant="outlined"
                                          size="small"
                                          fullWidth
                                          name={name}
                                          value={p.name}
                                          required
                                          error={Boolean(
                                            touchedName && errordName
                                          )}
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                        />
                                        <FormHelperText error>
                                          {touchedName && errordName
                                            ? errordName
                                            : ""}
                                        </FormHelperText>
                                      </FormControl>
                                    </Box>
                                  </Box>
                                </Grid>
                              </Grid>
                            );
                          })}
                        </div>
                      )}
                    </FieldArray>
                    {/* <Divider style={{ marginTop: 20, marginBottom: 20 }} /> */}

                    <Box mt={3} align="center">
                      {!account ? (
                        <Button
                          size="medium"
                          onClick={() => setUpdateMinSatkeOpen(true)}
                          variant="contained"
                          color="primary"
                        >
                          Connect Wallet
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          fullWidth
                          size="medium"
                          variant="contained"
                          color="primary"
                          disabled={loader}
                        // onClick={() => setLoader(true)}
                        >
                          Send Invitation
                          {loader && <ButtonCircularProgress />}
                        </Button>
                      )}
                      {updateMinSatkeOpen && (
                        <Dialog
                          open={updateMinSatkeOpen}
                          onClose={() => {
                            setUpdateMinSatkeOpen(false);
                          }}
                          maxWidth="sm"
                        >
                          <DialogContent>
                            <ConnectWallet onClose={() => {setUpdateMinSatkeOpen(false);}}
                            />
                          </DialogContent>
                        </Dialog>
                      )}
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={5} className={classes.left}>
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
  );
};

export default InviteFriend;
