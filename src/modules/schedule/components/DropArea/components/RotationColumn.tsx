import React from 'react';
import { Typography } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import FlightCard from '../../../shared/FlightCard';

interface RotationColumnProps {
  selectedAircraftName: string,
  rotation: any
}

export default function RotationColumn({
  selectedAircraftName,
  rotation
}: RotationColumnProps) {
  return (
    <>
      <Typography>{`Rotation: ${selectedAircraftName}`}</Typography>
      <div style={{
        flex: 1, minHeight: 300, width: 300, border: rotation.length ? 'none' : '3px dashed lightgrey'
      }}
      >
        {rotation.map((a: any, index: number) => (
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
