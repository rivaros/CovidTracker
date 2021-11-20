import React from 'react';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {POPUP_ADD_NEW_CASE} from './constants';
import AddCase from '../screens/ReportCase';

type StackNavigatorType = ReturnType<typeof createStackNavigator>;

export const PopupOverlays = (Stack: StackNavigatorType) => {
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
