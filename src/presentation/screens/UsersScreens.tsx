import React from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import {SearchInput} from '../components/SearchInput';
import {GithubAPIAdapter} from '../../infra/api';
import {useUser} from '../hooks/useUsers';
import {UserList} from '../components/UserList';
import {useNavigation} from '@react-navigation/native';

export const UsersScreen: React.FC = () => {
  const navigation = useNavigation();
  const repository = new GithubAPIAdapter();
  const {loading, error, users, searchUsers} = useUser(repository);

  return (
    <View style={styles.container}>
      <SearchInput onSearch={searchUsers} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>{error.message}</Text>
      ) : (
        <UserList
          users={users}
          onSelectUser={selectedUser =>
            navigation.navigate('UserDetailsScreen', {user: selectedUser})
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
