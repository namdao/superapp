import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { RootNavigator } from './RootNavigator';

const PaymentBtn = ({ data }: any) => {
  const onPressPay = () => {
    try {
      RootNavigator.navigate('PaymentScreen', {
        data,
      });
    } catch (error) {
      console.warn('error', error.message);
    }
  };
  return (
    <TouchableOpacity
      onPress={onPressPay}
      style={{
        backgroundColor: 'orange',
        marginLeft: 5,
        padding: 5,
        borderRadius: 5,
      }}
    >
      <Text style={{ color: 'white' }}>Payment now</Text>
    </TouchableOpacity>
  );
};

export default PaymentBtn;
