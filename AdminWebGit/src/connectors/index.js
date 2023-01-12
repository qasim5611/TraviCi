import { InjectedConnector } from "@web3-react/injected-connector";
import { BinanceConnector } from "@bscswap/binance-connector";
import { RPC_URL, RPC_URL_BNB } from "src/constants";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97],
});
export const binanceinjected = new BinanceConnector({
  supportedChainIds: [56, 97],
});
export const walletconnect = new WalletConnectConnector({
  rpc: {
    1: RPC_URL,
    56: RPC_URL_BNB,
  },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: 15000,
});

export const SUPPORTED_WALLETS = [
  {
    name: "METAMASK",
    data: {
      connector: injected,
      name: "MetaMask",
      iconName: "/images/metamask.png",
      description: "Easy-to-use browser extension.",
      href: null,
      color: "#E8831D",
    },
  },
];
