import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AgentRootStackParamList} from '../AgentRootStackNavigator';

export type AgentBottomTabsParamList = {
  AgentHome: undefined;
  AgentService: undefined;
  AgentSetting: undefined;
};

export type AgentHomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<AgentBottomTabsParamList, 'AgentHome'>,
  NativeStackScreenProps<AgentRootStackParamList>
>;

export type AgentServiceScreenProps = CompositeScreenProps<
  BottomTabScreenProps<AgentBottomTabsParamList, 'AgentService'>,
  NativeStackScreenProps<AgentRootStackParamList>
>;

export type AgentSettingScreenProps = CompositeScreenProps<
  BottomTabScreenProps<AgentBottomTabsParamList, 'AgentSetting'>,
  NativeStackScreenProps<AgentRootStackParamList>
>;
