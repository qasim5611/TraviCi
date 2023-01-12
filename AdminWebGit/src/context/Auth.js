import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { injected, SUPPORTED_WALLETS } from "src/connectors";
import { ACTIVE_NETWORK_ETH } from "src/constants";
import { calculateTimeLeft } from "src/utils";
import Web3 from "web3";
export const AuthContext = createContext();

const setSession = (accessToken, userType, agencyTeam) => {
  if (accessToken) {
    localStorage.setItem("creatturAccessToken", accessToken);
    localStorage.setItem("userType", userType);
    localStorage.setItem("agencyTeam", agencyTeam);
    axios.defaults.headers.common.Authorization = `Creattur ${accessToken}`;
    // localStorage.setItem("Profile", profilePic)
  } else {
    localStorage.removeItem("creatturAccessToken");
    localStorage.removeItem("userType");
    localStorage.removeItem("agencyTeam");
    localStorage.removeItem("Profile");

    delete axios.defaults.headers.common.Authorization;
  }
};

function checkLogin() {
  const accessToken = window.localStorage.getItem("creatturAccessToken");
  return accessToken ? true : false;
}

const setTokenSession = (token) => {
  if (token) {
    sessionStorage.setItem("token", token);
  } else {
    sessionStorage.removeItem("token");
  }
};
export default function AuthProvider(props) {
  const history = useHistory();
  const { activate, account, chainId, library, deactivate } = useWeb3React();

  const [yourWalletBalance, setYourWalletBalance] = useState(0);
  const [isLogin, setIsLogin] = useState(checkLogin());
  const [userData, setUserData] = useState({});
  const [timeLeft, setTimeLeft] = useState();
  const [endTime, setEndtime] = useState();
  const [wallet, setWalletAmount] = useState(0);

  useEffect(() => {
    if (endTime) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(endTime));
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  const accessToken = window.localStorage.getItem("creatturAccessToken");

  const [userData1, setUserData1] = useState({
    profilePic: "",
  });
  const disconnectWallte = async () => {
    deactivate();
  };
  const connectWalletHandler = (data) => {
    const connector = injected;
    if (connector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined;
    }
    activate(connector, undefined, true).catch((error) => {
      if (error) {
        console.log("error", error.message);
        activate(connector);
      }
    });
  };
  useEffect(() => {
    if (account && chainId) {
      if (chainId !== ACTIVE_NETWORK_ETH) {
        if (window.ethereum) {
          swichNetworkHandler();
        }
      }
    }
  }, [chainId, account]);
  const swichNetworkHandler = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + ACTIVE_NETWORK_ETH.toString(16) }],
      });
    } catch (error) {
      toast.warn(error.message);
      if (error.code === 4902) {
        addNetworkHandler();
      }
    }
  };

  const addNetworkHandler = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        // params: NetworkDetails,
      });
    } catch (error) {
      console.log("ERROR", error);
      toast.warn(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("walletName")) {
      const selectectWalletDetails = SUPPORTED_WALLETS.filter(
        (data) => data.name === localStorage.getItem("walletName")
      );
      if (selectectWalletDetails && selectectWalletDetails[0].data) {
        connectWalletHandler(selectectWalletDetails[0].data);
      }
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("walletName")) {
      const selectectWalletDetails = SUPPORTED_WALLETS.filter(
        (data) => data.name === localStorage.getItem("walletName")
      );
      if (selectectWalletDetails && selectectWalletDetails[0].data) {
        connectWalletHandler(selectectWalletDetails[0].data);
      }
    }
  }, []);

  const getProfileHandler = async (token) => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getProfile,
        headers: {
          token: accessToken ? accessToken : token,
        },
      });
      if (res.data.response_code === 200) {
        setUserData(res.data.result);
        setUserData1({
          profilePic: res.data.result.profilePic,
        });
      } else {
        localStorage.removeItem("creatturAccessToken");
        localStorage.removeItem("tokenNew");
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getProfileHandler(accessToken);
    }
  }, [accessToken]);

  const getUserbalce = async () => {
    var web3 = new Web3(library.provider);
    const balance = await web3.eth.getBalance(account);
    const balanceImETH = await web3.utils.fromWei(balance);
    setWalletAmount(parseFloat(balanceImETH).toFixed(6));
  };
  console.log('yourWalletBalance----', yourWalletBalance);

  console.log('account', account);
  console.log('chainId', chainId);
  console.log('library', library);


  useEffect(() => {
    if (account) {
      getUserbalce();
    }
  }, [account, library]);

  let data = {
    userLoggedIn: isLogin,
    userData,

    userData1,
    setTimeLeft,
    setEndtime,
    timeLeft,
    wallet,
    userLogIn: (type, data, userType, agencyTeam) => {
      setSession(data, userType, agencyTeam);
      setIsLogin(type);
    },
    getProfileHandler: () => getProfileHandler(),
    connectWallet: (data) => connectWalletHandler(data),
    logoutHandler: () => {
      deactivate();
      setUserData();
      setTokenSession(null);
      sessionStorage.removeItem("walletName");
    },
    dicconectWalletFun: () => {
      disconnectWallte();
    },
  };

  return (
    <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>
  );
}
