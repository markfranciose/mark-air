import React from 'react';
import { Typography, makeStyles, createStyles } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';

const useStyles = makeStyles(() => createStyles({
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 500,
    marginBottom: 12,
    marginTop: 12
  }
}));

export default function DateHeader() {
  const TODAY = new Date().getTime();
  const TOMORROW = new Date(TODAY + 86400000);

  const classes = useStyles();

  function alertBeta() {
    alert('as of right now, we can only plan tomorrow');
  }

  return (
    <div className={classes.headerContainer}>
      <NavigateBefore
        onClick={alertBeta}
        data-testid="nav-back"
      />
      <Typography>
        {`Flight Scheduling: ${TOMORROW.toLocaleString()}`}
      </Typography>
      <NavigateNext
        onClick={alertBeta}
        data-testid="nav-forward"
      />
    </div>
  );
}
