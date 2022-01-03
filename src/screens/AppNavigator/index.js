import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
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
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ProhibitSign from '@/components/TopTabsHome/ProhibitSign';
import DangerSign from '@/components/TopTabsHome/DangerSign';
import CommandSign from '@/components/TopTabsHome/CommandSign';
import ExtraSign from '@/components/TopTabsHome/ExtraSign';
import IntrustionSign from '@/components/TopTabsHome/IntrustionSign';
import axios from 'axios'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTabHome = createMaterialTopTabNavigator();

const optsTopTabs = {
  labelStyle: {fontSize: 14},
  tabStyle: { width: 'auto'},
  scrollEnabled : true,
  indicatorStyle: {
    backgroundColor: '#001e1d'
  },
  style: {
    backgroundColor: '#f9bc60',
    color: '#001e1d'
  }
};

const StackCamera = () => (
  <Stack.Navigator
    initialRouteName="SelectionImage"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="SelectionImage" component={NotificationScreen} />
    <Stack.Screen name="Camera" component={CameraShot} />
    <Stack.Screen name="Collections" component={ChooseImage} />
    <Stack.Screen name="InfoTraffic" component={ReadTraffic} />
  </Stack.Navigator>
);

const TopTabsHome = () => {
  return (
    <TopTabHome.Navigator tabBarOptions={optsTopTabs}>
      <TopTabHome.Screen name="tất cả" component={HomeScreen} />
      <TopTabHome.Screen name="biển báo cấm" component={ProhibitSign} />
      <TopTabHome.Screen name="biển báo nguy hiểm" component={DangerSign} />
      <TopTabHome.Screen name="biển báo hiệu lệnh" component={CommandSign} />
      <TopTabHome.Screen name="biển báo chỉ dẫn" component={IntrustionSign} />
      <TopTabHome.Screen name="biển phụ" component={ExtraSign} />
    </TopTabHome.Navigator>
  );
}

const Tabs = [
  {
    name: 'Biển báo giao thông',
    component: TopTabsHome,
    icon: 'traffic-light',
    activeColor: '#001e1d',
    inActiveColor: 'gray',
  },
  {
    name: 'Lịch sử',
    component: ActivityScreen,
    icon: 'history',
    activeColor: '#001e1d',
    inActiveColor: 'gray',
  },
  {
    name: 'Nhận diện',
    component: StackCamera,
    icon: 'camera',
    activeColor: '#001e1d',
    inActiveColor: 'gray',
  },
];
export const TabButton = props => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <View style={styles.tab}>
        <Icon
          name={item.icon}
          size={20}
          color={focused ? item.activeColor : item.inActiveColor}
          solid
        />
        <Text style={{ width: 'auto', fontSize: 12, color: 'black', textAlign: 'center'}}>{ item.name }</Text>
      </View>
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
  tab: {
    height: 'auto',
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
