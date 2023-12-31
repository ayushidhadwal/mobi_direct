import React, {FC} from 'react';
import {Box, HStack, Image, Menu, Pressable, Text, VStack} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';

type Props = {
  id: number;
  address: string;
  state: string;
  city: string;
  pinCode: string;
  deleteAddress: (addressId: number) => Promise<void>;
  editAddress: () => void;
};

export const AddressItem: FC<Props> = ({
  address,
  city,
  id,
  pinCode,
  state,
  deleteAddress,
  editAddress,
}) => {
  const {t} = useTranslation('AddressLang');
  return (
    <Box shadow={1} bg="#FFF" mx={4} mb={4} borderRadius={5}>
      <HStack flex={1} p={2} alignItems="flex-start">
        <HStack flexShrink={1} flex={2} alignItems="flex-start">
          <Box
            borderRadius="full"
            alignItems={'center'}
            backgroundColor={'primary.50'}>
            <Image
              source={require('../../../../../assets/Location.png')}
              resizeMode="contain"
              alt="icon"
              h={5}
              w={5}
              borderRadius={5}
            />
          </Box>

          <VStack ml={2}>
            <HStack mb={1} space={2}>
              <Text fontWeight="500">{address}</Text>
            </HStack>

            <HStack mb={1} space={2}>
              <Text color="muted.400">{t('state')}: </Text>
              <Text fontWeight="500">{state}</Text>
            </HStack>

            <HStack mb={1} space={2}>
              <Text color="muted.400">{t('city')}: </Text>
              <Text fontWeight="500">{city}</Text>
            </HStack>

            <HStack mb={1} space={2}>
              <Text color="muted.400">Pin code: </Text>
              <Text fontWeight="500">{pinCode}</Text>
            </HStack>
          </VStack>
        </HStack>

        <Box pl={2}>
          <Menu
            backgroundColor={'primary.50'}
            shouldOverlapWithTrigger={true}
            placement={'right top'}
            trigger={triggerProps => (
              <Pressable {...triggerProps} alignSelf={'flex-end'}>
                <MaterialCommunityIcons
                  name="dots-horizontal"
                  size={24}
                  color="black"
                />
              </Pressable>
            )}>
            <Menu.Item onPress={editAddress}>
              <AntDesign name="edit" size={15} color="black" />
              <Text>{t('edit')}</Text>
            </Menu.Item>
            <Menu.Item onPress={() => deleteAddress(id)}>
              <AntDesign name="delete" size={15} color="black" />
              <Text>{t('delete')}</Text>
            </Menu.Item>
          </Menu>
        </Box>
      </HStack>
    </Box>
  );
};
