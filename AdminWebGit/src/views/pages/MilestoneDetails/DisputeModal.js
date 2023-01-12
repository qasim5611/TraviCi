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
import Web3 from "web3";

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
  getmilestoneList,
  listMildStone,
  companyHandler,
  HandleMileStoneDetail,
  milestone_id,
}) {
  console.log("contractId----", contractId);

  const classes = useStyles();
  const auth = useContext(AuthContext);

  const indexId = milestoneDetailsDescription?.milestoneIndex;

  const { account, chainId, library } = useWeb3React();
  const [fileUpload, setFileUpload] = React.useState("");
  const [checked, setChecked] = React.useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = React.useState("");
  const [viewData, setViewData] = React.useState({});
  const [addressAmount, setAddressAmount] = useState("");
  const [submit, setSubmit] = useState(false);
  const clr = (data) => {
    setImage("");
  };

  const [formData, setFormData] = useState({
    text: viewData?.text ? viewData?.text : "",
    walletAddress: viewData?.walletAddress ? viewData?.walletAddress : account,
  });
  useEffect(() => {
    if (viewData) {
      setFormData({
        text: viewData?.text ? viewData?.text : "",
        walletAddress: viewData?.walletAddress
          ? viewData?.walletAddress
          : account,
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

  
  const disputeFileHandler = async () => {
    setSubmit(true);

    if (formData.text !== "" && formData.walletAddress !== "" && image !== "") {
      try {
        setIsLoading(true);

        const contract = getContract(abrarContract, abrarAbi, library, account);

        const raiseDisputeHandler = await contract.raiseDispute(
          parseInt(
            contractId?.contractId?.blockchainContractId
              ? contractId?.contractId?.blockchainContractId
              : contractId?.blockchainContractId
          ),
          indexId,
          auth?.userData?.userType === "FREELANCER" ? 1 : 0
        );
        await raiseDisputeHandler.wait();
        disputeApiHandler();
      } catch (error) {
        console.log("error", error);
        setIsLoading(false);
      }
    }
  };
  const disputeApiHandler = async () => {
    setIsLoading(true);

    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.dispute,
        headers: {
          token: localStorage.getItem("creatturAccessToken"),
        },
        data: {
          contractId: contractId?.contractId?._id
            ? contractId?.contractId?._id
            : contractId?._id,
          milestoneId: workData?._id,
          text: formData.text,
          documentUrl: image,
          walletAddress: formData.walletAddress,
        },
      });
      if (res.data.response_code === 200) {
        toast.success("File disputed completed");
        setIsLoading(false);
        setDeposite(false);
        // getmilestoneList();

        getmilestoneList(
          contractId?.contractId?._id
            ? contractId?.contractId?._id
            : contractId._id
        );
        listMildStone(
          contractId?._id ? contractId?._id : contractId?.contractId?._id
        );
        companyHandler(
          contractId?._id ? contractId?._id : contractId?.contractId?._id
        );
        HandleMileStoneDetail(milestone_id);
      } else {
        toast.error("Server issue");
      }
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
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

  const web3 = (window.web3 = new Web3(window.ethereum));

  const dataDisplauhandler = async () => {
    try {
      const balance = await web3.eth.getBalance(account);
      const balanceImETH = await web3.utils.fromWei(balance);
      setAddressAmount(parseFloat(balanceImETH).toFixed(2));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (account) {
      dataDisplauhandler();
    }
  }, [account]);
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
          maxWidth="sm"
        >
          <DialogContent>
            <Box>
              {type === "view" ? (
                ""
              ) : (
                <>
                  <Box
                    style={{ display: "flex", justifyContent: "space-between" }}
                    mb={1}
                  >
                    <Typography>USD Amount : ${workData?.amount} </Typography>
                    <Typography>
                      Wallet Balance :{" "}
                      {addressAmount
                        ? Number(addressAmount).toFixed(3) + " ETH"
                        : ""}{" "}
                    </Typography>
                  </Box>
                </>
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
                {submit && formData.walletAddress === "" && (
                  <FormHelperText error>
                    Please enter wallet address
                  </FormHelperText>
                )}
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
                {submit && formData.text === "" && (
                  <FormHelperText error>Please enter reason</FormHelperText>
                )}
              </Box>
              <Box style={{ marginTop: "7px" }}>
                {viewData?.documentUrl ? (
                  <Box>
                    <a
                      href={viewData?.documentUrl}
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="outlined">
                        {" "}
                        Click to download file
                      </Button>
                    </a>
                  </Box>
                ) : (
                  <>
                    <DropzoneArea
                      disabled={isLoading}
                      maxFileSize="40000000"
                      filesLimit="5"
                      style={{ marginTop: "-78px", marginLeft: "20px" }}
                      acceptedFiles={["image/*,application/pdf,.doc,.docx"]}
                      onDrop={(files) =>
                        getBase64(files[0], (result) => {
                          setImage(result);
                        })
                      }
                      dropzoneText="Add Thumbnail Here"
                    />
                    {submit && image === "" && (
                      <FormHelperText error>Please select image</FormHelperText>
                    )}
                  </>
                )}
              </Box>

              {type !== "view" && (
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <Checkbox
                    style={{ color: "#c61175fa" }}
                    className={classes.checkbox}
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  <Typography>Add Validator to show dispute</Typography>
                </Box>
              )}

              <Box mt={2}>
                <Typography
                  variant="h6"
                  style={{ display: "flex", cursor: "pointer" }}
                >
                  {fileUpload && fileUpload?.name}
                  {fileUpload && <Cancel onClick={clear} />}
                </Typography>
              </Box>
              <Box mt={1} mb={2}>
                {type !== "view" && (
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                    onClick={disputeFileHandler}
                  >
                    Dispute Now
                    {isLoading && (
                      <ButtonCircularProgress style={{ color: "white" }} />
                    )}
                  </Button>
                )}
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
