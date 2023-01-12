import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

const Home = () => {
  return (
    <Paper>
      <Box>
        <Typography variant="h3">Choose Blockchain</Typography>
        <Box>
          <Button
            style={{
              margin: "18px",
              boxShadow:
                "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
            }}
            // type="submit"
            // onClick={openMilestone}
            // fullWidth
            size="large"
            variant="contained"
            color="primary"
          >
            Ethreum
          </Button>
          <Button
            style={{
              margin: "18px",
              boxShadow:
                "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
            }}
            // fullWidth
            size="large"
            variant="contained"
            color="primary"
          >
            Binance
          </Button>
          <Button
            style={{
              margin: "18px",
              boxShadow:
                "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
            }}
            // fullWidth
            size="large"
            variant="contained"
            color="primary"
          >
            Solana
          </Button>
          <Button
            style={{
              margin: "18px",
              boxShadow:
                "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
            }}
            // fullWidth
            size="large"
            variant="contained"
            color="primary"
          >
            Polygon
          </Button>
          <Button
            style={{
              margin: "18px",
              boxShadow:
                "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
            }}
            // fullWidth
            size="large"
            variant="contained"
            color="primary"
          >
            Xinfin
          </Button>
          <Button
            style={{
              margin: "18px",
              boxShadow:
                "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
            }}
            // fullWidth
            size="large"
            variant="contained"
            color="primary"
          >
            HECO
          </Button>
          <Button
            style={{
              margin: "18px",
              boxShadow:
                "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
            }}
            // fullWidth
            size="large"
            variant="contained"
            color="primary"
          >
            TRON
          </Button>
          <Button
            style={{
              margin: "18px",
              boxShadow:
                "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
            }}
            // fullWidth
            size="large"
            variant="contained"
            color="primary"
          >
            EOS
          </Button>
          <Button
            style={{
              margin: "18px",
              boxShadow:
                "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
            }}
            // fullWidth
            size="large"
            variant="contained"
            color="primary"
          >
            NEO3
          </Button>
          <Button
            style={{
              margin: "18px",
              boxShadow:
                "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
            }}
            // fullWidth
            size="large"
            variant="contained"
            color="primary"
          >
            WAVES
          </Button>
          <Button
            style={{
              margin: "18px",
              boxShadow:
                "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
            }}
            // fullWidth
            size="large"
            variant="contained"
            color="primary"
          >
            Moonriver
          </Button>
        </Box>
        <Box paddingBottom="30px">
          <Typography variant="h6">Test Network</Typography>
          <Grid component="label" container alignItems="center" spacing={1}>
            {/* <Grid item>Off</Grid> */}
            <Grid item>
              <AntSwitch
                //   style={{padding:"20px"}}
                // checked={state.checkedC}
                // onChange={handleChange}
                name="checkedC"
              />
            </Grid>
            {/* <Grid item>On</Grid> */}
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};

export default Home;
