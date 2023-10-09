import React from 'react';
import {FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {User} from '../../domain/entities/User';

interface Props {
  users: User[];
  onSelectUser: (user: User) => void;
}

export const UserList: React.FC<Props> = ({users, onSelectUser}) => {
  return (
    <FlatList
      data={users}
      keyExtractor={user => user.id.toString()}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => onSelectUser(item)}
          style={styles.item}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
});
