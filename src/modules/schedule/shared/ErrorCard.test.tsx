import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorCard from './ErrorCard';

test('renders static UI elements', () => {
  render( <ErrorCard errorMessage='test' /> )

  const errorIcon = screen.getByTestId('error-icon');
  expect(errorIcon).toBeVisible();
});

test ('renders the dynamic errorMessage prop', () => {
  const message = "SADASFDAS";
  render( <ErrorCard errorMessage={message} />);

  const errorText = screen.getByTestId('error-message');
  expect(errorText).toHaveTextContent(message);
});
