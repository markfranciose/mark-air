import React, { useEffect, useState } from 'react';
import idx from 'idx';
import { Typography } from '@material-ui/core';

import DateHeader from './components/DateHeader';
import AircraftsColumn from './components/AircraftsColumn';
import DropArea from './components/DropArea/DropArea';
import UsageViz from './components/UsageViz';

import { useAirplanes, useFlights, getMoreFlights } from '../../api/api';
import { isValidRotation } from '../../helpers/helpers';

export default function Schedule() {
  const [rotation, setRotation] = useState<any>([]);
  const [coolFlights, setCoolFlights] = useState<any>([]);
  const aircraftData = useAirplanes();
  const flightData = useFlights();

  useEffect(() => {
    if (flightData.state === 'DONE') {
      const flights = flightData.data;
      setCoolFlights(flights);
    }
  }, [flightData]);

  const SELECTED_AIRCRAFT_NAME = idx(aircraftData, (airData: any) => airData.data[0].ident) || '';

  /** We remove flights already in rotation from 'available flights' */
  const filteredFlightData: any = {
    state: flightData.state,
    data: coolFlights.filter((f: any) => !rotation.map((r: any) => r.id).includes(f.id))
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
      addFlightToRotation(x.draggableId, x.destination.index);
    }
  }

  function removeFromRotation(flightId: string) {
    const newR = rotation.filter((r: any) => r.id !== flightId);
    setRotation(newR);
  }

  function addFlightToRotation(flightId: string, index: number) {
    const newRotation = Array.from(rotation);
    const flight = coolFlights.find((x: any) => x.id === flightId);
    newRotation.splice(index, 0, flight);
    setRotation(newRotation);
  }

  function reorderRotation(startIndex: number, endIndex: number) {
    const newRotation = Array.from(rotation);
    const [removed] = newRotation.splice(startIndex, 1);
    newRotation.splice(endIndex, 0, removed);

    setRotation(newRotation);
  }

  const utilization = calculateUtlization(rotation);
  const validRotation = isValidRotation(rotation);
  const displayedUtilization = validRotation
    ? `${utilization.toFixed(1)}% utilized`
    : 'INVALID';

  function resetRotation() { setRotation([]); }

  function handleMoreClick() {
    getMoreFlights(coolFlights.length)
      .then((r: any) => {
        const moreFlights = r.data.data;
        if (moreFlights.length) {
          setCoolFlights([...coolFlights, ...moreFlights]);
        }
      })
      .catch(() => {
        // handle error with alert / popper
      });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <DateHeader />
      <UsageViz
        resetRotation={resetRotation}
        rotation={rotation}
      />
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100vw'
      }}
      >
        <AircraftsColumn
          utilization={displayedUtilization}
          aircraftData={aircraftData}
        />
        <DropArea
          onMoreClick={handleMoreClick}
          handleDrag={handleDrag}
          selectedAircraftName={SELECTED_AIRCRAFT_NAME}
          rotation={rotation}
          flightData={filteredFlightData}
        />
      </div>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <Typography>
      (c) Rubber Donkey Airlines
    </Typography>
  );
}

// helpers
function calculateUtlization(rotation: any) {
  const time = rotation.reduce((acc: number, o: any) => acc + (o.arrivaltime - o.departuretime), 0);

  return (time / 86400) * 100;
}
