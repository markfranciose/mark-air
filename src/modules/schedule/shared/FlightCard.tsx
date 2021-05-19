import React from 'react';
import {
  Card, CardHeader, CardContent, Typography
} from '@material-ui/core';
import FlightType from '../../../types/flight';

interface FlightCardProps {
  flight: FlightType
}

export default function FlightCard({ flight }: FlightCardProps) {
  console.log(flight);
  return (
    <Card>
      <CardHeader title={`Flight: ${flight.id}`} />
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography>
              {flight.origin}
            </Typography>
            <Typography>
              {flight.readable_departure}
            </Typography>
          </div>
          <div>
            <Typography>
              {flight.destination}
            </Typography>
            <Typography>
              {flight.readable_arrival}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
