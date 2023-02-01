import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Text, Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Baz from 'module1/baz';
import FastImage1 from 'react-native-fast-image';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Federated } from '@callstack/repack/client';
import { store } from '../src/redux/store';
import CounterScreen from '../src/scence/CouterScreen';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { RootNavigator } from 'module1/RootNavigator';
import { foo } from './foo';
import Svg from './svg';

const MiniStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const banner = require('./banner.png');
const MiniPageOnTab2 = () => {
  const { navigate } = useNavigation();
  return (
    <>
      <FastImage1
        source={banner}
        style={{ width: 100, height: 100 }}
        resizeMode="contain"
      />
      <View style={{ width: 100, height: 100 }}>
        <Svg.IconVuiPoint />
      </View>
      <Button
        title="navigate page on tab 2"
        onPress={() => navigate('miniPageTab2')}
      />
      <Button
        title="back to main app"
        onPress={() => {
          const onP = async () => {
            const { RootNavigator } = await Federated.importModule(
              'module1',
              './RootNavigator'
            );
            RootNavigator.goBack();
          };
          onP();
        }}
      />
      <Button
        title="back to app 2"
        onPress={() => {
          const onP = async () => {
            const { RootNavigator } = await Federated.importModule(
              'module1',
              './RootNavigator'
            );
            RootNavigator.navigate('App2', {
              data: {
                value: 'data from mini app 1 with tab2',
              },
            });
          };
          onP();
        }}
      />
    </>
  );
};
const MiniTab2Stack = () => {
  return (
    <MiniStack.Navigator
      screenOptions={{
        cardOverlayEnabled: false,
        headerShown: false,
      }}
    >
      <MiniStack.Screen name="miniPageTab1" component={MiniPageOnTab2} />
      <MiniStack.Screen
        name="miniPageTab2"
        component={() => <Text>miniPageTab2</Text>}
      />
    </MiniStack.Navigator>
  );
};
function HomeScreen() {
  const [fooText, setFooText] = React.useState<string>('');
  React.useEffect(() => {
    (async () => {
      try {
        const fooText = await foo();
        setFooText(fooText);
      } catch (err) {
        setFooText(err.message);
      }
    })();
    return () => {
      Baz.resetBaz();
    };
  }, []);

  const navigateApp2 = async () => {
    const { RootNavigator } = await import('module1/RootNavigator');
    RootNavigator.navigate('App2', {
      data: {
        value: 'data from mini app 1 with tab1',
      },
    });
  };
  return (
    <>
      <Text>Home Screen App 1</Text>
      <Button title="navigate app with parent param 2" onPress={navigateApp2} />
      <Text>{fooText}</Text>
      <CounterScreen />
    </>
  );
}
export const TabMini = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="tab1" component={HomeScreen} />
        <Tab.Screen name="tab2" component={MiniTab2Stack} />
      </Tab.Navigator>
    </NavigationContainer>
  </Provider>
);
export default TabMini;
