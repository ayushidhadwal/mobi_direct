import React, {FC} from 'react';
import {Image, Pressable} from 'native-base';
import {Dimensions, ImageSourcePropType} from 'react-native';

type Props = {
  image: ImageSourcePropType;
  onPress: () => void;
};

const {height} = Dimensions.get('window');
const HEIGHT = (height * 16) / 100;

export const ShortcutCard: FC<Props> = ({onPress, image}) => (
  <Pressable
    onPress={onPress}
    flex={1}
    shadow={1}
    borderRadius={5}
    alignItems="center">
    <Image
      alt="img"
      borderRadius={6}
      source={image}
      w="100%"
      h={HEIGHT}
      resizeMode="stretch"
    />
  </Pressable>
);
