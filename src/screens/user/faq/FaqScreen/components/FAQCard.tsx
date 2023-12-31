import React, {FC, useState} from 'react';
import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Pressable,
  Text,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  onPress: () => void;
  title: string;
  desc: string;
  index: number;
};

export const FAQCard: FC<Props> = ({onPress, title, desc, index}) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <Box w={'95%'} alignSelf={'center'} p={2}>
      <Pressable onPress={() => setShow(!show)}>
        <HStack justifyContent={'space-between'} alignItems={'center'} py={1}>
          <Text
            w={'90%'}
            numberOfLines={2}
            color={'black'}
            fontWeight={'bold'}
            fontSize={'md'}>
            {index + 1}. {title}
          </Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </HStack>
      </Pressable>
      {show && (
        <Box mt={2}>
          <Text color={'black'} numberOfLines={3}>
            {desc}
          </Text>
          <Button
            size="sm"
            variant="ghost"
            alignSelf={'flex-end'}
            my={1}
            onPress={onPress}>
            read more...
          </Button>
        </Box>
      )}
      <Center>
        <Divider
          my={1}
          alignSelf={'center'}
          _light={{
            bg: 'primary.100',
          }}
        />
      </Center>
    </Box>
  );
};
