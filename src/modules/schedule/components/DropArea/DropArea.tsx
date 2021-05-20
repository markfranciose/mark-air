import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import RotationColumn from './components/RotationColumn';
import FlightColumn from './components/FlightColumn';

export default function DropArea({
  handleDrag,
  flightData,
  onMoreClick,
  rotation,
  selectedAircraftName
}: any) {
  return (
    <DragDropContext onDragEnd={handleDrag}>
      <Droppable droppableId="rotation">
        {(provided) => (
          <div
            style={{ height: '80vh', display: 'flex', flexDirection: 'column' }}
            ref={provided.innerRef}
          >
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
            <FlightColumn
              flightData={flightData}
              onMoreClick={onMoreClick}
            />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
