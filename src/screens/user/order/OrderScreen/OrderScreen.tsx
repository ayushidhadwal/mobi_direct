import React, {FC, useEffect} from 'react';
import {Box, Fab, Icon, Text, VStack} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FlatList, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

import {OrderItem, useOrders} from '../../../../hooks/user/orders/useOrders';
import {Loader} from '../../../../components/Loader';
import {OrderCard} from './components';
import {OrdersScreenProps} from '../../../../navigation';
import {Empty} from '../../../../components/Empty';

export const OrderScreen: FC<OrdersScreenProps> = ({navigation}) => {
  const {orders, isLoading, mutate, isValidating} = useOrders();

  const {t} = useTranslation('OrderLang');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => mutate());

    return () => {
      unsubscribe();
    };
  }, [mutate, navigation]);

  const createNewOrder = () => navigation.navigate('Choose');

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box flex={1}>
      <FlatList
        data={orders}
        refreshing={isValidating}
        onRefresh={() => mutate()}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => String(item.id)}
        renderItem={({item}: {item: OrderItem}) => (
          <OrderCard
            onPress={() =>
              navigation.navigate('OrderDetails', {
                orderId: item.id,
              })
            }
            total={item.totalPrice}
            date={item.date}
            engineOil={item.engineOil}
            oilFilter={item.oilFilter}
            vehicleNumber={item.vehicleNumber}
            status={item.status}
            orderNumber={item.orderNumber}
          />
        )}
        ListEmptyComponent={
          <Empty>
            <VStack alignItems="center">
              <Text fontSize="lg" bold color="warning.500">
                {t('order')}
              </Text>
              <Text underline color="primary.400" onPress={createNewOrder} bold>
                {t('newOrder')}
              </Text>
            </VStack>
          </Empty>
        }
        contentContainerStyle={styles.contentContainer}
      />

      <Fab
        placement="bottom-right"
        renderInPortal={false}
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="md" />}
        onPress={createNewOrder}
        bgColor="primary.400"
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
