import { Federated } from '@callstack/repack/client';
import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { RootState, useAppDispatch, useAppSelector } from '../redux/store';
import { decrement, increment } from './couterSlice';

const CounterScreen = () => {
  const ParentRef = useRef();
  const count = useAppSelector((state: RootState) => state.counter.value ?? 0);
  const [countParent, setCountParent] = useState(0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initModule1 = async () => {
      const { getParentStore } = await Federated.importModule(
        'module1',
        './RootStore'
      );
      ParentRef.current = getParentStore();
      setCountParent(ParentRef.current?.getState().counter.value);
    };
    initModule1();
  }, []);
  const updateParentIncrement = async () => {
    ParentRef.current?.dispatch({
      type: 'counter/increment',
    });
    setCountParent(ParentRef.current?.getState().counter.value);
  };
  const updateParentDescrement = async () => {
    ParentRef.current?.dispatch({
      type: 'counter/decrement',
    });
    setCountParent(ParentRef.current?.getState().counter.value);
  };
  return (
    <View>
      <View>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => dispatch(increment())}
          style={{ width: 150, height: 50, backgroundColor: 'red' }}
        >
          <Text>Increment</Text>
        </TouchableOpacity>
        <Text>{count}</Text>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => dispatch(decrement())}
          style={{ width: 150, height: 50, backgroundColor: 'red' }}
        >
          <Text>Decrement</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={updateParentIncrement}
          style={{ width: '30%', height: 50, backgroundColor: 'blue' }}
        >
          <Text>Increment parent</Text>
        </TouchableOpacity>
        <Text>{countParent}</Text>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={updateParentDescrement}
          style={{ width: '30%', height: 50, backgroundColor: 'blue' }}
        >
          <Text>Decrement parent</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CounterScreen;
