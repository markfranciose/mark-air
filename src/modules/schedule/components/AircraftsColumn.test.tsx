import React from 'react';
import { render, screen } from '@testing-library/react';
import AircraftsColumn from './AircraftsColumn';

test('renders learn react link', () => {
  render(<AircraftsColumn />);
  const hiTest = screen.getByText(/hi/i);
  expect(hiTest).toBeInTheDocument();
});
