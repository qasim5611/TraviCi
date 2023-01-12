import React, { useEffect, useState, useRef } from "react";

import {
  Grid,
  Box,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import { Container } from "@material-ui/core";
import JoditEditor from "jodit-react";


import axios from "axios";
import ApiConfig from "src/Config/APIconfig";

import Page from "src/component/Page";
import { Link, useLocation } from "react-router-dom";

// viewStaticPage

const ViewMilestone = () => {
  const editor = useRef(null);
  const config = {
    readonly: false,
  };
  const Row = ({ field, value, image }) => (

    <Grid item container md={12}>
      <Grid item md={6}>
        <Box display="flex" justifyContent="space-between" pr={4}>
          <Typography variant="h5">
            <strong>{field}</strong>
          </Typography>
        </Box>
      </Grid>
      <Grid item md={6}>
        <Typography variant="body1">{value}</Typography>
        {image && <img src={image} alt="comp" width="90px" />}
      </Grid>
    </Grid>
  );
  const [selectedTab, setTab] = React.useState(0);

  const tabChange = (event, tabName) => {
    setTab(tabName);
  };

  const location = useLocation();
  const accessToken = window.sessionStorage.getItem("creatturAccessToken");
  const [users, setUsers] = useState("");
  const ViewStatics = async () => {
    axios
      .get(
        ApiConfig.viewStaticPage,

        {
          headers: {
            token: accessToken,
          },
          params: { type: location.state.id },
        }
      )
      .then((response) => {
        if (response.data.response_code !== 200) {
        } else {
          // setDisplayname
          // console.log(result)
          setUsers(response.data.result);
          console.log(response);
        }
      })
      .catch((response) => {
        console.log("response", response);
      });
  };
  useEffect(() => {
    ViewStatics();
  }, [1]);
  console.log("users", users);
  console.log("dataType View States");
  return (
    <>
      {!users ? (
        <>
          <Box textAlign="center" pt={4}>
            <CircularProgress />
          </Box>
        </>
      ) : (
        <Page title="View User">
          <Box mb={5}>
            <Typography variant="h3" style={{ marginBottom: "8px" }}>
              <strong> {users?.title}</strong>
            </Typography>


            <Divider />
          </Box>


          <JoditEditor
            ref={editor}

            // disabled={isEdit}
            value={users?.description}
            config={config}
            variant="outlined"
            fullWidth
            size="small"
            tabIndex={1}

            onChange={(newContent) => { }}
          />
          <Box mt={3}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              component={Link}
              to="/static-content-management"
            >
              Back
            </Button>
          </Box>
        </Page>
      )}
    </>
  );
};

export default ViewMilestone;
