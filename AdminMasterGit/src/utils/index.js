// export const calculateTimeLeft = (endDate) => {
//   if (endDate) {
//     let difference = endDate * 1000 - +new Date();
//     let timeLeft = {};

//     if (difference > 0) {
//       timeLeft = {
//         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//         minutes: Math.floor((difference / 1000 / 60) % 60),
//         seconds: Math.floor((difference / 1000) % 60),
//       };
//     }
//     return timeLeft;
//   } else {
//     return false;
//   }
// };

import { Contract } from "@ethersproject/contracts";
import Web3 from "web3";
import { RPC_URL } from "src/constants";
export function sortAddress(add) {
  if (add) {
    const sortAdd = `${add.slice(0, 6)}...${add.slice(add.length - 4)}`;
    return sortAdd;
  } else return add;
}

export function firstAddress(add) {
  if (add) {
    const sortAdd = `${add.slice(0, 6)}...`;
    return sortAdd;
  } else return add;
}

export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}

export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}

export function getContract(address, ABI, library, account) {
  return new Contract(address, ABI, getProviderOrSigner(library, account));
}
export const getWeb3Provider = async () => {
  const httpProvider = new Web3.providers.HttpProvider(RPC_URL);
  return httpProvider;
};

export const getWeb3Obj = async (rpc = RPC_URL) => {
  const httpProvider = new Web3.providers.HttpProvider(rpc);
  const web3 = await new Web3(httpProvider);
  return web3;
};

export const getWeb3ContractObject = async (abi, contractAddress, rpc) => {
  const web3 = await getWeb3Obj(rpc);
  const contract = await new web3.eth.Contract(abi, contractAddress);
  return contract;
};

export const getBalanceOf = async (abi, address, account) => {
  try {
    const contract = await getWeb3ContractObject(abi, address);
    const balanceOf = await contract.methods.balanceOf(account).call();
    return balanceOf.toString();
  } catch (error) {
    console.log("ERROR", error);

    return 0;
  }
};
export const swichNetworkHandler = async (ACTIVE_NETWORK) => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x" + ACTIVE_NETWORK.toString(16) }],
    });
  } catch (error) {
    console.log("ERROR", error);
    if (error.code === 4902) {
      addNetworkHandler();
    }
  }
};

export const addNetworkHandler = async (NetworkDetails) => {
  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: NetworkDetails,
    });
  } catch (error) {
    console.log("ERROR", error);
  }
};

export const calculateTimeLeft = (endDate) => {
  if (endDate) {
    let difference = endDate * 1000 - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  } else {
    return false;
  }
};
