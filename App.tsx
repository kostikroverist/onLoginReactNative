import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthScreen from './screens/AuthScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import LoginScreen from './screens/LoginScreen';
import Home from './screens/Home';
import Toast from 'react-native-toast-message';

export type RootStackParamList = {
  Auth: undefined;
  Registration: undefined;
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [loading, setLoading] = useState(true);
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    const checkUserExists = async () => {
      try {
        const existingValue = await AsyncStorage.getItem('user');
        setUserExists(existingValue !== null);
      } catch (error) {
        console.error('Error while checking user data:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUserExists();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={userExists ? 'Home' : 'Auth'}>
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={Home}  options={{headerShown: false}}/>
          <Stack.Screen name="Registration" component={RegistrationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}
export default App;
