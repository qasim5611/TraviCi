import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { FieldArray, Form, Formik, getIn } from "formik";
import * as yep from "yup";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Typography,
  Box,
  makeStyles,
  FormHelperText,
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  DialogTitle
} from "@material-ui/core";
import ConnectWallet from "src/component/ConnectWallet";

import { useWeb3React } from "@web3-react/core";

import { KeyboardDatePicker } from "@material-ui/pickers";

import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import { AuthContext } from "src/context/Auth";
import Web3 from "web3";



const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  left: {
    background: "url(/images/BlueBG.png) no-repeat",
    backgroundPosition: "center right",
    // height: '100%',
  },
  contactusBox: {
    marginRight: 50,
    marginLeft: 50,
    paddingBottom: 30,
    paddingTop: "30px",
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
}));

const validationSchema = yep.object().shape({
  milestones: yep.array().of(
    yep.object().shape({
      milestone: yep.string().required("Milestone name is required"),
      amount: yep.number().required("Milestone amount is required").moreThan(0, "Should be greater than 0"),
      taskName: yep.string().required("Task name is required"),
      priority: yep.string().required("Priority  is required"),
      description: yep
        .string()
        .min(15, "Should be 15 character long")
        .max(1500, "Should not exceed 1500 characters")
        .required("Please add description"),
      dueDate: yep.date()
        .required("Due date is required")
        .nullable()
        .transform(v => (v instanceof Date && !isNaN(v) ? v : null)),
      milestoneIndex: yep.string()
        .required("milestoneIndex is required")
    })
  ),
});

