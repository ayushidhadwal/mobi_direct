import React, {FC} from 'react';
import {HStack, IconButton, Pressable, Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  address: string;
  state: string;
  city: string;
  pinCode: string;
  onSelect: () => void;
};

export const SelectAddressItem: FC<Props> = ({
  address,
  city,
  pinCode,
  state,
  onSelect,
}) => {
  return (
    <Pressable
      onPress={onSelect}
      shadow={1}
      bg="#FFF"
      mx={4}
      mb={4}
      borderRadius={5}
      p={3}>
      <HStack
        flexShrink={1}
        flex={2}
        alignItems="flex-start"
        justifyContent="space-between">
        <Text fontSize="md" fontWeight={400}>
          {`${address}\n${state ? ',' + state + ',' : ''}${
            city ? city + ',' : ''
          }\n${pinCode ? pinCode : ''}`}
        </Text>
        <IconButton
          onPress={onSelect}
          variant="solid"
          size="sm"
          colorScheme="gray"
          ml={4}
          borderRadius="full"
          _icon={{
            as: Ionicons,
            name: 'ios-chevron-forward-outline',
            color: 'white',
          }}
        />
      </HStack>
    </Pressable>
  );
};
