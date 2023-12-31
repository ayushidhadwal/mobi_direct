import Ionicons from 'react-native-vector-icons/Ionicons';
import {IconButton} from 'native-base';
import * as React from 'react';
import {FC} from 'react';

type Props = {
  onPress: () => void;
  icon: string;
};

export const HeaderButton: FC<Props> = ({onPress, icon}) => {
  return (
    <IconButton
      onPress={onPress}
      borderRadius="full"
      size="xs"
      _icon={{
        as: Ionicons,
        name: icon,
        size: 'lg',
        color: 'black',
      }}
    />
  );
};
