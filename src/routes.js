import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  Main  from './pages/Main';
import  User  from './pages/Main';

const Stack = createStackNavigator();

export const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
      name="Main"
      component={Main}
      options={
        {
          title: 'Usuários',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#7159c1',
          },
          headerTintColor: '#FFF'
        }
      } />
      <Stack.Screen name="User" component={User} />
    </Stack.Navigator>
  </NavigationContainer>
);

