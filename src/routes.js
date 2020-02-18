import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './pages/Main';
import User from './pages/User';
import ContentStar from './pages/ContentStar';

const Stack = createStackNavigator();

export const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          title: 'Usuários',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#7159c1',
          },
          headerTintColor: '#FFF',
        }}
      />
      <Stack.Screen
        name="User"
        component={User}
        options={({ route }) => ({
          title: route.params.item.name || route.params.item.login,
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#7159c1',
          },
          headerTintColor: '#fff',
        })}
      />
      <Stack.Screen
        name="ContentStar"
        component={ContentStar}
        options={({ route }) => ({
          title: route.params.item.name || route.params.item.login,
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#7159c1',
          },
          headerTintColor: '#fff',
        })}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
