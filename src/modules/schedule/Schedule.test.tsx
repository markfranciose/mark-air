import React from 'react';
import { render, screen } from '@testing-library/react';
import Schedule from './Schedule';

test('FooterTest', () => {
  render(<Schedule />);
  const footerTest = screen.getByText(/rubber donkey/i);
  expect(footerTest).toBeInTheDocument();
});
