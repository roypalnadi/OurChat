import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {store} from '../../redux/store';
import {setDataAccount} from '../../redux/reducers/accountReducer';
import {add} from '../../redux/reducers/friendReducer';

export const setUserToRedux = async () => {
  const user = auth().currentUser;
  if (user?.uid) {
    await firestore()
      .collection('users')
      .doc(user?.uid)
      .get()
      .then(dataUser => {
        const payload = dataUser.data();
        store.dispatch(
          setDataAccount({
            userName: payload?.userName,
            name: payload?.name,
            hasImage: payload?.hasImage,
            imageUrl: payload?.imageUrl,
          }),
        );
      });
  }
};

export const checkUserName = async (
  userName: string,
  uid: string,
): Promise<any> => {
  const data = await firestore()
    .collection('users')
    .where('userName', '==', userName)
    .where('uid', '!=', uid)
    .get()
    .then(result => result.docs);

  const length = data?.length;
  let friend = {};
  if (length !== 0) {
    data.forEach(element => {
      friend = element.data();
    });

    return friend;
  }

  return '';
};

export const listChat = async (uid: string) => {
  const chats = await firestore()
    .collection('chats2')
    .where('members', 'array-contains', uid)
    .get();

  const sendToRedux: any[] = [];
  const promises: any[] = [];

  chats.forEach(chat => {
    const lastMessage = chat.data().last_message;
    const lastDate = chat.data().last_date;
    const members: [] = chat.data().members;
    let friendUid = '';
    members.forEach(member => {
      if (member !== uid) {
        friendUid = member;
      }
    });

    const promise = firestore()
      .collection('users')
      .doc(friendUid)
      .get()
      .then(dataFriend => {
        const collectData = {
          lastMessage: lastMessage,
          lastDate: lastDate.toDate().toLocaleDateString(),
          dataFriend: dataFriend.data(),
        };
        sendToRedux.push(collectData);
      });
    promises.push(promise);
  });

  Promise.all(promises).then(() => {
    store.dispatch(add(sendToRedux));
  });

  // console.log(da);
};
