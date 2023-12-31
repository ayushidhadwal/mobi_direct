import React, {memo, useCallback, useRef} from 'react';
import {Image, Pressable} from 'native-base';
import {FlatList, Dimensions, Linking} from 'react-native';

import {useInterval} from '../../../../../hooks/useInterval';
import {useHomeBanner} from '../../../../../hooks/user/useHomeBanner';
import {Loader} from '../../../../../components/Loader';
import Config from '../../../../../config';

const {width, height} = Dimensions.get('screen');
const WIDTH = width;
const HEIGHT = (height * 20) / 100;

const HomeBanner = () => {
  const flatListRef = useRef<FlatList>(null);
  const {bannerList, isLoading} = useHomeBanner();
  const [index, setIndex] = React.useState<number>(0);

  const onViewableItemsChanged = useCallback((data: any) => {
    setIndex(data?.changed[0]?.index);
  }, []);

  useInterval(() => {
    if (bannerList && bannerList?.length > 0) {
      let scrollTo = index + 1;

      if (scrollTo === bannerList?.length) {
        scrollTo = 0;
        setIndex(scrollTo);
      }

      flatListRef?.current?.scrollToIndex({index: scrollTo, animated: true});
    }
  }, 1000 * 3);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <FlatList
      ref={flatListRef}
      data={bannerList}
      renderItem={({item}) => (
        <Pressable
          w={WIDTH}
          h={HEIGHT}
          px={4}
          mt={4}
          mb={2}
          borderRadius="md"
          onPress={() => Linking.openURL(`${item.bannerLink}`)}>
          <Image
            borderRadius="md"
            source={{uri: Config.API_URL + item.bannerImg}}
            width="100%"
            height="100%"
            alt="banner img"
            resizeMode={'stretch'}
          />
        </Pressable>
      )}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: '50%',
      }}
      keyExtractor={item => item.id}
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default memo(HomeBanner);
