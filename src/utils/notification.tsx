import axios from 'axios';

export const sendNotification = async (
  title: string,
  message: string,
  token: string,
) => {
  console.log(token);
  const fcmToken = token;
  const serverKey =
    'AAAAF4YlfEM:APA91bHECb3Oyk0P9q1LcqXvJ93iUj5AxeJ7Ef1CTBRnkEkwFOKvUfMCpZhDrOpe6zYRXCx9tFgupvKwni_s23ZjM_d9i6VTkiEczfq9MwPlHtSZOlc9AzgwyUWXYeABZQpcLzasCUb9';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `key=${serverKey}`,
  };

  const body = {
    to: fcmToken,
    notification: {
      title,
      body: message,
      sound: 'default',
      priority: 'high',
      show_in_foreground: true,
    },
  };

  axios
    .post('https://fcm.googleapis.com/fcm/send', body, {headers})
    .then(() => {
      console.log('success');
    })
    .catch(error => {
      console.log('Error sending notification:', error);
    });
};
