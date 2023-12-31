import React from 'react';
import {Box, Icon, IconButton, VStack} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const TabItem = ({
  icon,
  onPress,
  active,
  iconName,
}: {
  icon: any;
  onPress: () => void;
  active: boolean;
  iconName: string;
}) => (
  <IconButton
    rounded="full"
    backgroundColor={active ? 'white' : 'gray.900'}
    onPress={onPress}>
    <Icon
      as={icon}
      name={iconName}
      size={'md'}
      color={active ? 'gray.900' : 'white'}
    />
  </IconButton>
);

export const BottomTabs = ({
  state,
  navigation,
}: {
  state: any;
  navigation: any;
}) => {
  const {bottom} = useSafeAreaInsets();

  return (
    <VStack
      bg="gray.900"
      borderRadius="full"
      mx={5}
      px={2}
      py={3}
      shadow={9}
      mb={bottom ? bottom : 4}>
      <Box flexDirection="row" justifyContent="space-around">
        <TabItem
          icon={Ionicons}
          iconName={'home-sharp'}
          active={state.index === 0}
          onPress={() => navigation.navigate('Home')}
        />
        <TabItem
          icon={FontAwesome5}
          iconName={'th-list'}
          active={state.index === 1}
          onPress={() => navigation.navigate('Orders')}
        />

        <TabItem
          icon={MaterialCommunityIcons}
          iconName={'file-document'}
          active={state.index === 2}
          onPress={() => navigation.navigate('Service')}
        />
        <TabItem
          icon={AntDesign}
          iconName={'calendar'}
          active={state.index === 3}
          onPress={() => navigation.navigate('Appointment')}
        />
        <TabItem
          icon={Ionicons}
          iconName={'settings'}
          active={state.index === 4}
          onPress={() => navigation.navigate('Settings')}
        />
      </Box>
    </VStack>
  );
};
