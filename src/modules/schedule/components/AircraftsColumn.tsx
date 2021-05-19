import React from 'react';
import { CircularProgress } from '@material-ui/core';

import ErrorCard from '../shared/ErrorCard';

interface AircraftsColumnProps {
  aircraftData: any;
}

export default function AircraftsColumn({
  aircraftData
}: AircraftsColumnProps) {
  const isLoading = aircraftData.state === 'LOADING';
  const isError = aircraftData.state === 'ERROR';
  const isDone = aircraftData.state === 'DONE';

  const { data: aircrafts } = aircraftData;

  return (
    <div>
      { isLoading && <CircularProgress /> }
      { isError && <ErrorCard /> }
      { isDone
        && aircrafts.map((a: any) => <p key={a.ident}>{a.ident}</p>) }
    </div>
  );
}
