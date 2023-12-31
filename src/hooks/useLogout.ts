import {useCallback, useContext} from 'react';
import {useSWRConfig} from 'swr';

import * as storage from '../utils/storage';
import {AuthActionTypes, AuthContext} from '../contexts/auth';

export const useLogout = () => {
  const {dispatch} = useContext(AuthContext);
  const {mutate} = useSWRConfig();

  return useCallback(async () => {
    await storage.clear();
    await mutate(() => true, [], {revalidate: false});
    dispatch({
      type: AuthActionTypes.SIGN_OUT,
      payload: {
        userType: null,
        userToken: null,
      },
    });
  }, [dispatch, mutate]);
};
