import React from 'react';
import {useEffect, useRef, useState} from 'react';
import {Input, HStack} from 'native-base';
import {TextInput} from 'react-native';

type Props = {
  autoFocus: boolean;
  numberOfInput: number;
  onChangeText: (text: string) => void;
  isInvalid: boolean;
};

const OtpTextInput: React.FC<Props> = ({
  autoFocus = false,
  numberOfInput = 4,
  onChangeText,
  isInvalid = false,
}) => {
  const inputRef = useRef<TextInput[]>([]);
  const [inputValue, setInputValue] = useState<string[]>(
    new Array(numberOfInput).fill(''),
  );

  useEffect(() => {
    onChangeText(inputValue.join(''));
  }, [inputValue]);

  return (
    <HStack mb={10} space={4} justifyContent="space-between">
      {Array.from(Array(numberOfInput).keys()).map((_, index) => {
        return (
          <Input
            key={index}
            autoFocus={index === 0 && autoFocus}
            flex={1}
            ref={el => (inputRef.current[index] = el)}
            keyboardType="number-pad"
            size="xl"
            variant="outline"
            bg={'primary.400:alpha.10'}
            isInvalid={isInvalid}
            focusOutlineColor={'primary.600'}
            onChangeText={(value: string) => {
              if (Number.isNaN(+value)) {
                return;
              }
              setInputValue(prev => {
                const state = [...prev];
                state[index] = value.replace(/[^0-9]/g, '');
                return state;
              });
              if (value.length && index + 1 < numberOfInput) {
                inputRef.current[index + 1].focus();
              }
            }}
            onKeyPress={({nativeEvent}) => {
              if (
                inputValue[index].length === 1 &&
                nativeEvent.key !== 'Backspace' &&
                index + 1 !== numberOfInput &&
                !Number.isNaN(+nativeEvent.key)
              ) {
                inputRef.current[index + 1].focus();
                setInputValue(prev => {
                  const state = [...prev];
                  state[index + 1] = nativeEvent.key.replace(/[^0-9]/g, '');
                  return state;
                });
              }

              if (nativeEvent.key === 'Backspace' && index !== 0) {
                inputRef.current[index - 1].focus();
                setInputValue(prev => {
                  const state = [...prev];
                  state.forEach((_item, i) => {
                    if (i > index) {
                      state[i] = '';
                    }
                  });
                  return state;
                });
              }
            }}
            value={inputValue[index]}
            blurOnSubmit={false}
            maxLength={1}
            textAlign="center"
          />
        );
      })}
    </HStack>
  );
};
export default OtpTextInput;
