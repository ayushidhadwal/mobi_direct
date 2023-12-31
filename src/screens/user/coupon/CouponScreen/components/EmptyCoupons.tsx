import React from 'react';
import {Text, VStack} from 'native-base';
import {useTranslation} from 'react-i18next';

import {Empty} from '../../../../../components/Empty';

export const EmptyCoupons = () => {
  const {t} = useTranslation('CouponLang');
  return (
    <Empty>
      <VStack alignItems="center">
        <Text fontSize="lg" bold color="warning.500">
          {t('noCoupons')}
        </Text>
      </VStack>
    </Empty>
  );
};