export default function AddMilestone({ open, handleClose, onSubmit }) {
  const classes = useStyles();
  let total = 0;
  const { account, chainId } = useWeb3React();
  const auth = useContext(AuthContext)
  const web3 = (window.web3 = new Web3(window.ethereum));

  console.log("web3----", web3);


  const [priority, setPriority] = React.useState("low");
  const [counter, setCounter] = useState(0);
  const [isDisabled, setisDisabled] = useState();
  const handlePriority = (event) => {
    setPriority(event.target.value);
  };
  const [amount, setAmount] = useState();
  const amountCompair = window.localStorage.getItem("amount12");
  const startdateValue = window.localStorage.getItem("startDate");
  const endDateValue = window.localStorage.getItem("endDate");
  const [updateMinSatkeOpen, setUpdateMinSatkeOpen] = useState(false);




  return (
    <Dialog
      fullWidth={true}
      maxWidth={"lg"}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent style={{ padding: 0, overflow: "hidden", }}>
        <Grid container spacing={2}>
          <Grid
            style={{
              overflowY: "auto",
              maxHeight: "576px",
            }}
            item
            xs={12}
            sm={12}
            md={6}
          >
            <Box className={classes.contactusBox}>


              <Formik
                initialValues={{
                  milestones: [
                    {
                      milestone: "Milestone 1",
                      taskName: "",
                      description: "",
                      dueDate: new Date(),
                      priority: "",
                      amount: "",
                      milestoneIndex: counter
                    },
                  ],
                }}
                // validationSchema={yep.object().shape({
                //   // startDate: yep.date().required("Start date is required"),
                //   // endDate: yep.date().required("End date is required"),
                //   description: yep
                //     .string()
                //     .min(15, "Should be 15 character long")
                //     .max(200, "should not exceed 200 characters")
                //     // .required("Message is required"),
                //     .required("Please add description"),
                //   // .max(10,"")
                //   amount: yep.string().required("Please select the amount"),
                // })}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({
                  values,
                  touched,
                  errors,
                  handleChange,
                  handleBlur,
                  isValid,
                  setFieldValue,
                }) => {
                  let amountSum = 0;
                  return (
                    <Form noValidate autoComplete="off">
                      <FieldArray name="milestones">
                        {({ push, remove }) => (
                          <div>
                            {values.milestones.map((m, index) => {
                              amountSum += m.amount;
                              setCounter(index + 1);
                              if (counter === 500) {
                                setisDisabled(true);
                              } else if (counter < 500) {
                                setisDisabled(false);
                              }
                              const taskName = `milestones[${index}].taskName`;
                              const touchedTaskName = getIn(touched, taskName);
                              const errorTaskName = getIn(errors, taskName);

                              // const assignee = `milestones[${index}].assignee`;
                              // const errorAssignee = getIn(errors, assignee);
                              // const touchedAssignee = getIn(touched, assignee);

                              const amount = `milestones[${index}].amount`; //ether.tostring()
                              const touchedMilestoneAmount = getIn(
                                touched,
                                amount
                              );
                              const errorMilestoneAmount = getIn(errors, amount);
                              total += values.milestones[index].amount;

                              const priority = `milestones[${index}].priority`;

                              const touchedMilestonePriority = getIn(
                                touched,
                                priority
                              );
                              const errorMilestonePriority = getIn(
                                errors,
                                priority
                              );
                              const dueDate = `milestones[${index}].dueDate`;
                              const touchedMilestonedueDate = getIn(
                                touched,
                                dueDate
                              );
                              const errorsMilestonedueDate = getIn(
                                errors,
                                dueDate
                              );
                              const description = `milestones[${index}].description`;
                              const milestoneIndex = `milestones[${index}].milestoneIndex`;
                              const touchedMilestonedescription = getIn(
                                touched,
                                description
                              );
                              const errorMilestonedescription = getIn(
                                errors,
                                description
                              );

                              return (
                                <Grid
                                  mt={2}
                                  container
                                  spacing={2}
                                  key={m.id}
                                  style={{ minHeight: 400 }}
                                // direction="column"
                                >
                                  <Grid xs={12}>

                                  </Grid>
                                  <Grid item xs={12} sm={12}>
                                    <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                      <Typography variant="h3" style={{ marginTop: "20px" }}>
                                        Milestone {index + 1}
                                      </Typography>
                                      <Typography>Wallet Balance : {auth?.wallet} ETH</Typography>

                                    </Box>
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth
                                    >
                                      <Typography >
                                        <strong> Enter Task Name :</strong>
                                      </Typography>
                                      <TextField
                                        type="text"
                                        variant="outlined"
                                        size="small"
                                        name={taskName}
                                        value={m.taskName}
                                        // required
                                        error={Boolean(
                                          touchedTaskName && errorTaskName
                                        )}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                      />
                                      <FormHelperText error>
                                        {touchedTaskName && errorTaskName
                                          ? errorTaskName
                                          : ""}
                                      </FormHelperText>
                                    </FormControl>
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    {" "}
                                    <FormControl fullWidth
                                    >
                                      <Typography>
                                        <strong> Enter Milestone Amount :</strong>
                                      </Typography>
                                      <TextField
                                        type="number"
                                        variant="outlined"
                                        size="small"
                                        name={amount}
                                        value={m.amount}
                                        // required
                                        error={Boolean(
                                          touchedMilestoneAmount &&
                                          errorMilestoneAmount
                                        )}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        InputProps={{
                                          startAdornment: <Box mr={1}>$</Box>,
                                        }}
                                      />
                                      <FormHelperText error>
                                        {touchedMilestoneAmount &&
                                          errorMilestoneAmount
                                          ? errorMilestoneAmount
                                          : ""}
                                      </FormHelperText>
                                    </FormControl>
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    {" "}
                                    <FormControl fullWidth
                                    >
                                      <Typography >
                                        <strong>  Priority :</strong>
                                      </Typography>
                                      <Select
                                        variant="outlined"
                                        size="small"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={m.priority}
                                        name={priority}
                                        onChange={handleChange}
                                        fullWidth
                                        // className={classes.MuiFormControl}

                                        onBlur={handleBlur}

                                      >
                                        <MenuItem value={"LOW"}>Low</MenuItem>
                                        <MenuItem value={"MEDIUM"}>
                                          Medium
                                        </MenuItem>
                                        <MenuItem value={"HIGH"}>High</MenuItem>
                                      </Select>
                                      <FormHelperText error>
                                        {touchedMilestonePriority &&
                                          errorMilestonePriority
                                          ? errorMilestonePriority
                                          : ""}
                                      </FormHelperText>
                                    </FormControl>
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    {" "}
                                    <FormControl fullWidth
                                    >
                                      <Typography >
                                        <strong> Due Date :</strong>
                                      </Typography>
                                      <KeyboardDatePicker
                                        placeholder="YYYY-MM-DD"
                                        value={m.dueDate}
                                        onChange={(date) => {
                                          setFieldValue(dueDate, new Date(date));
                                        }}
                                        format="YYYY-MM-DD"
                                        inputVariant="outlined"
                                        margin="dense"
                                        size="small"
                                        name={dueDate}
                                        minDate={startdateValue}
                                        maxDate={endDateValue}

                                        error={Boolean(
                                          touched.dueDate && errors.dueDate
                                        )}
                                        helperText={
                                          touched.dueDate && errors.dueDate
                                        }
                                      />
                                      <FormHelperText error>
                                        {touchedMilestonedueDate &&
                                          errorsMilestonedueDate}
                                      </FormHelperText>
                                    </FormControl>
                                  </Grid>

                                  <Grid item xs={12} sm={12}>
                                    <Box>
                                      <Typography >
                                        <strong>   Add Description :</strong>
                                      </Typography>
                                    </Box>
                                    <Box>
                                      <FormControl fullWidth
                                      >
                                        <TextField
                                          type="text"
                                          variant="outlined"
                                          size="small"
                                          name={description}
                                          multiline
                                          rows={3}
                                          rowsMax={4}
                                          value={m.description}
                                          error={Boolean(
                                            touchedMilestonedescription &&
                                            errorMilestonedescription
                                          )}
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                        />
                                        <FormHelperText error>
                                          {touchedMilestonedescription &&
                                            errorMilestonedescription}
                                        </FormHelperText>
                                      </FormControl>
                                    </Box>
                                  </Grid>

                                  <Grid item xs={12} sm={12}>
                                    <Box align="center" >
                                      <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        color="primary"
                                        style={{
                                          backgroundColor: "#C54C82",
                                          color: "#fff",
                                        }}
                                        margin="normal"
                                        type="button"
                                        //   variant="outlined"
                                        onClick={() => remove(index)}
                                      >
                                        Delete
                                      </Button>
                                    </Box>
                                  </Grid>
                                </Grid>
                              );
                            })}
                            <Box mt={2}>
                              <Typography variant="h6"><strong>Total</strong></Typography>
                              <Typography variant="h6">
                                <strong> Contract Amount = $</strong> <span style={{ color: "#52565c", }}>{amountCompair}</span>
                              </Typography>
                              <Typography variant="h6">
                                <strong> Milestone Amount =</strong>{" "}
                                <span style={{ color: "#52565c", }}>
                                  {values.milestones.reduce((total, milestone) => {
                                    const amount = milestone.amount || 0;
                                    const prevTotal = isNaN(amount)
                                      ? 0
                                      : parseInt(amount);
                                    const allTotal = total + prevTotal;
                                    setAmount(allTotal);
                                    return amountCompair >= amountSum ? (
                                      <>${amountSum}</>
                                    ) : (
                                      <span style={{ color: "red" }}>
                                        Milestone amount should be equal to contract
                                        amount{" "}
                                      </span>
                                    );
                                  }, 0)}
                                </span>
                              </Typography>
                            </Box>
                            <Box mt={2}>
                              <Button
                                type="button"
                                //   variant="outlined"
                                color="primary"
                                disabled={isDisabled}
                                style={{ display: isDisabled && "none", backgroundColor: "#c3b2ff", }}
                                onClick={() =>
                                  push({
                                    milestone:
                                      "Milestone " +
                                      (Number(values.milestones.length) + 1),
                                    taskName: "",
                                    description: "",
                                    dueDate: "",
                                    priority: "",
                                    amount: "",
                                    milestoneIndex: counter
                                  })
                                }
                              >
                                Add Milestone
                              </Button>
                            </Box>

                            <Box mt={3} align="center">
                              {!account ? (
                                <Button onClick={() => setUpdateMinSatkeOpen(true)}>Connect Wallet</Button>
                              ) : (
                                <>
                                  {auth?.wallet > 0.0001 ? (
                                    <Button
                                      type="submit"
                                      fullWidth
                                      size="medium"
                                      variant="contained"
                                      color="primary"
                                      marginBottom="20px"
                                      disabled={
                                        values.milestones.length === 0 ||
                                        amountCompair < amountSum
                                      }
                                    >
                                      Add Contract
                                    </Button>

                                  ) : (
                                    <Typography style={{ color: "red" }}>Your wallet balance is too low.</Typography>
                                  )}


                                </>


                              )}

                            </Box>
                          </div>
                        )}
                      </FieldArray>
                      {/* <Divider style={{ marginTop: 20, marginBottom: 20 }} /> */}
                    </Form>
                  );
                }}
              </Formik>
            </Box>
          </Grid>


          {updateMinSatkeOpen && (
            <Dialog
              open={updateMinSatkeOpen}
              onClose={() => {
                setUpdateMinSatkeOpen(false);
              }}
              maxWidth='sm'
            >
              <DialogTitle>
                <ConnectWallet
                  onClose={(data) => {
                    setUpdateMinSatkeOpen(data);
                  }}
                />
              </DialogTitle>
            </Dialog>
          )}

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
    </Dialog >
  );

  // return MilestoneForm;
}
