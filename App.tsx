/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';

import {QueryClientProvider, QueryClient} from 'react-query';
import {MainNavigator} from './src/navigation/MainNavigator';
import SplashScreen from 'react-native-splash-screen';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60, // 1 minute - Android threshold for timers
    },
  },
});

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <QueryClientProvider client={queryClient} contextSharing>
      <MainNavigator />
    </QueryClientProvider>
  );
};

export default App;
