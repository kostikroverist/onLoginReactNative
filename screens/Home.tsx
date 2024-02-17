import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import useUser from '../hook/useUser';
import {User} from '../interface/User';
import {CustomButton} from '../components/Custom/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {useFocusEffect} from '@react-navigation/native';

type HomeScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
const Home = ({navigation}: HomeScreenNavigationProp) => {
  const {getData, clearUserData} = useUser();
  const [user, setUser] = useState<User | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          const userData = await getData('user');
          setUser(userData);
        } catch (error) {
          console.error('Помилка отримання даних:', error);
        }
      };

      fetchUserData();
      return () => {};
    }, []),
  );
  const logOut = async () => {
    await clearUserData();
    navigation.navigate('Auth');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Page</Text>
      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>User Name: {user.userName}</Text>
          <Text style={styles.userInfoText}>User Email: {user.email}</Text>
          <Text style={styles.userInfoText}>
            User Password: {user.password}
          </Text>
        </View>
      )}
      <View style={styles.logout}>
        <CustomButton title="Logout" onPress={() => logOut()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfo: {
    marginBottom: 20,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  logout: {
    width: 150,
  },
});

export default Home;
