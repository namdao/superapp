import {
  StackActions,
  TabActions,
  DrawerActions,
  createNavigationContainerRef,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';

const navigationRef = createNavigationContainerRef<ParamListBase>();

export const navigateScreen = (
  screen: string,
  params: Record<string, unknown> | undefined = undefined
): void => {
  try {
    navigationRef.current?.navigate(screen, params);
  } catch (error) {
    console.warn('RootNavigation - function navigateScreen crash');
  }
};

export const replaceScreen = (
  screen: string,
  params: Record<string, unknown> | undefined = undefined
): void => {
  navigationRef.current?.dispatch(StackActions.replace(screen, params));
};
export const goBack = (): void => {
  navigationRef.current?.canGoBack() && navigationRef.current?.goBack();
};

export const resetNavigator = (screen: string, params = {}): void =>
  navigationRef.current?.reset({
    index: 0,
    routes: [{ name: screen, params }],
  });

export const backToTopScreen = (): void =>
  navigationRef.current?.dispatch(StackActions.popToTop());

export const backToOthersScreen = (key: number | undefined): void =>
  navigationRef.current?.dispatch(StackActions.pop(key));

export const jumpToTab = (screen: string, params = {}): void =>
  navigationRef.current?.dispatch(TabActions.jumpTo(screen, params));

export const openDrawer = (): void => {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
};

export const hideBottomTab = (
  navigation: NavigationProp<ParamListBase>
): void => {
  const parent = navigation?.getParent();
  parent?.setOptions?.({
    tabBarStyle: { display: 'none' },
  });
};
export const showBottomTab = (
  navigation: NavigationProp<ParamListBase>
): void => {
  const parent = navigation?.getParent();
  parent?.setOptions?.({
    tabBarStyle: { display: 'flex' },
  });
};
export default navigationRef;
