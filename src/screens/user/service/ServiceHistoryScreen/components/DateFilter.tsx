import React, {FC} from 'react';
import {Box, CheckIcon, FormControl, HStack, Select} from 'native-base';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator} from 'react-native';

type Props = {
  data: string[];
  value: string;
  setValue: (value: string) => void;
  isLoading: boolean;
};

export const DateFilter: FC<Props> = ({data, value, setValue, isLoading}) => {
  const {t} = useTranslation('ServiceLang');

  return (
    <Box m={4}>
      <FormControl>
        <FormControl.Label>{t('vehicle')}</FormControl.Label>
        {isLoading ? (
          <HStack alignItems="center" justifyContent="center">
            <ActivityIndicator />
          </HStack>
        ) : (
          <Select
            size="lg"
            placeholder={t('choose') as string}
            selectedValue={value}
            variant="rounded"
            onValueChange={setValue}
            _selectedItem={{
              bg: 'primary.400',
              endIcon: <CheckIcon size={3} />,
            }}>
            {data?.map(d => (
              <Select.Item key={d} label={d} value={d} />
            ))}
          </Select>
        )}
      </FormControl>
    </Box>
  );
};
