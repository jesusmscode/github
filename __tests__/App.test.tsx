import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('renders the correct message', () => {
    const {getByText} = render(<App />);
    expect(getByText('hola')).toBeTruthy();
  });
});
