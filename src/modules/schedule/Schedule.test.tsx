import React from 'react';
import { render, screen } from '@testing-library/react';
import Schedule from './Schedule';

/** The purpose of this test is to check that the major app componenets
 *  (which are located within Schedule render */
test('render major app elements without errors', () => {
  render(<Schedule />);
  const footerTest = screen.getByText(/rubber donkey/i);
  expect(footerTest).toBeInTheDocument();

  const container = screen.getByTestId('app-container');
  expect(container).toBeVisible();

  const rowContainer = screen.getByTestId('row-container');
  expect(rowContainer).toBeVisible();
});
