import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import DateHeader from './components/DateHeader';
import AircraftsColumn from './components/AircraftsColumn';
import RotationColumn from './components/RotationColumn';
import FlightColumn from './components/FlightColumn';
import UsageViz from './components/UsageViz';

import { useAirplanes, useFlights } from '../../api/api';

export default function Schedule() {
  const aircraftData = useAirplanes();
  const flightData = useFlights();

  const [rotation, setRotation] = useState<any>([]);
  console.log(setRotation);

  function handleDrag(x: any) {
    setRotation([x.draggableId]);
  }

  return (
    <>
      <DateHeader />
      <AircraftsColumn aircraftData={aircraftData} />
      <DragDropContext onDragEnd={handleDrag}>
        <Droppable droppableId="rotation">
          {(provided) => (
            <div ref={provided.innerRef}>
              <RotationColumn
                selectedAircraftName="hi"
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
      <UsageViz />
    </>
  );
}
