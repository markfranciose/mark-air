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

  function handleDrag(x: any) {
    const { destination, source } = x;
    if (!destination) { return; }
    const flightToFlight = destination.droppableId === 'flight' && source.droppableId === 'flight';
    const rotationToRotation = source.droppableId === 'rotation' && source.droppableId === 'rotation';
    const rotationToFlight = destination.droppableId === 'flight' && source.droppableId === 'rotation';
    const flightToRotation = destination.droppableId === 'rotation' && source.droppableId === 'flight';
    if (flightToFlight) { return; }

    if (rotationToFlight) { removeFromRotation(x.draggableId); } else if (rotationToRotation) {
      reorderRotation(x.source.index, x.destination.index);
    } else if (flightToRotation) {
      addFlightToRotation(x.draggableId);
    }
  }

  function removeFromRotation(flightId: string) {
    const newR = rotation.filter((r: any) => r.id !== flightId);
    setRotation(newR);
  }

  function addFlightToRotation(flightId: string) {
    const flight = allFlights.find((x: any) => x.id === flightId);
    setRotation([...rotation, flight]);
  }

  function reorderRotation(startIndex: number, endIndex: number) {
    const newRotation = Array.from(rotation);
    const [removed] = newRotation.splice(startIndex, 1);
    newRotation.splice(endIndex, 0, removed);

    setRotation(newRotation);
  

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
      <UsageViz rotation={rotation} />
    </>
  );
}
