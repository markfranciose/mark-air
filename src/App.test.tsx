import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

/** The purpose of this test to verify that the entire app can bootstrap
 *  (and display our foorter text, without any errors */
test('renders the footer', async () => {
  await render(<App />);
  const footerText = screen.getByText(/rubber donkey/i);
  expect(footerText).toBeInTheDocument();
});
