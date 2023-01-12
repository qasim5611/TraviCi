import { Typography, Box, Grid, Container, Button, makeStyles } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import Page from "src/component/Page";
import Divider from "@material-ui/core/Divider";
import BarChartIcon from "@material-ui/icons/BarChart";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import MoneyIcon from "@material-ui/icons/Money";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import TransformIcon from "@material-ui/icons/Transform";
import axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import Card from "./card";
import { ImUsers } from "react-icons/im";
import { RiBuildingFill } from "react-icons/ri";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { useWeb3React } from "@web3-react/core";
import { UserContext } from "src/context/User";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  btnSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center'
  }
}))

// import axios from "axios";

export default function (props) {
  const classes = useStyles()
  const { account, chainId, library } = useWeb3React();
  const user = useContext(UserContext);

  console.log("user----", user);

  const [userList, setUserList] = useState("");
  const [activeUser, setActiveUser] = useState([]);
  const [blockUser, setblockUser] = useState([]);
  const accessToken = window.sessionStorage.getItem("creatturAccessToken");

  const UserLists = async () => {
    // setIsLoading(true);
    const response = await axios({
      method: "GET",
      url: ApiConfig.dashboard,
      headers: {
        token: accessToken,
      },
    })
      .then((response) => {
        if (response.data.response_code !== 200) {
        } else {
          setUserList(response.data.result);
          // setDisplayname
          // console.log(result)
          // setUsers(response.data.result.docs);
          console.log("userList", response);
          // setblockUser(response.data.result.docs);
          setblockUser(
            response.data.result.docs.filter((data) => data.status === "BLOCK")
          ); // else setHistory(depositFilter);
          setActiveUser(
            response.data.result.docs.filter((data) => data.status === "ACTIVE")
          ); // else setHistory(depositFilter);
        }
        // setIsLoading(false);
      })
      .catch((response) => {
        // setIsUpdating(false);

        console.log("response", response);
      });
  };
  useEffect(() => {
    UserLists();
  }, [1]);
  console.log("activeUser", activeUser.length);
  console.log("blockUser", blockUser);
  const cardData1 = [
    {
      title: "Total Users",
      amount: 56,
      icon: <ImUsers fontSize="large" />,
    },
    {
      title: "Total Active Users",
      amount: "08",
      icon: <BarChartIcon fontSize="large" />,
    },
    {
      title: "Total Blocked Users",
      amount: "100",
      // icon:<AttachMoneyIcon fontSize='large'/>
      icon: <BarChartIcon fontSize="large" />,
    },
  ];

  const cardData2 = [
    // {
    // title: "Total Transactions",
    // amount: 65,
    // icon: <LocalAtmIcon fontSize="large" />,
    // },
    //   {
    //  title: "Total System Validators",
    //  amount: "05",
    //  icon: <MoneyIcon fontSize="large" />,
    //  },
  ];
  return (
    <Page title="Dashboard">
      <Box mb={5} className={classes.btnSection}>
        <Typography variant="h3" style={{ marginBottom: "8px" }}>
          <strong> Dashboard</strong>
        </Typography>
        <Box>
          {!account && (
            <Button
              style={{
                background: "#C54C82",
                borderRadius: "21px",
                color: "#fff",
                border: "2px solid rgb(230 12 109)",
              }}
              variant="outlined"
              aria-label="small outlined button group"
              onClick={() =>
                user.connectWallet(toast.success("Successfully connected"))
              }
            >
              Connect Wallet
            </Button>
          )}

          {account && (
            <Button
              style={{
                background:
                  "linear-gradient(124deg, rgb(146 47 149 / 81%) 18.76%, #c54c82 43.13%, #fd612c 96.83%)",
                borderRadius: "21px",
                color: "#fff",
                border: "2px solid rgb(230 12 109)",
              }}
              variant="outlined"
              aria-label="small outlined button group"
              onClick={() =>
                user.dicconectWalletFun(
                  toast.error("Successfully disconnected")
                )
              }
            >
              {" "}
              Disconnect{" "}
              {account &&
                `${account.substring(0, 4)}...${account.substring(
                  account.length - 4,
                  account.length
                )}`}
            </Button>
          )}
        </Box>

      </Box>
      <Box>
        <Grid container spacing={3}>
          <Grid item md={3} xs={12}>
            <Card
              title="Total Client's"
              amount={userList?.alluser}
              icon={<ImUsers style={{ fontSize: "40px" }} />}
            />
          </Grid>
          {/* ))} */}
          {/*  </Grid>
        <Grid container spacing={3}>
         {cardData2.map((obj) => ( */}
          <Grid item md={3} xs={12}>
            <Card
              title="Total Company's"
              amount={userList?.totalCompany}
              icon={<RiBuildingFill style={{ fontSize: "40px" }} />}
            />
          </Grid>

          <Grid item md={3} xs={12}>
            <Card
              title="Total Validator's"
              amount={userList?.totalValidator}
              icon={<BsFillPersonCheckFill style={{ fontSize: "40px" }} />}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <Card
              title="Total Active Validator's"
              amount={userList?.totalActiveValidator}
              icon={<BsFillPersonCheckFill style={{ fontSize: "40px" }} />}
            />
          </Grid>
          {/* ))} */}
        </Grid>
      </Box>
    </Page>
  );
}
