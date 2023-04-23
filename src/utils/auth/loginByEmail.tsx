import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {removeData, storeData} from '../localStorage/logic';

export const createUser = (email: string, password: any, token: string) => {
  return auth()
    .createUserWithEmailAndPassword(email, password)
    .then(result => {
      const uid = result.user.uid;
      firestore().collection('users').doc(uid).set({
        uid: uid,
        name: 'Set Name First',
        hasImage: false,
        imageUrl: '',
        fcmToken: token,
      });

      const data = {
        email: email,
        password: password,
      };
      storeData('dataLogin', JSON.stringify(data));

      return true;
    })
    .catch(() => {
      Alert.alert('Warning', 'Cant Sign In');
    });
};

export const login = (email: string, password: any) => {
  return auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      const data = {
        email: email,
        password: password,
      };
      storeData('dataLogin', JSON.stringify(data));
      return true;
    })
    .catch(error => {
      Alert.alert(error.code, error.message);
      throw error;
    });
};

export const getCurrentUser = () => {
  return auth().currentUser;
};

export const logout = () => {
  return auth()
    .signOut()
    .then(() => {
      removeData('dataLogin');
    });
};
