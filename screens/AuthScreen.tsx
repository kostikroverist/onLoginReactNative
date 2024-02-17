import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {CustomButton} from '../components/Custom/CustomButton';

type AuthScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Auth'
>;

const AuthScreen = ({navigation}: AuthScreenNavigationProp) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textSize}>Let's Get Started!</Text>
      <View style={styles.boxButton}>
        <CustomButton
          title="Registration"
          onPress={() => navigation.navigate('Registration')}
        />
        <CustomButton
          title="Login"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#5e57c0',
  },
  boxButton: {
    borderRadius: 15,
    width: '100%',
    padding: 10,
    borderWidth: 4,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  textSize: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
});

export default AuthScreen;
