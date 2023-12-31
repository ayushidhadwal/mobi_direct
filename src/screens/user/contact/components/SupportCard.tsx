import React, {FC} from 'react';
import {Box, HStack, Pressable, Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  heading?: string;
  onPress: () => void;
  icon: string;
};
export const SupportCard: FC<Props> = ({heading, onPress, icon}) => {
  return (
    <Pressable
      onPress={onPress}
      width={'90%'}
      p={3}
      backgroundColor={'white'}
      shadow={3}
      alignSelf={'center'}
      borderRadius={8}
      mb={3}>
      <HStack justifyContent={'space-between'} alignItems={'center'}>
        <HStack alignItems={'center'}>
          <Box bg={'primary.400'} p={1} rounded={100} mr={2}>
            <Ionicons name={icon} size={18} color="white" />
          </Box>
          <Text fontWeight={'bold'}>{heading}</Text>
        </HStack>
        <Ionicons name="chevron-forward-outline" size={20} color="black" />
      </HStack>
    </Pressable>
  );
};
