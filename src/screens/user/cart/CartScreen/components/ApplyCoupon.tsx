import React, {FC} from 'react';
import {
  Divider,
  HStack,
  IconButton,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import {useTranslation} from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  code?: string;
  onPress: () => void;
  isApplied: boolean;
  discount?: string;
};

export const ApplyCoupon: FC<Props> = ({
  discount,
  code,
  onPress,
  isApplied,
}) => {
  const {t} = useTranslation('CartLang');

  return (
    <>
      <Text fontSize="lg" fontWeight="400" mt={3}>
        {t('offer')}
      </Text>
      <Divider w={'10%'} backgroundColor={'primary.800'} mb={3} />

      <Pressable
        mb={6}
        onPress={onPress}
        p={3}
        borderRadius={5}
        borderWidth={0.5}
        borderColor="gray.400"
        shadow={1}
        bg="#fff">
        <HStack justifyContent="space-between" alignItems="center">
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
                {t('youSaved')} RM{discount}
              </Text>
            </VStack>
          ) : (
            <Text color="primary.400" fontSize="md" fontWeight="400">
              {t('apply')}
            </Text>
          )}
          <IconButton
            onPress={onPress}
            variant="solid"
            size="sm"
            colorScheme={isApplied ? 'danger' : 'secondary'}
            ml={4}
            _icon={{
              as: Ionicons,
              name: isApplied
                ? 'ios-close-outline'
                : 'ios-chevron-forward-outline',
              color: 'white',
            }}
          />
        </HStack>
      </Pressable>
    </>
  );
};
