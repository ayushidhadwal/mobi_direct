import React, {FC, useEffect} from 'react';
import {Box} from 'native-base';
import {FlatList, StyleSheet} from 'react-native';

import {TransactionScreenProps} from '../../../../navigation';
import {TransactionCard} from '../../../../components/transaction/Transaction';
import {Empty} from '../../../../components/Empty';
import {
  UserTransaction,
  UserTransactionStatus,
  useUserTransactions,
} from '../../../../hooks/user/useUserTransactions';
import {Loader} from '../../../../components/Loader';

export const TransactionScreen: FC<TransactionScreenProps> = ({navigation}) => {
  const {transactions, isValidating, isLoading, mutate} = useUserTransactions();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => mutate());

    return () => {
      unsubscribe();
    };
  }, [mutate, navigation]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box flex={1}>
      <FlatList
        refreshing={isValidating}
        onRefresh={() => mutate()}
        data={transactions}
        keyExtractor={item => String(item.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({item}: {item: UserTransaction}) => (
          <TransactionCard
            amount={item.amount}
            id={item.txnId}
            status={item.status === UserTransactionStatus.success}
            onPress={() =>
              navigation.navigate('OrderDetails', {orderId: item.orderId})
            }
            date={item.date}
          />
        )}
        ListEmptyComponent={<Empty />}
        contentContainerStyle={styles.contentContainer}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 6,
  },
});
