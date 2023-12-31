import React, {FC, useState} from 'react';
import {Box, Text} from 'native-base';
import { useTranslation } from 'react-i18next';

import {LanguageModel} from './LanguageModel';

type Props = {
  onRegister?: () => void;
  onLogin?: () => void;
};

export const UpdateLanguage: FC<Props> = ({onRegister, onLogin}) => {
  const [showModal, setShowModal] = useState(false);
  const {t} = useTranslation('LoginLang');

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Box mb={5}>
      <Text
        textAlign="center"
        mb={5}
        onPress={toggleModal}
        underline
        color="black"
        fontWeight="bold">
        {t('language')}
      </Text>

      {onRegister && (
        <Text color="gray.500" textAlign="center">
          {t('dontAccount')}
          {'\n'}
          <Text
            onPress={onRegister}
            underline
            color="primary.500"
            fontWeight="bold">
            {t('register')}
          </Text>
        </Text>
      )}

      {onLogin && (
        <Text color="gray.500" textAlign="center">
          {t('haveAccount')}
          {'\n'}
          <Text
            onPress={onLogin}
            underline
            color="primary.500"
            fontWeight="bold">
            {t('login')}
          </Text>
        </Text>
      )}

      <LanguageModel showModal={showModal} toggleModal={toggleModal} />
    </Box>
  );
};
