import {Image, Pressable} from 'native-base';
import React, {FC} from 'react';
import {Dimensions, ImageResizeMode, ImageSourcePropType} from 'react-native';

type Props = {
  onPress: () => void;
  image: ImageSourcePropType;
  resizeMode?: ImageResizeMode;
};

const {width} = Dimensions.get('screen');
const w = (width * 45) / 100;
const h = (width * 43) / 100;

export const ImageCard: FC<Props> = ({onPress, image, resizeMode}) => {
  return (
    <Pressable
      onPress={onPress}
      shadow={3}
      borderRadius={12}
      w={w}
      h={h}
      flex={1}
      backgroundColor="white"
      alignItems="center"
      justifyContent="center">
      <Image
        w="100%"
        h="100%"
        source={image}
        shadow={2}
        alt="Demo Image"
        resizeMode={resizeMode}
        borderRadius={12}
      />
    </Pressable>
  );
};
