import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders `Getting Things Done` Title', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Getting Things Done/i);
  expect(linkElement).toBeInTheDocument();
});
