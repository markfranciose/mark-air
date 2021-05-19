import React from 'react';
import { render, screen } from '@testing-library/react';
import DropArea from './DropArea';
import FlightType from '../../types/flight';

const stubFlights: FlightType[] = [
  {
    id: '1',
    arrivaltime: 200,
    departuretime: 1,
    destination: 'ORD',
    origin: 'ATL',
    readable_arrival: '2:00',
    readable_departure: '00:1'
  },
  {
    id: '2',
    arrivaltime: 2401,
    departuretime: 2400,
    destination: 'ATL',
    origin: 'ORD',
    readable_arrival: '25',
    readable_departure: '26'
  }
];

const recievedData = {
  state: 'DONE',
  data: stubFlights
}

function dragStub() { null }

test('renders static UI elements', () => {
  const TEST_NAME = "AAAAA";

  render(
    <DropArea
      handleDrag={dragStub}
      flightData={recievedData}
      rotation={[]}
      selectedAircraftName={TEST_NAME}
    />
  );
  const nameTest = screen.getByText(/AAAA/);
  expect(nameTest).toBeInTheDocument();
  const rotationText = screen.getByText(/Rotation:/);
  expect(rotationText).toBeInTheDocument();
  const flightText = screen.getByText(/Available Flights/);
  expect(flightText).toBeInTheDocument();
});

test('renders spinner for loading flight data', () => {
  const loadingData = {
    state: 'LOADING',
    data: []
  };

  render(
    <DropArea
      handleDrag={dragStub}
      flightData={loadingData}
      rotation={[]}
      selectedAircraftName={''}
    />
  );

  const spinner = screen.getByTestId('spinner');
  expect(spinner).toBeVisible();
})

test('renders error card with errored data fetch', () => {
  const errorData = {
    state: 'ERROR',
    data: []
  };

  render(
    <DropArea
      handleDrag={dragStub}
      flightData={errorData}
      rotation={[]}
      selectedAircraftName={''}
    />
  );

  const errorCard = screen.getByTestId('error-card');
  expect(errorCard).toBeVisible();
})
