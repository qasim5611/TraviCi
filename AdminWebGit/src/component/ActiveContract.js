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
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
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
import ApiConfig from "src/Config/APIconfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageLoading from "./PageLoading";
import Slide from "@material-ui/core/Slide";

import ButtonCircularProgress from "./ButtonCircularProgress";
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

export default function ActiveContract({
  isAdd,
  contracts,
  contractCount,
  setContractCount,
  listContract,
  allDataMyContract,
}) {

  // const contractLength = contracts?.filter((data) => {
  //   return data?.ContractDetails[0]?.privacy === ""
  // })
  console.log("contracts111111", contracts);
  const history = useHistory();
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(0);
  const [loader, setLoader] = useState(false);
  const [contractDetails, setContractDetails] = useState({});
  const accessToken = window.localStorage.getItem("creatturAccessToken");
  const userType = window.localStorage.getItem("userType");
  const userEmail = window.localStorage.getItem("userEmail");

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

  const submitContractDetails = async (data) => {
    setLoader(true);
    window.localStorage.setItem("agencyTeam", data?.agencyTeam);
    window.localStorage.setItem("contractDocument", data?.contractDocument);
    window.localStorage.setItem("privacy", data?.privacy);
    window.localStorage.setItem("contractName", data?.contractName);
    window.localStorage.setItem("startDate", data?.startDate);
    window.localStorage.setItem("endDate", data?.endDate);
    window.localStorage.setItem("amount", data?.amount);
    window.localStorage.setItem("description", data?.description);
    window.localStorage.setItem("milestones", data?.milestones);

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
        // setTimeout(function () {
        //   history.push("/pricing");
        // }, 5000);
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

        localStorage.removeItem("contractIddata");
        localStorage.removeItem("contractDocument");
        localStorage.removeItem("privacy");
        localStorage.removeItem("contractName");
        localStorage.removeItem("startDate");
        localStorage.removeItem("endDate");
        localStorage.removeItem("amount");
        localStorage.removeItem("amount12");
        localStorage.removeItem("description");
        localStorage.removeItem("contractIddata");
        localStorage.removeItem("contractDocument");
        localStorage.removeItem("milestones");
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

          // else setHistory(depositFilter);
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
        {contracts &&
          contracts.map((data, i) => {
            console.log("data-active--", data);
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
                      contractName: data?.ContractDetails[0]?.contractName,
                      description: data?.ContractDetails[0]?.description,
                      endDate: data?.ContractDetails[0]?.endDate,
                      contractId: data?.ContractDetails[0]?._id,
                      contracts: data?.ContractDetails[0]?.milestones,
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
                    {data?.ContractDetails[0]?.contractName}
                  </Typography>
                  {/* <Typography variant="body2">{data?.desc}</Typography> */}
                </Box>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}
