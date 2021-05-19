import React from 'react';
import { render, screen } from '@testing-library/react';
import DateHeader from './DateHeader';

test('renders learn react link', () => {
  render(<DateHeader />);
  const hiTest = screen.getByText(/hi/i);
  expect(hiTest).toBeInTheDocument();
});
