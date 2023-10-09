import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import {User} from '../../domain/entities/User';
import {useRepositories} from '../hooks/useRepositories';
import {useOrganizations} from '../hooks/useOrganizations';

interface Props {
  route: {
    params: {
      user: User;
    };
  };
}

export const UserDetailsScreen: React.FC<Props> = ({route}) => {
  const {user} = route.params;
  const {
    loading: loadingRepos,
    error: errorRepos,
    repositories,
  } = useRepositories(user.name);
  const {
    loading: loadingOrgs,
    error: errorOrgs,
    organizations,
  } = useOrganizations(user.name);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Name</Text>
      <Text>{user.name}</Text>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: user.avatarUrl,
        }}
      />
      <Text style={styles.title}>Organizations:</Text>
      <FlatList
        data={organizations}
        renderItem={({item}) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
        disableVirtualization={true}
      />

      <Text style={styles.title}>Repositories:</Text>
      <FlatList
        data={repositories}
        disableVirtualization={true}
        renderItem={({item}) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 40,
    paddingBottom: 10,
  },
  tinyLogo: {
    width: 66,
    height: 58,
    borderRadius: 50,
    alignSelf: 'center',
  },
  title: {
    alignSelf: 'center',
    color: '#000000',
    marginTop: 20,
    fontWeight: 'bold',
  },
});
