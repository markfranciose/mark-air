import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import DateHeader from './components/DateHeader';
import AircraftsColumn from './components/AircraftsColumn';
import RotationColumn from './components/RotationColumn';
import FlightColumn from './components/FlightColumn';
import UsageViz from './components/UsageViz';

import { useAirplanes, useFlights } from '../../api/api';

export default function Schedule() {
  const [rotation, setRotation] = useState<any>([]);

  const aircraftData = useAirplanes();
  const flightData = useFlights();
  const allFlights = flightData.data || [];

  const coolData = {
    state: flightData.state,
    data: allFlights.filter((f: any) => !rotation.map((r: any) => r.id).includes(f.id))
  };
  console.log(coolData);

  function handleDrag(x: any) {
    const { destination, source } = x;
    if (!destination) { return; }
    const flightToFlight = destination.droppableId === 'flight' && source.droppableId === 'flight';
    // const rotationToRotation = source.droppableId === 'rotation' &&
    const rotationToFlight = destination.droppableId === 'flight' && source.droppableId === 'rotation';
    const flightToRotation = destination.droppableId === 'rotation' && source.droppableId === 'flight';
    if (flightToFlight) { return; }
    if (rotationToFlight) { removeFromRotation(); }
    if (flightToRotation) { addFlightToRotation(x.draggableId); }
    // setRotation([x.draggableId]);
  }

  function removeFromRotation() {
    setRotation([]);
  }

  function addFlightToRotation(flightId: string) {
    const flight = allFlights.find((x: any) => x.id === flightId);
    setRotation([flight]);
  }

  return (
    <>
      <DateHeader />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                <FlightColumn flightData={coolData} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <UsageViz />
    </>
  );
}
