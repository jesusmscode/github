import React from 'react';
import {render} from '@testing-library/react-native';
import {UserDetailsScreen} from '../src/presentation/screens/UserDetailsScreen';

jest.mock('../src/presentation/hooks/useRepositories', () => ({
  useRepositories: jest.fn(),
}));
jest.mock('../src/presentation/hooks/useOrganizations', () => ({
  useOrganizations: jest.fn(),
}));

describe('UserDetailsScreen', () => {
  const mockUser = {
    name: 'TestUser',
    avatarUrl: 'http://example.com/avatar.jpg',
  };

  it('renders user details correctly', () => {
    require('../src/presentation/hooks/useRepositories').useRepositories.mockReturnValue(
      {
        loading: false,
        error: null,
        repositories: ['repo1', 'repo2'],
      },
    );
    require('../src/presentation/hooks/useOrganizations').useOrganizations.mockReturnValue(
      {
        loading: false,
        error: null,
        organizations: ['org1', 'org2'],
      },
    );

    const route = {params: {user: mockUser}};
    const {getByText, getByTestId} = render(
      <UserDetailsScreen route={route} />,
    );

    expect(getByText('Name')).toBeTruthy();
    expect(getByText(mockUser.name)).toBeTruthy();
    expect(getByTestId('avatar').props.source.uri).toBe(mockUser.avatarUrl);
    expect(getByText('Organizations:')).toBeTruthy();
    expect(getByText('Repositories:')).toBeTruthy();
  });
});
