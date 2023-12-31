import React, {FC, useCallback, useEffect, useState} from 'react';
import {Box, FlatList} from 'native-base';
import {format} from 'date-fns';
import {StyleSheet} from 'react-native';

import {ServiceCard} from '../../../../components/service/ServiceCard';
import {DateFilter, HistoryListHeader} from './components/';
import {useHistoryVehicles} from '../../../../hooks/user/history/useHistoryVehicles';
import {useHistory} from '../../../../hooks/user/history/useHistory';
import {ServiceScreenProps} from '../../../../navigation';
import {Empty} from '../../../../components/Empty';

export const ServiceHistoryScreen: FC<ServiceScreenProps> = ({navigation}) => {
  const [vehicleId, setVehicleId] = useState<string>('');
  const [year, setYear] = useState<string>(
    format(new Date(), 'yyyy').toString(),
  );
  const [month, setMonth] = useState<string>(
    format(new Date(), 'M').toString(),
  );

  const {isLoading, mutate, vehicles} = useHistoryVehicles();
  const {history, trigger, isMutating} = useHistory();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await mutate();
    });

    return () => {
      unsubscribe();
    };
  }, [mutate, navigation]);

  const onRefresh = useCallback(async () => {
    if (vehicleId && year && month) {
      await trigger({
        year: Number(year),
        month: Number(month),
        vehicleNumber: vehicleId,
      });
    }
  }, [month, trigger, vehicleId, year]);

  useEffect(() => {
    onRefresh().then();
  }, [onRefresh]);

  return (
    <Box flex={1}>
      <DateFilter
        value={vehicleId}
        setValue={setVehicleId}
        data={vehicles as string[]}
        isLoading={isLoading}
      />

      {!vehicleId ? (
        <Empty />
      ) : (
        <FlatList
          onRefresh={onRefresh}
          refreshing={isMutating}
          data={history?.list}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <HistoryListHeader
              averageServiceInterval={
                history?.summary.averageServiceInterval as number
              }
              nextService={history?.summary.nextService as number}
              month={month}
              year={year}
              changeMonth={setMonth}
              changeYear={setYear}
            />
          }
          ListEmptyComponent={<Empty />}
          keyExtractor={item => String(item.appointmentId)}
          renderItem={({item}) => (
            <ServiceCard
              item={item}
              onPress={() => {
                navigation.navigate('HistoryDetails', {
                  id: String(item.appointmentId),
                });
              }}
            />
          )}
          contentContainerStyle={styles.contentContainer}
        />
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    marginVertical: 16,
  },
});
