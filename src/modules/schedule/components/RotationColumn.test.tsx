import React from 'react';
import { render, screen } from '@testing-library/react';
import RotationColumn from './RotationColumn';

test('renders learn react link', () => {
  render(<RotationColumn />);
  const hiTest = screen.getByText(/hi/i);
  expect(hiTest).toBeInTheDocument();
});
