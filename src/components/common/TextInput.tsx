import React, {FC} from 'react';
import {Platform} from 'react-native';
import {FormControl, Icon, Input, WarningOutlineIcon} from 'native-base';

type Props = {
  label?: string;
  variant?: string;
  placeholder?: string;
  value?: string;
  error?: string;
  LeftIcon?: any;
  LeftIconName?: string;
  RightIcon?: any;
  RightIconName?: string;
  secureTextEntry?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  onChangeText?: () => void;
};

export const TextInput: FC<Props> = ({
  label,
  variant,
  placeholder,
  value,
  onChangeText,
  error,
  LeftIcon,
  LeftIconName,
  RightIcon,
  RightIconName,
  isRequired,
  isInvalid,
}) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid}>
      <FormControl.Label
        _text={{
          fontFamily: 'body',
          fontWeight: '400',
          fontStyle: 'normal',
          fontSize: 'md',
          color: 'grey',
        }}>
        {label}
      </FormControl.Label>
      <Input
        variant={variant}
        size={Platform.OS === 'ios' ? 'lg' : 'md'}
        h={Platform.OS === 'ios' ? 54 : 44}
        mb={2}
        focusOutlineColor={'primary.400'}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        InputLeftElement={
          <Icon
            as={LeftIcon}
            name={LeftIconName}
            size={5}
            ml="2"
            color="muted.400"
          />
        }
        InputRightElement={
          <Icon
            as={RightIcon}
            name={RightIconName}
            size={5}
            ml="2"
            color="muted.400"
          />
        }
      />
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {error}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};
