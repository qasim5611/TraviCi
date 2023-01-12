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

export default function ReplyModal({
  openDeposite,
  setDeposite,
  workData,
  milestoneDetailsDescription,
  contracts_id,
  contractId,
  requestedData,
  replyData,
  type,
  loading,
  viewReplyDistubeHandler,
  idddd,
}) {
  console.log("contractId----", requestedData);

  const classes = useStyles();
  const auth = useContext(AuthContext);

  const indexId = milestoneDetailsDescription?.milestoneIndex;

  const { account, chainId, library } = useWeb3React();
  const [fileUpload, setFileUpload] = React.useState("");
  const [checked, setChecked] = React.useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = React.useState("");
  const [viewData, setViewData] = React.useState({});
  console.log("viewData---", viewData);
  const [addressAmount, setAddressAmount] = useState("");
  const [submit, setSubmit] = useState(false);
  const clr = (data) => {
    setImage("");
  };

  const [formData, setFormData] = useState({
    text: replyData?.text ? replyData?.text : "",
    walletAddress: account ? account : "",
  });
  console.log("formData---", formData);
  useEffect(() => {
    if (viewData) {
      setFormData({
        id: viewData?._id,
        walletAddress: account ? account : "",
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

  const disputeApiHandler = async () => {
    setIsLoading(true);
    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.replyOnDispute,
        headers: {
          token: localStorage.getItem("creatturAccessToken"),
        },
        data: {
          _id: formData?.id,
          text: formData.text,
          documentUrl: image,
          walletAddress: formData.walletAddress,
        },
      });
      if (res.data.response_code === 200) {
        toast.success("Reply successfully");
        setIsLoading(false);
        setDeposite(false);
        viewReplyDistubeHandler(idddd);
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
    if (requestedData) {
      viewApiHandler(requestedData);
    }
  }, [requestedData]);

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
                  ></Box>
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
                <label>Message</label>
                <TextField
                  placeholder="Enter your message"
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
              <Box mt={1} mb={2}>
                {type !== "view" && (
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                    onClick={disputeApiHandler}
                  >
                    Submit
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
