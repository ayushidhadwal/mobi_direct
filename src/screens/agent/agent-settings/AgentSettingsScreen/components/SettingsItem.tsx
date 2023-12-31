import {ChevronRightIcon, HStack, Icon, Pressable, Text} from 'native-base';
import React, {FC} from 'react';

type Props = {
  label: string;
  icon: any;
  iconName: string;
  logout?: boolean;
  onPressHandler: () => void;
};

export const SettingsItem: FC<Props> = ({
  label,
  icon,
  iconName,
  logout,
  onPressHandler,
}) => {
  return (
    <Pressable
      onPress={onPressHandler}
      p={2}
      py={4}
      borderBottomWidth={0.5}
      borderColor="#dedede">
      <HStack alignItems="center" justifyContent="space-between">
        <HStack space={2} alignItems="center">
          <Icon as={icon} name={iconName} color={'black'} size={'md'} />
          <Text color="black" fontSize="md" fontWeight="300">
            {label}
          </Text>
        </HStack>

        {!logout && <ChevronRightIcon color={'black'} size={'md'} />}
      </HStack>
    </Pressable>
  );
};
