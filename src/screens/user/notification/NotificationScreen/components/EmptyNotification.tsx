import React, {FC, ReactNode} from 'react';
import {Box, Image} from 'native-base';
import {Dimensions, ImageSourcePropType} from 'react-native';

const EMPTY_IMG = require('../../../../../assets/NoNotification.png');

const {height, width} = Dimensions.get('window');

type Props = {
  children?: ReactNode;
  emptyImg?: ImageSourcePropType;
};

export const EmptyNotification: FC<Props> = ({children}) => (
  <Box flex={1} alignItems="center" justifyContent="center">
    <Image
      source={EMPTY_IMG}
      alt="Empty Image"
      resizeMode="contain"
      w={width - 100}
      height={height / 2.5}
    />

    {children ? children : null}
  </Box>
);
