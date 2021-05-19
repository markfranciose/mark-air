import React from 'react';
import { render, screen } from '@testing-library/react';
import UsageViz from './UsageViz';

const invalidRotationTime = [
  {
    id: 'a',
    arrivaltime: 3,
    departuretime: 1,
    destination: 'a',
    origin: 'b'
  },
  {
    id: 'b',
    arrivaltime: 200,
    departuretime: 5,
    destination: 'c',
    origin: 'a'
  }
];

test('Invalid rotation: not enough time in between flights display an "error" component', () => {
  render(<UsageViz rotation={invalidRotationTime} />);

  const invalidError = screen.getByTestId('invalid-rotation');
  expect(invalidError).toBeVisible();
})

const invalidRotationLocations = [
  {
    id: 'a',
    arrivaltime: 3,
    departuretime: 1,
    destination: 'a',
    origin: 'b'
  },
  {
    id: 'b',
    arrivaltime: 10002,
    departuretime: 10000,
    destination: 'x',
    origin: 'z'
  }
];

test('Invalid rotation: not enough time in between flights display an "error" component', () => {
  render(<UsageViz rotation={invalidRotationLocations} />);

  const invalidError = screen.getByTestId('invalid-rotation');
  expect(invalidError).toBeVisible();
})
