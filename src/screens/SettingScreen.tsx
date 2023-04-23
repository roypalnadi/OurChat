import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import MainContent from '../components/MainContent';
import TopBar from '../components/TopBar';
import {StyleSheet} from 'react-native';
import {MD2Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {logout} from '../utils/auth/loginByEmail';

const SettingScreen = ({navigation}: {navigation: any}) => {
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
              Settings
            </Text>
          </View>
          <View style={{alignItems: 'flex-end', flex: 1}} />
        </View>
      </TopBar>
      <View style={styles.controlItems}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.controlDetailItems}>
            <Icon name="user-circle-o" color={'#000000'} size={20} />
            <Text style={styles.text}>Profile</Text>
          </View>
          <View style={{borderBottomWidth: 1}}></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddFriends')}>
          <View style={styles.controlDetailItems}>
            <Icon name="user-plus" color={'#000000'} size={20} />
            <Text style={styles.text}>Add Friends</Text>
          </View>
          <View style={{borderBottomWidth: 1}}></View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            logout().then(() => {
              navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
              });
            })
          }>
          <View style={styles.controlDetailItems}>
            <Icon name="sign-out" color={'#000000'} size={20} />
            <Text style={styles.text}>LogOut</Text>
          </View>
          <View style={{borderBottomWidth: 1}}></View>
        </TouchableOpacity>
      </View>
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
  controlItems: {
    flex: 1,
    paddingVertical: 15,
  },
  controlDetailItems: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 20,
  },
});

export default SettingScreen;
