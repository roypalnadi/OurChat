/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import AppNavigator from './src/route/AppNavigator';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

function App(): JSX.Element {
  useEffect(() => {
    const setToken = (token: any) => {
      firestore().collection('users').doc(auth().currentUser?.uid).update({
        fcmToken: token,
      });
    };

    messaging().onTokenRefresh(newToken => {
      setToken(newToken);
    });

    // Mendapatkan token FCM saat ini
    messaging()
      .getToken()
      .then(token => {
        setToken(token);
      });
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;
