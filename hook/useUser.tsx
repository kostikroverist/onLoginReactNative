import {useState} from 'react';
import {User} from '../interface/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const useUser = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const showToast = (error: string) => {
    Toast.show({
      type: 'error',
      text1: error,
    });
  };
  const showToastSecond = () => {
    Toast.show({
      type: 'error',
      text1: 'user undefine',
    });
  };
  const showToastThird = () => {
    Toast.show({
      type: 'info',
      text1: 'user Logout',
    });
  };
  const saveData = async (key: string, value: User) => {
    setLoading(true);
    try {
      const existingValue = await AsyncStorage.getItem(key);
      if (existingValue !== null) {
        throw new Error('User with this UserName is exist');
      }
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error: any) {
      showToast(error.message);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getData = async (key: string): Promise<User | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue !== null) {
        const user: User = JSON.parse(jsonValue);
        return user;
      } else {
        showToastSecond();
        throw new Error('User is undefine');
      }
    } catch (error: any) {
      throw error;
    }
  };
  const saveUser = async (value: User | null) => {
    setLoading(true);
    try {
      if (value !== null) {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('user', jsonValue);
      } else {
        console.warn('User data is null');
      }
    } catch (error) {
      showToast('Error while saving user data');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const checkUserExists = async () => {
    try {
      const existingValue = await AsyncStorage.getItem('user');
      return existingValue !== null;
    } catch (error) {
      console.error('Error while checking user data:', error);
      return false;
    }
  };
  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem('user');
      showToastThird();
    } catch (error: any) {
      showToast(error);
    }
  };
  return {loading, saveData, getData, saveUser, checkUserExists, clearUserData};
};
export default useUser;
