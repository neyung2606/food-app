import React, { useContext } from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import { MyContext } from '@/context';

const SplashScreen = props => {
  const { actions, stores } = useContext(MyContext)
  const onAnimationFinish = () => {
    actions.setIsSplash(false);
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={require('@/assets/splash.json')}
        autoPlay
        loop={false}
        speed={0.5}
        onAnimationFinish={onAnimationFinish}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
