import React from 'react';

import DateHeader from './components/DateHeader';
import AircraftsColumn from './components/AircraftsColumn';
import RotationColumn from './components/RotationColumn';
import FlightColumn from './components/FlightColumn';

export default function Schedule() {
  // const [aircrafts, setAircrafts] = useState<any[]>([]);
  return (
    <>
      <DateHeader />
      <AircraftsColumn />
      <RotationColumn selectedAircraftName="hi" />
      <FlightColumn />
    </>
  );
}
