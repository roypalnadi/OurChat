import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    return false;
  }
};

export const getData = async (key: string) => {
  const data = await AsyncStorage.getItem(key);
  return data;
};

export const removeData = async (key: string) => {
  return await AsyncStorage.removeItem(key);
};
