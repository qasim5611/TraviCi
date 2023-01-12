import { Typography, Box, Link, Divider, Tooltip } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Page from "src/component/Page";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Link as RouterLink, useHistory } from "react-router-dom";
import TaskDue from "src/component/TaskDue";
import Favorites from "src/component/Favorites";
import ApiConfig from "src/Config/APIconfig";
import axios from "axios";
import Footer from "../../../layouts/DashboardLayout/TopBar/Footer";
import CompletedContract from "src/component/CompletedContrac";
import ActiveContract from "src/component/ActiveContract";

export default function (props) {
  const accessToken = window.localStorage.getItem("creatturAccessToken");
  const userType = window.localStorage.getItem("userType");
  const [contracts, setContracts] = useState([]);
  const [contractCount, setContractCount] = useState(contracts.length);
  const [completedcontractCount, setCompletedContractCount] = useState(contractCount.length);

  const history = useHistory();
  const [completedContract, setCompletedContract] = useState([]);


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
        setContracts(response?.data?.result?.reverse());
        setContractCount(response.data.result.length);
        console.log("response.data.result", response.data.result);
        window.localStorage.setItem("contractIddata", response.data.result);
      }
    } catch (err) {
      console.error(err.response);
      //  setIsLoading(false);
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
        setContracts(response.data.result.reverse());
        setContractCount(response.data.result.length);
        console.log("response.data.result", response.data.result);
        window.localStorage.setItem("contractIddata", response.data.result);
      }
    } catch (err) {
      console.error(err.response);
      //  setIsLoading(false);
    }
  };


  useEffect(() => {
    if (userType === "VALIDATOR") {
      ListValidatorContract();

    } else {
      listContract();

    }
    listCompletedContract()
    listActiveContract()
  }, [contractCount]);

  const listContract12 = async () => {
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
        if (response.data.response_code !== 200) {
        } else {
          if (response.data.result[0].status !== "ACTIVE") {
            setTimeout(function () {
              history.push({
                pathname: "/pricing",
              });
            }, 4000);
          }
        }
      })
      .catch((response) => {
        console.log("response", response);
      });
  };

  return (
    <Page title="Dashboard">
      <Box mb={5}>
        <Typography variant="h3" style={{ marginBottom: "8px" }}>
          <strong>Home</strong>
        </Typography>
        <Divider />
      </Box>

      <Box>
        <Box display="flex" mb={3}>
          <Typography variant="h6" >
            Task Due Soon
          </Typography>
          <Box ml={1}>
            <Tooltip
              describeChild
              title="Pending task"
              placement="top"
            >
              <InfoOutlinedIcon />
            </Tooltip>
            {/* <InfoOutlinedIcon title="Pending task" style={{ fontSize: "22px" }} /> */}
          </Box>
        </Box>
        <TaskDue contracts={contracts} />
      </Box>

      <Box mt={3}>
        <Box pb={2} pt={2} display="flex">
          <Typography variant="h3" >
            Recent Contracts
          </Typography>
        </Box>
        {contracts.length === 0 && (
          <div className="nodata">
            <Typography variant="body2">No contracts yet</Typography>
            <img src="images/noData.png" alt="No-Data-Found" />
          </div>
        )}
        <Favorites
          isAdd={true}
          contracts={contracts}
          allDataMyContract={false}
          setContractCount={setContractCount}
          contractCount={contractCount}
          _id={contracts._id}
          listContract={listContract}
        />
      </Box>
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
        {activeContract.length === 0 && (
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
    </Page>
  );
}
