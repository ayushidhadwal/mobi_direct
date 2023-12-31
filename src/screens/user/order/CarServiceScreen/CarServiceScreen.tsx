import React, {FC, useEffect, useState} from 'react';
import {Box, Text, Button, Icon, Modal, HStack, Divider} from 'native-base';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useTranslation} from 'react-i18next';

import {CarServiceForm} from './components/CarServiceForm';
import {useLastServiceOrder} from '../../../../hooks/user/orders/useLastServiceOrder';
import {CarServiceScreenProps} from '../../../../navigation';
import {useUserCart} from '../../../../hooks/user/cart/useUserCart';

export const CarServiceScreen: FC<CarServiceScreenProps> = ({route}) => {
  const {t} = useTranslation('CarServiceLang');

  const navVehicleId = route.params?.vehicleId;

  const [modalVisible, setModalVisible] = useState(false);
  const [vehicleId, setVehicleId] = useState('');
  const [engineOilId, setEngineOilId] = useState('');
  const [oilFilterId, setOilFilterId] = useState('');

  const {lastService, trigger} = useLastServiceOrder();
  const {userCart} = useUserCart();

  const handleSizeClick = () => {
    setModalVisible(!modalVisible);
  };

  const onReorder = () => {
    setModalVisible(!modalVisible);
    if (lastService?.vehicleId) {
      setVehicleId(lastService?.vehicleId);
      setEngineOilId(String(lastService?.engineOilId));
      setOilFilterId(String(lastService?.oilFilterId));
    }
  };

  useEffect(() => {
    trigger().then();
  }, [trigger]);

  useEffect(() => {
    if (navVehicleId) {
      setVehicleId(navVehicleId);
    }
  }, [navVehicleId]);

  return (
    <Box flex={1} p={4}>
      {lastService?.vehicleId && (
        <Button
          mb={3}
          alignSelf="flex-start"
          onPress={handleSizeClick}
          endIcon={<Icon as={FontAwesome5Icon} name="hand-pointer" size={4} />}>
          {t('repeatLastService')}
        </Button>
      )}

      {!modalVisible && (
        <CarServiceForm
          trigger={trigger}
          vehicleId={vehicleId}
          engineOilId={engineOilId}
          oilFilterId={oilFilterId}
          userCart={userCart}
        />
      )}

      <Modal isOpen={modalVisible} onClose={setModalVisible} size="xl">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Body>
            <Text mb={2} alignSelf={'center'} fontSize={'md'} underline>
              {t('last')}
            </Text>
            <Divider mb={5} />

            <HStack mb={5} justifyContent={'space-between'}>
              <Text flex={1} fontWeight={'400'} fontSize={'md'}>
                {t('vehicleModal')}
              </Text>
              <Text flex={1} fontWeight={'400'} fontSize={'md'}>
                {lastService?.vehicleNumber}
              </Text>
            </HStack>

            <HStack mb={5} justifyContent={'space-between'}>
              <Text flex={1} fontWeight={'400'} fontSize={'md'}>
                {t('engineModal')}
              </Text>
              <Text flex={1} fontWeight={'400'} fontSize={'md'}>
                {lastService?.engineOilName}
              </Text>
            </HStack>

            <HStack mb={5} justifyContent={'space-between'}>
              <Text flex={1} fontWeight={'400'} fontSize={'md'}>
                {t('oilModal')}
              </Text>
              <Text flex={1} fontWeight={'400'} fontSize={'md'}>
                {lastService?.oilFilterName}
              </Text>
            </HStack>
            <Divider />

            <Text mt={3} textAlign={'center'} fontWeight={400} fontSize={'md'}>
              {t('price')}
              <Text fontWeight={'400'} fontSize={'md'} color={'primary.400'}>
                {' '}
                RM {Number(lastService?.grandTotal).toFixed(2)}
              </Text>
            </Text>

            <Button
              alignSelf={'center'}
              mt={3}
              onPress={onReorder}
              borderRadius={25}
              variant={'solid'}
              w={'70%'}
              size={'md'}
              colorScheme={'secondary'}>
              {t('reorder')}
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Box>
  );
};
