import React, {FC} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import {AgentUpdatePasswordForm} from './components/AgentUpdatePasswordForm';
import {AgentUpdatePasswordScreenProps} from '../../../../navigation';

const AgentUpdatePasswordScreen: FC<AgentUpdatePasswordScreenProps> = () => {
  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <AgentUpdatePasswordForm />
    </SafeAreaView>
  );
};

export default AgentUpdatePasswordScreen;
