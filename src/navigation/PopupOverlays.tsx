import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';
import {POPUP_ADD_NEW_CASE} from './constants';
import AddCase from '../screens/ReportCase';

export const PopupOverlays = Stack => {
  return (
    <Stack.Group
      screenOptions={{
        ...overlayTransition,
      }}>
      <Stack.Screen
        name={POPUP_ADD_NEW_CASE}
        component={AddCase}
        options={{
          safeAreaInsets: {top: 300},
        }}
      />
    </Stack.Group>
  );
};

export const overlayTransition = {
  presentation: 'transparentModal',
  cardOverlayEnabled: true,
  headerShown: false,
  gestureEnabled: true,
  gestureResponseDistance: 500,
  gestureDirection: 'vertical',
  ...TransitionPresets.ModalPresentationIOS,
};
