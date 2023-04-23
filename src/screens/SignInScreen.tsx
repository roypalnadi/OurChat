import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import MainContent from '../components/MainContent';
import {
  ActivityIndicator,
  Button,
  MD2Colors,
  TextInput,
} from 'react-native-paper';
import {createUser} from '../utils/auth/loginByEmail';
import Icon from 'react-native-vector-icons/FontAwesome';
import messaging from '@react-native-firebase/messaging';

const indicator = (process: boolean) => {
  const indicator = (
    <ActivityIndicator animating={true} color={MD2Colors.black} />
  );

  const iconFLoppy = <Icon name="floppy-o" size={20} color="#000000" />;

  if (process) {
    return indicator;
  }
  return iconFLoppy;
};

const SignInScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [getProcess, setProcess] = useState(false);

  const signInProcess = async () => {
    if (email === '' || password === '' || repeatPassword === '') {
      Alert.alert('Warning', 'Enter details to sign in');
    } else if (password !== repeatPassword) {
      Alert.alert('Warning', 'Password not match');
    } else {
      const token = await messaging().getToken();
      const result = await createUser(email, password, token);
      if (result) {
        navigation.navigate('Home');
      } else {
        setProcess(false);
      }
    }

    setProcess(false);
  };

  return (
    <MainContent>
      <View style={styles.container}>
        <Text style={styles.text}>Sign In</Text>
        <View style={styles.formControl}>
          <TextInput
            mode="flat"
            label="Email"
            style={styles.textinput}
            right={<TextInput.Icon icon="email" />}
            onChangeText={value => setEmail(value)}
          />
          <TextInput
            mode="flat"
            label="Password"
            secureTextEntry
            style={styles.textinput}
            right={<TextInput.Icon icon="eye" />}
            onChangeText={value => setPassword(value)}
          />
          <TextInput
            mode="flat"
            label="Repeat Password"
            secureTextEntry
            style={styles.textinput}
            right={<TextInput.Icon icon="eye" />}
            onChangeText={value => setRepeatPassword(value)}
          />
          <View style={styles.buttonControl}>
            <Button
              style={styles.button}
              icon="login"
              mode="elevated"
              dark={false}
              onPress={() => navigation.navigate('Login')}>
              Login
            </Button>
            <Button
              style={styles.button}
              icon={() => indicator(getProcess)}
              mode="elevated"
              dark={false}
              onPress={() => {
                setProcess(true);
                signInProcess();
              }}>
              Save
            </Button>
          </View>
        </View>
      </View>
    </MainContent>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  formControl: {
    width: '80%',
    padding: 10,
  },
  buttonControl: {
    flexDirection: 'row',
  },
  textinput: {
    margin: 5,
  },
  button: {
    flex: 1,
    borderRadius: 0,
    margin: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SignInScreen;
