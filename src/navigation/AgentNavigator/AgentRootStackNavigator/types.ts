import {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';

import {AgentBottomTabsParamList} from '../AgentBottomTabNavigator';
import {File} from '../../../services/agent/finishPendingRequest';

export type AgentRootStackParamList = {
  AgentBottomTabs: NavigatorScreenParams<AgentBottomTabsParamList>;
  AgentHistoryDetail: {
    id: number;
  };
  Notifications: undefined;
  AgentUpdatePassword: undefined;
  AgentPendingDetails: {
    pendingId: number;
  };
  AgentEndRequestOTP: {
    id: number;
  };
  AgentEndRequestQR: {
    id: number;
    mileage: string;
    remarks: string;
    files: File[];
  };
  AgentStartRequestOTP: {
    id: number;
  };
};

export type AgentNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<AgentRootStackParamList>,
  BottomTabNavigationProp<AgentBottomTabsParamList>
>;

export type AgentHistoryDetailScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AgentRootStackParamList, 'AgentHistoryDetail'>,
  BottomTabScreenProps<AgentBottomTabsParamList>
>;

export type AgentNotificationsScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AgentRootStackParamList, 'Notifications'>,
  BottomTabScreenProps<AgentBottomTabsParamList>
>;

export type AgentUpdatePasswordScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AgentRootStackParamList, 'AgentUpdatePassword'>,
  BottomTabScreenProps<AgentBottomTabsParamList>
>;

export type AgentPendingDetailsScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AgentRootStackParamList, 'AgentPendingDetails'>,
  BottomTabScreenProps<AgentBottomTabsParamList>
>;

export type AgentEndRequestOTPScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AgentRootStackParamList, 'AgentEndRequestOTP'>,
  BottomTabScreenProps<AgentBottomTabsParamList>
>;

export type AgentEndRequestQRScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AgentRootStackParamList, 'AgentEndRequestQR'>,
  BottomTabScreenProps<AgentBottomTabsParamList>
>;

export type AgentStartRequestOTPScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AgentRootStackParamList, 'AgentStartRequestOTP'>,
  BottomTabScreenProps<AgentBottomTabsParamList>
>;
