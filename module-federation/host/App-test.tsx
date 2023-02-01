/* eslint-disable react-native/no-raw-text */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Federated } from '@callstack/repack/client';
import React, { useEffect, useState } from 'react';
import { Text as RNText, Button, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import RootNavigation from './src/rootNavigation';
import Svg from './src/svg';
import { store } from './src/redux/store';
import CounterScreen from './src/scence/CouterScreen';
// import axios from 'axios';

const App1 = React.lazy(() => Federated.importModule('app1', './App'));
const App2 = React.lazy(() => Federated.importModule('app2', './App'));

const Stack = createStackNavigator();

const HomeScreen = () => {
  const { navigate } = useNavigation();
  const [count, setCount] = useState(0);
  const updateCount = (number: number) => {
    setCount((prevState) => prevState + number);
  };

  useEffect(() => {
    const data = async () => {
      const dataModule = await Federated.importModule(
        'module1',
        './RootNavigator'
      );
      dataModule.setRootNavigator(RootNavigation);
      dataModule.setContainer({ updateCount });
      const dataRootStore = await Federated.importModule(
        'module1',
        './RootStore'
      );
      dataRootStore.setParentStore(store);
      console.log('#######', dataRootStore);
    };
    data();
  }, []);
  return (
    <>
      <RNText>count: {count}</RNText>

      <View style={{ width: 100, height: 100 }}>
        <Svg.IconVuiPoint />
      </View>
      <Button title="App1" onPress={() => navigate('App1')} />
      <Button
        title="App2"
        onPress={() =>
          navigate('App2', {
            data: {
              value: 'data from main app',
            },
          })
        }
      />
      <Button title="ImageScreen" onPress={() => navigate('ImageScreen')} />
      <CounterScreen />
    </>
  );
};
const AppScreen1 = () => {
  return (
    <React.Suspense fallback={<RNText>Loading app1...</RNText>}>
      <App1 />
    </React.Suspense>
  );
};

const AppScreen2 = () => {
  return (
    <React.Suspense fallback={<RNText>Loading app2...</RNText>}>
      <App2 />
    </React.Suspense>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={RootNavigation}>
        <Stack.Navigator>
          <Stack.Screen name="Main App" component={HomeScreen} />
          <Stack.Screen name="App1" key="App1" component={AppScreen1} />
          <Stack.Screen name="App2" key="App2" component={AppScreen2} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
