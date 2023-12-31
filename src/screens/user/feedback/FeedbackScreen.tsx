import React, {FC, useState} from 'react';
import {Box, Text, Button, HStack, Icon, Modal} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTranslation} from 'react-i18next';

const FeedbackScreen: FC<any> = ({navigation}) => {
  const {t} = useTranslation('FeedbackLang');

  const [showModal, setShowModal] = useState(false);

  return (
    <Box flex={1}>
      <Text mt={4} ml={4} fontSize={'md'} fontWeight={'400'}>
        {t('how')}
      </Text>
      <HStack justifyContent={'space-between'} mt={2} ml={4} w={'60%'}>
        <Entypo name="star" size={24} color="#facc15" />
        <Entypo name="star" size={24} color="#a8a29e" />
        <Entypo name="star" size={24} color="#a8a29e" />
        <Entypo name="star" size={24} color="#a8a29e" />
        <Entypo name="star" size={24} color="#a8a29e" />
      </HStack>
      <Text mt={8} ml={4} fontSize={'md'} fontWeight={'400'}>
        {t('care')}
      </Text>
      <Box
        mt={3}
        h={90}
        w={'90%'}
        backgroundColor={'white'}
        alignSelf={'center'}
        shadow={2}
        borderRadius={5}
      />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Body>
            <Text
              fontSize={'xl'}
              fontWeight={'500'}
              textAlign={'center'}
              mt={2}>
              {t('thankYou')}
            </Text>
            <Text mt={1} ml={3} color={'grey'}>
              {t('text')}
            </Text>
            <Button
              onPress={() => navigation.navigate('Home')}
              alignSelf={'center'}
              mb={5}
              mt={7}
              colorScheme={'secondary'}
              size="md"
              borderRadius={'full'}
              w="60%"
              startIcon={<Icon as={FontAwesome} name="home" size={6} />}>
              {t('home')}
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Button
        onPress={() => {
          setShowModal(true);
        }}
        alignSelf={'center'}
        mb={5}
        mt={20}
        colorScheme={'secondary'}
        size="lg"
        borderRadius={'full'}
        w="90%">
        {t('submit')}
      </Button>
    </Box>
  );
};
export default FeedbackScreen;
