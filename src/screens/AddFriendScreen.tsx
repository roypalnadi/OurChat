import React, {useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import MainContent from '../components/MainContent';
import TopBar from '../components/TopBar';
import {StyleSheet} from 'react-native';
import {Button, MD2Colors, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getDataAccount} from '../utils/redux/logic';
import auth from '@react-native-firebase/auth';
import {checkUserName, setUserToRedux} from '../utils/firestore/logic';
import firestore from '@react-native-firebase/firestore';

const AddFriendScreen = ({navigation}: {navigation: any}) => {
  const dataUser = getDataAccount();
  const [userName, setUserName] = useState(dataUser.userName);

  const searchUserName = async () => {
    const uid = auth().currentUser?.uid ?? '';
    const dataFriend = await checkUserName(userName ?? '', uid);

    if (dataFriend === '') {
      Alert.alert('Warning', 'User name not found');
      return;
    }

    await firestore()
      .collection('users')
      .doc(uid)
      .update({
        friends: firestore.FieldValue.arrayUnion(dataFriend.uid),
      })
      .then(() => {
        setUserToRedux()
          .then(() => {
            navigation.navigate('Message', {
              name: dataFriend.name,
              hasImage: dataFriend.hasImage,
              imageUrl: dataFriend.imageUrl,
              uid: dataFriend.uid,
            });
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };

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
                fontSize: 25,
                color: MD2Colors.black,
              }}>
              Add Friends
            </Text>
          </View>
          <View style={{alignItems: 'flex-end', flex: 1}} />
        </View>
      </TopBar>
      <View style={styles.mainContent}>
        <View style={{marginVertical: 20}}>
          <View style={styles.inputControl}>
            <TextInput
              mode="outlined"
              label="User Name"
              onChangeText={value => setUserName(value)}
              right={
                <TextInput.Icon icon={() => <Icon name="tag" size={20} />} />
              }
            />
          </View>
          <View style={styles.inputControl}>
            <Button
              icon={() => <Icon name="plus" />}
              mode="outlined"
              onPress={() => searchUserName()}
              style={{borderRadius: 5}}>
              ADD
            </Button>
          </View>
        </View>
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
  mainContent: {
    padding: 20,
  },
  logoControl: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputControl: {
    justifyContent: 'center',
    marginVertical: 5,
  },
});

export default AddFriendScreen;
