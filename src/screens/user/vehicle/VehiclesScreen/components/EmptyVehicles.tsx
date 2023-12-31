import React, {FC} from 'react';
import {Text, VStack} from 'native-base';
import { useTranslation } from 'react-i18next';

import {Empty} from '../../../../../components/Empty';

type Props = {
  onPress: () => void;
};

export const EmptyVehicles: FC<Props> = ({onPress}) => {
  const {t} = useTranslation('VehiclesLang');
  return (
    <Empty>
      <VStack alignItems="center">
        <Text fontSize="lg" bold color="warning.500">
          {t("no")}
        </Text>
        <Text underline color="primary.400" onPress={onPress} bold>
          {t("vehicle")}
        </Text>
      </VStack>
    </Empty>
  );
};
