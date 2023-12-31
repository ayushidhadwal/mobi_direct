import React, {FC} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useUserCoupons} from '../../../../hooks/user/useUserCoupons';
import {Loader} from '../../../../components/Loader';
import {EmptyCoupons} from './components/EmptyCoupons';
import {RenderCoupons} from './components/RenderCoupons';
import {CouponScreenProps} from '../../../../navigation';

export const CouponScreen: FC<CouponScreenProps> = ({}) => {
  const {isLoading, coupons, isValidating, mutate} = useUserCoupons();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.screen}>
      <FlatList
        data={coupons}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => String(item.id)}
        renderItem={RenderCoupons}
        ListEmptyComponent={<EmptyCoupons />}
        refreshing={isValidating}
        onRefresh={() => mutate()}
        contentContainerStyle={styles.contentContainer}
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
    marginVertical: 16,
  },
});
