import { BlurViewProps } from '@react-native-community/blur';

declare module 'module1/RootComponent' {
  export const BlurView: import('react').ForwardRefExoticComponent<
    BlurViewProps & import('react').RefAttributes<View>
  >;
}
declare module '@env' {
  export const BUILD_ENV: string;
}
