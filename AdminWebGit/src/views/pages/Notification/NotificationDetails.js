import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Box, Typography, Grid, Button } from '@material-ui/core';
import Page from 'src/component/Page';
function NotificationDetail(props) {
  const notificationData = props.location && props.location.state.data;
  const history = useHistory();
  return (
    <Page title="Tutorial">
      <Box m={4} style={{ height: '78vh' }}>
        <Container maxWidth="lg">
          <Box mb={3}>
            <Typography variant="h6">Notification Detail</Typography>
          </Box>
          <Grid container>
            <Grid item sm={12}>
              <Typography variant="body2">
                {notificationData && notificationData.date}
              </Typography>

              <Typography variant="subtitle2">
                {notificationData && notificationData.title}
              </Typography>
              <Typography variant="body1" className="">
                {notificationData && notificationData.Message}
              </Typography>
            </Grid>
          </Grid>
          <Box textAlign="right">
            <Button
              variant="outlined"
              onClick={() => history.push('/notifications')}
            >
              Back
            </Button>
          </Box>
        </Container>
      </Box>
    </Page>
  );
}

export default NotificationDetail;
