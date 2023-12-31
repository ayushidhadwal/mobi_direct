import React, {FC} from 'react';
import {Box, Button, HStack, Text, VStack} from 'native-base';
import { useTranslation } from 'react-i18next';

import {CouponType} from '../../../../../hooks/user/useUserCoupons';

type Props = {
  code: string;
  isApply: boolean;
  apply: () => void;
  amount: number;
  type: CouponType;
  title: string;
};

export const ApplyCouponItem: FC<Props> = ({
  code,
  amount,
  type,
  isApply,
  apply,
  title,
}) => {
  const {t} = useTranslation("CouponLang")
  return (
    <HStack space={1} bg="#fff" shadow={1} m={3} borderRadius={6}>
      <VStack
        bg="gray.300"
        borderTopLeftRadius={6}
        borderBottomLeftRadius={6}
        justifyContent="center">
        <Text
          fontSize="lg"
          style={{
            transform: [{rotate: '-90deg'}],
          }}
          fontWeight="700">
          {type === CouponType.numeric ? t("flatOff") : `${amount}%` + t("off")}
        </Text>
      </VStack>

      <VStack flex={1}>
        <HStack space={1} alignItems="flex-start">
          <VStack flex={2} flexShrink={1} p={3} space={1}>
            <Text fontSize="md">{code}</Text>
            <Text color="success.800">{title}</Text>
          </VStack>

          {isApply && (
            <Button
              borderRadius={0}
              color="primary.300"
              onPress={apply}
              variant="ghost">
              {t("apply")}
            </Button>
          )}
        </HStack>

        <Box
          borderWidth={0.5}
          w="90%"
          borderColor="#ccc"
          borderStyle="dashed"
          alignSelf="center"
        />

        <HStack p={3}>
          <Text color="gray.600">
            {t("useCode")} {code} {t("get")}{' '}
            {type === CouponType.percentage ? '60%' : `Flat RM ${amount}`} {t("orderOff")}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
};
