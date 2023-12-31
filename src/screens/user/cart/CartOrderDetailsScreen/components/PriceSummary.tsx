import {Box, Divider, HStack, Text, VStack} from 'native-base';
import React, {FC} from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  subTotal: number;
  total: number;
  discount: number;
};

export const PriceSummary: FC<Props> = ({subTotal, total, discount}) => {
  const {t} = useTranslation('OrderDetailsLang');

  return (
    <VStack mb={3}>
      <Text fontSize="lg" fontWeight="400">
        {t("priceSummary")}
      </Text>
      <Divider w={'10%'} backgroundColor={'primary.800'} mb={3} />

      <VStack space={1}>
        <HStack>
          <Box flex={1}>
            <Text color="gray.400" fontSize="md" fontWeight="600">
              {t('subTotal')}
            </Text>
          </Box>
          <Box flex={1} alignItems="flex-end">
            <Text>RM {Number(subTotal).toFixed(2)}</Text>
          </Box>
        </HStack>

        <HStack>
          <Box flex={1}>
            <Text color="gray.400" fontSize="md" fontWeight="600">
              {t('discount')}
            </Text>
          </Box>
          <Box flex={1} alignItems="flex-end">
            <Text>(-) RM {Number(discount).toFixed(2)}</Text>
          </Box>
        </HStack>

        <Divider backgroundColor={'primary.800'} my={2} />

        <HStack mb={3}>
          <Box flex={1}>
            <Text color="gray.400" fontSize="md" fontWeight="600">
              {t('total')}
            </Text>
          </Box>
          <Box flex={1} alignItems="flex-end">
            <Text fontSize="md" color="primary.400">
              RM {Number(total).toFixed(2)}
            </Text>
          </Box>
        </HStack>
      </VStack>
    </VStack>
  );
};
