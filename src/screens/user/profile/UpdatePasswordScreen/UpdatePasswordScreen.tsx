import React, {FC} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import {UpdatePasswordForm} from './components/UpdatePasswordForm';
import {UpdatePasswordScreenProps} from '../../../../navigation';

export const UpdatePasswordScreen: FC<UpdatePasswordScreenProps> = () => {
  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <UpdatePasswordForm />
    </SafeAreaView>
  );
};
