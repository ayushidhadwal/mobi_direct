import React, {FC} from 'react';
import {HStack, Icon, Text} from 'native-base';

type Props = {
  icon: any;
  iconName: string;
  heading: string;
  val: string;
};

export const TextRow: FC<Props> = ({icon, iconName, heading, val}) => {
  return (
    <HStack w={'85%'} mt={5} ml={5} justifyContent={'space-between'}>
      <HStack>
        <Icon
          as={icon}
          name={iconName}
          color={'gray.400'}
        />
        <Text ml={3} color={'gray.400'}>
          {heading}
        </Text>
      </HStack>
      <Text>{val}</Text>
    </HStack>
  );
};
