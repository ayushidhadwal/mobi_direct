import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  Reducer,
  useEffect,
  useReducer,
} from 'react';

import {UserType, VerifyLoginResponse} from '../../services';
import * as Storage from '../../utils/storage';
import Config from '../../config';

interface AuthContextState {
  userToken: string | null;
  userType: UserType | null;
  isLoading: boolean;
}

interface AuthAction {
  type: AuthActionTypes;
  payload: AuthActionPayload;
}

interface AuthContextProps {
  state: AuthContextState;
  dispatch: Dispatch<AuthAction>;
}

export enum AuthActionTypes {
  RESTORE_TOKEN = 'RESTORE_TOKEN',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}

interface AuthActionPayload {
  userToken: string | null;
  userType: UserType | null;
}

const initialState: AuthContextState = {
  isLoading: true,
  userToken: null,
  userType: null,
};

type Props = {
  children: ReactNode;
};

const authReducer: Reducer<AuthContextState, AuthAction> = (state, action) => {
  switch (action.type) {
    case AuthActionTypes.RESTORE_TOKEN:
      return {
        ...state,
        userToken: action.payload.userToken,
        userType: action.payload.userType,
        isLoading: false,
      };
    case AuthActionTypes.SIGN_IN:
      return {
        ...state,
        userToken: action.payload.userToken,
        userType: action.payload.userType,
      };
    case AuthActionTypes.SIGN_OUT:
      return {
        ...state,
        userToken: null,
        userType: null,
      };
  }
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider: FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userType = null;
      let userToken = null;

      const user: VerifyLoginResponse = await Storage.load(Config.USER_SESSION);

      if (user?.userToken && user?.userType) {
        userToken = user.userToken;
        userType = user.userType;
      }

      dispatch({
        type: AuthActionTypes.RESTORE_TOKEN,
        payload: {
          userToken: userToken,
          userType: userType,
        },
      });
    };

    bootstrapAsync();
  }, []);

  const value = {state, dispatch};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
