import {Box, Button, Icon, Text} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';

type Props = {
  onPress: () => void;
};

export const NoVehicles: FC<Props> = ({onPress}) => {
  const {t} = useTranslation('VehiclesLang');

  return (
    <Box>
      <Text underline mt={5} fontWeight={'500'} textAlign={'center'}>
        {t('no')}
      </Text>
      <Button
        onPress={onPress}
        borderRadius={20}
        mt={20}
        alignSelf={'center'}
        startIcon={<Icon as={AntDesign} name="plus" size={5} />}
        w={'50%'}>
        {t('vehicle')}
      </Button>
    </Box>
  );
};
