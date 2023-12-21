import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Button,
} from 'react-native';
import {User} from '../../domain/entities/User';
import {useRepositories} from '../hooks/useRepositories';
import {useOrganizations} from '../hooks/useOrganizations';
import {useNavigation} from '@react-navigation/native';

interface Props {
  route: {
    params: {
      user: User;
    };
  };
}

export const UserDetailsScreen: React.FC<Props> = ({route}) => {
  const navigation = useNavigation();
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
      <Text>Ver:</Text>
      <Button
        title={String(user.personalURL)}
        /* itle={user.personaURL} */
        onPress={() =>
          navigation.navigate('WebUserScreen', {url: user?.personalURL})
        }
      />
      <Image
        testID="avatar"
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
