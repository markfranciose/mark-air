import React from 'react';
import { render, screen } from '@testing-library/react';
import Schedule from './Schedule';

test('renders learn react link', () => {
  render(<Schedule />);
  const hiTest = screen.getByText(/hi/i);
  expect(hiTest).toBeInTheDocument();
});
