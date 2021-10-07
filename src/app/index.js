import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import React from 'react';
import AppNavigator from '@/screens/AppNavigator';

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <AppNavigator />
    </ApplicationProvider>
  );
}
