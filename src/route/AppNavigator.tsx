/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StatusBar} from 'react-native';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignInScreen from '../screens/SignInScreen';
import DrawerContent from '../screens/DrawerContent';
import SettingScreen from '../screens/SettingScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import AddFriendScreen from '../screens/AddFriendScreen';
import MessageScreen from '../screens/MessageScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function AppNavigator(): JSX.Element {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'dark-content'}
      />
      <Drawer.Navigator
        drawerContent={(props: any) => <DrawerContent {...props} />}
        initialRouteName="Splash"
        backBehavior="history"
        screenOptions={{
          headerShown: false,
          drawerPosition: 'left',
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="AddFriends" component={AddFriendScreen} />
        <Stack.Screen name="Message" component={MessageScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
