import React, {FC} from 'react';
import {Box, Text} from 'native-base';
import {useTranslation} from 'react-i18next';

type Props = {
  onAddressPress: () => void;
  onProfilePress: () => void;
  addressError: boolean;
  profileError: boolean;
};

export const EmptySelectAddress: FC<Props> = ({
  onAddressPress,
  onProfilePress,
  addressError,
  profileError,
}) => {
  const {t} = useTranslation('CompleteDetailsLang');
  return (
    <Box>
      {profileError && (
        <Box shadow={1} bg="#FFF" borderRadius={5} m={3} p={3}>
          <Text color="red.500" textAlign="center" mb={3}>
            {t('inCompleteProfile')}
          </Text>
          <Text
            onPress={onProfilePress}
            fontSize="md"
            underline
            bold
            color="primary.700"
            textAlign="center">
            {t("pleaseUpdate")}
          </Text>
        </Box>
      )}

      {addressError && (
        <Box shadow={1} bg="#FFF" borderRadius={5} m={3} p={3}>
          <Text color="red.500" textAlign="center" mb={3}>
            {t("noAddress")}
          </Text>
          <Text
            onPress={onAddressPress}
            fontSize="md"
            underline
            bold
            color="primary.700"
            textAlign="center">
            {t("addAddress")}
          </Text>
        </Box>
      )}
    </Box>
  );
};
