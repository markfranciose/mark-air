import React, { useState } from 'react';
import idx from 'idx';
import { Typography } from '@material-ui/core';

import DateHeader from './components/DateHeader';
import AircraftsColumn from './components/AircraftsColumn';
import DropArea from './components/DropArea/DropArea';
import UsageViz from './components/UsageViz';

import { useAirplanes, useFlights } from '../../api/api';

export default function Schedule() {
  const [rotation, setRotation] = useState<any>([]);
  const aircraftData = useAirplanes();
  const flightData = useFlights();

  const allFlights = flightData.data || [];
  const SELECTED_AIRCRAFT_NAME = idx(aircraftData, (airData: any) => airData.data[0].ident) || '';

  /** We remove flights already in rotation from 'available flights' */
  const filteredFlightData: any = {
    state: flightData.state,
    data: allFlights.filter((f: any) => !rotation.map((r: any) => r.id).includes(f.id))
  };

  /** container function to decide which type of list (flight/rotation) ordering to change */
  function handleDrag(x: any) {
    const { destination, source } = x;
    if (!destination) { return; }
    const flightToFlight = destination.droppableId === 'flight' && source.droppableId === 'flight';
    const rotationToRotation = source.droppableId === 'rotation' && source.droppableId === 'rotation';
    const rotationToFlight = destination.droppableId === 'flight' && source.droppableId === 'rotation';
    const flightToRotation = destination.droppableId === 'rotation' && source.droppableId === 'flight';
    if (flightToFlight) { return; }

    if (rotationToFlight) {
      removeFromRotation(x.draggableId);
    } else if (rotationToRotation) {
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
  }

  return (
    <>
      <DateHeader />
      <UsageViz rotation={rotation} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
        <AircraftsColumn aircraftData={aircraftData} />
        <DropArea
          handleDrag={handleDrag}
          selectedAircraftName={SELECTED_AIRCRAFT_NAME}
          rotation={rotation}
          flightData={filteredFlightData}
        />
      </div>
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <Typography>
      (c) Rubber Donkey Airlines
    </Typography>
  );
}
