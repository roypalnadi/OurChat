import storage from '@react-native-firebase/storage';
import {Alert} from 'react-native';
import {ImagePickerResponse} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';

export const uploadPhoto = async (
  response: ImagePickerResponse | undefined,
  uid: string,
): Promise<void> => {
  if (uid === '') {
    Alert.alert('Error', 'Account Not Found');
    return;
  }
  const uri = response?.assets?.[0].uri;
  const uploadUri = uri;
  const reference = uid + '/' + 'image-profile';

  await storage()
    .ref(reference)
    .putFile(uploadUri ?? '')
    .then(async () => {
      await storage()
        .ref(reference)
        .getDownloadURL()
        .then(async url => {
          await firestore()
            .collection('users')
            .doc(uid)
            .update({
              hasImage: true,
              imageUrl: url,
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
};
