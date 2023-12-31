import {Button, Modal, VStack} from 'native-base';
import i18n from 'i18next';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';

type Props = {
  showModal: boolean;
  toggleModal: () => void;
};

export const LanguageModel: FC<Props> = ({showModal, toggleModal}) => {
  const {t} = useTranslation('LoginLang');

  return (
    <Modal isOpen={showModal} onClose={toggleModal} size="xs">
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>{t('change')}</Modal.Header>
        <Modal.Body>
          <VStack space={2}>
            <Button
              py={1}
              variant={i18n.language === 'en' ? 'solid' : 'ghost'}
              colorScheme="primary"
              onPress={() => {
                i18n?.changeLanguage('en');
                toggleModal();
              }}>
              {t('english')}
            </Button>

            <Button
              py={1}
              variant={i18n.language === 'ms' ? 'solid' : 'ghost'}
              colorScheme="primary"
              onPress={() => {
                i18n?.changeLanguage('ms');
                toggleModal();
              }}>
              {t('melayu')}
            </Button>

            <Button
              py={1}
              variant={i18n.language === 'zh' ? 'solid' : 'ghost'}
              colorScheme="primary"
              onPress={() => {
                i18n?.changeLanguage('zh');
                toggleModal();
              }}>
              {t('mandarin')}
            </Button>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
