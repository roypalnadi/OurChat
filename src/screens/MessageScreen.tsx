import React, {useCallback, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import MainContent from '../components/MainContent';
import TopBar from '../components/TopBar';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Avatar} from 'react-native-paper';
import {Bubble, GiftedChat, IMessage} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {sendNotification} from '../utils/notification';

type DetailScreenParams = {
  userName: string;
  name: string;
  hasImage: boolean;
  imageUrl: string;
  uid: string;
  token: string;
};

const MessageScreen = ({navigation}: {navigation: any}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const route =
    useRoute<RouteProp<Record<string, DetailScreenParams>, string>>();

  const chatId = [route.params.uid, auth().currentUser?.uid].sort().join('_');

  useEffect(() => {
    const q = firestore().collection('chats2').doc(chatId);
    const unsubscribe = q
      .collection('message')
      .orderBy('created_at', 'desc')
      .onSnapshot(querySnapshot => {
        const data: IMessage[] = querySnapshot.docs.map(doc => {
          return {
            _id: doc.data()._id,
            createdAt: doc.data().created_at.toDate(),
            text: doc.data().text,
            user: {
              _id: doc.data().senderId,
              sent: doc.data().senderId === auth().currentUser?.uid,
            },
          };
        });
        setMessages(data);
      });

    return () => unsubscribe();
  }, [chatId]);

  const onSend = useCallback(
    (messages = []) => {
      const {_id, createdAt, text} = messages[0];

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      );

      sendNotification(route.params.userName, text, route.params.token);

      const q = firestore().collection('chats2').doc(chatId);
      q.collection('message').add({
        _id: _id,
        created_at: createdAt,
        text: text,
        senderId: auth().currentUser?.uid,
      });
      q.set({
        members: firestore.FieldValue.arrayUnion(
          auth().currentUser?.uid,
          route.params.uid,
        ),
        last_message: text,
        last_date: createdAt,
      });
    },
    [chatId, route],
  );

  return (
    <MainContent>
      <TopBar>
        <View style={styles.topBarControl}>
          <View style={{alignItems: 'flex-start', marginRight: 20}}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => {
                navigation.toggleDrawer();
              }}>
              <Icon name="bars" size={20} />
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center', flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
                {route.params?.name}
              </Text>
            </View>
            <View
              style={{
                marginHorizontal: 20,
                alignItems: 'flex-end',
              }}>
              {route.params.hasImage ? (
                <Avatar.Image
                  size={35}
                  source={{
                    uri: route.params?.imageUrl,
                  }}
                />
              ) : (
                <Avatar.Text
                  size={35}
                  label={route.params?.name ? route.params?.name[0] : 'X'}
                />
              )}
            </View>
          </View>
        </View>
      </TopBar>
      <GiftedChat
        loadEarlier={true}
        renderMessage={props => (
          <View style={{paddingHorizontal: 15, paddingBottom: 5}}>
            <Bubble {...props} />
          </View>
        )}
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={(messages: never[]) => {
          onSend(messages);
        }}
        user={{
          _id: auth().currentUser?.uid ?? '',
        }}
      />
      {/* <ImageBackground
        resizeMode="repeat"
        style={{flex: 1}}
        source={require('../assets/message-icon.png')}>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View style={[styles.commentBubbleLeft, {alignSelf: 'flex-start'}]}>
            <Text>Hay</Text>
          </View>
          <View style={[styles.commentBubbleRight, {alignSelf: 'flex-end'}]}>
            <Text>Hay Too</Text>
          </View>
        </View>
        <View style={styles.contentInput}>
          <TextInput style={{flex: 1}} placeholder="Message" />
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="paper-plane-o" size={20} />
          </TouchableOpacity>
        </View>
      </ImageBackground> */}
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
  text: {
    fontWeight: 'bold',
    fontSize: 22,
    // fontSize: 14,
    color: 'black',
  },
  contentInput: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginTop: 15,
  },
  commentBubbleLeft: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderWidth: 1,
    borderColor: '#0088FF',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: 'flex-start',
  },
  commentBubbleRight: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: '#0088FF',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: 'flex-end',
  },
});

export default MessageScreen;
