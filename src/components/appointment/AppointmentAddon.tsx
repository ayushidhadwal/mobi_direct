import React, {FC} from 'react';
import {Box, Divider, HStack, Text, VStack} from 'native-base';
import {useTranslation} from 'react-i18next';

type listElt = {
  title: string;
  cartQty: number;
};

type Props = {
  addOnList: listElt[] | undefined;
};

export const AppointmentAddon: FC<Props> = ({addOnList}) => {
  const {t} = useTranslation('AppointmentSummaryLang');
  return (
    <>
      <Text color="gray.400" fontWeight="600" fontSize="md">
        {t('addOn')}
      </Text>
      <Divider w={'10%'} backgroundColor={'primary.800'} mb={2} />
      {addOnList?.map((item, index) => (
        <Box
          shadow={1}
          bg="#FFF"
          borderRadius={5}
          mb={3}
          mx={1}
          key={String(index)}>
          <VStack p={3} space={2} alignItems={'center'}>
            <HStack space={2}>
              <Box flex={2} backgroundColor={'pink'}>
                <Text
                  color="gray.600"
                  fontWeight="400"
                  flexShrink={1}
                  numberOfLines={3}>
                  {item.title}
                </Text>
              </Box>
              <Box flex={1} alignItems={'center'} justifyContent={'center'}>
                <Text color="gray.400" fontWeight="600" fontSize="md">
                  x{'   '}
                  {item.cartQty}
                </Text>
              </Box>
            </HStack>
          </VStack>
        </Box>
      ))}
    </>
  );
};
