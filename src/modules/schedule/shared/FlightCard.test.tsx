import React from 'react';
import { render, screen } from '@testing-library/react';
import FlightCard from './FlightCard';
import FlightType from '../../../types/flight';

test('renders the passed flight data', () => {
  const flightStub: FlightType = {
    id: 'aaaa',
    arrivaltime: 1,
    departuretime: 2,
    destination: 'aaa',
    origin: 'bbb',
    readable_arrival: 'ccc',
    readable_departure: 'ddd'
  };

  render(
    <FlightCard
      flight={flightStub}
    />
  )

  /** Matching the data object fields to the test-ids, and checking for the correct displayed values */
  const destinationText = screen.getByTestId('destination-text');
  expect(destinationText).toHaveTextContent('aaa');

  const originText = screen.getByTestId('origin-text');
  expect(originText).toHaveTextContent('bbb');

  const arrivalTime = screen.getByTestId('arrival-text');
  expect(arrivalTime).toHaveTextContent('ccc');

  const depTime = screen.getByTestId('departure-time');
  expect(depTime).toHaveTextContent('ddd');
})
