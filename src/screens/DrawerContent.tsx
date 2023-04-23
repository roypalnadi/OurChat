import React, {useEffect, useState} from 'react';
import MainContent from '../components/MainContent';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const DrawerContent = (props: any) => {
  const navigation = useNavigation();
  const dataUser = useSelector((state: RootState) => state.account);

  const [listChat, setListChat] = useState<any[]>([]);

  useEffect(() => {
    const uid = auth().currentUser?.uid;

    if (uid) {
      const unsub = firestore()
        .collection('chats2')
        .where('members', 'array-contains', uid)
        .onSnapshot(data => {
          const chat: any[] = data.docs.map(async doc => {
            const members: [] = doc.data().members;
            let friendUid = '';
            members.forEach(member => {
              if (member !== uid) {
                friendUid = member;
              }
            });

            const friend = await firestore()
              .collection('users')
              .doc(friendUid)
              .get();

            const user = await firestore().collection('users').doc(uid).get();

            return {
              user: user.data(),
              dataFriend: friend.data(),
              lastMessage: doc.data().last_message,
              lastDate: doc.data().last_date.toDate().toLocaleDateString(),
            };
          });

          // gunakan Promise.all untuk menunggu semua data teman diambil dari Firestore
          Promise.all(chat).then(completedChat => {
            setListChat(completedChat); // gunakan data chat yang sudah lengkap dengan data teman
          });
        });
      return () => {
        unsub;
      };
    }
  }, []);

  return (
    <MainContent>
      <View {...props}>
        <View style={styles.detailControl}>
          <View style={styles.imageUser}>
            {dataUser.hasImage ? (
              <Avatar.Image
                size={130}
                source={{
                  uri: dataUser.imageUrl,
                }}
              />
            ) : (
              <Avatar.Text
                size={130}
                label={dataUser.name ? dataUser.name[0] : 'X'}
              />
            )}
          </View>
          <View style={{flexDirection: 'row', paddingTop: 10}}>
            <View style={styles.detailUser}>
              <Text style={styles.detailText}>{dataUser.name}</Text>
              <Text>{dataUser.userName}</Text>
            </View>
            <View style={styles.settingButton}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Setting');
                }}>
                <Icon name="cog" size={25} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.friendList}>
          <FlatList
            data={listChat}
            renderItem={renderItem => {
              const item = renderItem.item.dataFriend;
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Message', {
                      userName: renderItem.item.user.name,
                      name: item.name,
                      hasImage: item.hasImage,
                      imageUrl: item.imageUrl,
                      uid: item.uid,
                      token: item.fcmToken,
                    })
                  }>
                  <View style={{flexDirection: 'row', marginBottom: 30}}>
                    <View style={{justifyContent: 'center', marginRight: 10}}>
                      {item.hasImage ? (
                        <Avatar.Image
                          size={50}
                          source={{
                            uri: item.imageUrl,
                          }}
                        />
                      ) : (
                        <Avatar.Text
                          size={50}
                          label={item.name ? item.name[0] : 'X'}
                        />
                      )}
                    </View>
                    <View style={{justifyContent: 'center', flex: 1}}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 18,
                          marginBottom: 5,
                        }}>
                        {item.name}
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                          <Text numberOfLines={1} ellipsizeMode="tail">
                            {renderItem.item.lastMessage}
                          </Text>
                        </View>
                        <View>
                          <Text>{renderItem.item.lastDate}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item.dataFriend.uid}
          />
        </View>
      </View>
    </MainContent>
  );
};

const styles = StyleSheet.create({
  detailControl: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    padding: 20,
  },
  imageUser: {
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailUser: {
    flex: 1,
    // borderWidth: 1,
  },
  detailText: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  settingButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  friendList: {
    justifyContent: 'center',
    padding: 20,
  },
});

export default DrawerContent;
