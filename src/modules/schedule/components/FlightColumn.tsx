import React from 'react';
import { CircularProgress } from '@material-ui/core';

import { Draggable } from 'react-beautiful-dnd';

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
                  {a.id}
                </div>
              )}
            </Draggable>
          ))}

    </div>
  );
}
