import React, {useContext, useEffect, useRef} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MyContext} from '@context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SplashScreen from '@screens/SplashScreen';
import HomeScreen from '@screens/HomeScreen';
import ActivityScreen from '@screens/ActivityScreen';
import NotificationScreen from '@screens/NotificationScreen';
import CameraShot from '@/components/CameraShot';
import ChooseImage from '@/components/ChooseImage';
import ReadTraffic from '@/components/ReadTraffic';
import * as Animatable from 'react-native-animatable';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackCamera = () => (
  <Stack.Navigator initialRouteName="SelectionImage" screenOptions={{headerShown: false}}>
    <Stack.Screen name="SelectionImage" component={NotificationScreen} />
    <Stack.Screen name="Camera" component={CameraShot} />
    <Stack.Screen name="Collections" component={ChooseImage} />
    <Stack.Screen name="InfoTraffic" component={ReadTraffic} />
  </Stack.Navigator>
);

const Tabs = [
  {
    name: 'Biển báo giao thông',
    component: HomeScreen,
    icon: 'traffic-light',
    activeColor: '#001e1d',
    inActiveColor: 'gray',
  },
  {
    name: 'Activity',
    component: ActivityScreen,
    icon: 'history',
    activeColor: '#001e1d',
    inActiveColor: 'gray',
  },
  {
    name: 'Notification',
    component: StackCamera,
    icon: 'camera',
    activeColor: '#001e1d',
    inActiveColor: 'gray',
  },
];
export const TabButton = props => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: {scale: 1},
        1: {scale: 1.5},
      });
    } else {
      viewRef.current.animate({
        0: {scale: 1.5},
        1: {scale: 1},
      });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <Icon
          name={item.icon}
          size={20}
          color={focused ? item.activeColor : item.inActiveColor}
          solid
        />
      </Animatable.View>
    </TouchableOpacity>
  );
};

const screenOptions = {
  tabBarActiveTintColor: '#001e1d',
  tabBarInactiveTintColor: 'gray',
  headerShown: false,
};

const AppNavigator = () => {
  const {stores} = useContext(MyContext);
  return (
    <NavigationContainer>
      {stores.isSplash ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={SplashScreen} />
        </Stack.Navigator>
      ) : (
        <>
          <Tab.Navigator screenOptions={screenOptions}>
            {Tabs.map((item, index) => (
              <Tab.Screen
                name={item.name}
                component={item.component}
                key={index}
                options={{
                  tabBarButton: props => <TabButton {...props} item={item} />,
                }}
              />
            ))}
          </Tab.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
