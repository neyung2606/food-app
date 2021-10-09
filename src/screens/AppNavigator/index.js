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
import MeScreen from '@screens/MeScreen';
import * as Animatable from 'react-native-animatable';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Tabs = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: 'home',
    activeColor: 'tomato',
    inActiveColor: 'gray',
  },
  {
    name: 'Activity',
    component: ActivityScreen,
    icon: 'safari',
    activeColor: 'tomato',
    inActiveColor: 'gray',
  },
  {
    name: 'Notification',
    component: NotificationScreen,
    icon: 'bell',
    activeColor: 'tomato',
    inActiveColor: 'gray',
  },
  {
    name: 'Me',
    component: MeScreen,
    icon: 'user',
    activeColor: 'tomato',
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
        0: {scale: 1, rotate: '0deg'},
        1: {scale: 1.5, rotate: '360deg'},
      });
    } else {
      viewRef.current.animate({
        0: {scale: 1.5, rotate: '360deg'},
        1: {scale: 1, rotate: '0deg'},
      });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}
    >
      <Animatable.View ref={viewRef} duration={2000} style={styles.container}>
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
  tabBarActiveTintColor: 'tomato',
  tabBarInactiveTintColor: 'gray',
  tabBarStyle: {
    position: 'absolute',
    height: 60,
    bottom: 16,
    left: 16,
    right: 16,
    borderRadius: 10,
  },
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
        <Tab.Navigator screenOptions={screenOptions}>
          {Tabs.map((item, index) => (
            <Tab.Screen
              name={item.name}
              component={item.component}
              key={index}
              options={{
                tabBarShowLabel: false,
                tabBarButton: props => <TabButton {...props} item={item} />,
              }}
            />
          ))}
        </Tab.Navigator>
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
