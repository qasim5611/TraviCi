import React from "react";
import {
  Box,
  Container,
  Button,
  TextField,
  makeStyles,
  Grid,
  Typography,
  Link,
} from "@material-ui/core";
import { useHistory } from "react-router";
const useStyles = makeStyles((theme) => ({
  LoginBox: {
    display: "flex",
    padding: "10px 0px",
  },

  modaltitel: {
    fontSize: "30px",
    fontWeight: "600",
    marginBottom: "10px",
    textAlign: "center",
    borderBottom: "solid 1px #e5e3dd",
    paddingBottom: "10px",
    color: "#141518",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  },
}));
export default function PrivacyPolicy(props) {
  console.log("props", props);
  const title = props.location.state.id.title;
  const description = props.location.state.id.description;

  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <Box className={classes.LoginBox}>
        <Container maxWidth="lg">
          <Typography variant="h3" className={classes.modaltitel}>
            {title}
          </Typography>

          <Box mt={5}>
            <Typography paragraph>{description}</Typography>{" "}
          </Box>
        </Container>
      </Box>
      <Box pl={2} align="center">
        <Button
          onClick={() => history.push("/registration")}
          variant="contained"
          size="large"
          color="primary"
          style={{ marginTop: "30px" }}
        >
          Back
        </Button>
      </Box>
    </>
  );
}
