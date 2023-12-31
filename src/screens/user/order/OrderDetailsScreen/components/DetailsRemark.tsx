import {Box, Divider, FormControl, Input, Text} from 'native-base';
import React, {FC} from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  remarks: string;
};

export const DetailsRemark: FC<Props> = ({remarks}) => {
    const {t} = useTranslation('OrderDetailsLang');
    return (
    <Box mb={3}>
      <Text fontSize="lg" fontWeight="400">
          {t('remarks')}
      </Text>
      <Divider w={'10%'} backgroundColor={'primary.800'} mb={3} />
      <Text color="gray.400">{remarks ? remarks : 'NIL'}</Text>
    </Box>
  );
};
