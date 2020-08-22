import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';

test('renders `Getting Things Done` Title', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = getByText(/Getting Things Done/i);
  expect(linkElement).toBeInTheDocument();
});
