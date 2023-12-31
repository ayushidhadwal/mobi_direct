import React, {FC, useEffect} from 'react';
import {ScrollView} from 'native-base';
import {StatusBar} from 'react-native';

import HomeBanner from './components/HomeBanner';
import {HomeUpcomingServices, HomeScreenShortcuts} from './components';
import {useUpcomingService} from '../../../../hooks/user/orders/useUpcomingService';
import {Loader} from '../../../../components/Loader';
import {HomeScreenProps} from '../../../../navigation';

export const HomeScreen: FC<HomeScreenProps> = ({navigation}) => {
  const {isLoading, upcomingService, mutate} = useUpcomingService();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => mutate());

    return () => {
      unsubscribe();
    };
  }, [navigation, mutate]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false}>
      <StatusBar
        animated={true}
        backgroundColor="#FFF"
        barStyle="dark-content"
      />

      <HomeBanner />
      <HomeUpcomingServices upcomingService={upcomingService} />

      <HomeScreenShortcuts />
    </ScrollView>
  );
};
