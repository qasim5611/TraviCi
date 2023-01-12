import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const Accordion = withStyles({
  root: {
    "&:not(:last-child)": {
      background: "#FFFFFF",
      border: "1px solid #E9E9E9",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      border: " 1px solid #3d3d3d",
      background:
        "linear-gradient( 152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
      backdropFilter: "blur(42px)",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    borderBottom: "0",
    marginBottom: -1,
    backgroundColor: "#C54C82",
    fontWeight: 500,
    fontSize: "24px",
    lineHeight: "36px",
    color: "#fff",
    minHeight: 45,
    "&$expanded": {
      minHeight: 45,
      borderBottom: "0",
      color: "#ffffff",
      backgroundColor: "#C54C82",
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    // background: "rgb(251, 253, 255)",
    backgroundColor: "#fff",
  },
}))(MuiAccordionDetails);
export default function FaqData({ data, index }) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        square
        defaultExpanded={index == 0 ? true : false}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          expandIcon={<ExpandMoreIcon style={{color:"#fff"}} />}
        >
          <Typography variant="h6" style={{fontSize:"14px"}}>{data.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{ color: "rgb(110 110 110)", fontSize: "14px" }}>
            {data.answer}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
