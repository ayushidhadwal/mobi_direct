import {HStack, Pressable, Text, VStack} from 'native-base';
import React, {FC} from 'react';
import {format} from 'date-fns';

type Props = {
  id: number;
  status: boolean;
  onPress: () => void;
  amount: number;
  date: string;
};

export const TransactionCard: FC<Props> = ({
  status,
  date,
  id,
  amount,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <VStack
        p={3}
        mx={4}
        mb={4}
        borderRadius={5}
        backgroundColor="#FFF"
        shadow={1}>
        <HStack justifyContent="space-between" mb={2}>
          <Text color="gray.500">#{id}</Text>

          <Text
            bold
            textTransform="uppercase"
            color={status ? 'success.500' : 'danger.500'}>
            {status ? 'Success' : 'Failed'}
          </Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text color="gray.600">
            {format(new Date(date), 'dd, MMM yyyy hh:mm aaa')}
          </Text>
          <Text color="primary.400">RM {amount.toFixed(2)}</Text>
        </HStack>
      </VStack>
    </Pressable>
  );
};
