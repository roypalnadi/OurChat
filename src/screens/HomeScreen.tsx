import React from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import MainContent from '../components/MainContent';
import TopBar from '../components/TopBar';
import {StyleSheet} from 'react-native';
import {MD2Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {setUserToRedux} from '../utils/firestore/logic';

const HomeScreen = ({navigation}: {navigation: any}) => {
  setUserToRedux();
  return (
    <MainContent>
      <TopBar>
        <View style={styles.topBarControl}>
          <View style={{alignItems: 'flex-start', flex: 1}}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => {
                navigation.toggleDrawer();
              }}>
              <Icon name="bars" size={20} />
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'flex-start', flex: 1}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 28,
                color: MD2Colors.black,
              }}>
              OurChat
            </Text>
          </View>
          <View style={{alignItems: 'flex-end', flex: 1}}>
            {/* <TouchableOpacity
              style={styles.controlButton}
              onPress={() => {
                logout().then(() => {
                  navigation.navigate('Login');
                });
              }}>
              <Icon name="sign-out" size={20} />
            </TouchableOpacity> */}
          </View>
        </View>
      </TopBar>
      <ImageBackground
        resizeMode="cover"
        style={{flex: 1}}
        source={require('../assets/home.png')}
      />
    </MainContent>
  );
};

const styles = StyleSheet.create({
  topBarControl: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controlButton: {
    marginHorizontal: 15,
  },
});

export default HomeScreen;
