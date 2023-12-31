import React, {FC} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import {UpdateProfileForm} from './components/UpdateProfileForm';
import {UpdateProfileScreenProps} from '../../../../navigation';

export const UpdateProfileScreen: FC<UpdateProfileScreenProps> = ({}) => {
  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <UpdateProfileForm />
    </SafeAreaView>
  );
};
