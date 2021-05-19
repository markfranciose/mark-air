import React from 'react';
import { render, screen } from '@testing-library/react';
import DateHeader from './DateHeader';

test('Static UI elements', () => {
  render(<DateHeader />);
  const flightText = screen.getByText(/flight scheduling/i);
  expect(flightText).toBeInTheDocument();

  const navBeforeIcon = screen.getByTestId('nav-back');
  expect(navBeforeIcon).toBeVisible();

  const navNextIcon = screen.getByTestId('nav-forward');
  expect(navNextIcon).toBeVisible();
});

test('Date is "tomorrow"', () => {
  render(<DateHeader />);
  const TODAY = new Date().getTime();
  const TOMORROW = new Date(TODAY + 86400000);
});
