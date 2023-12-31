import {HStack, VStack} from 'native-base';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {ShortcutCard} from './ShortcutCard';
import {UserNavigationProps} from '../../../../../navigation';

export const HomeScreenShortcuts = () => {
  const navigation = useNavigation<UserNavigationProps>();

  return (
    <VStack space={4} my={3}>
      <HStack space={4} mx={4}>
        <ShortcutCard
          onPress={() => navigation.navigate('Orders')}
          image={require('../../../../../assets/Order.png')}
        />
        <ShortcutCard
          onPress={() => navigation.navigate('Service')}
          image={require('../../../../../assets/Record.png')}
        />
      </HStack>

      <HStack space={4} mx={4}>
        <ShortcutCard
          onPress={() => navigation.navigate('Appointment')}
          image={require('../../../../../assets/Appointment.png')}
        />
        <ShortcutCard
          onPress={() => navigation.navigate('Settings')}
          image={require('../../../../../assets/Settings.png')}
        />
      </HStack>
    </VStack>
  );
};
