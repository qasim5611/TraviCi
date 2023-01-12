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

const useStyles = makeStyles((theme) => ({
    checkbox: {
        "&.MuiCheckbox-root": {
            padding: "9px 9px 9px 0px !important",
        },
    },
}));

export default function ContractModal({
    openDeposite,
    setDeposite,
    workData,
    milestoneDetailsDescription,
    contracts_id,
    contractId,
    requestedData,
    type,
    loading,
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
    const [submit, setSubmit] = useState(false);
    const clr = (data) => {
        setImage("");
    };

    const [formData, setFormData] = useState({
        text: viewData?.text ? viewData?.text : "",
        walletAddress: viewData?.walletAddress ? viewData?.walletAddress : "",
    });
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

    const disputeFileHandler = async () => {
        setSubmit(true);

        if (formData.text !== "" && formData.walletAddress !== "" && image !== "") {
            try {
                setIsLoading(true);

                const contract = getContract(abrarContract, abrarAbi, library, account);
                const agrementIdFun = await contract.agrementId();
                const raiseDisputeHandler = await contract.raiseDispute(
                    parseInt(agrementIdFun.toString()) - 1,
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
                    token: sessionStorage.getItem("creatturAccessToken"),
                },
                data: {
                    contractId: contractId?._id,
                    milestoneId: workData?._id,
                    text: formData.text,
                    documentUrl: image,
                    walletAddress: formData.walletAddress,
                },
            });
            if (res.data.response_code === 200) {
                toast.success("File disputed completed");
                setIsLoading(false);
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
                                        <img src={viewData?.documentUrl} alt="" width="100%" />
                                        <Button onClick={() => clr()}>Change</Button>
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
                                        {submit && image === "" && (
                                            <FormHelperText error>Please select image</FormHelperText>
                                        )}
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

                        </Box>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
