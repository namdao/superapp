import * as React from 'react';
import { Text as RNText } from 'react-native';

export default function Text({ children }: { children: string }) {
  return (
    <RNText style={{ color: '#000fff', fontWeight: 'bold' }}>{children}</RNText>
  );
}
