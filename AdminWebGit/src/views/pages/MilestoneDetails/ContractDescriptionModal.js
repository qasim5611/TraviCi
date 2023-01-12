import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
} from "@material-ui/core";
import React from "react";
import CalendarTodayOutlined from "@material-ui/icons/CalendarTodayOutlined";
import moment from "moment";

export default function ContractDescriptionModal({
  descriptionOpen,
  setDescriptionOpen,
  contractDetails,
  contractData,
}) {
  console.log("contractDetails----", contractData);
  return (
    <Dialog
      open={descriptionOpen}
      onClose={() => setDescriptionOpen(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogContent>
        <Box>
          <Typography variant="h6">
            Description :{" "}
            <span style={{ fontSize: "14px", fontWeight: 400 }}>
              {contractDetails?.description
                ? contractDetails?.description
                : contractData?.description}
            </span>
          </Typography>
          <Typography variant="h6">
            Amount :{" "}
            <span style={{ fontSize: "14px", fontWeight: 400 }}>
              ${" "}
              {contractDetails?.amount
                ? contractDetails?.amount
                : contractData?.contracts?.contractId?.amount}
            </span>
          </Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" style={{ fontSize: "16px" }}>
              Start Date:
            </Typography>
            &nbsp;
            <Typography variant="body2" style={{ fontSize: "14px" }}>
              {moment(
                contractDetails?.startDate
                  ? contractDetails?.startDate
                  : contractData?.contracts?.contractId?.startDate
              ).format("YYYY-MM-DD")}

              <CalendarTodayOutlined
                style={{
                  fontSize: "14",
                  color: "#C54C82",
                  marginLeft: "5px",
                  marginTop: "3px",
                }}
              />
            </Typography>
          </Box>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" style={{ fontSize: "16px" }}>
              End Date:
            </Typography>
            &nbsp;
            <Typography variant="body2" style={{ fontSize: "14px" }}>
              {moment(
                contractDetails?.endDate
                  ? contractDetails?.endDate
                  : contractData?.contracts?.contractId?.endDate
              ).format("YYYY-MM-DD")}

              <CalendarTodayOutlined
                style={{
                  fontSize: "14",
                  color: "#C54C82",
                  marginLeft: "5px",
                  marginTop: "3px",
                }}
              />
            </Typography>
          </Box>
        </Box>
        <Box mt={1.5} mb={1.5}>
          {contractDetails?.contractDocument && (
            <a
              href={
                contractDetails &&
                contractDetails?.contractDocument &&
                contractDetails?.contractDocument[0]
              }
              target="_blamk"
              style={{ textDecoration: "none" }}
            >
              <Button variant="outlined"> Click to download file</Button>
            </a>
          )}

          {contractData?.contracts?.contractId?.contractDocument && (
            <a
              href={
                contractData?.contracts?.contractId?.contractDocument &&
                contractData?.contracts?.contractId?.contractDocument[0]
              }
              target="_blamk"
              style={{ textDecoration: "none" }}
            >
              <Button variant="outlined"> Click to download file</Button>
            </a>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
