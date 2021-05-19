import React from 'react';

import DateHeader from './components/DateHeader';
import AircraftsColumn from './components/AircraftsColumn';
import RotationColumn from './components/RotationColumn';
import FlightColumn from './components/FlightColumn';

import { useAirplanes, useFlights } from '../../api/api';

export default function Schedule() {
  const aircraftData = useAirplanes();
  const flightData = useFlights();

  return (
    <>
      <DateHeader />
      <AircraftsColumn aircraftData={aircraftData} />
      <RotationColumn selectedAircraftName="hi" />
      <FlightColumn flightData={flightData} />
    </>
  );
}
