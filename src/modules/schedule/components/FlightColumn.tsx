import React from 'react';
import { CircularProgress } from '@material-ui/core';

import ErrorCard from '../shared/ErrorCard';

interface FlightColumnProps {
  flightData: any;
}

export default function FlightColumn({
  flightData
}: FlightColumnProps) {
  const isLoading = flightData.state === 'LOADING';
  const isError = flightData.state === 'ERROR';
  const isDone = flightData.state === 'DONE';

  const { data: flights } = flightData;
  return (
    <div>
      { isLoading && <CircularProgress /> }
      { isError && <ErrorCard /> }
      { isDone
        && flights.map((a: any) => <p key={a.id}>{a.id}</p>) }
    </div>
  );
}
