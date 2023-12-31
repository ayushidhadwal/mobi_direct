import React, {FC} from 'react';
import {Box, Divider, Text} from 'native-base';
import {useTranslation} from 'react-i18next';

type Props = {
  remarks: string | undefined;
};

export const AppointmentRemarks: FC<Props> = ({remarks}) => {
  const {t} = useTranslation('AppointmentSummaryLang');
  return (
    <>
      <Text color="gray.400" fontWeight="600" fontSize="md">
        {t('remarks')}:
      </Text>
      <Divider w={'10%'} backgroundColor={'primary.800'} mb={2} />
      <Box shadow={1} bg="#FFF" borderRadius={5} mb={3} p={3} mx={1}>
        <Text
          color="gray.600"
          fontWeight="400"
          flexShrink={1}
          numberOfLines={3}>
          {remarks}
        </Text>
      </Box>
    </>
  );
};
