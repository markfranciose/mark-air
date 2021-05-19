import React from 'react';
import { render, screen } from '@testing-library/react';
import AircraftsColumn from './AircraftsColumn';

/** The 'ident' field is what we display for planes */
const successData = {
  state: 'DONE',
  data: [
    {
      ident: 'ZXZX',
    }
  ]
};

test('renders learn react link', () => {
  render(<AircraftsColumn aircraftData={successData} />);
  const aircraftName = screen.getByText(/ZXZX/i);
  expect(aircraftName).toBeInTheDocument();
});

test('renders loading spinner', () => {
  const loadingData = {
    state: 'LOADING',
    data: []
  };

  render(<AircraftsColumn aircraftData={loadingData} />);

  const spinner = screen.getByTestId('spinner');
  expect(spinner).toBeVisible();
});

test('renders an error card with a failed fetch', () => {
  const errorData = {
    state: 'ERROR',
    data: []
  };
  render(<AircraftsColumn aircraftData={errorData} />);
  
  const errorCard = screen.getByTestId('error-card');
  expect(errorCard).toBeVisible();
});

