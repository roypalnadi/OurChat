import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import MainContent from '../components/MainContent';
import {
  ActivityIndicator,
  Button,
  MD2Colors,
  Text,
  TextInput,
} from 'react-native-paper';
import {login} from '../utils/auth/loginByEmail';
import Icon from 'react-native-vector-icons/FontAwesome';

const indicator = (process: boolean) => {
  const indicator = (
    <ActivityIndicator animating={true} color={MD2Colors.black} />
  );

  const loginIcon = <Icon name="sign-in" size={20} color="#000000" />;

  if (process) {
    return indicator;
  }
  return loginIcon;
};

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [getProcess, setProcess] = useState(false);

  const loginProcess = () => {
    if (email === '' || password === '') {
      Alert.alert('Warning', 'Enter details to login');
    } else {
      login(email, password)
        .then(() => {
          navigation.navigate('Home');
        })
        .catch(() => {
          setProcess(false);
        });
    }
  };

  return (
    <MainContent>
      <View style={styles.container}>
        <Text style={styles.text}>Welcome</Text>
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
          <View style={styles.buttonControl}>
            <Button
              style={styles.button}
              icon="account-plus"
              mode="elevated"
              dark={false}
              onPress={() => navigation.navigate('Sign In')}>
              Sign In
            </Button>
            <Button
              style={styles.button}
              icon={() => indicator(getProcess)}
              mode="elevated"
              dark={false}
              onPress={() => {
                setProcess(true);
                loginProcess();
              }}>
              Login
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

export default LoginScreen;
