import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import CustomInput from '../components/Custom/CustomInput';
import {FieldValues, useForm} from 'react-hook-form';
import {CustomButton} from '../components/Custom/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {User} from '../interface/User';
import useUser from '../hook/useUser';

type RegistrationScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Registration'
>;

const personEmpty: User = {
  userName: '',
  password: '',
  email: '',
};
const RegistrationScreen = ({navigation}: RegistrationScreenNavigationProp) => {
  const {saveData, saveUser} = useUser();
  const {control, handleSubmit, watch} = useForm<FieldValues>({
    defaultValues: {username: '', email: '', password: ''},
  });
  const pwd = watch('password');

  const onSignUp = async (data: FieldValues) => {
    try {
      await saveData(data.username, {
        ...personEmpty,
        userName: data.username,
        password: data.password,
        email: data.email,
      });
      await saveUser({
        ...personEmpty,
        userName: data.username,
        password: data.password,
        email: data.email,
      });
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Registration Screen</Text>

      <View style={styles.boxRegistrations}>
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
          label="Email"
          name="email"
          control={control}
          placeholder="Put Email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
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
        <CustomInput
          label="Confirm Password"
          name="passwordConfirm"
          control={control}
          placeholder="Confirm Password"
          secureTextEntry
          rules={{validate: value => value === pwd || 'Password do not match'}}
        />

        <CustomButton title="Sign Up" onPress={handleSubmit(onSignUp)} />
      </View>
    </View>
  );
};
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
  boxRegistrations: {
    padding: 15,
  },
});
export default RegistrationScreen;
