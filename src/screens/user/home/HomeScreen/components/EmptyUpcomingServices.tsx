import React from 'react';
import {Box, HStack, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import {UserNavigationProps} from '../../../../../navigation';

export const EmptyUpcomingServices = () => {
  const navigation = useNavigation<UserNavigationProps>();

  const addVehicle = () => navigation.navigate('NewVehicle');

  return (
    <HStack px={4} space={4}>
      <Box my={2}>
        <Text color="warning.400">
          No Vehicles found!, Please add vehicles to view vehicle's upcoming
          service dates.{' '}
          <Text color="primary.400" bold underline onPress={addVehicle}>
            Add Vehicle
          </Text>
        </Text>
      </Box>
    </HStack>
  );
};
