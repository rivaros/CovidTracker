import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {MAIN_SCREEN, COUNTRIES_SCREEN} from './constants';
import MainScreen from '../screens/Main';
import CountriesScreen from '../screens/Countries';

// ----- Main App navigation
const AppStack = createStackNavigator();

export const MainNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName={MAIN_SCREEN}>
        <AppStack.Screen
          name={MAIN_SCREEN}
          component={MainScreen}
          options={{
            headerShown: false,
          }}
        />

        <AppStack.Screen
          name={COUNTRIES_SCREEN}
          component={CountriesScreen}
          options={{
            headerShown: false,
          }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
