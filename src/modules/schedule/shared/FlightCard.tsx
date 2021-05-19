import React from 'react';
import {
  Card, CardHeader, CardContent, Typography
} from '@material-ui/core';
import FlightType from '../../../types/flight';

interface FlightCardProps {
  flight: FlightType
}

export default function FlightCard({ flight }: FlightCardProps) {
  return (
    <Card>
      <CardHeader title={`Flight: ${flight.id}`} />
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography data-testid="origin-text">
              {flight.origin}
            </Typography>
            <Typography data-testid="departure-time">
              {flight.readable_departure}
            </Typography>
          </div>
          <div>
            <Typography data-testid="destination-text">
              {flight.destination}
            </Typography>
            <Typography data-testid="arrival-text">
              {flight.readable_arrival}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
