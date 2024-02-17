import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import CustomInput from '../components/Custom/CustomInput';
import {FieldValues, useForm} from 'react-hook-form';
import {CustomButton} from '../components/Custom/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import useUser from '../hook/useUser';
import Toast from 'react-native-toast-message';
type LoginScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;
const showToastSecond = () => {
  Toast.show({
    type: 'error',
    text1: 'Please Check Email or Password',
  });
};
const LoginScreen = ({navigation}: LoginScreenNavigationProp) => {
  const {getData, saveUser} = useUser();
  const {control, handleSubmit} = useForm<FieldValues>({
    defaultValues: {username: '', password: ''},
  });

  const showToastFirst = () => {
    Toast.show({
      type: 'error',
      text1: 'Not found User',
    });
  };
  const onSignedIn = async (data: FieldValues) => {
    try {
      const userData = await getData(data.username);

      if (userData?.password === data.password) {
       await saveUser(userData);
        navigation.navigate('Home');
      } else {
        showToastSecond();
      }
    } catch (error) {
      showToastFirst();
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Login Screen</Text>
      <View style={styles.boxLogin}>
        <CustomInput
          label="UserName"
          name="username"
          control={control}
          placeholder="Put UserName"
          rules={{
            required: 'UserName is Required',
            minLength: {
              value: 2,
              message: 'UserName must be at least 2 characters',
            },
          }}
        />
        <CustomInput
          label="Password"
          name="password"
          control={control}
          placeholder="Put Password"
          secureTextEntry
          rules={{
            required: 'Password is Required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          }}
        />
        <CustomButton title="Sign In" onPress={handleSubmit(onSignedIn)} />
      </View>
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5e57c0',
    justifyContent: 'center',
  },
  textHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginTop: 10,
  },
  boxLogin: {
    padding: 15,
  },
});
