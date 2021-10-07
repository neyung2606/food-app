import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import AppNavigator from '@/screens/AppNavigator';
import {MyContextProvider} from '@/context';

export default function App() {
  return (
    <MyContextProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
        <AppNavigator />
      </ApplicationProvider>
    </MyContextProvider>
  );
}
