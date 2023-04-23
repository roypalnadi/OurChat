import React, {useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import MainContent from '../components/MainContent';
import TopBar from '../components/TopBar';
import {StyleSheet} from 'react-native';
import {Avatar, Button, MD2Colors, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getDataAccount} from '../utils/redux/logic';
import {uploadPhoto} from '../utils/store/logic';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import {checkUserName, setUserToRedux} from '../utils/firestore/logic';
import firestore from '@react-native-firebase/firestore';

const ProfileScreen = ({navigation}: {navigation: any}) => {
  const dataUser = getDataAccount();
  const [render, setRender] = useState(true);
  const [userName, setUserName] = useState(dataUser.userName);
  const [fullName, setFullName] = useState(dataUser.name);
  const [image, setImage] = useState<ImagePickerResponse | undefined>();

  const saveData = async () => {
    const uid = auth().currentUser?.uid ?? '';
    const check = await checkUserName(userName ?? '', uid)
      .then(data => data)
      .catch(result => {
        Alert.alert('Warning', 'This data already exist');
        return result;
      });

    if (check) {
      return;
    }

    if (image) {
      await uploadPhoto(image, uid);
    }

    await firestore()
      .collection('users')
      .doc(uid)
      .update({
        userName: userName,
        name: fullName,
      })
      .then(() => {
        setUserToRedux().then(() => {
          Alert.alert('Success', 'Data save');
          setRender(!render);
        });
      });
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
                fontSize: 28,
                color: MD2Colors.black,
              }}>
              Profile
            </Text>
          </View>
          <View style={{alignItems: 'flex-end', flex: 1}} />
        </View>
      </TopBar>
      <View style={styles.mainContent}>
        <TouchableOpacity
          onPress={() =>
            launchImageLibrary({mediaType: 'photo'}).then(response => {
              if (!response.didCancel) {
                dataUser.hasImage = true;
                setImage(response);
              }
            })
          }>
          <View style={styles.logoControl}>
            {dataUser.hasImage ? (
              <Avatar.Image
                size={130}
                source={{
                  uri: image ? image?.assets?.[0].uri : dataUser.imageUrl,
                }}
              />
            ) : (
              <Avatar.Text
                size={130}
                label={dataUser.name ? dataUser.name[0] : 'X'}
              />
            )}
          </View>
        </TouchableOpacity>
        <View style={{marginVertical: 20}}>
          <View style={styles.inputControl}>
            <TextInput
              mode="outlined"
              label="User Name"
              defaultValue={dataUser.userName ?? ''}
              onChangeText={value => setUserName(value)}
              right={
                <TextInput.Icon icon={() => <Icon name="tag" size={20} />} />
              }
            />
          </View>
          <View style={styles.inputControl}>
            <TextInput
              mode="outlined"
              label="Full Name"
              defaultValue={dataUser.name ?? ''}
              onChangeText={value => setFullName(value)}
              right={
                <TextInput.Icon icon={() => <Icon name="user" size={20} />} />
              }
            />
          </View>
          <View style={styles.inputControl}>
            <Button
              icon={() => <Icon name="plus" />}
              mode="outlined"
              onPress={() => saveData()}
              style={{borderRadius: 5}}>
              Save
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

export default ProfileScreen;
