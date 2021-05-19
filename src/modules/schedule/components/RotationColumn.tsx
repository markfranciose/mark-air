import React from 'react';
import { Typography } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import FlightCard from '../shared/FlightCard';

interface RotationColumnProps {
  selectedAircraftName: string,
  rotation: any
}

export default function RotationColumn({
  selectedAircraftName,
  rotation
}: RotationColumnProps) {
  return (
    <div style={{ minHeight: 300, width: 240, border: rotation.length ? 'none' : '3px dashed black' }}>
      <Typography>{`Rotation: ${selectedAircraftName}`}</Typography>
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
  );
}
