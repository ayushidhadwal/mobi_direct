import {ScrollView, Text} from 'native-base';
import React, {FC, useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import YoutubePlayer from 'react-native-youtube-iframe';
import {FaqDetailScreenProps} from '../../../../navigation';

export const FaqDetailScreen: FC<FaqDetailScreenProps> = ({route}) => {
  const [playing, setPlaying] = useState(false);

  const {videoId, desc, title} = route.params;

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={true}>
        <YoutubePlayer
          height={220}
          play={playing}
          videoId={videoId}
          onChangeState={() => onStateChange}
        />
        <Text
          p={2}
          textAlign={'justify'}
          color={'black'}
          fontWeight={'bold'}
          fontSize={'md'}>
          {title}
        </Text>
        <Text p={2} textAlign={'justify'}>
          {desc}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};
