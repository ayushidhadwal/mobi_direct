import {ImageSourcePropType, Platform} from 'react-native';
import {HStack, Icon, Image, Spacer, Text} from 'native-base';
import React from 'react';

export const RowItem = ({
  heading,
  value,
  img,
}: {
  heading: string;
  value: string;
  img: ImageSourcePropType;
}) => {
  return (
    <HStack mb={1}>
      <HStack>
        <Icon as={() => <Image alt={'img'} source={img} w={5} h={5} />} />
        <Text
          fontFamily="body"
          fontWeight={'300'}
          fontStyle="normal"
          fontSize={Platform.OS === 'ios' ? 'md' : 'sm'}
          ml={2}
          color={'grey'}>
          {heading}
        </Text>
      </HStack>
      <Spacer />
      <Text
        fontFamily="body"
        fontWeight={'300'}
        fontStyle="normal"
        fontSize={Platform.OS === 'ios' ? 'md' : 'sm'}
        color={'black'}
        numberOfLines={3}
        w={'60%'}
        textAlign={'right'}>
        {value}
      </Text>
    </HStack>
  );
};
