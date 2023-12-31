import React, {FC, useCallback, useRef} from 'react';
import {FlatList, ImageBackground, StatusBar, StyleSheet} from 'react-native';
import {Box, HStack, Button} from 'native-base';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {SliderDots} from '../../../components/onboarding/SliderDots';
import {OnBoardingData} from './components/OnBoardingData';
import {AuthStackParamList} from '../../../navigation/AuthNavigation';
import {RenderOnBoardingItems} from './components/RenderOnBoardingItems';

type Props = NativeStackScreenProps<AuthStackParamList, 'OnBoarding'>;

export const OnBoardingScreen: FC<Props> = ({navigation}: Props) => {
  const {t} = useTranslation('OnboardingLang');

  const [index, setIndex] = React.useState<number>(0);

  const onViewableItemsChanged = useCallback((data: any) => {
    setIndex(data?.changed[0]?.index);
  }, []);

  const flatListRef = useRef<FlatList>(null);
  const onSkip = () => navigation.navigate('Login');
  const onNext = () =>
    flatListRef.current?.scrollToIndex({index: index + 1, animated: true});

  const {bottom, top} = useSafeAreaInsets();

  const dataLength = OnBoardingData.length - 1;
  const isLast = index < dataLength;
  const isEquals = index === dataLength;

  return (
    <Box flex="1" justifyContent="center">
      <StatusBar
        animated={true}
        backgroundColor="white"
        barStyle="dark-content"
      />
      <ImageBackground
        source={require('../../../assets/background11.png')}
        resizeMode="cover"
        style={[
          styles.bgImg,
          {
            paddingTop: top,
            paddingBottom: bottom,
          },
        ]}>
        <HStack justifyContent="flex-end" p={5} mt={8}>
          {isLast && (
            <Button
              bg="black"
              colorScheme="black"
              shadow={5}
              rounded={10}
              px={5}
              py={2}
              onPress={onSkip}>
              {t('skip')}
            </Button>
          )}
        </HStack>

        <FlatList
          data={OnBoardingData}
          renderItem={RenderOnBoardingItems}
          keyExtractor={item => item.id}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: '50%',
          }}
          ref={flatListRef}
        />
        <HStack
          justifyContent="space-between"
          px={5}
          pb={10}
          alignItems={'center'}>
          <SliderDots data={OnBoardingData} activeIndex={index} />
          <Button
            shadow={5}
            rounded={10}
            px={5}
            py={2}
            bg="black"
            colorScheme="black"
            onPress={isEquals ? onSkip : onNext}>
            {isEquals ? t('start') : t('next')}
          </Button>
        </HStack>
      </ImageBackground>
    </Box>
  );
};

const styles = StyleSheet.create({
  bgImg: {
    flex: 1,
    justifyContent: 'center',
  },
});
