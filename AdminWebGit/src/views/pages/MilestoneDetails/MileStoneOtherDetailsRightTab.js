import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Typography,
  makeStyles,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Link,
  TextField,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import axios from "axios";
import ApiConfig from "../../../Config/APIconfig";
import CheckIcon from "@material-ui/icons/Check";
import { useHistory } from "react-router-dom";
import { BiSmile } from "react-icons/bi";
import { MdMoodBad } from "react-icons/md";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import moment from "moment";
import CalendarTodayOutlined from "@material-ui/icons/CalendarTodayOutlined";
import { ToastContainer, toast } from "react-toastify";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DepositeFundModal from "./DepositeFundModal";
import SubmitForWorkModal from "./SubmitForWorkModal";
import DialogContentText from "@material-ui/core/DialogContentText";
import DisputeModal from "./DisputeModal";
import { getContract, getWeb3Obj } from "src/utils";
import { abrarContract } from "src/constants";
import abrarAbi from "src/constants/ABI/abrar.json";
import { AuthContext } from "src/context/Auth";
import { useWeb3React } from "@web3-react/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import ConnectWallet from "src/component/ConnectWallet";
import RejectModal from "./RejectModal";
import { DropzoneArea } from "material-ui-dropzone";
import AppealModal from "./AppealModal";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: 16,
  },
  pinkColor: {
    backgroundColor: "#fabda8",
    color: "#f69371",
  },
  skyColor: {
    backgroundColor: "#8ce8e3",
    color: "#1c6864",
  },
  alignCenter: {
    display: "flex",
    alignItems: "center",
  },
  commentBox: {
    minHeight: 100,
    borderRadius: 20,
    backgroundColor: "#f8f6f7",
    padding: 20,
  },
  confirmationBox: {
    minHeight: 100,
    borderRadius: 20,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  dropzone: {
    MuiDropzoneArea: {
      root: {
        backgroundColor: "red !important",
      },
    },
  },
  approve: {
    "& h6": {
      fontSize: "13px",
      "@media(max-width:1460px)": {
        fontSize: "10px",
        whiteSpace: "pre",
      },
    },
  },
}));

