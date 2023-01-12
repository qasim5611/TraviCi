import {
  Typography,
  Box,
  Button,
  IconButton,
  DialogContent,
  Dialog,
  FormControl,
  MenuItem,
  Select,
  DialogActions,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddMilestone from "src/component/AddMilestone";
import AddMilestone2 from "src/component/AddMilestone2";
import InviteFriend from "../../../component/InviteFriend";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import ShareIcon from '@material-ui/icons/Share';
import "react-toastify/dist/ReactToastify.css";

export default function ContractNameDetails({
  data,
  contractName,
  contractId,
  contractsAmount,
  milestoneDetails,
  getmilestoneList,
  contractDetails,
  milestoneDetailsDescription,
  contractStatus,
  contractData
}) {

  const userType = window.localStorage.getItem("userType");
  const [addMilestone1, setAddMilestone1] = useState(false);
  const [addMilestone2, setAddMilestone2] = useState(false);
  const [contractPopup, setContractPopup] = useState(false);
  const [validatorsOnce, setValidatorsOnce] = React.useState();
  const [validators, setValidateId] = useState([]);
  const [sharePop, setSharePop] = useState(false)
  const [contractone, setContractone] = useState([]);
  const history = useHistory();

  const [loader3, setLoader3] = useState(false);
  const accessToken = window.localStorage.getItem("creatturAccessToken");

  useEffect(() => {
    // setIsLoading(true);
    axios
      .get(ApiConfig.listValidator)
      .then((response) => {
        if (response.data.response_code === 200) {
          setValidateId(response.data.result);
          // setValidators(response.data.result);
          console.log("response", response);
        } else {
          console.log("no users");

          // else setHistory(depositFilter);
        }
        // setIsLoading(false);
      })
      .catch((response) => {
        // setIsUpdating(false);

        console.log("response", response);
      });
  }, []);

  const SelectValidator = async (id) => {
    try {
      setLoader3(true);
      const response = await axios({
        method: "GET",
        url: ApiConfig.selectValidatorByCompany,
        params: {
          validatorId: validatorsOnce,
          contractId: milestoneDetails._id,
        },
        headers: {
          token: accessToken,
        },
      });
      if (response.data.response_code !== 200) {
        setLoader3(false);
        setContractPopup(true);

        toast.error(response.data.response_message);
      } else {
        // listContract();
        setLoader3(false);
        history.push("/milestone-details");
        getmilestoneList();
        toast.success(" validator selected successfully");
        setContractPopup(false);
      }
    } catch (err) {
      setLoader3(false);
      setContractPopup(true);

      console.error(err.response);
    }
  };

  const [isInvite, setIsInvite] = useState(false);
  return (
    <Box display="flex" pb={2}>
      {addMilestone1 && (
        <AddMilestone
          open={addMilestone1}
          handleClose={() => setAddMilestone1(false)}
          handleMilestone2={setAddMilestone2}
        />
      )}
      {addMilestone2 && (
        <AddMilestone2
          open={addMilestone2}
          handleClose={() => setAddMilestone2(false)}
        />
      )}
      <Box mt={1}>
        <img src="images/Contractimage.png" width="50" alt="" />
      </Box>
      <Box mt={1} ml={1}>
        <Typography>
          <span style={{ fontSize: 16, fontWeight: 500 }}>{contractName}</span>
        </Typography>
        <Typography>
          <span style={{ fontSize: 16, fontWeight: 500 }}>
            ${contractsAmount}
          </span>
        </Typography>
        {userType === "COMPANY" && (
          <Typography >STATUS :
            {contractStatus === "APPROVED" && (
              <span style={{ color: "green", paddingLeft: "3px" }}>
                APPROVED
              </span>

            )}

            {contractStatus === "REJECT" && (
              <span style={{ color: "red", paddingLeft: "3px" }}>
                REJECTED
              </span>

            )}
            {contractStatus === "PENDING" && (
              <span style={{ color: "red", paddingLeft: "3px" }}>
                PENDING
              </span>

            )}
          </Typography>

        )}


      </Box>


      <Box flexGrow={1} textAlign="end">
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            width: "100%",
            height: "100%",
            textAlign: "end",
          }}
        >
          {/* <Typography variant="h6">
            <span style={{ fontSize: 16, fontWeight: 500 }}>
              $ {data?.amount}
            </span>
          </Typography> */}
        </Box>
      </Box>
      {/* <Box mt={1}>
        <AvatarGroup>
          <Avatar alt="Remy Sharp" src="images/member1.png" />
          <Avatar alt="Remy Sharp" src="images/member2.png" />
          <Avatar alt="Remy Sharp" src="images/member3.png" />
        </AvatarGroup>
      </Box> */}
      <Box mt={1} mx={3}>
        {userType === "COMPANY" && (
          <Box>


            <IconButton onClick={() => setSharePop(true)}>
              <ShareIcon />
            </IconButton>

            <Typography variant="body2" style={{ marginTop: "10px" }}>
              Validator email :
            </Typography>
            <Typography variant="body2">
              {milestoneDetails?.validatorId?.email}
            </Typography>
          </Box>
        )}

        {userType === "FREELANCER" && (
          <Box>
            <Typography variant="body2" style={{ marginTop: "10px" }}>
              Validator email :{" "}
            </Typography>
            <Typography variant="body2">
              {validators && validators[0]?.email}
            </Typography>
          </Box>
        )}
      </Box>

      {isInvite && (
        <InviteFriend
          open={isInvite}
          handleClose={() => setIsInvite(false)}
          setIsInvite={setIsInvite}
          contractId={contractId}
          getmilestoneList={getmilestoneList}
        />
      )}
      {/* <Box ml={3} mr={3}>
        <IconButton onClick={() => setAddMilestone1(true)}>
          <AddCircleIcon style={{ fontSize: 40, color: '#C54C82' }} />
        </IconButton>
      </Box> */}

      <Dialog
        // classes={{ paper: classes.desktopDrawer }}
        open={contractPopup}
        onClose={() => setContractPopup(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent style={{ width: "312px", padding: "30px 20px" }}>
          <Box>
            <FormControl fullWidth variant="outlined">
              <Typography variant="body2">
                <strong>Please select Validator</strong>
              </Typography>
              <Select
                fullWidth
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                margin="dense"
                name="privacy"
                onChange={(e) => setValidatorsOnce(e.target.value._id)}
              >
                {validators &&
                  validators?.map((data) => {
                    // setValidatorsOnce(data._id)
                    return <MenuItem value={data}>{data.firstName}</MenuItem>;
                  })}
              </Select>
            </FormControl>
          </Box>

          <Box mt={3} align="center">
            <Button
              type="submit"
              fullWidth
              size="medium"
              variant="contained"
              color="primary"
              onClick={SelectValidator}
              disabled={loader3}
            >
              Next
              {loader3 && <ButtonCircularProgress />}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog open={sharePop} onClose={() => setSharePop(false)} minWidth='lg'>
        <DialogContent>
          <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '20px' }}>
            <Box >
              {!milestoneDetails?.validatorId?.email && (
                <Button
                  variant="outlined"
                  style={{
                    padding: "5px 15px",
                    borderRadius: 90,
                    color: "rgba(62, 62, 62, 0.7)",
                  }}
                  onClick={() => setContractPopup(true)}
                >
                  <img src="images/icon6.png" alt="" style={{ marginRight: 8 }} />{" "}
                  Add Validator
                </Button>
              )}



            </Box>

            <Box mt={2} mb={2}>
              <Typography>-----OR-----</Typography>

            </Box>
            <Box>
              {!milestoneDetails?.isShareWithUser && (
                <Button
                  variant="outlined"
                  style={{
                    padding: "5px 15px",
                    borderRadius: 90,
                    color: "rgba(62, 62, 62, 0.7)",
                  }}
                  onClick={() => setIsInvite(true)}
                >
                  <img
                    src="images/icon6.png"
                    alt=""
                    style={{ marginRight: 8 }}
                  />{" "}
                  Share to Client
                </Button>
              )}

            </Box>

          </Box>


        </DialogContent>
        <DialogActions>
          <Box>

            <Button onClick={() => setSharePop(false)}>
              Cancel
            </Button>
          </Box>


        </DialogActions>
      </Dialog>
    </Box>
  );
}
