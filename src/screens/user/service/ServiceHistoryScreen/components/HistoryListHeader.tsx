import React, {FC} from 'react';
import {Box, CheckIcon, HStack, Select, Text, VStack} from 'native-base';
import {useTranslation} from 'react-i18next';

import {months, years} from '../../../../../utils/monthYearPicker';

type Props = {
  averageServiceInterval: number;
  nextService: number;
  year: string;
  changeYear: any;
  month: string;
  changeMonth: any;
};

export const HistoryListHeader: FC<Props> = ({
  averageServiceInterval,
  nextService,
  year,
  changeYear,
  changeMonth,
  month,
}) => {
  const {t} = useTranslation('ServiceLang');

  return (
    <Box mx={4}>
      {averageServiceInterval ? (
        <>
          <Text fontSize={'md'}>{t('summary')}</Text>
          <VStack
            p={3}
            borderRadius={5}
            mt={2}
            mb={6}
            backgroundColor="white"
            shadow={1}>
            <HStack justifyContent="space-between">
              <Text color="grey" fontSize="md">
                {t('average')}
              </Text>
              <Text fontSize="md">{averageServiceInterval} Day(s)</Text>
            </HStack>
            <HStack mt={1} justifyContent="space-between">
              <Text color="grey" fontSize="md">
                {t('to')}
              </Text>
              <Text fontSize="md">{nextService} Day(s)</Text>
            </HStack>
          </VStack>
        </>
      ) : null}

      <HStack alignItems={'center'} justifyContent={'space-between'} mb={5}>
        <Text fontSize={'md'}>{t('history')}</Text>
        <HStack space={2}>
          <Select
            minW="32"
            size="sm"
            placeholder="Month"
            selectedValue={month}
            width="full"
            borderRadius={'sm'}
            onValueChange={changeMonth}
            _selectedItem={{
              bg: 'primary.400',
              endIcon: <CheckIcon size={3} />,
            }}
            mt={1}>
            {months.map(item => (
              <Select.Item
                key={item.value}
                label={item.title}
                value={item.value}
              />
            ))}
          </Select>

          <Select
            minW="24"
            size="sm"
            placeholder="Year"
            selectedValue={year}
            width="full"
            borderRadius={'sm'}
            onValueChange={changeYear}
            _selectedItem={{
              bg: 'primary.400',
              endIcon: <CheckIcon size={3} />,
            }}
            mt={1}>
            {years.map(item => (
              <Select.Item key={item} label={item} value={item} />
            ))}
          </Select>
        </HStack>
      </HStack>
    </Box>
  );
};
