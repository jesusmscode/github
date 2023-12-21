import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('renders the correct message', () => {
    const {findByText} = render(<App />);
    expect(findByText('search')).toBeTruthy();
  });
});
