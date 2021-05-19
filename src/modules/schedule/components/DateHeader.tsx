import React from 'react';
import { Typography } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';

export default function DateHeader() {
  const TODAY = new Date().getTime();
  const TOMORROW = new Date(TODAY + 86400000);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <NavigateBefore data-testid="nav-back" />
      <Typography>
        {`Flight Scheduling: ${TOMORROW.toLocaleString()}`}
      </Typography>
      <NavigateNext data-testid="nav-forward" />
    </div>
  );
}
