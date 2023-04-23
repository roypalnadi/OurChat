import React, {useEffect} from 'react';
import {ActivityIndicator, Text} from 'react-native';
import MainContent from '../components/MainContent';
import {MD2Colors} from 'react-native-paper';
import {getData} from '../utils/localStorage/logic';
import {login} from '../utils/auth/loginByEmail';

type dataLoginType = {
  email: string;
  password: string;
};

const SplashScreen = ({navigation}: any) => {
  useEffect(() => {
    const setScreen = (screen: string) => {
      navigation.reset({
        index: 0,
        routes: [{name: screen}],
      });
    };
    getData('dataLogin')
      .then(value => {
        if (value !== null) {
          const data: dataLoginType = JSON.parse(value);
          login((data?.email).toString(), data?.password)
            .then(() => {
              setScreen('Home');
            })
            .catch(() => {
              setScreen('Login');
            });
        } else {
          setScreen('Login');
        }
      })
      .catch(() => {
        setScreen('Login');
      });
  }, [navigation]);

  return (
    <MainContent style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 40, fontWeight: 'bold', color: MD2Colors.black}}>
        OurChat
      </Text>
      <ActivityIndicator
        animating={true}
        color={MD2Colors.black}
        size={'large'}
      />
    </MainContent>
  );
};

export default SplashScreen;
