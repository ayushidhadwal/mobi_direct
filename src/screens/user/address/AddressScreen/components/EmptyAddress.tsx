import React, {FC} from 'react';
import {Text, VStack} from 'native-base';
import {useTranslation} from 'react-i18next';

import {Empty} from '../../../../../components/Empty';

type Props = {
  onPress: () => void;
};

export const EmptyAddress: FC<Props> = ({onPress}) => {
  const {t} = useTranslation('AddressLang');

  return (
    <Empty>
      <VStack alignItems="center">
        <Text fontSize="lg" bold color="warning.500">
          {t('noAddresses')}
        </Text>
        <Text underline color="primary.400" onPress={onPress} bold>
          {t('add')}
        </Text>
      </VStack>
    </Empty>
  );
};
