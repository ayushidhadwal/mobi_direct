import React, {FC, ReactNode} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import {SWRConfig} from 'swr';

type Props = {
  children: ReactNode;
};

export const SwrProvider: FC<Props> = ({children}: Props) => {
  return (
    <SWRConfig
      value={{
        provider: () => new Map(),
        isVisible: () => {
          return true;
        },
        initFocus: callback => {
          let appState = AppState.currentState;

          const onAppStateChange = (nextAppState: AppStateStatus) => {
            if (
              appState.match(/inactive|background/) &&
              nextAppState === 'active'
            ) {
              callback();
            }
            appState = nextAppState;
          };

          const subscription = AppState.addEventListener(
            'change',
            onAppStateChange,
          );

          return () => {
            subscription.remove();
          };
        },
        // initReconnect: () => {},
      }}>
      {children}
    </SWRConfig>
  );
};
