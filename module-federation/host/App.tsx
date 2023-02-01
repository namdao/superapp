/* eslint-disable react-native/no-raw-text */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Federated } from '@callstack/repack/client';
import FastImage from 'react-native-fast-image';
import React, { useEffect } from 'react';
import { Button, View, ActivityIndicator, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { BlurView } from '@react-native-community/blur';
import RootNavigation from './src/rootNavigation';

import { store } from './src/redux/store';

const App1 = React.lazy(() => Federated.importModule('app1', './App'));
const App2 = React.lazy(() => Federated.importModule('app2', './App'));

const Stack = createStackNavigator();

const HomeScreen = () => {
  const { navigate } = useNavigation();

  useEffect(() => {
    const data = async () => {
      const dataModule = await Federated.importModule(
        'module1',
        './RootNavigator'
      );
      dataModule.setRootNavigator(RootNavigation);
      dataModule.setBlurViewRoot(BlurView);
      const dataRootStore = await Federated.importModule(
        'module1',
        './RootStore'
      );
      dataRootStore.setParentStore(store);
    };
    data();
  }, []);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        padding: 15,
      }}
    >
      <View>
        <FastImage
          source={{
            uri: 'https://www.telegraph.co.uk/content/dam/Travel/2019/January/france-food.jpg',
          }}
          style={{ width: 150, height: 150, borderRadius: 20 }}
          resizeMode="cover"
        />
        <Button
          title="Food App"
          onPress={() =>
            navigate('Food App', {
              data: {
                value: 'data from main app',
              },
            })
          }
        ></Button>
      </View>
      <View>
        <FastImage
          source={{
            uri: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/still-life-of-three-fresh-smoothies-in-front-of-royalty-free-image-561093647-1544042068.jpg',
          }}
          style={{ width: 150, height: 150, borderRadius: 20 }}
          resizeMode="cover"
        />
        <Button
          title="Template App"
          onPress={() =>
            navigate('Template App', {
              data: {
                value: 'data from main app',
              },
            })
          }
        />
      </View>
    </View>
  );
};

const AppScreen1 = () => {
  return (
    <React.Suspense
      fallback={<ActivityIndicator size="large" color={'green'} />}
    >
      <App1 />
    </React.Suspense>
  );
};

const AppScreen2 = () => {
  return (
    <React.Suspense
      fallback={<ActivityIndicator size="large" color={'green'} />}
    >
      <App2 />
    </React.Suspense>
  );
};

const PaymentScreen = ({ route }) => {
  const { data } = route.params;

  return (
    <View>
      <Text style={{ fontSize: 20, color: 'red' }}>title: {data.name}</Text>
      <Text style={{ fontSize: 13, color: 'blue' }}>
        pricing: {data.price} $
      </Text>
    </View>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={RootNavigation}>
        <Stack.Navigator>
          <Stack.Screen name="Main App" component={HomeScreen} />
          <Stack.Screen name="Food App" key="App1" component={AppScreen1} />
          <Stack.Screen name="Template App" key="App2" component={AppScreen2} />
          <Stack.Screen
            name="PaymentScreen"
            key="PaymentScreen"
            component={PaymentScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
