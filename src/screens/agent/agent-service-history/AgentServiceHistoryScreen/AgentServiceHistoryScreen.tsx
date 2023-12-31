import React, {FC, useCallback, useEffect, useState} from 'react';
import {Box, CheckIcon, FlatList, HStack, Select} from 'native-base';
import {format} from 'date-fns';

import {useAgentCompletedRequests} from '../../../../hooks/agent/useAgentCompletedRequests';
import {AgentPendingRequests} from '../../../../hooks/agent/useAgentPendingRequests';
import {ServiceCard} from '../../../../components/agent-service/ServiceCard';
import {months, years} from '../../../../utils/monthYearPicker';
import {AgentServiceScreenProps} from '../../../../navigation';
import {Empty} from '../../../../components/Empty';

export const AgentServiceHistoryScreen: FC<AgentServiceScreenProps> = ({
  navigation,
}) => {
  const [year, setYear] = useState<string>(
    format(new Date(), 'yyyy').toString(),
  );
  const [month, setMonth] = useState<string>(
    format(new Date(), 'M').toString(),
  );

  const {trigger, isMutating, requests} = useAgentCompletedRequests();

  const onRefresh = useCallback(async () => {
    if (year && month) {
      await trigger({
        year: String(year),
        month: String(month),
      });
    }
  }, [month, trigger, year]);

  useEffect(() => {
    onRefresh().then();
  }, [onRefresh]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', onRefresh);

    return () => {
      unsubscribe();
    };
  }, [navigation, onRefresh]);

  return (
    <Box flex={1}>
      <FlatList
        contentContainerStyle={{paddingVertical: 16}}
        refreshing={isMutating}
        onRefresh={onRefresh}
        data={requests}
        renderItem={({item}: {item: AgentPendingRequests}) => (
          <ServiceCard
            onPress={() => {
              navigation.navigate('AgentHistoryDetail', {
                id: item.id,
              });
            }}
            item={item}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <HStack space={2} mb={4} mx={4}>
            <Select
              minW="40"
              size="md"
              placeholder="Month"
              selectedValue={month}
              width="full"
              borderRadius={'sm'}
              onValueChange={setMonth}
              _selectedItem={{
                bg: 'primary.400',
                endIcon: <CheckIcon size={3} />,
              }}
              mt={1}>
              {months.map(item => (
                <Select.Item
                  key={item.value}
                  label={item.title}
                  value={item.value}
                />
              ))}
            </Select>

            <Select
              minW="24"
              size="md"
              placeholder="Year"
              selectedValue={year}
              width="full"
              borderRadius={'sm'}
              onValueChange={setYear}
              _selectedItem={{
                bg: 'primary.400',
                endIcon: <CheckIcon size={3} />,
              }}
              mt={1}>
              {years.map(item => (
                <Select.Item key={String(item)} label={item} value={item} />
              ))}
            </Select>
          </HStack>
        }
        ListEmptyComponent={<Empty />}
        keyExtractor={item => String(item.id)}
      />
    </Box>
  );
};
