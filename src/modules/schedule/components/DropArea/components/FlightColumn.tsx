import React from 'react';
import { Button, CircularProgress, Typography } from '@material-ui/core';

import { Draggable } from 'react-beautiful-dnd';

import ErrorCard from '../../../shared/ErrorCard';
import FlightCard from '../../../shared/FlightCard';

interface FlightColumnProps {
  flightData: any;
  onMoreClick: () => void
}

export default function FlightColumn({
  flightData,
  onMoreClick
}: FlightColumnProps) {
  const isLoading = flightData.state === 'LOADING';
  const isError = flightData.state === 'ERROR';
  const isDone = flightData.state === 'DONE';

  const { data: flights } = flightData;
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography>
          Available Flights
        </Typography>
        <Button
          onClick={onMoreClick}
          style={{ marginLeft: 12 }}
          size="small"
          variant="outlined"
        >
          Load More
        </Button>
      </div>
      <div style={{
        height: '80vh', padding: 6, width: 300, overflow: 'auto'
      }}
      >
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
    </>
  );
}
