/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {QueryClientProvider, QueryClient} from 'react-query';
import {MainNavigator} from './src/navigation/MainNavigator';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60, // 1 minute - Android threshold for timers
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient} contextSharing>
      <MainNavigator />
    </QueryClientProvider>
  );
};

export default App;
