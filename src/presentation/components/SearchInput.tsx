import React, {useState} from 'react';
import {Button, TextInput, View, StyleSheet} from 'react-native';

interface Props {
  onSearch: (query: string) => void;
}

export const SearchInput: React.FC<Props> = ({onSearch}) => {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder="Search GitHub users..."
      />
      <Button title="Search" onPress={() => onSearch(query)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
  },
});
