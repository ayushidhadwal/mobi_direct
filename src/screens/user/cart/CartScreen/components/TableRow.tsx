import {Box, HStack, Text} from 'native-base';
import React, {FC} from 'react';

type Props = {
  heading?: string;
  value?: string;
  price?: number;
  noPrice?: boolean;
};

export const TableRow: FC<Props> = ({heading, value, price, noPrice}) => {
  return (
    <HStack space={2}>
      <Box flex={1}>
        {heading && (
          <Text color="gray.400" fontWeight="600" fontSize="md">
            {heading}:{' '}
          </Text>
        )}
      </Box>
      <Box flex={2}>
        <Text
          color="gray.600"
          fontWeight="400"
          flexShrink={1}
          numberOfLines={3}>
          {value}
        </Text>
      </Box>
      <Box flex={1} alignItems="flex-end">
        {price ? (
          <Text color="primary.400" flexShrink={1} numberOfLines={2}>
            RM {price.toFixed(2)}
          </Text>
        ) : noPrice ? null : (
          <Text color="primary.400" flexShrink={1} numberOfLines={2}>
            Free
          </Text>
        )}
      </Box>
    </HStack>
  );
};
