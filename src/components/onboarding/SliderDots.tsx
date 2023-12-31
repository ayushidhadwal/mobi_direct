import * as React from 'react';
import {Box, HStack} from 'native-base';

type Props = {
  data: any[];
  activeIndex: number;
};

export const SliderDots: React.FC<Props> = ({data, activeIndex}) => {
  return (
    <HStack h={8} w="20%" alignSelf="center">
      {data.map((_, index) => {
        return index === activeIndex ? (
          <Box bg="#ffa200" h={3} w={3} mx={1} rounded={10} key={index} />
        ) : (
          <Box bg="light.300" h={3} w={3} mx={1} rounded={10} key={index} />
        );
      })}
    </HStack>
  );
};
