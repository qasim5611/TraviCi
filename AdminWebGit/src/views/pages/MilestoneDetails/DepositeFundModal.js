import {
  Box,
  Button,
  Dialog,
  DialogContent,
  TextField,
  Typography,
} from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { getContract, getWeb3Obj } from "src/utils";
import { abrarContract } from "src/constants";
import abrarAbi from "src/constants/ABI/abrar.json";
import { toast } from "react-toastify";
import Web3 from "web3";

import React, { useEffect, useState, useContext } from "react";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { AuthContext } from "src/context/Auth";

export default function DepositeFundModal({
  openDeposite,
  setDeposite,
  workData,
  milestoneDetailsDescription,
  contracts_id,
  getBalance,
  amountHAndler1,
  contractData,
  setValue12,
  getmilestoneList,
}) {
  console.log("milestoneDetailsDescription---", contractData);
  const indexId = milestoneDetailsDescription?.milestoneIndex;
  const amount = workData?.contractId?.amount;
  const web3 = (window.web3 = new Web3(window.ethereum));

  console.log("web3--", web3)

  const { account, chainId, library } = useWeb3React();
  const [amountValue, setAmount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAmount, setIsLoadingAmount] = useState(false);
  const [addressAmount, setAddressAmount] = useState("");
  const auth = useContext(AuthContext)

  console.log("amountValue---", amountValue);

  const depositeHandler = async () => {
    setIsLoading(true);
    try {
      const web3 = await getWeb3Obj();


      const contract = getContract(abrarContract, abrarAbi, library, account);
      console.log("contract----", contract);
      const agrementIdFun = await contract.agrementId();
      console.log("aggrementId", parseInt(agrementIdFun.toString()) - 1);
      const convertUSDtoBNBFun = await contract.convertUSDtoETH(
        parseFloat(milestoneDetailsDescription.amount)
      );

      const despositefund = await contract.depositFunds(
        parseInt(contractData?.contractId?.contractId?.blockchainContractId),
        parseInt(milestoneDetailsDescription?.milestoneIndex),
        { value: convertUSDtoBNBFun.toString() }
      );
      await despositefund.wait();
      toast.success("Your transaction has been completed successfully.");
      setIsLoading(false);
      getmilestoneList();
      getBalance();
      amountHAndler1();
      setDeposite(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const amountHAndler = async () => {
    setIsLoadingAmount(true);

    try {
      const web3 = await getWeb3Obj();

      const contract = getContract(abrarContract, abrarAbi, library, account);
      const agrementIdFun = await contract.agrementId();
      const convertUSDtoBNBFun = await contract.getMilestoneETHAmount(
        parseInt(agrementIdFun.toString()) - 1,
        indexId
      );

      setIsLoadingAmount(false);

      setAmount(
        Number(web3.utils.fromWei(convertUSDtoBNBFun?.toString()))?.toFixed(5)
      );
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    amountHAndler();
  }, []);

  const dataDisplauhandler = async () => {
    try {
      const balance = await web3.eth.getBalance(account);
      const balanceImETH = await web3.utils.fromWei(balance);
      setAddressAmount(parseFloat(balanceImETH).toFixed(2));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (account) {
      dataDisplauhandler();
    }
  }, [account]);

  console.log("workData---", workData);
  return (
    <Dialog
      open={openDeposite}
      onClose={() => {
        if (!isLoading) {
          setDeposite(false);
        }
      }}
    >
      <DialogContent>
        <Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>
              USD Amount : ${milestoneDetailsDescription?.amount}{" "}
            </Typography>

            <Typography>
              Wallet Balance :{" "}
              {addressAmount ? Number(addressAmount).toFixed(5) + " ETH" : ""}
            </Typography>
          </Box>

          <Box mt={1}>
            <label>Amount you have to pay {amountValue} ETH</label>
            {isLoadingAmount ? (
              <ButtonCircularProgress />
            ) : (
              <TextField
                placeholder="Enter amount"
                variant="outlined"
                fullWidth
                value={amountValue}
                disabled={isLoading}
              />
            )}
          </Box>
          <Box mt={2} mb={2}>
            {auth?.wallet >= amountValue ? (
              <Button
                variant="contained"
                color="primary"
                onClick={depositeHandler}
                disabled={isLoading}
              >
                Deposit Now {isLoading && <ButtonCircularProgress />}
              </Button>

            ) : (
              <Typography style={{ color: "red" }}>Your wallet balance is too low.</Typography>
            )}

          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
