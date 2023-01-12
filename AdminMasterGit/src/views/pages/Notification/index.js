import React from 'react';
import NotificationsList from 'src/component/Notification';
import { Grid, Box, Typography, Link } from '@material-ui/core';
import Page from 'src/component/Page';

const NotificationListing = [
  {
    title: 'Lorem Ipsum',
    Message:
      'Share suggestions, ask quester users and top contributors in the Google Chrome help forum',
    date: '12 March, 2021',
  },
  {
    title: 'Lorem Ipsum',
    Message:
      'Share suggestions, ask questions, rs and top contributors in the Google Chrome help forum',
    date: '13 March, 2021',
  },
  {
    title: 'Lorem Ipsum',
    Message:
      'Share suggestions, ask queother users and top contributors in the Google Chrome help forum',
    date: '14 March, 2021',
  },
  {
    title: 'Lorem Ipsum',
    Message:
      'Share suggestions, ask quesbutors in the Google Chrome help forum',
    date: '15 March, 2021',
  },
  {
    title: 'Lorem Ipsum',
    Message:
      'Share suggestions, ask quester users and top contributors in the Google Chrome help forum',
    date: '16 March, 2021',
  },
  {
    title: 'Lorem Ipsum',
    Message:
      'Share suggestions, ask questions, rs and top contributors in the Google Chrome help forum',
    date: '17 March, 2021',
  },
  {
    title: 'Lorem Ipsum',
    Message:
      'Share suggestions, ask queother users and top contributors in the Google Chrome help forum',
    date: '18 March, 2021',
  },
  {
    title: 'Lorem Ipsum',
    Message:
      'Share suggestions, ask quesbutors in the Google Chrome help forum',
    date: '19 March, 2021',
  },
  {
    title: 'Lorem Ipsum',
    Message:
      'Share suggestions, ask quester users and top contributors in the Google Chrome help forum',
    date: '20 March, 2021',
  },
  {
    title: 'Lorem Ipsum',
    Message:
      'Share suggestions, ask questions, rs and top contributors in the Google Chrome help forum',
    date: '21 March, 2021',
  },
  {
    title: 'Lorem Ipsum',
    Message:
      'Share suggestions, ask queother users and top contributors in the Google Chrome help forum',
    date: '22 March, 2021',
  },
  {
    title: 'Lorem Ipsum',
    Message:
      'Share suggestions, ask quesbutors in the Google Chrome help forum',
    date: '23 March, 2021',
  },
];
export default function Notifications({ popUp }) {
  return (
    <Page title="Notifications">
      <Box mb={3}>
        <Box display="flex">
          <Typography variant="h6" className="extra-bold" pt={2}>
            Notifications
          </Typography>
          {popUp && (
            <Box pt={1} style={{ flex: '1 0' }} textAlign="right">
              <Typography variant="body2">
                <Link
                  href="/notifications"
                  // component={RouterLink}
                >
                  View all
                </Link>
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Grid container spacing={4} sm={12} style={{ margin: '0' }}>
        {popUp
          ? NotificationListing.slice(0, 4).map((data, i) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={i}
                  style={{ padding: '15px 0' }}
                >
                  <NotificationsList popUp={popUp} data={data} index={i} />
                </Grid>
              );
            })
          : NotificationListing.map((data, i) => {
              return (
                <Grid item xs={12} sm={12} md={12} key={i}>
                  <NotificationsList popUp={popUp} data={data} index={i} />
                </Grid>
              );
            })}
      </Grid>
    </Page>
  );
}
