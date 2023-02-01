import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { RootState, useAppDispatch, useAppSelector } from '../redux/store';
import { decrement, increment } from './couterSlice';

const CounterScreen = () => {
  const count = useAppSelector((state: RootState) => state.counter.value ?? 0);
  const dispatch = useAppDispatch();

  return (
    <View>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={() => dispatch(increment())}
      >
        <Text>Increment</Text>
      </TouchableOpacity>
      <Text>{count}</Text>
      <TouchableOpacity
        accessibilityRole="checkbox"
        onPress={() => dispatch(decrement())}
      >
        <Text>Decrement</Text>
      </TouchableOpacity>
    </View>
  );
};
export default CounterScreen;
