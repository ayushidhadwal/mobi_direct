import {Box, Text, Image} from 'native-base';
import React, {FC} from 'react';
import {Dimensions, ImageSourcePropType} from 'react-native';

const {width, height} = Dimensions.get('window');

type Props = {
    heading: string;
    image: ImageSourcePropType;
    text: string;
};

export const BoardingItems: FC<Props> = ({heading, image, text}) => (
    <Box flex="1" w={width} justifyContent="center">
        <Image
            source={image}
            h={height / 2.3}
            resizeMode="contain"
            alt="slider img"
            alignSelf="center"
        />
        <Text
            fontFamily="body"
            fontWeight={'500'}
            fontStyle="normal"
            color="black"
            fontSize="2xl"
            ml={5}
            mt={5}>
            {heading}
        </Text>
        <Text
            fontFamily="body"
            fontWeight={'100'}
            fontStyle="normal"
            fontSize="lg"
            mx={5}
            mt={4}
            numberOfLines={5}
            color="black">
            {text}
        </Text>
    </Box>
);
