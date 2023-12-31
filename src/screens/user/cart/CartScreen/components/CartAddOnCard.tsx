import React, {FC} from 'react';
import {Box, HStack, Icon, IconButton, Text, VStack} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  name: string;
  qty: number;
  price: string;
  onDelete: () => void;
  onQtyAdd: () => void;
  onQtyMinus: () => void;
};

export const CartAddOnCard: FC<Props> = ({
  name,
  qty,
  price,
  onDelete,
  onQtyAdd,
  onQtyMinus,
}) => {
    return (
    <Box shadow={1} bg="#FFF" borderRadius={5} mb={3}>
      <HStack justifyContent="space-between" alignItems="flex-start">
        <HStack p={3} alignItems="center" flexShrink={1}>
          <Text
            color="gray.600"
            fontWeight="400"
            numberOfLines={3}
            flexShrink={1}
            textTransform="capitalize">
            {name}
          </Text>
        </HStack>
        <IconButton
          onPress={onDelete}
          alignSelf="flex-start"
          variant="solid"
          colorScheme="danger"
          size="xs"
          icon={<Icon size="sm" as={<Ionicons name="trash" />} color="white" />}
        />
      </HStack>

      <VStack p={3} space={2}>
        <HStack space={2} alignItems="center">
          <Box flex={2} alignItems="flex-end">
            <HStack alignItems="center" space={2}>
              <IconButton
                onPress={onQtyMinus}
                size="sm"
                _icon={{
                  as: Ionicons,
                  name: 'md-remove-circle',
                  size: 'md',
                  color: 'black',
                }}
              />

              <Text
                color="gray.600"
                fontWeight="400"
                flexShrink={1}
                numberOfLines={2}>
                {qty}
              </Text>
              <IconButton
                onPress={onQtyAdd}
                size="sm"
                _icon={{
                  as: Ionicons,
                  name: 'md-add-circle',
                  size: 'md',
                  color: 'black',
                }}
              />
            </HStack>
          </Box>
          <Box flex={1} alignItems="flex-end">
            <Text color="primary.400" flexShrink={1} numberOfLines={2}>
              RM {price}
            </Text>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};
