import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UsersScreen} from '../screens/UsersScreens';
import {UserDetailsScreen} from '../screens/UserDetailsScreen';
import {WebUserScreen} from '../screens/WebViewScreen';

const Stack = createNativeStackNavigator();

export function AppRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={UsersScreen} />
        <Stack.Screen name="UserDetailsScreen" component={UserDetailsScreen} />
        <Stack.Screen name="WebUserScreen" component={WebUserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
