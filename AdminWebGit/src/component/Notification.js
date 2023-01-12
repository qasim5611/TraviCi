import { Typography, Box, Link } from '@material-ui/core';
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

export default function NotificationsList({ data, popUp }) {
  return (
    <Box
      className="notication-list"
      style={
        popUp
          ? {
              borderBottom: '1px solid #ccc',
              padding: '0px 5px 7px',
              position: 'relative',
              color: '#000',
            }
          : {
              borderBottom: '1px solid #ccc',
              padding: '0px 10px 15px',
              position: 'relative',
              color: '#000',
            }
      }
    >
      <Link
        to={{
          pathname: '/notification-detail',
          state: {
            data: data,
          },
        }}
        style={{ textDecoration: 'none', width: '100%', color: '#52565c' }}
        component={RouterLink}
      >
        <Box style={{ width: 'calc(100% - 50px)' }}>
          <Box style={{ marginTop: '10px' }} display="flex">
            <Box>
              <Typography variant="subtitle2">{data.title}</Typography>
            </Box>
            <Box flexGrow={1} />
            <Box>
              <Typography variant="body2" pt={2}>
                {data.date}
                <FaChevronRight size={14} style={{ marginLeft: '15px' }} />
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="body1" pt={2}>
              {data.Message}
            </Typography>
          </Box>
        </Box>
      </Link>
    </Box>
  );
}
