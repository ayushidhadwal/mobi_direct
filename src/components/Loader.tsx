import React from 'react';
import {VStack} from 'native-base';
import {ActivityIndicator} from 'react-native';

export const Loader = () => {
  return (
    <VStack flex={1} alignItems="center" justifyContent="center">
      <ActivityIndicator size="large" />
    </VStack>
  );
};
