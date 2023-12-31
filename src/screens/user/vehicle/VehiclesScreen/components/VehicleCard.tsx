import React, {FC} from 'react';
import {Box, HStack, Menu, Pressable, Text, VStack} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';

type Props = {
  id: number;
  deleteVehicle: (addressId: number) => Promise<void>;
  editVehicle: () => void;
  made: string;
  model: string;
  year: string;
  roadTaxDueDate: string;
  carPlateNumber: string;
  lastServiceMileage: number;
  averageMileage: number;
  engineOilTypeName: string;
};

export const VehicleCard: FC<Props> = ({
  id,
  roadTaxDueDate,
  year,
  engineOilTypeName,
  averageMileage,
  made,
  model,
  carPlateNumber,
  lastServiceMileage,
  deleteVehicle,
  editVehicle,
}) => {
  const {t} = useTranslation('VehiclesLang');

  return (
    <Box shadow={1} bg="#FFF" mx={4} mb={4} borderRadius={5}>
      <HStack flex={1} p={2} alignItems="flex-start">
        <HStack flexShrink={1} flex={2} alignItems="flex-start">
          <VStack ml={2}>
            <HStack mb={2} space={2}>
              <Text color="muted.400">{t('made')}</Text>
              <Text fontWeight="500">{made}</Text>
            </HStack>

            <HStack mb={2} space={2}>
              <Text color="muted.400">{t('model')}</Text>
              <Text fontWeight="500">{model}</Text>
            </HStack>

            <HStack mb={2} space={2}>
              <Text color="muted.400">{t('year')}</Text>
              <Text fontWeight="500">{year}</Text>
            </HStack>

            <HStack mb={2} space={2}>
              <Text color="muted.400">{t('road')}</Text>
              <Text fontWeight="500">{roadTaxDueDate}</Text>
            </HStack>

            <HStack mb={2} space={2}>
              <Text color="muted.400">{t('car')}</Text>
              <Text fontWeight="500">{carPlateNumber}</Text>
            </HStack>

            <HStack mb={2} space={2}>
              <Text color="muted.400">{t('last')}</Text>
              <Text fontWeight="500">{lastServiceMileage}</Text>
            </HStack>

            <HStack mb={2} space={2}>
              <Text color="muted.400">{t('average')}</Text>
              <Text fontWeight="500">{averageMileage}</Text>
            </HStack>

            <HStack space={2}>
              <Text color="muted.400">{t('engine')}</Text>
              <Text fontWeight="500">{engineOilTypeName}</Text>
            </HStack>
          </VStack>
        </HStack>

        <Box>
          <Menu
            backgroundColor={'primary.50'}
            shouldOverlapWithTrigger={true}
            placement={'right top'}
            trigger={triggerProps => (
              <Pressable {...triggerProps} alignSelf={'flex-end'}>
                <MaterialCommunityIcons
                  name="dots-horizontal"
                  size={24}
                  color="black"
                />
              </Pressable>
            )}>
            <Menu.Item onPress={editVehicle}>
              <AntDesign name="edit" size={15} color="black" />
              <Text>{t('edit')}</Text>
            </Menu.Item>
            <Menu.Item onPress={() => deleteVehicle(id)}>
              <AntDesign name="delete" size={15} color="black" />
              <Text>{t('delete')}</Text>
            </Menu.Item>
          </Menu>
        </Box>
      </HStack>
    </Box>
  );
};
