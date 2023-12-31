import React, {FC} from 'react';
import {Dimensions} from 'react-native';
import {
  Box,
  HStack,
  Icon,
  Image,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

import {UpcomingService} from '../../../../../hooks/user/orders/useUpcomingService';
import {UserNavigationProps} from '../../../../../navigation';
import {EmptyUpcomingServices} from './EmptyUpcomingServices';

const {width} = Dimensions.get('screen');
const WIDTH = (width * 60) / 100;

type Props = {
  upcomingService: UpcomingService[] | undefined;
};

export const HomeUpcomingServices: FC<Props> = ({upcomingService}) => {
  const {t} = useTranslation('HomeLang');

  const navigation = useNavigation<UserNavigationProps>();

  return (
    <Box>
      <Text
        fontWeight={'500'}
        color={'primary.400'}
        fontSize={'lg'}
        mt={4}
        px={4}>
        {t('upcoming')}
      </Text>
      {!upcomingService || upcomingService?.length === 0 ? (
        <EmptyUpcomingServices />
      ) : (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <HStack px={4} space={4}>
            {upcomingService?.map(item => {
              return (
                <Pressable
                  onPress={() =>
                    navigation.navigate('CarService', {
                      vehicleId: String(item.vehicleId),
                    })
                  }
                  key={item.vehicleNumber}
                  my={2}
                  p={4}
                  borderRadius="lg"
                  shadow={1}
                  bg="#FFF"
                  style={{width: WIDTH}}>
                  <HStack alignItems={'center'} mb={1}>
                    <Icon
                      as={() => (
                        <Image
                          alt={'img'}
                          source={require('../../../../../assets/icons/car.png')}
                          w={6}
                          h={6}
                        />
                      )}
                    />
                    <Text
                      fontWeight={'bold'}
                      color={'secondary.400'}
                      fontSize={'xs'}
                      ml={2}>
                      {item.vehicleNumber}
                    </Text>
                  </HStack>

                  <HStack alignItems={'center'} mt={1}>
                    <Icon
                      as={() => (
                        <Image
                          alt={'img'}
                          source={require('../../../../../assets/icons/engine-oil.png')}
                          w={6}
                          h={6}
                        />
                      )}
                    />
                    <Text
                      flexShrink={1}
                      fontWeight={'300'}
                      color={'secondary.400'}
                      fontSize={'xs'}
                      ml={2}>
                      {Number(item.dueDate) > 0
                        ? `Service due in ${item.dueDate} days`
                        : 'Service is due'}
                    </Text>
                  </HStack>
                </Pressable>
              );
            })}
          </HStack>
        </ScrollView>
      )}
    </Box>
  );
};
