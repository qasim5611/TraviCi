import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Grid,
  InputBase,
  Typography,
} from "@material-ui/core";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

import OpenMarketplaceABI from "src/constants/ABI/abrar.json";

import { abrarContract } from 'src/constants'
import { getContract } from "src/utils/index";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { UserContext } from "src/context/User";
import Slide from "@material-ui/core/Slide";

import ApiConfig from "src/Config/APIconfig";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  cardbox: {
    width: "100%",
    backgroundColor: "#C54C82",
    height: "150px",
    borderRadius: "10px",
    padding: "20px",
    "& h3": {
      color: "#fff",
      textAlign: "center",
      paddingTop: "10px",
      paddingButton: "10px",
    },
    "& h2": {
      color: "#fff",
      textAlign: "center",
      fontSize: "40px",
      paddingTop: "20px",
    },
  },
  inputfield: {
    border: "2px solid #C54C82",
    padding: "5px",
    borderRadius: "10px",
  },
  butm: {
    display: "flex",
    justifyContent: "center",
    // "&:hover": {
    //   backgroundColor: "red",
    // },
    paddingBottom: "30px",
  },
  butm1: {
    backgroundColor: "#252d47",
    color: "#fff",
    "&:hover": {
      backgroundColor: "red",
    },
  },
  butm2: {
    backgroundColor: "#252d47",
    color: "#fff",
    "&:hover": {
      backgroundColor: "red",
    },
  },
  btn: {
    "& button": {
      padding: "10px 16px !important",
    },
  },
});
export default function Commission(props) {
  const classes = useStyles();
  const user = useContext(UserContext);
  const web3 = (window.web3 = new Web3(window.ethereum));
  const { account, chainId, library } = useWeb3React();
  const [notAdmin, setNotAdmin] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [displaydta, setData] = useState("");
  const [inputData, setInputData] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false)
  const [earning, setEarning] = useState(false)
  const dataDisplauhandler = async () => {
    try {
      if (account && library) {
        const marketPlaceContract = getContract(
          abrarContract,
          OpenMarketplaceABI,
          library,
          account
        );
        console.log("marketPlaceContract", marketPlaceContract);
        const displayData = await marketPlaceContract.milestonefee();
        console.log("displayData", displayData.toString());

        setData(Number(displayData.toString()) / 100);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    dataDisplauhandler();
  }, [account, displaydta]);
  const handleClose = () => {
    setOpen(false);
    setIsUpdating(false);
  };

  function percentage(num, per) {
    return (num * per) / 50;
  }

  const upadteCommisionBlockchainHandler = async () => {
    const contract = getContract(
      abrarContract,
      OpenMarketplaceABI,
      library,
      account
    )
    const ownerOfAddress = await contract.owner()
    if ((ownerOfAddress?.toLowerCase() === account?.toLowerCase())) {
      try {
        // if (inputData > '0' && inputData <= '10') {
        setIsUpdating(true)


        console.log('contract----', contract)
        const setMilestoneFeeFun = await contract.setMilestoneFee(Number(inputData) * 100)
        await setMilestoneFeeFun.wait()
        toast.success('Commission has been updated successfully.')
        dataDisplauhandler()
        setIsUpdating(false)
        // } else {
        //   toast.error('You cannot set commission 0 and greater than 10')
        // }

      } catch (err) {
        console.error(err);
        setIsUpdating(false)
        toast.error(err.message)
      }

    } else {
      toast.warn("Invalid Owner Address")

    }

  }

  const getEarningAmount = async () => {
    try {

      const contract = getContract(
        abrarContract,
        OpenMarketplaceABI,
        library,
        account
      )
      const getCommision = await contract.AdminCommissionFee()
      console.log("getCommision---", getCommision.toString());
      setEarning(Number(web3.utils.fromWei(getCommision.toString()))?.toFixed(4))

    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    getEarningAmount()
  }, [account])


  return (
    <div>
      <Container>
        <Box mt={4}>
          <Typography variant="h2" color="#000">
            Commission Setting
          </Typography>
        </Box>
        <Box pt={5}>
          <Grid container spacing={10}>
            <Grid item lg={5}>
              <Box className={classes.cardbox}>
                <Typography variant="h3">Current Commission</Typography>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: ".5rem",
                  }}
                >
                  {!account ? (
                    <Button
                      variant="contained"
                      color="primary"
                      large
                      onClick={user.connectWallet}
                    >
                      Connect Wallet
                    </Button>
                  ) : (
                    <Typography variant="h2"> {displaydta ? displaydta : 0}%</Typography>
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item lg={5}>
              <Box className={classes.cardbox}>
                <Typography variant="h3"> Commission Balance</Typography>
                <Typography variant="h2"> {earning} ETH</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box pt={5}>
          <Grid container spacing={10}>
            <Grid item lg={8}>
              <Grid container spacing={2}>
                <Grid item lg={8}>
                  <Box pb={2}>
                    <Typography variant="h3">Set Commission</Typography>
                  </Box>
                  <Box className={classes.inputfield}>
                    <InputBase
                      placeholder="set commission max(10%)"
                      type="number"
                      value={inputData}
                      fullWidth
                      onChange={(e) => {


                        setInputData(e.target.value)
                        if (e.target.value <= 0) {
                          setIsValid(true)
                        } else if (e.target.value > 10) {
                          setIsValid(true)
                        }
                        else {
                          setIsValid(false)
                        }
                      }}
                    // maxlength="10"
                    // required
                    />
                  </Box>
                  {isValid && inputData !== '' && (
                    <FormHelperText error>
                      Commision should be lies between 0 to 10.
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item lg={4}>
                  <Box className={classes.btn} pt={5.8}>
                    {!account && (
                      <Button
                        variant="contained"
                        color="primary"
                        large
                        onClick={user.connectWallet}
                      >
                        Connect Wallet
                      </Button>
                    )}
                    {account && (
                      <Button
                        variant="contained"
                        color="primary"
                        large
                        disabled={isUpdating || inputData === "" || isValid}
                        onClick={upadteCommisionBlockchainHandler}
                      >
                        Submit {isUpdating && <ButtonCircularProgress />}
                      </Button>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        {/*  */}
        <Dialog
          style={{ border: "4px solid #313b48" }}
          open={open}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <Typography
                style={{ marginTop: "26px", color: "rgb(18 22 35)" }}
                variant="h4"
              >
                Are you sure you want to give commission?
              </Typography>
              {notAdmin && (
                <Box mt={2}>
                  <Typography color="error" variant="body2">
                    Please login with admin wallet
                  </Typography>
                </Box>
              )}
            </DialogContentText>
          </DialogContent>

          <DialogActions className={classes.butm}>
            <Button
              // onClick={handleClickOpen}
              color="primary"
              className={classes.butm1}
              to="/"
            // component={Link}
            >
              Yes
            </Button>
            <Button
              onClick={handleClose}
              color="primary"
              className={classes.butm2}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
        {/*  */}
      </Container>
    </div>
  );
}
