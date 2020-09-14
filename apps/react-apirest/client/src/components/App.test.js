/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders main App', () => {
  const { getByText } = render(<App />);
  const appComponent = getByText(/Retire/i);
  expect(appComponent).toBeInTheDocument();
});
