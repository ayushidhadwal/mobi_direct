import React, {FC} from 'react';
import {Box, Divider, HStack, Text, VStack} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';

type Props = {
  isApplied: boolean;
  code: string;
  discount: number;
  onPress: () => void;
};

export const SummaryCoupon: FC<Props> = ({
  isApplied,
  code,
  discount,
  onPress,
}) => {
  const {t} = useTranslation('CartOrderLang');
  return (
    <VStack>
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize="lg" fontWeight="400">
          {t('coupon')}
        </Text>
        <Text
          onPress={onPress}
          fontSize="sm"
          fontWeight="400"
          underline
          color="primary.800">
          {t('applyCoupon')}
        </Text>
      </HStack>
      <Divider w={'10%'} backgroundColor={'primary.800'} mb={3} />

      <Box
        borderRadius={5}
        borderWidth={0.2}
        borderColor="gray.400"
        bg="#fff"
        mb={3}>
        <HStack alignItems="center">
          <Box p={1} borderRadius={5} backgroundColor={'primary.50'} m={2}>
            <MaterialIcons name="new-releases" size={24} color="black" />
          </Box>
          {isApplied ? (
            <VStack flexShrink={1}>
              <Text color="gray.600" fontSize="md" fontWeight="400">
                {code}
              </Text>
              <Text
                flexShrink={1}
                color="success.700"
                fontSize="sm"
                fontWeight="400">
                {t('youSaved')}
                {discount}
              </Text>
            </VStack>
          ) : (
            <Text color="danger.700" fontSize="md" fontWeight="400">
              {t('noCouponApplied')}
            </Text>
          )}
        </HStack>
      </Box>
    </VStack>
  );
};
