import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const footerText = screen.getByText(/rubber donkey/i);
  expect(footerText).toBeInTheDocument();
});
