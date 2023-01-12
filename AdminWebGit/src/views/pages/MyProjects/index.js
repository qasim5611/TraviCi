import { Typography, Box, Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Page from "src/component/Page";
import Favorites from "src/component/Favorites";
import ApiConfig from "../../../Config/APIconfig";
import axios from "axios";
import Footer from "../../../layouts/DashboardLayout/TopBar/Footer";
import Home from "../../../component/Home";
import CompletedContract from "src/component/CompletedContrac";
import ActiveContract from "src/component/ActiveContract";

export default function (props) {
  const accessToken = window.localStorage.getItem("creatturAccessToken");
  const userType = window.localStorage.getItem("userType");
  const [contracts, setContracts] = useState([]);
  const [stateCoin, setStateCoin] = useState({});
  const [completedContract, setCompletedContract] = useState([])

  const [completedcontractCount, setCompletedContractCount] = useState(completedContract.length);

  console.log("completedContract", completedContract);
  const [activeContract, setActiveContract] = useState([])

  const [activecontractCount, setActiveContractCount] = useState(activeContract.length);
  const listActiveContract = async () => {
    try {
      const response = await axios.get(
        ApiConfig.activeContract,
        {
          headers: {
            token: accessToken,
          },
        }
      );

      if (response.data.response_code !== 200) {
      } else if (response.data.response_code === 401) {
        alert(response.data.message);
      } else {
        setActiveContract(response.data.result);
        setActiveContractCount(response.data.result.length)
        console.log("response.data.result", response.data.result);
      }
    } catch (err) {
      console.error(err.response);
      //  setIsLoading(false);
    }
  };
  const listCompletedContract = async () => {
    try {
      const response = await axios.get(
        ApiConfig.completeContract,
        {
          headers: {
            token: accessToken,
          },
        }
      );

      if (response.data.response_code !== 200) {
      } else if (response.data.response_code === 401) {
        alert(response.data.message);
      } else {
        setCompletedContract(response.data.result);
        setCompletedContractCount(response.data.result.length)
        console.log("response.data.result", response.data.result);
      }
    } catch (err) {
      console.error(err.response);
      //  setIsLoading(false);
    }
  };
  const listContract = async () => {
    try {
      const response = await axios.get(
        userType === "COMPANY"
          ? ApiConfig.listContractForCompany
          : ApiConfig.listContract,
        {
          headers: {
            token: accessToken,
          },
        }
      );

      if (response.data.response_code !== 200) {
      } else if (response.data.response_code === 401) {
        alert(response.data.message);
      } else {
        console.log("response", response.data);
        setContracts(response.data.result);
        console.log("response.data.result", response.data.result);
        window.sessionStorage.setItem("contractIddata", response.data.result);
      }
    } catch (err) {
      console.error(err.response);
    }
  };

  const ListValidatorContract = async () => {
    try {
      const response = await axios.get(
        // userType !== "COMPANY"
        ApiConfig.listValidatorContract,
        // : ApiConfig.listContractForCompany,
        {
          headers: {
            token: accessToken,
          },
        }
      );

      if (response.data.response_code !== 200) {
      } else if (response.data.response_code === 401) {
        alert(response.data.message);
      } else {
        setContracts(response.data.result);
        // setContractCount(response.data.result.length);
        console.log("response.data.result", response.data.result);
        window.localStorage.setItem("contractIddata", response.data.result);
      }
    } catch (err) {
      console.error(err.response);
      //  setIsLoading(false);
    }
  };

  console.log("contracts", contracts);
  useEffect(() => {
    // listContract();
    if (userType !== "VALIDATOR") {
      listContract();
    } else {
      ListValidatorContract();
    }
    listCompletedContract()
    listActiveContract()
  }, []);
  const allDataMyContract = true;
  return (
    <Page title="My Projects">
      <Box mb={5}>
        <Typography variant="h3" style={{ marginBottom: "8px" }}>
          <strong> My Contracts</strong>
        </Typography>
        <Divider />
      </Box>

      <Box>
        {contracts && contracts.length > 0 ? (<Favorites contracts={contracts} listContract={listContract} />) : (
          <div className="nodata">
            <Typography variant="body2">No contracts yet</Typography>
            <img src="images/noData.png" alt="No-Data-Found" />
          </div>

        )}



        <Box mt={3}>
          <Box pb={2} pt={2} display="flex">
            <Typography variant="h3" >
              Completed Contracts
            </Typography>
          </Box>
          {completedContract.length === 0 && (
            <div className="nodata">
              <Typography variant="body2">No contracts yet</Typography>
              <img src="images/noData.png" alt="No-Data-Found" />
            </div>
          )}
          <CompletedContract
            isAdd={true}
            contracts={completedContract}
            allDataMyContract={false}
            setContractCount={setCompletedContractCount}
            contractCount={completedcontractCount}
            _id={completedContract._id}
            listContract={listCompletedContract}
          />
        </Box>
        <Box mt={3}>
          <Box pb={2} pt={2} display="flex">
            <Typography variant="h3" >
              Active Contracts
            </Typography>
          </Box>
          {completedContract.length === 0 && (
            <div className="nodata">
              <Typography variant="body2">No contracts yet</Typography>
              <img src="images/noData.png" alt="No-Data-Found" />
            </div>
          )}
          <ActiveContract
            isAdd={true}
            contracts={activeContract}
            allDataMyContract={false}
            setContractCount={setActiveContractCount}
            contractCount={activecontractCount}
            _id={activeContract._id}
            listContract={listActiveContract}
          />
        </Box>
      </Box>
    </Page>

  );
}
