import React, {FC, useEffect} from 'react';
import {Box, Fab, Icon, FlatList, Text, VStack} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useAppointmentList} from '../../../../hooks/user/appointment/useAppointmentList';
import {Loader} from '../../../../components/Loader';
import {RenderAppointment} from './components/RenderAppointment';
import {Empty} from '../../../../components/Empty';
import {AppointmentScreenProps} from '../../../../navigation';

export const AppointmentScreen: FC<AppointmentScreenProps> = ({navigation}) => {
  const {appointmentList, isLoading, mutate, isValidating} =
    useAppointmentList();

  const {t} = useTranslation('AppointmentLang');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => mutate());

    return () => {
      unsubscribe();
    };
  }, [mutate, navigation]);

  const newAppointment = () => navigation.navigate('CreateAppointment');

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box flex={1}>
      <FlatList
        data={appointmentList}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => String(item.id)}
        renderItem={RenderAppointment}
        refreshing={isValidating}
        onRefresh={() => mutate()}
        ListEmptyComponent={
          <Empty>
            <VStack alignItems="center">
              <Text fontSize="lg" bold color="warning.500">
                {t('noAppointment')}
              </Text>
              <Text underline color="primary.400" onPress={newAppointment} bold>
                {t('newAppointment')}
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
        onPress={newAppointment}
        bgColor="primary.400"
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    marginVertical: 18,
  },
});
