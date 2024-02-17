import React from 'react';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import {TextInput, Text, View, StyleSheet} from 'react-native';

interface CustomInputProps {
  label: string;
  placeholder: string;
  onChangeText?: (text: string) => void;
  name: string;
  secureTextEntry?: boolean;
  control: Control<FieldValues>;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined;
}

const CustomInput = ({
  label,
  placeholder,
  name,
  secureTextEntry,
  control,
  rules = {},
}: CustomInputProps) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
          <>
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={[styles.container, {borderColor: error ? 'red' : '#ccc'}]}>
              <TextInput
                value={value}
                onChangeText={onChange} // змінили onChange
                onBlur={onBlur} // змінили onBlur
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}
                placeholderTextColor="#000000"
              />
            </View>
            {error && (
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{color: 'red', marginBottom: 10, alignSelf: 'stretch'}}>
                {error.message || 'Error'}
              </Text>
            )}
          </>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  input: {
    height: 45,
    alignItems: 'center',
  },
});

export default CustomInput;