export default function MileStoneOtherDetailsRightTab({
  contractId,
  createdAt,
  description,
  obj,
  data,
  contracts_id,
  milestoneDetailsDescription,
  loaderStart,
  contractDetails,
  milestone_id,
  viewMilestone,
  loaderdata,
  getmilestoneList,
  HandleMileStoneDetail,
  contractData,
  listMildStone,
  isContractCompleted,
  companyHandler,
  listMilestoneForValidator,
}) {
  console.log("contractData---", obj);

  const user = useContext(AuthContext);
  const { account, chainId, library } = useWeb3React();
  const history = useHistory();
  const accessToken = window.localStorage.getItem("creatturAccessToken");
  const classes = useStyles();
  const [value, setValue] = React.useState("yes");
  const [commentBox, setComment] = React.useState("");
  const [commentBox1, setComment1] = React.useState("");

  const [value12, setValue12] = React.useState(false);
  const [value22, setValue22] = React.useState(false);
  const [loader, setloader] = React.useState(false);
  const [loader1, setloader1] = React.useState(false);
  const [isDispalyedMileStone, setDsDispalyedMilestone] = React.useState(true);
  const [otpPop, setOtpPop] = useState(false);
  const [isLoadingConform, setisLoadingConform] = useState(false);
  const [workData, setWorkData] = useState("");
  const [openDeposite, setDeposite] = useState(false);
  const [dispute, setDispute] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [disputedFile, setDisputedFile] = useState(false);
  const [amountVAlue, setAmountValue] = useState();
  const [amountVAlueLoading, setAmountValueLoading] = useState(false);
  const [fieldValue, setFieldValue] = useState();
  const [wallet, setWallet] = useState(account ? account : "");
  const [updateMinSatkeOpen, setUpdateMinSatkeOpen] = useState(false);
  const [amountValue, setAmount] = useState();
  const [isLoadingAmount, setIsLoadingAmount] = useState(false);
  const [escrowAmount, setEscrowAmount] = useState("");
  const [fundRelease, setFundRelease] = useState("");
  const [fundLoading, setFundLoading] = useState(false);
  const [fundTrue, setFundTrue] = useState();
  const [rejectOpen, setRejectOpen] = useState(false);
  const [reasonData, setReasonData] = useState("");
  const [image, setImage] = React.useState("");
  const [appealOpen, setAppealOpen] = useState(false);
  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (err) {
      console.log("Error: ", err);
    };
  };

  const indexId = milestoneDetailsDescription?.milestoneIndex;

  const convertAmount = async (dataToSend) => {
    try {
      const web3 = await getWeb3Obj();
      const contract = getContract(abrarContract, abrarAbi, library, account);

      const convertInBNB = await contract.convertUSDtoETH(parseInt(dataToSend));

      setEscrowAmount(
        Number(web3.utils.fromWei(convertInBNB?.toString()))?.toFixed(4)
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (milestoneDetailsDescription?.amount !== undefined) {
      convertAmount(milestoneDetailsDescription?.amount);
    }
  }, [account, milestoneDetailsDescription?.amount]);

  const getRelease = async () => {
    try {
      const contract = getContract(abrarContract, abrarAbi, library, account);

      const releaseFun = await contract.fundTransfered(
        parseInt(contractData?.contractId?.contractId?.blockchainContractId),
        indexId
      );
      setFundTrue(releaseFun);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (indexId !== undefined) {
      getRelease();
    }
  }, [account, indexId]);

  const disputedFileCom = (data) => {
    setDisputedFile(true);
    setWorkData(data);
  };

  const depostAmout = (data) => {
    setWorkData(data);
    setDeposite(true);
  };
  const disputeFile = (data) => {
    setWorkData(data);
    setDispute(true);
  };

  const workSubmit = (data) => {
    setWorkData(data);
    setWorkOpen(true);
  };

  useEffect(() => {
    setDsDispalyedMilestone(
      milestoneDetailsDescription?.mileStoneStatus === "INPROGRESS"
    );
  }, [milestoneDetailsDescription]);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const userType = window.localStorage.getItem("userType");
  async function approve(status) {
    if (status === true) {
      setloader(true);
    } else {
      setloader1(true);
    }

    try {
      const contract = getContract(abrarContract, abrarAbi, library, account);
      const agrementIdFun = await contract.agrementId();

      const approveMileStone = await contract.Approve(
        parseInt(contractData?.contractId?.contractId?.blockchainContractId),
        contractId?.contractId?._id,
        status
      );
      await approveMileStone.wait();
      if (status === true) {
        approveAPIHandler();
      } else {
        reject();
      }
    } catch (error) {
      console.log(error);
      setloader(false);
      setloader1(false);
    }
  }
  const approveAPIHandler = async () => {
    setloader(true);
    try {
      const formData = new FormData();
      formData.append("_id", obj?._id);
      const res = await axios({
        method: "POST",
        url: ApiConfig.approveContract,
        data: {
          _id: contracts_id,
        },
        headers: {
          token: accessToken,
        },
      });
      if (res.data.response_code === 200) {
        setloader(false);
        setValue12(true);
        setRejectOpen(false);
        toast.success("Succesfully approved ");
        getmilestoneList();
        listMildStone(
          contractId?._id ? contractId?._id : contractId?.contractId?._id
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  async function reject(event) {
    setloader1(true);
    // console.log("endDate", new Date(endDate).toISOString());
    try {
      const formData = new FormData();
      formData.append("_id", obj?._id);
      const res = await axios({
        method: "POST",
        url: ApiConfig.rejectContract,
        data: {
          contractId: contracts_id,
          reason: reasonData,
        },
        headers: {
          token: accessToken,
        },
      }).then((response) => {
        if (response.data.response_code !== 200) {
          toast.warn("Something Went Wrong with Rejection");
          setloader1(false);
        } else {
          console.log("userList", response);
          setValue22(true);
          toast.success("You rejected inivitation ");
          getmilestoneList();
          listMildStone(
            contractId?._id ? contractId?._id : contractId?.contractId?._id
          );
        }
      });

      console.log(res);
    } catch (err) {
      setloader1(false);
      console.log(err);
      toast.warn("Something Went Wrong ");
    }
  }

  async function approveValidator(event) {
    setloader(true);
    // console.log("endDate", new Date(endDate).toISOString());

    try {
      const formData = new FormData();
      formData.append("_id", obj?._id);
      const res = await axios({
        method: "PUT",
        url: ApiConfig.acceptMilestoneByValidator,

        data: {
          _id: obj?._id,
          milestoneId: viewMilestone.milestones[0]._id,
        },

        headers: {
          token: accessToken,
        },
      }).then((response) => {
        if (response.data.response_code !== 200) {
          setloader(false);
          toast.warn("This milestone is not completed by company.");
        } else {
          setValue12(true);
          getmilestoneList();
          console.log("userList", response);
          toast.success(response.data.response_message);
          setloader(false);
          getmilestoneList();
          listMildStone(
            contractId?._id ? contractId?._id : contractId?.contractId?._id
          );
          listMilestoneForValidator(
            contractId?._id ? contractId?._id : contractId?.contractId?._id
          );
          HandleMileStoneDetail(milestone_id);
        }
      });

      console.log(res);
      setloader(false);
    } catch (err) {
      console.log(err);
      setloader(false);
      toast.warn("Something Went Wrong ");
    }
  }
  const validatorContractStatus = viewMilestone?.milestones
    ? viewMilestone?.milestones[0]?.validatorContractStatus
    : null;
  const milestoneName = viewMilestone?.milestones
    ? viewMilestone?.milestones[0]?.milestone
    : null;
  async function rejectValidator(event) {
    setloader1(true);
    // console.log("endDate", new Date(endDate).toISOString());
    try {
      const formData = new FormData();
      formData.append("_id", obj?._id);
      formData.append("comment", commentBox1);
      const res = await axios({
        method: "PUT",
        url: ApiConfig.rejectMilestoneByValidator,
        data: {
          _id: obj?._id,
          milestoneId: viewMilestone.milestones[0]._id,
          comment: commentBox1,
        },
        headers: {
          token: accessToken,
        },
      }).then((response) => {
        if (response.data.response_code !== 200) {
          toast.warn("Something Went Wrong with Rejection");
          setloader1(false);
        } else {
          console.log("userList", response);
          setValue22(true);
          getmilestoneList();
          toast.success("You rejected inivitation ");
          getmilestoneList();
          listMildStone(
            contractId?._id ? contractId?._id : contractId?.contractId?._id
          );
          listMilestoneForValidator(
            contractId?._id ? contractId?._id : contractId?.contractId?._id
          );
          HandleMileStoneDetail(milestone_id);
        }
      });
      console.log(res);
    } catch (err) {
      setloader1(false);
      console.log(err);
      toast.warn("Something Went Wrong ");
    }
  }

  const submitWorkHandler = async () => {
    setloader1(true);

    try {
      const contract = getContract(abrarContract, abrarAbi, library, account);
      console.log("contract----", contract);
      console.log(
        "contractData?.contracts?.blockchainContractId",
        contractData?.contracts?.blockchainContractId
      );
      console.log("user?.userData?._id", user?.userData?._id);
      const deleiverMilestone = await contract.deliverMilestone(
        parseInt(contractData?.contracts?.blockchainContractId),
        indexId,
        user?.userData?._id,
        moment(fieldValue).unix()
      );

      await deleiverMilestone.wait();
      completeParticularMilestone();
    } catch (error) {
      console.log(error);
      setloader1(false);
    }
  };

  const completeParticularMilestone = async (event) => {
    try {
      setloader1(true);
      const formData = new FormData();
      formData.append("_id", data?._id);
      const res = await axios({
        method: "POST",
        url: ApiConfig.completeParticularMilestone,

        data: {
          _id: viewMilestone?._id,
          milestoneId: viewMilestone?.milestones[0]?._id,
          comment: commentBox,
          walletAddress: wallet,
          submitDate: moment(fieldValue).unix(),
          image: image,
        },
        headers: {
          token: accessToken,
        },
      }).then((response) => {
        setisLoadingConform(true);
        if (response.data.response_code !== 200) {
          setisLoadingConform(false);
          setloader1(false);
          setDsDispalyedMilestone(false);

          // toast.success(response.data.response_message);
        } else {
          toast.success(response.data.response_message);
          setDsDispalyedMilestone(false);
          getmilestoneList(
            contractId?.contractId?._id
              ? contractId?.contractId?._id
              : contractId._id
          );
          listMildStone(
            contractId?._id ? contractId?._id : contractId?.contractId?._id
          );
          HandleMileStoneDetail(milestone_id);
          setisLoadingConform(false);
          setloader1(false);
          setComment("");
          console.log("userList", response);
          setValue22(true);
          setDsDispalyedMilestone(false);
        }
        // setIsLoading(false);
      });
      // setButtonName(buttonName === "Approve" ? "Reject" : "Approve");
      console.log(res);
    } catch (err) {
      setloader1(false);
      console.log(err);
    }
  };

  const getBalance = async (_id) => {
    setAmountValueLoading(true);
    try {
      const web3 = await getWeb3Obj();
      const contract = getContract(abrarContract, abrarAbi, library, account);

      const getAmount = await contract.scrowAmountDeposited(
        contractData?.contracts?.blockchainContractId
          ? contractData?.contracts?.blockchainContractId
          : contractData?.contractId?.contractId?.blockchainContractId,
        _id
      );

      setAmountValue(getAmount);
      setAmountValueLoading(false);
    } catch (error) {
      console.log(error);
      setAmountValueLoading(false);
    }
  };
  useEffect(() => {
    const indexId = milestoneDetailsDescription?.milestoneIndex;
    if (indexId !== undefined || indexId !== null) {
      getBalance(indexId);
    }
  }, [milestoneDetailsDescription]);
  const [open1, setOpen1] = React.useState(false);
  const resleaseFund = async (status) => {
    setFundLoading(true);
    try {
      const contract = getContract(abrarContract, abrarAbi, library, account);
      const relwaseFundHandler = await contract.approveMilestone(
        parseInt(contractData?.contractId?.contractId?.blockchainContractId),
        contractId?.contractId?._id.toString(),
        indexId,
        status,
        milestoneDetailsDescription?.walletAddress
      );
      await relwaseFundHandler.wait();
      console.log("relwaseFundHandler-1111", relwaseFundHandler?.hash);
      releseFundHandler(
        relwaseFundHandler?.hash,
        milestoneDetailsDescription?.walletAddress,
        account
      );
      getmilestoneList(
        contractId?.contractId?._id
          ? contractId?.contractId?._id
          : contractId._id
      );
      HandleMileStoneDetail(
        contractId?.contractId?._id
          ? contractId?.contractId?._id
          : contractId._id
      );
      setFundLoading(false);
    } catch (error) {
      console.log(error, "error");
      setFundLoading(false);
    }
  };

  const releseFundHandler = async (txnHash, toAddress, fromAddress) => {
    try {
      setFundLoading(true);

      const res = await axios({
        method: "POST",
        url: ApiConfig.releaseFundOnParticularMilestoneByClient,
        headers: {
          token: localStorage.getItem("creatturAccessToken"),
        },
        data: {
          walletAddress: milestoneDetailsDescription?.walletAddress,
          blockchainTransactionHash: txnHash,
          milestoneId: milestone_id,
          _id: obj?._id,
          toAddress: toAddress,
          fromAddress: fromAddress,
        },
      });
      if (res) {
        toast.success("Escrow amount has been released successfully.");
        setFundLoading(false);
      }
      setFundLoading(false);
    } catch (error) {
      console.log(error, "error");
      setFundLoading(false);
    }
  };

  const amountHAndler = async () => {
    setIsLoadingAmount(true);

    try {
      const web3 = await getWeb3Obj();

      const contract = getContract(abrarContract, abrarAbi, library, account);
      const convertUSDtoBNBFun = await contract.getMilestoneETHAmount(
        parseInt(contractData?.contracts?.blockchainContractId),
        indexId
      );
      setIsLoadingAmount(false);
      setAmount(
        Number(web3.utils.fromWei(convertUSDtoBNBFun?.toString()))?.toFixed(2)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    amountHAndler();
  }, []);
  const [isClosingContract, setIsClosingContract] = useState(false);
  const closeContractBlockChainHandler = async () => {
    try {
      setIsClosingContract(true);
      const contract = getContract(abrarContract, abrarAbi, library, account);

      const endOfContractFun = await contract.endOfContract(
        parseInt(contractId?.contractId?.blockchainContractId),
        contractId?.contractId?._id?.toString()
      );
      await endOfContractFun.wait();
      completeContractHandler(contractId?.contractId?._id);
    } catch (error) {
      console.log("error", error);
      setIsClosingContract(false);
      toast.error(error.data.message);
    }
  };

  const completeContractHandler = async (id) => {
    try {
      const res = await axios({
        method: "PUT",
        url: ApiConfig.contractFinalizeByClient,
        headers: {
          token: accessToken,
        },
        params: {
          _id: id,
        },
      });
      if (res.data.response_code === 200) {
        toast.success("Contract has been closed successfully");
        setIsClosingContract(false);
        history.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setIsClosingContract(false);
    }
  };

  const milestoneFundReleaseStatus =
    contractData?.contractId?.milestones?.filter((data) => {
      return data?.milestoneFundReleaseStatus === "RELEASED";
    });
  console.log("milestoneFundReleaseStatus--", milestoneFundReleaseStatus);

  const milestoneStatus = contractData?.contracts?.milestones?.filter(
    (data) => {
      return data?.milestoneFundReleaseStatus === "PENDING";
    }
  );

  console.log("milestoneStatus---", milestoneStatus);

  return (
    <>
      {loaderdata ? (
        <>
          <ButtonCircularProgress />
        </>
      ) : (
        <></>
      )}
      <>
        <Typography variant="h6" style={{ fontSize: "16px" }}>
          {/* Milestone 1 */}
        </Typography>
        <Typography variant="h6" style={{ fontSize: "16px" }}>
          Description :
        </Typography>
        <Typography
          variant="body2"
          style={{
            fontSize: "14px",
            marginBottom: "10px",
            wordBreak: "break-word",
          }}
        >
          {milestoneDetailsDescription?.description
            ? milestoneDetailsDescription?.description
            : contractData?.description
              ? contractData?.description
              : data?.description}
        </Typography>
        {amountVAlueLoading ? (
          <ButtonCircularProgress />
        ) : (
          <>
            {amountVAlue === true && (
              <Box>
                <Typography>
                  Escrow Amount : {escrowAmount ? escrowAmount : amountValue}{" "}
                  ETH
                </Typography>
              </Box>
            )}
          </>
        )}

        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography>Start Date:</Typography>
            <Box>
              <Typography
                variant="body2"
                style={{ fontSize: "14px", marginBottom: "10px" }}
              >
                {moment(
                  milestoneDetailsDescription.startDate
                    ? milestoneDetailsDescription.startDate
                    : contractData?.contracts?.contractId?.startDate
                ).format("YYYY-MM-DD")}

                <CalendarTodayOutlined
                  style={{
                    fontSize: "14",
                    color: "#C54C82",
                    marginLeft: "5px",
                    marginTop: "3px",
                  }}
                />
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="h6" style={{ fontSize: "16px" }}>
              Due Date:
            </Typography>
            <Box className={classes.alignCenter} mb={2}>
              <Box>
                <Typography
                  variant="body2"
                  style={{ fontSize: "14px", marginBottom: "10px" }}
                >
                  {moment(milestoneDetailsDescription.dueDate).format(
                    "YYYY-MM-DD"
                  )}

                  <CalendarTodayOutlined
                    style={{
                      fontSize: "14",
                      color: "#C54C82",
                      marginLeft: "5px",
                      marginTop: "3px",
                    }}
                  />
                </Typography>
              </Box>
              <Box flexGrow={1}></Box>
              <Box id="userCompany"></Box>
            </Box>
          </Box>
        </Box>
      </>
      {/* done */}

      {userType === "COMPANY" && (

        <>

          {obj?.status === "COMPLETED" && (

            <Typography
              variant="h4"
              style={{


              }}
            >
              <span
                style={{
                  display: "flex",
                  color: "green",
                }}
              >
                Contract Completed.
              </span>
            </Typography>


          )}


        </>




      )}

      <Box pb={2}>
        {viewMilestone &&
          viewMilestone?.milestones[0].isDisputeRequest === true ? (
          <>
            {userType === "COMPANY" && (
              <Typography style={{ color: "red" }}>Disputed</Typography>
            )}
          </>
        ) : (
          <>
            {milestoneDetailsDescription?.mileStoneStatus === "COMPLETE" ? (
              <>
                {userType === "COMPANY" &&
                  viewMilestone &&
                  viewMilestone?.milestones &&
                  viewMilestone?.milestones[0]?.isDisputeRequest === false &&
                  "Milestone Completed"}
              </>
            ) : (
              <>
                {userType === "COMPANY" &&
                  milestoneDetailsDescription?._id &&
                  !amountVAlue ? (
                  ""
                ) : (
                  <>
                    {userType === "COMPANY" && (
                      <>
                        {milestoneDetailsDescription?.mileStoneStatus ===
                          "INPROGRESS" && (
                            <>
                              <Box mt={2}>
                                <Typography
                                  variant="h6"
                                  style={{ fontSize: "16px" }}
                                >
                                  Complete Milestone :
                                </Typography>

                                {isDispalyedMileStone && (
                                  <>
                                    <Box
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                      mt={2}
                                    >
                                      <Box>
                                        <Typography variant="body1">
                                          Are you sure, you have completed
                                          {` ${milestoneDetailsDescription?.milestone}`}{" "}
                                          ?
                                        </Typography>
                                      </Box>
                                      <Box>
                                        <div>
                                          &nbsp;
                                          <Typography paragraph variant="h4">
                                            Comment
                                          </Typography>
                                          <TextField
                                            fullWidth
                                            style={{
                                              borderRadius: "1px solid white",
                                              marginBottom: "1.5%",
                                              marginTop: "1.5%",
                                              border: "1px solid #e9e1e1",
                                              borderRadius: "10px",
                                              background: "#fff4f0",
                                            }}
                                            variant="outlined"
                                            id="standard-textarea"
                                            placeholder="Write your comment here...."
                                            multiline
                                            name="lastName"
                                            size="small"
                                            height="100px"
                                            floatingLabelText="MultiLine and FloatingLabel"
                                            multiLine={true}
                                            rows={4}
                                            value={commentBox}
                                            disabled={loader1}
                                            onChange={(e) =>
                                              setComment(e.target.value)
                                            }
                                          />
                                          &nbsp;
                                        </div>
                                        <Box>
                                          <Typography paragraph variant="h4">
                                            Wallet Address
                                          </Typography>
                                          <TextField
                                            style={{
                                              borderRadius: "1px solid white",
                                              marginBottom: "1.5%",
                                              marginTop: "1.5%",
                                              border: "1px solid #e9e1e1",
                                              borderRadius: "10px",
                                              background: "#fff4f0",
                                            }}
                                            value={wallet}
                                            disabled={loader1}
                                            placeholder="Enter your wallet address to receive your amount"
                                            variant="outlined"
                                            fullWidth
                                            onChange={(e) =>
                                              setWallet(e.target.value)
                                            }
                                          />
                                        </Box>
                                        <Box>
                                          <DropzoneArea
                                            className={classes.dropzone}
                                            disabled={loader1}
                                            maxFileSize="40000000"
                                            filesLimit="5"
                                            style={{
                                              marginTop: "-78px",
                                              marginLeft: "20px",
                                              background: "#fff4f0",
                                            }}
                                            acceptedFiles={[
                                              "image/*,application/pdf,.doc,.docx",
                                            ]}
                                            onDrop={(files) =>
                                              getBase64(files[0], (result) => {
                                                setImage(result);
                                              })
                                            }
                                            dropzoneText="Add Thumbnail Here"
                                          />
                                        </Box>
                                        <Box mt={1}>
                                          <FormControl fullWidth>
                                            <Typography>
                                              <strong>Submission Date :</strong>
                                            </Typography>
                                            <KeyboardDatePicker
                                              placeholder="YYYY-MM-DD"
                                              value={fieldValue}
                                              onChange={(date) => {
                                                setFieldValue(date);
                                              }}
                                              format="YYYY-MM-DD"
                                              inputVariant="outlined"
                                              margin="dense"
                                              minDate={new Date()}
                                              maxDate={new Date()}
                                            />
                                          </FormControl>
                                        </Box>
                                      </Box>
                                      <Box flexGrow={1}></Box>
                                      <Box pt={2} pb={2}>
                                        <Button
                                          disabled={commentBox === "" || loader1}
                                          variant="contained"
                                          color="primary"
                                          size="small"
                                          style={{
                                            borderRadius: 90,
                                            fontSize: 14,
                                          }}
                                          onClick={() => {
                                            if (!account) {
                                              setUpdateMinSatkeOpen(true);
                                            } else {
                                              submitWorkHandler();
                                            }
                                          }}
                                        >
                                          Yes
                                          {loader1 && <ButtonCircularProgress />}
                                        </Button>
                                      </Box>
                                    </Box>
                                  </>
                                )}
                                {milestoneDetailsDescription?.mileStoneStatus ===
                                  "COMPLETE" && (
                                    <Box
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                      mt={2}
                                    >
                                      <Box pt={2}>
                                        <Typography variant="body1">
                                          You have Successfully completed
                                          {` ${milestoneDetailsDescription?.milestone}`}{" "}
                                          .
                                        </Typography>
                                      </Box>
                                    </Box>
                                  )}
                              </Box>
                            </>
                          )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}

        <Box mt={3}>
          {data?.contractId?.userContractStatus === "REJECT" &&
            data?.contractId?.userContractStatus === "APPROVED" ? (
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue="top"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio size="small" color="primary" />}
                  label="Yes, Complete"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio size="small" color="primary" />}
                  label="No, Sure"
                />
              </RadioGroup>
            </FormControl>
          ) : (
            <></>
          )}
        </Box>
        <Box mt={3}>
          {userType === "FREELANCER" && (
            <Typography variant="h6" style={{ fontSize: "16px" }}>
              Contract Invitation :{" "}
              {data?.userContractStatus === "APPROVED" && "Activated"}
            </Typography>
          )}
          <Box mt={1} ml={6}></Box>
        </Box>

        {data?._id && (
          <>
            {userType === "FREELANCER" && (
              <>
                {userType !== "COMPANY" &&
                  data?.userContractStatus !== "APPROVED" &&
                  data?.userContractStatus !== "REJECT" &&
                  value22 !== true &&
                  value12 !== true ? (
                  <Box className={classes.confirmationBox} mt={2}>
                    <Box pl={2} pt={3}>
                      <Typography variant="body1">
                        Do you want to Accept the Invitation ?
                      </Typography>
                    </Box>

                    <Box pb={2} display="flex" mt={2}>
                      <Button
                        variant="outlined"
                        disabled={loader || loader1}
                        size="small"
                        style={{
                          marginLeft: 26,
                          backgroundColor: "#f69371",
                          color: "white",
                          borderRadius: "20px",
                        }}
                        onClick={() => {
                          if (!account) {
                            setUpdateMinSatkeOpen(true);
                          } else {
                            setRejectOpen(true);
                          }
                        }}
                      >
                        No
                      </Button>
                      {rejectOpen && (
                        <RejectModal
                          rejectOpen={rejectOpen}
                          setRejectOpen={setRejectOpen}
                          approve={approve}
                          loader1={loader1}
                          setReasonData={setReasonData}
                        />
                      )}
                      <Button
                        onClick={() => {
                          if (!account) {
                            setUpdateMinSatkeOpen(true);
                          } else {
                            approve(true);
                          }
                        }}
                        variant="contained"
                        disabled={loader || loader1}
                        size="small"
                        style={{
                          marginLeft: 26,
                          backgroundColor: "#39b54a",
                          color: "white",
                          borderRadius: "20px",
                        }}
                      >
                        Yes
                        {loader && (
                          <ButtonCircularProgress style={{ color: "red" }} />
                        )}
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  ""
                )}
                {!account ? (
                  <Typography style={{ color: "red" }}>
                    Please connect your wallet
                  </Typography>
                ) : (
                  <>
                    {data?.userContractStatus !== "APPROVED" &&
                      value12 !== true ? (
                      ""
                    ) : (
                      <>
                        <Box className={classes.confirmationBox} mt={2}>
                          <Box display="flex" mt={2} mb={2}>
                            {viewMilestone &&
                              viewMilestone?.milestones[0].isDisputeRequest ===
                              true ? (
                              <></>
                            ) : (
                              <>
                                {milestoneDetailsDescription?.mileStoneStatus ===
                                  "COMPLETE" ? (
                                  <Typography
                                    variant="h4"
                                    style={{
                                      marginLeft: 20,
                                      marginRight: 20,
                                      padding: "10px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        display: "flex",
                                        color: "green",
                                      }}
                                    >
                                      Milestone Completed.
                                    </span>
                                  </Typography>
                                ) : (

                                  <>
                                    {obj?.status === "COMPLETED" ? (
                                      <Typography
                                        variant="h4"
                                        style={{
                                          marginLeft: 20,
                                          marginRight: 20,
                                          padding: "10px",
                                        }}
                                      >
                                        <span
                                          style={{
                                            display: "flex",
                                            color: "green",
                                          }}
                                        >
                                          Contract Completed.
                                        </span>
                                      </Typography>

                                    ) : (
                                      <Typography
                                        variant="h4"
                                        style={{
                                          marginLeft: 20,
                                          marginRight: 20,
                                          padding: "10px",
                                        }}
                                      >
                                        <span
                                          style={{
                                            display: "flex",
                                            color: "green",
                                          }}
                                        >
                                          Proposed has been accepted.
                                        </span>
                                      </Typography>

                                    )}


                                  </>

                                )}
                              </>
                            )}
                          </Box>

                          {fundTrue ? (
                            <>
                              <Box mb={2} className={classes.approve}>
                                <Typography variant="h6">
                                  You have approve the Milestone Completion.
                                </Typography>

                                {isContractCompleted && (
                                  <Box textAlign="center" mt={2}>
                                    <Button
                                      variant="outlined"
                                      onClick={closeContractBlockChainHandler}
                                      disabled={isClosingContract}
                                    >
                                      Close Contract{" "}
                                      {isClosingContract && (
                                        <ButtonCircularProgress />
                                      )}
                                    </Button>
                                  </Box>
                                )}
                              </Box>
                            </>
                          ) : (
                            <>
                              {amountVAlueLoading ? (
                                <ButtonCircularProgress />
                              ) : (
                                <>
                                  {viewMilestone?._id ? (
                                    <>
                                      {amountVAlue === true ? (
                                        <Box>
                                          <Button
                                            vaiant="contained"
                                            style={{ color: "green" }}
                                          >
                                            Funded
                                          </Button>
                                        </Box>
                                      ) : (
                                        <Box mb={3}>
                                          <Button
                                            onClick={() => {
                                              if (!account) {
                                                setUpdateMinSatkeOpen(true);
                                              } else {
                                                depostAmout(data);
                                              }
                                            }}
                                            variant="outlined"
                                          >
                                            Deposit Fund
                                          </Button>
                                        </Box>
                                      )}
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </>
                              )}

                              {milestoneDetailsDescription?.mileStoneStatus &&
                                milestoneDetailsDescription?.mileStoneStatus ===
                                "COMPLETE" && (
                                  <>
                                    {viewMilestone &&
                                      viewMilestone?.milestones[0]
                                        .isDisputeRequest === true ? (
                                      <Box>
                                        <Typography style={{ color: "red" }}>
                                          Disputed
                                        </Typography>
                                      </Box>
                                    ) : (
                                      <Button
                                        onClick={() => {
                                          if (!account) {
                                            setUpdateMinSatkeOpen(true);
                                          } else {
                                            disputeFile(
                                              milestoneDetailsDescription
                                            );
                                          }
                                        }}
                                        variant="outlined"
                                        color="primary"
                                        disabled={fundLoading}
                                        style={{
                                          padding: "8px 20px",
                                          fontSize: "0.675rem",
                                        }}
                                      >
                                        Dispute File
                                      </Button>
                                    )}

                                    <Box mb={2} mt={1}>
                                      <Button
                                        disabled={fundLoading}
                                        onClick={() => {
                                          if (!account) {
                                            setUpdateMinSatkeOpen(true);
                                          } else {
                                            resleaseFund(true);
                                          }
                                        }}
                                        style={{ fontSize: "0.675rem" }}
                                        variant="outlined"
                                        color="primary"
                                      >
                                        Release Fund{" "}
                                        {fundLoading && (
                                          <ButtonCircularProgress />
                                        )}
                                      </Button>
                                    </Box>
                                  </>
                                )}
                            </>
                          )}

                          {openDeposite && (
                            <DepositeFundModal
                              openDeposite={openDeposite}
                              contracts_id={contracts_id}
                              setDeposite={(data) => setDeposite(data)}
                              workData={workData}
                              getmilestoneList={getmilestoneList}
                              setValue12={setValue12}
                              milestoneDetailsDescription={
                                milestoneDetailsDescription
                              }
                              getBalance={getBalance}
                              amountHAndler1={amountHAndler}
                              contractData={contractData}
                            />
                          )}
                          {dispute && (
                            <DisputeModal
                              openDeposite={dispute}
                              setDeposite={(data) => setDispute(data)}
                              workData={workData}
                              contracts_id={contracts_id}
                              milestoneDetailsDescription={
                                milestoneDetailsDescription
                              }
                              contractId={contractId}
                              getmilestoneList={getmilestoneList}
                              listMildStone={listMildStone}
                              companyHandler={companyHandler}
                              HandleMileStoneDetail={HandleMileStoneDetail}
                              milestone_id={milestone_id}
                            />
                          )}
                        </Box>
                      </>
                    )}
                  </>
                )}

                {data?.userContractStatus === "REJECT" && value22 !== true ? (
                  <>
                    <Box className={classes.confirmationBox} mt={2}>
                      <Box></Box>
                      <Box display="flex" mt={2} mb={2}>
                        <Typography
                          variant="h4"
                          style={{
                            marginLeft: 26,
                            marginRight: 26,
                            color: "#dc0f0f",
                          }}
                        >
                          <span>You have Rejected the Invitation</span>
                        </Typography>
                      </Box>
                    </Box>
                  </>
                ) : (
                  ""
                )}
              </>
            )}
          </>
        )}

        { }

        {data?.isShareWithUser === false ? (
          ""
        ) : (
          <>
            {userType === "COMPANY" && milestoneDetailsDescription?._id && (
              <>
                {!account ? (
                  "Please Connect your wallet"
                ) : (
                  <>
                    {milestoneDetailsDescription?.mileStoneStatus ===
                      "COMPLETE" ? (
                      <>
                        {amountVAlueLoading ? (
                          <ButtonCircularProgress />
                        ) : (
                          <>
                            {viewMilestone &&
                              viewMilestone?.milestones[0]?.mileStoneStatus ===
                              "COMPLETE" && (
                                <Box mb={1}>
                                  <Typography style={{ fontSize: "14px" }}>
                                    {" "}
                                    Work Submitted
                                  </Typography>
                                </Box>
                              )}

                            {milestoneFundReleaseStatus.map((data) => {
                              return (
                                <>
                                  {viewMilestone &&
                                    viewMilestone?.milestones[0]
                                      ?.milestoneFundReleaseStatus ===
                                    "RELEASED" ? (
                                    <Typography
                                      style={{
                                        color: "green",
                                        fontWeight: 400,
                                      }}
                                    >
                                      Escrow Amount Released
                                    </Typography>
                                  ) : (
                                    <>
                                      {amountVAlue === true ? (
                                        <Box mb={1}>
                                          <Typography
                                            style={{ fontSize: "14px" }}
                                          >
                                            Fund Deposited
                                          </Typography>
                                        </Box>
                                      ) : (
                                        <Button
                                          style={{ fontSize: "14px" }}
                                          variant="contained"
                                          color="primary"
                                        >
                                          Fund Pending
                                        </Button>
                                      )}
                                    </>
                                  )}
                                </>
                              );
                            })}
                          </>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                    &nbsp;
                    {viewMilestone &&
                      viewMilestone?.milestones[0]?.isDisputeRequest ===
                      false && (
                        <>
                          {userType === "COMPANY" && (
                            <>
                              <>
                                {viewMilestone?.milestones[0]
                                  ?.milestoneFundReleaseStatus ===
                                  "PENDING" && (
                                    <>
                                      {milestoneDetailsDescription?.mileStoneStatus ===
                                        "COMPLETE" && (
                                          <Button
                                            style={{ fontSize: "14px" }}
                                            variant="contained"
                                            color="primary"
                                            onClick={() =>
                                              disputedFileCom(
                                                milestoneDetailsDescription
                                              )
                                            }
                                          >
                                            Dispute File
                                          </Button>
                                        )}
                                    </>
                                  )}
                              </>
                            </>
                          )}
                          {disputedFile && (
                            <DisputeModal
                              openDeposite={disputedFile}
                              setDeposite={(data) => setDisputedFile(data)}
                              workData={workData}
                              contracts_id={contracts_id}
                              milestoneDetailsDescription={
                                milestoneDetailsDescription
                              }
                              contractId={contractId}
                              getmilestoneList={getmilestoneList}
                              listMildStone={listMildStone}
                              companyHandler={companyHandler}
                              HandleMileStoneDetail={HandleMileStoneDetail}
                              milestone_id={milestone_id}
                            />
                          )}
                        </>
                      )}
                  </>
                )}
              </>
            )}
          </>
        )}

        {workOpen && (
          <SubmitForWorkModal
            workOpen={workOpen}
            setWorkOpen={(data) => setWorkOpen(data)}
            workData={milestoneDetailsDescription}
          />
        )}
        {validatorContractStatus === "REJECT" && value22 !== true ? (
          <>
            <Box className={classes.confirmationBox} mt={2}>
              <Box>
                {/* <Typography variant="h4">Do you Approve Contract?</Typography> */}
              </Box>

              <Box display="flex" mt={2} mb={2}>
                <Typography
                  variant="h4"
                  style={{
                    marginLeft: 26,
                    marginRight: 26,
                    color: "#dc0f0f",
                  }}
                >
                  <span>You have Rejected this {milestoneName} </span>
                </Typography>
              </Box>
            </Box>
          </>
        ) : (
          ""
        )}
        {validatorContractStatus && (
          <>
            {validatorContractStatus === "PENDING" && (
              <>
                {userType === "VALIDATOR" ? (
                  <>
                    <Box mt={2}>
                      <Typography paragraph variant="h4">
                        Complete Milestone Request :
                      </Typography>
                    </Box>
                    <Box className={classes.confirmationBox} mt={2}>
                      <Box pl={2} pt={3} pr={2}>
                        <Typography variant="body1">
                          Do you want to accept this {milestoneName} ?
                        </Typography>
                      </Box>

                      <Box pb={2} display="flex" mt={2}>
                        <Button
                          variant="outlined"
                          size="small"
                          style={{
                            marginLeft: 26,
                            backgroundColor: "#f69371",
                            color: "white",
                            borderRadius: "20px",
                          }}
                          onClick={() => setOpen1(true)}
                        >
                          Reject
                        </Button>
                        <Button
                          disabled={loader1 || loader}
                          size="small"
                          onClick={approveValidator}
                          variant="contained"
                          style={{
                            marginLeft: 26,
                            backgroundColor: "#39b54a",
                            color: "white",
                            borderRadius: "20px",
                          }}
                        >
                          Accept
                          {loader && (
                            <ButtonCircularProgress style={{ color: "red" }} />
                          )}
                        </Button>
                      </Box>
                    </Box>
                  </>
                ) : (
                  ""
                )}
              </>
            )}
          </>
        )}
        {userType === "VALIDATOR" && (
          <>
            {validatorContractStatus === "APPROVED" && value22 !== true ? (
              <>
                <Box className={classes.confirmationBox} mt={2}>
                  <Box></Box>
                  <Box display="flex" mt={2} mb={2}>
                    <Typography
                      variant="h4"
                      style={{
                        marginLeft: 26,
                        marginRight: 26,
                        color: "#dc0f0f",
                      }}
                    >
                      {" "}
                      <span style={{ display: "flex", color: "green" }}>
                        {" "}
                        You have Approved this {milestoneName}
                      </span>
                    </Typography>
                  </Box>
                </Box>
              </>
            ) : (
              ""
            )}
          </>
        )}
      </Box>

      {updateMinSatkeOpen && (
        <Dialog
          open={updateMinSatkeOpen}
          onClose={() => {
            setUpdateMinSatkeOpen(false);
          }}
          maxWidth="sm"
        >
          <DialogContent>
            <ConnectWallet
              onClose={() => {
                setUpdateMinSatkeOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      )}

      <Dialog
        open={open1}
        fullWidth
        maxWidth="xs"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box>
              <Typography
                variant="h5"
                style={{
                  color: "#52565c",
                  marginBottom: "10px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Add Your commect for reject milestone{" "}
              </Typography>
              <Typography variant="body2" style={{ color: "#52565c" }}>
                <TextField
                  fullWidth
                  style={{
                    borderRadius: "1px solid white",
                    marginBottom: "1.5%",
                    marginTop: "1.5%",
                    borderRadius: "10px",
                    background: "#fff4f0",
                  }}
                  variant="outlined"
                  id="standard-textarea"
                  placeholder="Write your comment here...."
                  multiline
                  name="lastName"
                  size="small"
                  height="100px"
                  floatingLabelText="MultiLine and FloatingLabel"
                  multiLine={true}
                  rows={4}
                  value={commentBox1}
                  onChange={(e) => setComment1(e.target.value)}
                />
              </Typography>
            </Box>
            <Typography
              style={{ color: "green" }}
              variant="body1"
              align="center"
            ></Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box pr={2}>
            <Button
              onClick={() => setOpen1(false)}
              color="primary"
              disabled={commentBox1 === ""}
              onClick={rejectValidator}
            >
              Submit {loader1 && <ButtonCircularProgress />}
            </Button>
            <Button
              onClick={() => setOpen1(false)}
              color="primary"
              style={{ color: "#4b4465" }}
            >
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}

export function ActivityFeed() {
  const classes = useStyles();

  return (
    <Box display="flex" mt={2}>
      <Box>
        <Avatar className={`${classes.small} ${classes.skyColor}`}>OP</Avatar>
      </Box>
      <Box display="flex" alignItems="center" ml={2}>
        <Typography variant="body2" style={{ color: "#3e3e3e" }}>
          Lorem ipsum is placeholder text commonly used in the graphic.
        </Typography>
      </Box>
    </Box>
  );
}
