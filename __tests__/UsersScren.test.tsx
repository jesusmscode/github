import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {UsersScreen} from '../src/presentation/screens/UsersScreens';

// Mock de los hooks y componentes
jest.mock('../src/presentation/hooks/useUsers', () => ({
  useUser: jest.fn(),
}));
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('UsersScreen', () => {
  it('renders loading indicator when loading', () => {
    require('../src/presentation/hooks/useUsers').useUser.mockReturnValue({
      loading: true,
      error: null,
      users: [],
      searchUsers: jest.fn(),
    });

    const {getByTestId} = render(<UsersScreen />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders error message when there is an error', () => {
    const errorMessage = 'Error fetching users';
    require('../src/presentation/hooks/useUsers').useUser.mockReturnValue({
      loading: false,
      error: {message: errorMessage},
      users: [],
      searchUsers: jest.fn(),
    });

    const {getByText} = render(<UsersScreen />);
    expect(getByText(errorMessage)).toBeTruthy();
  });

  it('renders user list when users are loaded', () => {
    const mockUsers = [
      {id: 1, name: 'User1'},
      {id: 2, name: 'User2'},
    ];
    require('../src/presentation/hooks/useUsers').useUser.mockReturnValue({
      loading: false,
      error: null,
      users: mockUsers,
      searchUsers: jest.fn(),
    });

    render(<UsersScreen />);
    const element1 = screen.getByRole('text', {name: 'User1'});
    expect(element1).toBeDefined();
    const element2 = screen.getByRole('text', {name: 'User2'});
    expect(element2).toBeDefined();
  });
});
