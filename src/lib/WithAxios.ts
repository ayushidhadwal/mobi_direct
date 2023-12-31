import {FC, ReactElement, useMemo} from 'react';

import {axios} from './axios';
import {useLogout} from '../hooks/useLogout';

type Props = {
  children: ReactElement;
};

const WithAxios: FC<Props> = ({children}) => {
  const logout = useLogout();

  useMemo(() => {
    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      async error => {
        if (error?.response?.status === 401) {
          return await logout();
        }

        return Promise.reject(error);
      },
    );
  }, [logout]);

  return children;
};

export default WithAxios;
