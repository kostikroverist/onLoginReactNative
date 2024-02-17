import React, {FC} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
};

export const CustomButton: FC<Props> = ({title, onPress}) => {
  return (
    <Pressable style={styles.CustomButton} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  CustomButton: {
    height: 55,
    padding: 5,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
