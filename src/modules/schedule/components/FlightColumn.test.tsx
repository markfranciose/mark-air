import React from 'react';
import { render, screen } from '@testing-library/react';
import FlightColumn from './FlightColumn';

test('renders learn react link', () => {
  render(<FlightColumn />);
  const hiTest = screen.getByText(/hi/i);
  expect(hiTest).toBeInTheDocument();
});
