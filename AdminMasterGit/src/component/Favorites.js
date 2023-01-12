import { Box, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SdStorageOutlinedIcon from '@material-ui/icons/SdStorageOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import NewProject from './NewProjectFrist';
import NewProjectSecond from './NewProjectSecond';
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 20,
    margin: 10,
  },
}));

const list = [
  {
    id: 1,
    name: 'Contract Name',
    desc: 'Lorem Ipsum',
  },
  {
    id: 2,
    name: 'Contract Name',
    desc: 'Lorem Ipsum',
  },
  {
    id: 3,
    name: 'Contract Name',
    desc: 'Lorem Ipsum',
  },
];

export default function Favorites({ isAdd }) {
  const history = useHistory();
  const classes = useStyles();
  const [newProjectFirst, setnewProjectFirst] = useState(false);
  const [newProjectSecond, setNewProjectSecond] = useState(false);
  return (
    <Box>
      <Grid container spacing={3}>
        {list.map((data, i) => {
          return (
            <Grid item xs={6} sm={3} md={2} key={i}>
              <Box
                elevation={0}
                className={classes.paper}
                onClick={()=>history.push('/milestone-details')}
                style={
                  (i + 1) % 2 === 0
                    ? { backgroundColor: '#fbd3c5' }
                    : (i + 1) % 3 === 0
                    ? { backgroundColor: '#baecc1' }
                    : { backgroundColor: '#FEBFCC' }
                }
              >
                <SdStorageOutlinedIcon
                  style={
                    (i + 1) % 2 === 0
                      ? { fontSize: 70, color: '#f69371' }
                      : (i + 1) % 3 === 0
                      ? { fontSize: 70, color: '#39b54a' }
                      : { fontSize: 70, color: '#C54C82' }
                  }
                />
              </Box>
              <Box style={{ margin: 10 }}>
                <Typography paragraph style={{ fontWeight: 'bold' }}>
                  {data.name}
                </Typography>
                <Typography variant="body2">{data.desc}</Typography>
              </Box>
            </Grid>
          );
        })}
        {isAdd && (
          <Grid item xs={6} sm={3} md={2}>
            <Box
              elevation={0}
              className={classes.paper}
              style={{
                backgroundColor: 'white',
                border: '2px dashed #c5c5c5',
                cursor: 'pointer',
              }}
              onClick={() => setnewProjectFirst(true)}
            >
              <AddOutlinedIcon style={{ fontSize: 70, color: '#c5c5c5' }} />
            </Box>
            <Box style={{ margin: 10 }}>
              <Typography paragraph style={{ fontWeight: 'bold' }}>
                New Contract
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
      {newProjectFirst && (
        <NewProject
          open={newProjectFirst}
          handleClose={() => setnewProjectFirst(false)}
          setNewProjectSecondHandler={() => {
            setnewProjectFirst(false);
            setNewProjectSecond(true);
          }}
        />
      )}
      {newProjectSecond && (
        <NewProjectSecond
          open={newProjectSecond}
          handleClose={() => setNewProjectSecond(false)}
        />
      )}
    </Box>
  );
}
