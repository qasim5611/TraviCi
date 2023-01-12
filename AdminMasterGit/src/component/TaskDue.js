import { Box, Typography } from '@material-ui/core';
import React from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const list = [
  {
    id: 1,
    name: 'name',
  },
  {
    id: 2,
    name: 'name',
  },
];
export default function TaskDue() {
  return (
    <>
      {list.map((data, i) => {
        return (
          <Box
            display="flex"
            style={{
              backgroundColor: '#f8f6f7',
              padding: '5px 10px',
              borderRadius: 10,
            }}
            mt={1}
            key={i}
          >
            <Box style={{ width: '5%' }}>
              <CheckCircleOutlineIcon
                style={
                  i % 2 === 0 ? { color: '#39b54a' } : { color: '#fe9b00' }
                }
              />
            </Box>
            <Box style={{ width: '35%' }}>
              <Typography style={{ fontWeight: 'bold' }}>
                Contract Name
              </Typography>
            </Box>
            <Box style={{ width: '20%' }}>
              <Typography>Contract Name</Typography>
            </Box>
            <Box style={{ width: '20%' }}>
              <Typography>Status</Typography>
            </Box>
            <Box style={{ width: '10%' }}>
              <Typography>Today</Typography>
            </Box>
            <Box style={{ width: '10%' }}>
              <Typography>3:30 pm</Typography>
            </Box>
          </Box>
        );
      })}
    </>
  );
}
