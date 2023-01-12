import { Typography } from '@material-ui/core';
import React from 'react';
import Logo from './Logo';
import { useHistory } from 'react-router-dom';

export default function LogoWithName() {
  const history = useHistory();

  return (
    <>
      <Logo
        width="50"
        onClick={() => history.push('/dashboard')}
        style={{ cursor: 'pointer' }}
      />
      
    </>
  );
}
