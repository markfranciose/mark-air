import React from 'react';
import { Typography } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';

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
      <Typography>{selectedAircraftName}</Typography>
      {rotation.map((a: any, index: number) => {
        console.log(a);
        return (
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
        );
      })}
    </>
  );
}
