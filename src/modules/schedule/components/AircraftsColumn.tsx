import React from 'react';
import {
  Card, CardHeader, CardContent, CircularProgress, Typography, createStyles, makeStyles
} from '@material-ui/core';
import { Flight } from '@material-ui/icons';

import ErrorCard from '../shared/ErrorCard';

interface AircraftsColumnProps {
  aircraftData: any;
  utilization: string;
}

export default function AircraftsColumn({
  aircraftData,
  utilization
}: AircraftsColumnProps) {
  const isLoading = aircraftData.state === 'LOADING';
  const isError = aircraftData.state === 'ERROR';
  const isDone = aircraftData.state === 'DONE';

  const { data: aircrafts } = aircraftData;

  return (
    <div style={{ width: 300 }}>
      { isLoading && <CircularProgress data-testid="spinner" /> }
      { isError && <ErrorCard errorMessage="Planes failed to fetch!" /> }
      { isDone
        && aircrafts.map((a: any) => (
          <PlaneCard
            key={a.ident}
            planeId={a.ident}
            utilization={utilization}
          />
        ))}
    </div>
  );
}

const useStyles = makeStyles(() => createStyles({
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

export function PlaneCard({
  planeId,
  utilization
}: any) {
  const classes = useStyles();
  return (
    <Card className={classes.cardContainer}>
      <CardHeader title={planeId} />
      <CardContent className={classes.cardContainer}>
        <Flight fontSize="large" />
        <Typography variant="h5">
          {utilization}
        </Typography>
      </CardContent>
    </Card>
  );
}
