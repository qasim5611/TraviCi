import {
  Box,
  Button,
  Dialog,
  DialogContent,
  TextField,
  Typography,
  FormControl,
  makeStyles,
  FormHelperText,
} from "@material-ui/core";

import React, { useState, useContext, useEffect } from "react";
import { Cancel } from "@material-ui/icons";
import Checkbox from "@material-ui/core/Checkbox";
import { getContract } from "src/utils";
import { abrarContract } from "src/constants";
import abrarAbi from "src/constants/ABI/abrar.json";
import { useWeb3React } from "@web3-react/core";
import Axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { AuthContext } from "src/context/Auth";
import { DropzoneArea } from "material-ui-dropzone";
import { UserContext } from "src/context/User";
import moment from "moment";
import ResponseData from "./ResponseData";

const useStyles = makeStyles((theme) => ({
  checkbox: {
    "&.MuiCheckbox-root": {
      padding: "9px 9px 9px 0px !important",
    },
  },
}));

export default function DisputeModal({
  openDeposite,
  setDeposite,
  workData,
  milestoneDetailsDescription,
  contracts_id,
  contractId,
  requestedData,
  type,
  loading,
  disputeHandler,
  mileid,
}) {
  console.log("contractId----", requestedData);

  const classes = useStyles();
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);

  const indexId = milestoneDetailsDescription?.milestoneIndex;

  console.log("viewData----", milestoneDetailsDescription);

  const { account, chainId, library } = useWeb3React();
  const [fileUpload, setFileUpload] = React.useState("");
  const [checked, setChecked] = React.useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = React.useState("");
  const [viewData, setViewData] = React.useState({});
  const [viewDataList, setViewDataList] = React.useState([]);
  const [tabview, setTabview] = useState("company");

  const [submit, setSubmit] = useState(false);
  const clr = (data) => {
    setImage("");
  };

  const [formData, setFormData] = useState({
    text: viewData?.text ? viewData?.text : "",
    walletAddress: viewData?.walletAddress ? viewData?.walletAddress : "",
    amount: "",
  });
  const filterData = requestedData?.contractId?.milestones.filter((data, i) => {
    return data?.isDisputeRequest === true;
  });
  console.log("filterData----", filterData && filterData);

  useEffect(() => {
    if (viewData) {
      setFormData({
        text: viewData?.text ? viewData?.text : "",
        walletAddress: viewData?.walletAddress ? viewData?.walletAddress : "",
      });
      setImage(viewData?.documentUrl ? viewData?.documentUrl : "");
    }
  }, [viewData]);

  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formData, [name]: value };
    setFormData(temp);
  };
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

  const clear = () => {
    setFileUpload("");
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const disputeresolveFileHandler = async () => {
    const contract = getContract(abrarContract, abrarAbi, library, account);
    const ownerOfAddress = await contract.owner();

    if (ownerOfAddress?.toLowerCase() === account?.toLowerCase()) {
      try {
        setIsLoading(true);

        const raiseDisputeHandler = await contract.disputeResolve(
          parseInt(requestedData?.contractId?.blockchainContractId),
          viewData?.milestoneIndex,

          parseInt(filterData && filterData[0]?.amount),
          viewData?.walletAddress
        );
        await raiseDisputeHandler.wait();
        resolveDisputeHandler();
      } catch (error) {
        console.log("error", error);
        setIsLoading(false);
      }
    } else {
      toast.warn("Invalid Owner Address");
    }
  };
  const resolveDisputeHandler = async () => {
    setIsLoading(true);
    try {
      const res = await Axios({
        method: "PUT",
        url: ApiConfig.resolveDispute,
        headers: {
          token: sessionStorage.getItem("creatturAccessToken"),
        },
        params: {
          disputeId: requestedData?._id,
        },
      });
      if (res.data.response_code === 200) {
        toast.success("Dispute resolved successfully");
        setIsLoading(false);
        setDeposite(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const viewApiHandler = async (id) => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.viewDisputeList,
        params: {
          _id: id,
        },
      });
      if (res.data.response_code === 200) {
        setViewData(res.data.result);
        setViewDataList(res.data.result.disputeReply);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (requestedData?._id) {
      viewApiHandler(requestedData?._id);
    }
  }, [requestedData?._id]);
  return (
    <>
      {loading ? (
        <ButtonCircularProgress />
      ) : (
        <Dialog
          open={openDeposite}
          onClose={() => {
            if (!isLoading) {
              setDeposite(false);
            }
          }}
          fullWidth
          maxWidth="lg"
        >
          <DialogContent>
            <Box>
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography style={{ fontWeight: 400, paddingBottom: "5px" }}>
                  Contract Name : {requestedData?.contractId?.contractName}
                </Typography>
                <Typography>
                  Status :{" "}
                  {requestedData?.disputeStatus === "REQUESTED"
                    ? "INPROGRESS"
                    : "SOLVED"}
                </Typography>
              </Box>

              <Typography style={{ fontWeight: 400, paddingBottom: "5px" }}>
                Milestone Name : {filterData && filterData[0]?.taskName}
              </Typography>
              <Typography style={{ fontWeight: 400, paddingBottom: "5px" }}>
                Disputed By :{" "}
                {requestedData &&
                requestedData?.freelancerId?.userType === "FREELANCER"
                  ? "CLIENT"
                  : "COMPANY"}
              </Typography>
              <Typography style={{ fontWeight: 400, paddingBottom: "5px" }}>
                Date & Time :{" "}
                {moment(requestedData?.updatedAt).format(
                  "DD-MM-YYYY, h:mm:ss a"
                )}
              </Typography>
              {type === "view" ? (
                ""
              ) : (
                <label>USD Amount : {workData?.amount}$ </label>
              )}

              <Typography>{workData?.milestone}</Typography>
              <Box mt={1}>
                <label>Wallet Address</label>
                <TextField
                  placeholder="Enter your wallet address"
                  name="walletAddress"
                  value={formData.walletAddress}
                  variant="outlined"
                  fullWidth
                  disabled={isLoading}
                  onChange={_onInputChange}
                />
              </Box>

              <Box mt={1}>
                <label>Reason</label>
                <TextField
                  placeholder="Enter your reason"
                  name="text"
                  value={formData.text}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  onChange={_onInputChange}
                />
              </Box>
              <Box mt={1}>
                <label>Amount : $ {filterData && filterData[0]?.amount}</label>
                <TextField
                  placeholder="Enter milestone amount"
                  name="amount"
                  value={filterData && filterData[0]?.amount}
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box style={{ marginTop: "7px" }}>
                {viewData?.documentUrl ? (
                  <Box>
                    <a
                      href={viewData?.documentUrl}
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="outlined">Clcik to download file</Button>
                    </a>
                  </Box>
                ) : (
                  <>
                    <DropzoneArea
                      disabled={isLoading}
                      maxFileSize="40000000"
                      filesLimit="1"
                      style={{ marginTop: "-78px", marginLeft: "20px" }}
                      acceptedFiles={["image/*"]}
                      onDrop={(files) =>
                        getBase64(files[0], (result) => {
                          setImage(result);
                        })
                      }
                      dropzoneText="Add Thumbnail Here"
                    />
                  </>
                )}
              </Box>

              <Box mt={2}>
                <Typography
                  variant="h6"
                  style={{ display: "flex", cursor: "pointer" }}
                >
                  {fileUpload && fileUpload?.name}
                  {fileUpload && <Cancel onClick={clear} />}
                </Typography>
              </Box>

              <Box mb={1}>
                <Button
                  variant="outlined"
                  disabled={viewData?.disputeStatus === "RESOLVE" || isLoading}
                  onClick={disputeresolveFileHandler}
                >
                  Resolve {isLoading && <ButtonCircularProgress />}{" "}
                </Button>
              </Box>

              <Button onClick={() => setTabview("company")}>
                Responses from both Company and Client
              </Button>

              {tabview === "company" ? (
                <ResponseData
                  viewDataList={viewDataList}
                  viewData={viewData}
                  requestedData1={requestedData}
                  filterData={filterData}
                  disputeHandler={disputeHandler}
                  mileid={mileid}
                  loading={isLoading}
                  setDeposite={setDeposite}
                />
              ) : (
                ""
              )}
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
