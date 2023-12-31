import {Text} from 'native-base';
import React, {FC, memo, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {useInterval} from '../../../../hooks/useInterval';

type Props = {
  onOTPResend: () => void;
};

const OTPResend: FC<Props> = ({onOTPResend}) => {
  const [timer, setTimer] = useState<number>(120);

  const {t} = useTranslation('OtpLang');

  useInterval(() => {
    setTimer(prevState => {
      if (prevState === 0) {
        return 0;
      } else {
        return prevState - 1;
      }
    });
  }, 1000);

  return (
    <>
      {timer === 0 ? (
        <Text mb={2} mt={2} color="grey" textAlign="center">
          {t('didnt')}{' '}
          <Text
            onPress={async () => {
              await onOTPResend();
              setTimer(120);
            }}
            fontWeight="500"
            color="primary.400">
            {t('send')}
          </Text>
        </Text>
      ) : (
        <Text mb={2} mt={2} color="grey" textAlign="center">
          {t('resend')}{' '}
          <Text fontWeight="500" color="primary.400">
            {timer}
          </Text>
        </Text>
      )}
    </>
  );
};

export default memo(OTPResend);
