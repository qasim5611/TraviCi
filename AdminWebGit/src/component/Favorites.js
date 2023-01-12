import {
  Box,
  Grid,
  Typography,
  Link,
  DialogContent,
  MenuItem,
  FormControl,
  Select,
  Button,
  Dialog,
  FormHelperText,
} from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SdStorageOutlinedIcon from "@material-ui/icons/SdStorageOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import NewProject from "./NewProjectFrist";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import NewProjectSecond from "./NewProjectSecond";
import AddMilestone from "./AddMilestone";
import { useHistory } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import ApiConfig from "src/Config/APIconfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageLoading from "./PageLoading";
import Slide from "@material-ui/core/Slide";
import abrarAbi from "src/constants/ABI/abrar.json";
import ButtonCircularProgress from "./ButtonCircularProgress";
import { getContract } from "src/utils";
import { abrarContract } from "src/constants";
import { chain } from "lodash";
import moment from "moment";
import { AuthContext } from "src/context/Auth";
import web3 from "web3";
// import { Console } from "console";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    border: "2px solid transparent",
    justifyContent: "center",
  },
}));

export default function Favorites({
  isAdd,
  contracts,
  contractCount,
  setContractCount,
  listContract,
  allDataMyContract,
}) {
  const user = useContext(AuthContext);

  const history = useHistory();
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(0);
  const [loader, setLoader] = useState(false);
  const [contractDetails, setContractDetails] = useState({});
  const accessToken = window.localStorage.getItem("creatturAccessToken");
  const userType = window.localStorage.getItem("userType");
  const userEmail = window.localStorage.getItem("userEmail");
  const { account, chainId, library } = useWeb3React();
  console.log("account----", account);
  const [loader3, setLoader3] = useState(false);
  const [valiadtorPopup, setValidatorPop] = useState(false);
  const [contractone, setContractone] = useState([]);
  const [contractPopup, setContractPopup] = useState(false);
  const [validators, setValidateId] = useState([]);
  const [validatorsOnce, setValidatorsOnce] = React.useState();

  const onNextScreenSubmit = (nextPage) => (values) => {
    setCurrentPage(nextPage);
    if (currentPage === 3) {
      submitContractDetails({ ...contractDetails, ...values });
    } else setContractDetails({ ...contractDetails, ...values });
  };

  const listContract123 = async () => {
    if (window.localStorage.getItem("planType") === "ENTERPRISE") {
      setCurrentPage(1);
    } else {
      axios
        .get(
          ApiConfig.planList,

          {
            headers: {
              token: accessToken,
            },
          }
        )
        .then((response) => {
          if (response.data.response_code === 200) {
            if (response.data.result[0].contractAdded === 1) {
              setCurrentPage(1);
            } else {
              if (response.data.result[0].planType === "FREE") {
                toast.error("You don't have any active plan");
                setTimeout(function () {
                  history.push({
                    pathname: "/pricing",
                  });
                }, 4000);
              } else {
                window.localStorage.setItem(
                  "planType",
                  response.data.result[0].planType
                );
                setCurrentPage(1);
              }
            }
          } else {
            if (response.data.response_code === 404) {
              toast.error("You don't have any active plan");
              setTimeout(function () {
                history.push({
                  pathname: "/pricing",
                });
              }, 4000);
            } else {
            }
          }
        });
    }
  };

  const accountBalance = async (account) => {
    const response = await axios.get(
      `https://api-testnet.bscscan.com/api?module=account&action=balance&address=${account}&apikey=GQWQPRVJXUI35NTS2VK4J8KEMZCRXJAI4S`
    ); //tstnet
    // const response = await axios.get(`https://api.bscscan.com/api?module=account&action=balance&address=${senderAddress}&apikey=GQWQPRVJXUI35NTS2VK4J8KEMZCRXJAI4S`) //mainet
    console.log("response---121212", response);
    console.log(response.data.result);
    let balance = web3.utils.fromWei(response.data.result, "ether");
    return Number(balance);
  };
  useEffect(() => {
    if (account) {
      accountBalance(account);
    }
  }, [account]);

  const submitContractDetails = async (data) => {
    setLoader(true);

    const arr = data?.milestones;
    let valAmount;
    let arrValAmount = [];

    for (let i = 0; i < arr.length; i++) {
      valAmount = arr[i]?.amount;
      arrValAmount.push(valAmount);
    }
    let valdueDate;
    let arrValdueDate = [];
    for (let i = 0; i < arr.length; i++) {
      valdueDate = moment(arr[i]?.dueDate).unix();
      arrValdueDate.push(valdueDate);
    }
    let valtaskName;
    let arrValtaskName = [];
    for (let i = 0; i < arr.length; i++) {
      // console.log(arr[i]);
      // console.log(arr[i]?.amount);
      valtaskName = arr[i]?.taskName;
      arrValtaskName.push(valtaskName);
    }
    let valpriority;
    let arrValpriority = [];
    for (let i = 0; i < arr.length; i++) {
      valpriority = arr[i]?.priority;
      arrValpriority.push(valpriority);
    }

    try {
      const contract = getContract(abrarContract, abrarAbi, library, account);

      const agrementIdFun = await contract.agrementId();
      console.log("----agrementId----", agrementIdFun.toString());
      const contractId = agrementIdFun.toString();
      const createContract = await contract.CreateContract(
        [
          0,
          data?.contractName,
          data?.description,
          data?.privacy,
          moment(data?.startDate).unix(),
          moment(data?.endDate).unix(),
          data?.amount,
          0,
          user?.userData?._id,
          0,
          [0],
          false,
          false,
          false,
        ],
        arrValAmount,
        arrValtaskName,
        arrValpriority,
        arrValdueDate
      );
      await createContract.wait();

      createContractHandler(data, contractId);
    } catch (error) {
      console.log("error", error);
      setLoader(false);
      toast.error(error.message);
    }
  };
  const createContractHandler = async (data, contractId) => {
    const temp = {
      agencyTeam: data?.agencyTeam,
      contractDocument: data?.contractDocument
        ? data?.contractDocument
        : window.localStorage.getItem("contractDocument"),
      privacy: data?.privacy,
      milestones: data?.milestones,
      contractName: data?.contractName,
      startDate: Date.parse(data?.startDate),
      endDate: Date.parse(data?.endDate),
      amount: data?.amount,
      description: data?.description,
      blockchainContractId: contractId,
    };
    const formData = new FormData();
    console.log(temp);
    for (let key of Object.keys(temp)) {
      if (key === "milestones") {
        formData.append(key, JSON.stringify(temp?.[key]));
      } else {
        formData.append(key, temp?.[key]);
      }
    }
    try {
      setLoader(true);

      const response = await axios({
        method: "POST",
        url: ApiConfig.addContract,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          token: accessToken,
        },
      });
      console.log("response", response);
      if (response.data.response_code !== 200) {
        toast.error(response.data.responseMessage);
        setLoader(false);
        // }
      } else {
        setLoader(false);
        toast.success("Your contract has been successfully added");
        setContractPopup(true);
        setContractone(response.data.result);
        setContractDetails();
        setCurrentPage(0);
        setContractCount(contractCount + 1);
        listContract();
      }
    } catch (err) {
      toast.error(err);
      setLoader(false);
    }
  };
  const NextScreen = () => {
    let Component = null;
    let nextPage = 0;
    switch (currentPage) {
      case 1: {
        Component = NewProject;
        nextPage = 2;
        break;
      }
      case 2: {
        Component = NewProjectSecond;
        nextPage = 3;
        break;
      }
      case 3: {
        Component = AddMilestone;
        nextPage = 0;
        break;
      }
      default: {
        Component = React.Fragment;
        nextPage = 0;
        break;
      }
    }
    return (
      <Component
        open
        loader={loader}
        onSubmit={onNextScreenSubmit(nextPage)}
        handleClose={() => setCurrentPage(currentPage - 1)}
        contractDetails={{ contractDetails, setContractDetails }}
      />
    );
  };

  useEffect(() => {
    // setIsLoading(true);
    axios
      .get(ApiConfig.listValidator)
      .then((response) => {
        if (response.data.response_code === 200) {
          setValidateId(response.data.result);
          // setValidators(response.data.result);
          console.log("response", response);
        } else {
          console.log("no users");
        }
        // setIsLoading(false);
      })
      .catch((response) => {
        // setIsUpdating(false);

        console.log("response", response);
      });
  }, []);

  const SelectValidator = async (id) => {
    try {
      setLoader3(true);
      const response = await axios({
        method: "GET",
        url: ApiConfig.selectValidatorByCompany,
        params: {
          validatorId: validatorsOnce,
          contractId: contractone._id,
        },
        headers: {
          token: accessToken,
        },
      });
      if (response.data.response_code !== 200) {
        setLoader3(false);
        setContractPopup(true);

        toast.error(response.data.response_message);
      } else {
        listContract();
        setLoader3(false);
        history.push("/dashboard");
        toast.success(" validator selected successfully");
        setContractPopup(false);
      }
    } catch (err) {
      setLoader3(false);
      setContractPopup(true);

      console.error(err.response);
    }
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {userType === "FREELANCER" ? (
          <>
            {contracts &&
              contracts.map((data, i) => {
                // if (userEmail !== data?.email) {
            
                //   return;
                // }
            
                return (
                  <Grid item xs={6} sm={3} md={2} key={i}>
                    <Link
                      to={{
                        pathname: "/milestone-details",
                        state: {
                          contractName: !data?.contractId
                            ? data?.contractName
                            : data?.contractId?.contractName,
                          description: !data?.contractId
                            ? data?.description
                            : data?.contractId?.description,
                          endDate: !data?.contractId
                            ? data?.endDate
                            : data?.contractId?.endDate,
                          contractId: data,
                          contracts: data,
                        },
                      }}
                      component={RouterLink}
                    >
                      <Box
                        elevation={0}
                        className={classes.paper}
                        onClick={() => {
                          history.push("/milestone-details");
                        }}
                        style={
                          (i + 1) % 2 === 0
                            ? { backgroundColor: "#fbd3c5" }
                            : (i + 1) % 3 === 0
                            ? { backgroundColor: "#baecc1" }
                            : { backgroundColor: "#FEBFCC" }
                        }
                      >
                        <SdStorageOutlinedIcon
                          style={
                            (i + 1) % 2 === 0
                              ? { fontSize: 70, color: "#f69371" }
                              : (i + 1) % 3 === 0
                              ? { fontSize: 70, color: "#39b54a" }
                              : { fontSize: 70, color: "#C54C82" }
                          }
                        />
                      </Box>
                    </Link>
                    <Box style={{ margin: 10 }}>
                      <Typography
                        paragraph
                        style={{
                          fontWeight: "bold",
                          wordBreak: "break-all",
                          textAlign: "center",
                        }}
                      >
                        {/* {data.contractName} */}
                        {!data?.contractId
                          ? data?.contractName
                          : data?.contractId?.contractName}
                      </Typography>
                      <Typography variant="body2">{data.desc}</Typography>
                    </Box>
                  </Grid>
                );
              })}
          </>
        ) : (
          <>
            {contracts &&
              contracts.map((data, i) => {
                // if (userEmail !== data?.email) {
                //   console.log("non-User Email address", data?.email);
                //   return;
                // }
                // console.log("User Email address", data?.email);
                return (
                  <Grid item xs={6} sm={3} md={2} key={i}>
                    <Link
                      to={{
                        pathname: "/milestone-details",
                        state: {
                          contractName: !data?.contractId
                            ? data?.contractName
                            : data?.contractId?.contractName,
                          description: !data?.contractId
                            ? data?.description
                            : data?.contractId?.description,
                          endDate: !data?.contractId
                            ? data?.endDate
                            : data?.contractId?.endDate,
                          contractId: data,
                          contracts: data,
                        },
                      }}
                      component={RouterLink}
                    >
                      <Box
                        elevation={0}
                        className={classes.paper}
                        onClick={() => history.push("/milestone-details")}
                        style={
                          (i + 1) % 2 === 0
                            ? { backgroundColor: "#fbd3c5" }
                            : (i + 1) % 3 === 0
                            ? { backgroundColor: "#baecc1" }
                            : { backgroundColor: "#FEBFCC" }
                        }
                      >
                        <SdStorageOutlinedIcon
                          style={
                            (i + 1) % 2 === 0
                              ? { fontSize: 70, color: "#f69371" }
                              : (i + 1) % 3 === 0
                              ? { fontSize: 70, color: "#39b54a" }
                              : { fontSize: 70, color: "#C54C82" }
                          }
                        />
                      </Box>
                    </Link>
                    <Box style={{ margin: 10 }}>
                      <Typography
                        paragraph
                        style={{
                          fontWeight: "bold",
                          wordBreak: "break-all",
                          textAlign: "center",
                        }}
                      >
                        {/* {data.contractName} */}
                        {!data?.contractId
                          ? data?.contractName
                          : data?.contractId?.contractName}
                      </Typography>
                      <Typography variant="body2">{data.desc}</Typography>
                    </Box>
                  </Grid>
                );
              })}
          </>
        )}
        {isAdd && userType === "COMPANY" && (
          <Grid item xs={6} sm={3} md={2}>
            {/* {!loader ? ( */}
            <>
              <Box
                elevation={0}
                className={classes.paper}
                style={{
                  backgroundColor: "white",
                  border: "2px dashed #c5c5c5",
                  cursor: "pointer",
                }}
                // onClick={() => setCurrentPage(1)}
                onClick={() => {
                  if (!account) {
                    toast.warn("Please connect your wallet");
                  } else {
                    listContract123();
                  }
                }}
              >
                <AddOutlinedIcon style={{ fontSize: 70, color: "#c5c5c5" }} />
              </Box>
              <Box style={{ margin: 10 }}>
                <Typography
                  paragraph
                  style={{ fontWeight: "bold", textAlign: "center" }}
                >
                  New Contract
                </Typography>
              </Box>
            </>

            <div>{/* <button onClick={notify}>Notify!</button> */}</div>
          </Grid>
        )}
      </Grid>
      <NextScreen />

      <Dialog
        // classes={{ paper: classes.desktopDrawer }}
        open={contractPopup}
        onClose={() => setContractPopup(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent style={{ width: "312px", padding: "30px 20px" }}>
          <Box>
            <FormControl fullWidth variant="outlined">
              <Typography variant="body2">
                <strong>Select Validator</strong>
              </Typography>
              <Select
                fullWidth
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                margin="dense"
                name="privacy"
                onChange={(e) => setValidatorsOnce(e.target.value._id)}
              >
                {validators &&
                  validators?.map((data) => {
                    // setValidatorsOnce(data._id)
                    return <MenuItem value={data}>{data.firstName}</MenuItem>;
                  })}
              </Select>
            </FormControl>
          </Box>

          <Box mt={3} align="center">
            <Button
              type="submit"
              fullWidth
              size="medium"
              variant="contained"
              color="primary"
              onClick={SelectValidator}
              disabled={loader3}
            >
              Next{loader3 && <ButtonCircularProgress />}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {loader && (
        <Dialog
          open={loader}
          onClose={() => {
            if (!loader) {
              setLoader(false);
            }
          }}
        >
          <DialogContent>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              style={{ padding: "40px" }}
            >
              <Typography variant="h4">Creating...</Typography>
              <ButtonCircularProgress />
            </Box>
            <FormHelperText error>
              <i>Please do not refresh the page till the process completes.</i>
            </FormHelperText>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
}
