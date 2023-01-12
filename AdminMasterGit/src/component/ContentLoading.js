import React from 'react';
import ButtonCircularProgress from 'src/component/ButtonCircularProgress';
import { Typography } from '@material-ui/core';

function ContentLoading() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 30,
      }}
    >
      <ButtonCircularProgress />
      <br />
      <Typography size="large" variant="h5">
        Loading...
      </Typography>
    </div>
  );
}

export default ContentLoading;
