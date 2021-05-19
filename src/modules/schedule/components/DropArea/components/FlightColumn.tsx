import React from 'react';
import { CircularProgress, Typography } from '@material-ui/core';

import { Draggable } from 'react-beautiful-dnd';

import ErrorCard from '../../../shared/ErrorCard';
import FlightCard from '../../../shared/FlightCard';

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
    <div style={{ height: '80vh', width: 300, overflow: 'auto' }}>
      <Typography>
        Available Flights
      </Typography>
      { isLoading && <CircularProgress data-testid="spinner" /> }
      { isError && <ErrorCard errorMessage="Flights Failed to Fetch!" /> }
      { isDone
          && flights.map((a: any, index: number) => (
            <Draggable
              key={a.id}
              draggableId={a.id}
              index={index}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <FlightCard flight={a} />
                </div>
              )}
            </Draggable>
          ))}

    </div>
  );
}
