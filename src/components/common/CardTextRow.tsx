import React, {FC} from 'react';
import {Box, HStack, Text} from 'native-base';

export const CardTextRow: FC<any> = ({heading, value}) => {
  return (
    <HStack space={2}>
      <Box flex={1}>
        <Text color="gray.400" fontWeight="600" fontSize="md">
          {heading}:{' '}
        </Text>
      </Box>
      <Box flex={1.5}>
        <Text color="gray.600" fontWeight="400" flexShrink={1}>
          {value}
        </Text>
      </Box>
    </HStack>
  );
};
