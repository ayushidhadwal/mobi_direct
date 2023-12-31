import React, {FC} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'native-base';

import {Empty} from '../../../../components/Empty';
import {FAQCard} from './components/FAQCard';
import {FAQItem, useFaq} from '../../../../hooks/user/faq/useFaq';
import {Loader} from '../../../../components/Loader';
import {FaqScreenProps, UserNavigationProps} from '../../../../navigation';
import {useNavigation} from '@react-navigation/native';

export const FaqScreen: FC<FaqScreenProps> = ({}) => {
  const navigation = useNavigation<UserNavigationProps>();
  const {faqList, isLoading} = useFaq();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <FlatList
        data={faqList}
        renderItem={({item, index}: {item: FAQItem; index: number}) => (
          <FAQCard
            onPress={() =>
              navigation.navigate('FaqDetail', {
                videoId: item.videoId,
                title: item.title,
                desc: item.desc,
              })
            }
            title={item.title}
            desc={item.desc}
            index={index}
          />
        )}
        keyExtractor={item => String(item.id)}
        ListEmptyComponent={<Empty />}
      />
    </SafeAreaView>
  );
};
