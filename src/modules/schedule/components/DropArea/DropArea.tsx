import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import RotationColumn from './components/RotationColumn';
import FlightColumn from './components/FlightColumn';

export default function DropArea({
  handleDrag,
  flightData,
  rotation,
  selectedAircraftName
}: any) {
  return (
    <DragDropContext onDragEnd={handleDrag}>
      <Droppable droppableId="rotation">
        {(provided) => (
          <div ref={provided.innerRef}>
            <RotationColumn
              selectedAircraftName={selectedAircraftName}
              rotation={rotation}
            />
          </div>
        )}
      </Droppable>
      <Droppable droppableId="flight">
        {(provided) => (
          <div ref={provided.innerRef}>
            <FlightColumn flightData={flightData} />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
