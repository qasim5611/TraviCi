import {
  Box,
  Grid,
  Divider,
  CircularProgress,
  Typography,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import Page from "src/component/Page";
import ContractNameDetails from "./ContractNameDetails";
import MilestoneData from "./MilestoneData";
import MileStoneTable from "./MileStoneTable";
import MileStoneDataForRightTab from "./MileStoneDataForRightTab";
import MileStoneOtherDetailsRightTab from "./MileStoneOtherDetailsRightTab";
import axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import moment from "moment";
import { AuthContext } from "src/context/Auth";
import { SettingsSystemDaydreamTwoTone } from "@material-ui/icons";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import ContractDescriptionModal from "./ContractDescriptionModal";

const accessToken = window.localStorage.getItem("creatturAccessToken");
const userType = window.localStorage.getItem("userType");
export default function MilestoneDetails(props) {
  const auth = useContext(AuthContext);
  const [milestoneDetails, setMilestoneDetails] = useState({});
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  console.log("props---", props);
  const contractName =
    props?.location?.state?.contractName ||
    props?.location?.state?.data?.contractId?.contractName;
  const contractId =
    props?.location?.state?.contractId ||
    props?.location?.state?.data?.contractId?.contractId;
  const contracts_id = props?.location?.state?.contracts._id;
  const contractsAmount =
    props?.location?.state?.contracts?.amount ||
    props?.location?.state?.contracts?.contractId?.amount;
  const contractDetails = props?.location?.state?.contracts;
  const endDate =
    props?.location?.state?.endDate ||
    props?.location?.state?.data?.contractId?.endDate;

  const description =
    props?.location?.state?.description ||
    props?.location?.state?.data?.contractId?.description;

  const contractStatus =
    props?.location?.state?.contracts?.userContractStatus ||
    props?.location?.state?.data?.contractId?.userContractStatus;


  console.log("contractId-----", contractId);

  const contractData = props.location.state;

  const [createdAt, setcreatedAt] = useState();
  const [loaderOn, setLoaderOn] = useState(true);

  const history = useHistory();

  const listMilestoneForValidator = async () => {
    try {
      if (auth?.userData?.userType === "VALIDATOR") {
        setLoaderOn(true);
        const response = await axios.get(ApiConfig.listMilestoneForValidator, {
          headers: {
            token: localStorage.getItem("creatturAccessToken"),
          },
          params: {
            contractId: contractId?._id
              ? contractId?._id
              : contractId?.contractId?._id,
          },
        });
        if (response.data.response_code !== 200) {
          history.push("/dashboard");
          setLoaderOn(false);
          toast.warn("Contract not share yet");
        } else {
          setLoaderOn(false);
          toast.success(response.data.response_message);
          setMilestoneDetails(response.data?.result[0]);
        }
      }

    } catch (error) {
      console.log(error);

    }
  };
  const [loaderStart, setLoaderStart] = useState(false);
  const getmilestoneList = async () => {
    setLoaderStart(true);
    setLoaderOn(true);
    try {
      {
        if (auth?.userData?.userType === "FREELANCER") {
          const response = await axios.get(ApiConfig.listMilestone, {
            headers: {
              token: localStorage.getItem("creatturAccessToken"),
            },
            params: {
              contractId: contractId?._id
                ? contractId?._id
                : contractId?.contractId?._id ? contractId?.contractId?._id : contractId,
            },
          });
          if (response.data.response_code !== 200) {
            listMildStone();
            setLoaderOn(false);
            setLoaderStart(false);
          } else {
            setLoaderOn(false);
            setMilestoneDetails(response.data?.result);
            setLoaderStart(false);
          }
        } else {
          setLoaderOn(false);
        }
      }
    } catch (err) {
      setLoaderOn(false);
      console.error(err.response);
    }
  };

  const companyHandler = async () => {
    setLoaderOn(true);
    try {
      if (auth?.userData?.userType === "COMPANY") {
        const response = await axios.get(ApiConfig.listMilestoneForCompany, {
          headers: {
            token: localStorage.getItem("creatturAccessToken"),
          },
          params: {
            _id: contractId?._id
              ? contractId?._id
              : contractId?.contractId?._id
                ? contractId?.contractId?._id
                : contractId,
          },
        });
        if (response.data.response_code !== 200) {
          setLoaderOn(false);
          setLoaderStart(false);

          console.log(response.data.response_message);
        } else {
          setMilestoneDetails(response.data?.result);
          setcreatedAt(response.data?.result[0]?.createdAt);
          setLoaderStart(false);
          setLoaderOn(false);
        }
      }
    } catch (error) {
      console.log(error);
      setLoaderOn(false);
    }
  };

  useEffect(() => {
    if (auth?.userData?.userType === "COMPANY") {
      companyHandler();
    }
  }, [auth?.userData?.userType === "COMPANY"]);

  const listMildStone = async (id) => {
    const response = await axios.get(ApiConfig.listContractById, {
      headers: {
        token: localStorage.getItem("creatturAccessToken"),
      },
      params: {
        _id: id,
      },
    });
    if (response.data.response_code !== 200) {
    } else {
      setMilestoneDetails(response.data?.result);
    }
  };
  useEffect(() => {
    if (contractId?._id ? contractId?._id : contractId?.contractId?._id) {
      listMildStone(
        contractId?._id ? contractId?._id : contractId?.contractId?._id
      );
    }
  }, [contractId?._id ? contractId?._id : contractId?.contractId?._id]);

  useEffect(() => {
    if (auth?.userData?.userType === "FREELANCER") {
      getmilestoneList();
    }
  }, [auth?.userData?.userType === "FREELANCER"]);
  useEffect(() => {
    if (auth?.userData?.userType === "VALIDATOR") {
      listMilestoneForValidator();
    }
  }, [auth?.userData?.userType === "VALIDATOR"]);
  const [milestone_id, setMilestone_id] = useState("");
  const [loader, setLoader] = useState(false);
  const [viewMilestone, setViewMilestone] = useState("");
  const [isContractCompleted, setIsContractCompleted] = useState(false);
  console.log("isContractCompleted---", isContractCompleted);
  const [milestoneDetailsDescription, setMilestoneDetailsDescription] =
    React.useState("");

  const HandleMileStoneDetail = async (_id, i) => {
    setLoader(true);
    setMilestone_id(_id);
    const response = await axios.get(ApiConfig.viewMilestone, {
      headers: {
        token: accessToken,
      },
      params: {
        _id: _id,
      },
    });
    if (response.data.response_code !== 200) {
      setLoader(false);
    } else {
      setLoader(false);
      setMilestoneDetailsDescription(response.data?.result?.milestones[0]);
      window.sessionStorage.setItem(
        "milestoneDetailsDueDate",
        response.data?.result?.milestones[0]?.dueDate
      );
      window.sessionStorage.setItem(
        "milestoneDetailsDescription",
        response.data?.result?.milestones[0]?.description
      );
      setViewMilestone(response.data?.result);
      //   response.data?.result
      // );
    }
  };

  console.log("milestoneDetails-----", milestoneDetails);
  useEffect(() => {
    if (milestoneDetails) {
      console.log("without release", milestoneDetails?.milestones?.length);
      const checkToEndContract = milestoneDetails?.milestones?.filter((data) => {
        return data.milestoneFundReleaseStatus === "RELEASED"
      });

      console.log("with release", checkToEndContract?.length);
      const checkToEndContractData = checkToEndContract?.map((data) => {
        return data?.milestoneFundReleaseStatus === "RELEASED"


      })
      console.log("checkToEndContractData--", checkToEndContractData);

      if (
        milestoneDetails?.milestones?.length === checkToEndContract?.length
      ) {
        setIsContractCompleted(true);
      } else {
        setIsContractCompleted(false);
      }
    }
  }, [milestoneDetails]);

  return (
    <Page title="Milestone Details">
      {loaderOn ? (
        <Box pt={5} textAlign="center">
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Grid container spacing={2}>
            <Grid
              item
              md={8}
              lg={8}
              sm={12}
              style={{ paddingTop: 30, width: "100%" }}
            >
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography>Contract Details</Typography>
                <Box style={{ marginRight: "40px" }}>
                  <Button
                    variant="outlined"
                    onClick={() => setDescriptionOpen(true)}
                    style={{ background: "rgb(222, 213, 255)" }}
                  >
                    Contract Description
                  </Button>
                </Box>
                {descriptionOpen && (
                  <ContractDescriptionModal
                    contractData={contractData}
                    contractDetails={contractDetails}
                    descriptionOpen={descriptionOpen}
                    setDescriptionOpen={(data) => setDescriptionOpen(data)}
                  />
                )}
              </Box>
              <ContractNameDetails
                getmilestoneList={getmilestoneList}
                milestoneDetails={milestoneDetails}
                contractName={contractName}
                contractId={contractId}
                data={milestoneDetails}
                contractsAmount={contractsAmount}
                contractDetails={contractDetails}
                milestoneDetailsDescription={milestoneDetailsDescription}
                contractStatus={contractStatus}
                contractData={contractData}
                listMildStone={listMildStone}
              />
              <Divider />
              {/* <MilestoneData /> */}
              <Box style={{ width: "100%", overflow: "auto" }}>
                {milestoneDetails && (
                  <MileStoneTable
                    getmilestoneList={getmilestoneList}
                    contractDetails={contractDetails}
                    contractName={
                      contractName
                        ? contractName
                        : props?.location?.state?.contractId?.contractId
                          ?.contractName
                    }
                    milestoneDetailsDescription={milestoneDetailsDescription}
                    HandleMileStoneDetail={(id) => HandleMileStoneDetail(id)}
                    obj={milestoneDetails}
                    viewMilestone={viewMilestone}
                    contractData={contractData}
                    listMildStone={listMildStone}
                  />
                )}
              </Box>
            </Grid>
            <Grid item md={4} lg={4} sm={12} xs={12}>
              <Box
                style={{
                  backgroundColor: "#ded5ff",
                  padding: 15,
                  borderRadius: "5px",
                }}
              >
                <MileStoneOtherDetailsRightTab
                  loaderdata={loader}
                  contracts_id={contracts_id}
                  contractId={contractId}
                  createdAt={createdAt}
                  description={description}
                  obj={milestoneDetails}
                  data={milestoneDetails}
                  milestoneDetailsDescription={milestoneDetailsDescription}
                  loaderStart={loaderStart}
                  contractDetails={contractDetails}
                  milestone_id={milestone_id}
                  viewMilestone={viewMilestone}
                  getmilestoneList={getmilestoneList}
                  listMildStone={listMildStone}
                  contractData={contractData}
                  HandleMileStoneDetail={(id) => HandleMileStoneDetail(id)}
                  isContractCompleted={isContractCompleted}
                  companyHandler={companyHandler}
                  listMilestoneForValidator={listMilestoneForValidator}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Page>
  );
}
