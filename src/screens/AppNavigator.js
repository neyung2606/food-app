import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Button } from '@ui-kitten/components';
import tailwind from 'tailwind-rn';
export default function AppNavigator() {
  const [counter, setCounter] = React.useState(0);
  return (
    <SafeAreaView style={tailwind('h-full')}>
      <View style={tailwind('py-12 items-center')}>
        <View style={tailwind('bg-blue-200 px-3 py-1 rounded-full')}>
          <Text style={tailwind('text-blue-800 font-semibold')}>
            Hello Tailwind
          </Text>
        </View>
      </View>
      <Button onPress={() => setCounter(counter + 1)}>BUTTON</Button>
    </SafeAreaView>
  );
}
