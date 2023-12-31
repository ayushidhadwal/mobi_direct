import React, {FC} from 'react';
import {HStack, IconButton, Pressable, Text} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  name: string;
  icon: any;
  iconName: string;
  logout?: boolean;
  onPress: () => void;
  danger?: boolean;
};

export const SettingsCard: FC<Props> = ({
  name,
  icon,
  iconName,
  onPress,
  logout,
  danger,
}) => {
  return (
    <Pressable
      bg="white"
      borderBottomWidth={0.2}
      borderColor="gray.300"
      mb={1}
      onPress={onPress}>
      <HStack space={2} justifyContent="space-between" p={1}>
        <HStack alignItems="center">
          <IconButton
            backgroundColor={danger ? 'red.400' : 'primary.400'}
            variant="solid"
            size="sm"
            borderRadius="full"
            _icon={{
              as: icon,
              name: iconName,
            }}
          />

          <Text
            fontFamily="body"
            fontWeight={'400'}
            fontStyle="normal"
            color="black"
            fontSize="sm"
            ml={2}>
            {name}
          </Text>
        </HStack>

        {!logout && (
          <IconButton
            onPress={onPress}
            variant={'ghost'}
            _pressed={{
              bg: 'muted.50',
            }}
            size={'xs'}
            ml={4}
            borderRadius={'full'}
            _icon={{
              as: MaterialIcons,
              name: 'keyboard-arrow-right',
              size: 'lg',
              color: 'black',
            }}
          />
        )}
      </HStack>
    </Pressable>
  );
};
