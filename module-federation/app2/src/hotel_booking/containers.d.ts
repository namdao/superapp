import { BlurViewProps } from '@react-native-community/blur';
declare module 'module1/RootComponent' {
  const BlurView: import('react').ForwardRefExoticComponent<
    BlurViewProps & import('react').RefAttributes<View>
  >;
  export { BlurView };
}
declare module '@env' {
  export const BUILD_ENV: string;
}
