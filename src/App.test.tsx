import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the hero with my name', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /angel zapata/i })).toBeInTheDocument();
});
