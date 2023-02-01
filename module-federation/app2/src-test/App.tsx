import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Federated } from '@callstack/repack/client';
import { Button, Text } from 'react-native';
const StackApp2 = createStackNavigator();
const MainPageApp2 = (propsParent: any) => {
  // option 1: get Params from props
  // const { route } = propsParent;
  // const { params } = route;
  // option 2: get params from container module
  // const { params } = getDataFromRootParent();
  const [paramsCurr, setParams] = React.useState();
  React.useEffect(() => {
    const init = async () => {
      const { getDataFromRootParent } = await Federated.importModule(
        'module1',
        './RootNavigator'
      );
      const { params } = getDataFromRootParent();
      if (params) {
        setParams(params);
      }
    };
    init();
  }, []);
  const updateMainApp = async () => {
    const { callFunction } = await Federated.importModule(
      'module1',
      './RootNavigator'
    );
    callFunction('updateCount', 4);
  };
  return (
    <>
      <Text>Mini App 2</Text>
      <Text>{JSON.stringify(propsParent)}</Text>
      <Text>{JSON.stringify(paramsCurr)}</Text>
      <Button title="update parent data" onPress={updateMainApp} />
    </>
  );
};
export default function App(propsParent: any) {
  // return <Nav />;
  return (
    <NavigationContainer>
      <StackApp2.Navigator
        screenOptions={{
          cardOverlayEnabled: false,
          headerShown: false,
        }}
      >
        <StackApp2.Screen
          name="MainPageApp2"
          component={MainPageApp2}
          initialParams={propsParent}
        />
      </StackApp2.Navigator>
    </NavigationContainer>
  );
}
