import React, {FC} from 'react';
import {HStack} from 'native-base';

import {ImageCard} from './components/ImageCard';
import {ChooseScreenProps} from '../../../../navigation';

export const ChooseScreen: FC<ChooseScreenProps> = ({navigation}) => {
  return (
    <HStack m={4} justifyContent="space-between" alignSelf="center" space={5}>
      <ImageCard
        image={require('../../../../assets/Service.png')}
        onPress={() => navigation.navigate('CarService')}
        resizeMode={'stretch'}
      />

      <ImageCard
        image={require('../../../../assets/Addon.png')}
        onPress={() => navigation.navigate('AddOn')}
        resizeMode={'stretch'}
      />
    </HStack>
  );
};
