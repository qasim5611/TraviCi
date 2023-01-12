import React, { createContext, useEffect, useState } from "react";
import { injected } from "src/connectors";
import { useWeb3React } from "@web3-react/core";
import { ACTIVE_NETWORK_ETH } from "src/constants";
import { ToastContainer, toast } from "react-toastify";

export const UserContext = createContext();

const setSession = (userAddress) => {
  if (userAddress) {
    sessionStorage.setItem("userAddress", userAddress);
  } else {
    sessionStorage.removeItem("userAddress");
  }
};

export default function AuthProvider(props) {
  const { activate, account, deactivate, chainId } = useWeb3React();
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const disconnectWallte = async () => {
    // setUserData({});
    // setIsLogin(false);
    // setIsAdmin(false);
    deactivate();
  };

  let data = {
    userLoggedIn: isLogin,
    userData,
    updateUser: (account) => {
      setSession(account);
    },
    connectWallet: () => {
      activate(injected, undefined, true).catch((error) => {
        if (error) {
          activate(injected);
        }
      });
    },
    dicconectWalletFun: () => {
      disconnectWallte();
    },
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
    const userAddress = window.sessionStorage.getItem("userAddress");
    if (userAddress) {
      data.connectWallet();
      console.log("hghjg", userAddress);
    }
  }, []); //eslint-disable-line

  useEffect(() => {
    data.updateUser(account);
  }, [account]); //eslint-disable-line

  return (
    <UserContext.Provider value={data}>{props.children}</UserContext.Provider>
  );
}
