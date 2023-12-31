import React, {FC} from 'react';
import {Box, Divider, FormControl, Input, Text} from 'native-base';
import { useTranslation } from 'react-i18next';

type Props = {
  handleChange: (text: string) => void;
  value: string;
};

export const Remark: FC<Props> = ({handleChange, value}) => {
    const {t} = useTranslation('CartOrderLang');
    return (
    <Box mb={3}>
      <Text fontSize="lg" fontWeight="400">
          {t("remarks")}
      </Text>
      <Divider w={'10%'} backgroundColor={'primary.800'} mb={3} />
      <FormControl w="100%">
        <Input
          minH={100}
          multiline
          onChangeText={handleChange}
          value={value}
          placeholder="Enter remark if any..."
          focusOutlineColor={'primary.400'}
          size="lg"
        />
      </FormControl>
    </Box>
  );
};
