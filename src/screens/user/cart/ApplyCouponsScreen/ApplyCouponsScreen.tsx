import React, {FC} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, StyleSheet} from 'react-native';

import {Coupon, useUserCoupons} from '../../../../hooks/user/useUserCoupons';
import {Loader} from '../../../../components/Loader';
import {EmptyCoupons} from '../../coupon/CouponScreen/components/EmptyCoupons';
import {ApplyCouponItem} from './components/ApplyCouponItem';
import {ApplyCouponsScreenProps} from '../../../../navigation';

export const ApplyCouponsScreen: FC<ApplyCouponsScreenProps> = ({
  navigation,
}) => {
  const {coupons, isLoading, mutate, isValidating} = useUserCoupons();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.screen}>
      <FlatList
        refreshing={isValidating}
        onRefresh={() => mutate()}
        ListEmptyComponent={<EmptyCoupons />}
        contentContainerStyle={styles.contentContainer}
        data={coupons}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => String(item.id)}
        renderItem={({item}: {item: Coupon}) => (
          <ApplyCouponItem
            code={item.name}
            amount={Number(item.amount)}
            apply={() =>
              navigation.navigate('Cart', {
                coupon: item.name,
              })
            }
            isApply={true}
            type={item.type}
            title={item.title}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    marginVertical: 6,
  },
});
