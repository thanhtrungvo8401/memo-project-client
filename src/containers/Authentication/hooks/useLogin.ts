import React from 'react';
import useApi from '../../../hooks/useApi';
import { toast } from 'react-toastify';

export default function useLogin() {
  const { post } = useApi();
  const [isLoading, setIsLoading] = React.useState(false);

  const login = async (data: { username: string; password: string }) => {
    try {
      setIsLoading(true);
      const res = await post(`/login`, data);
      toast('Login successfully', { type: 'success' });

      return res.data;
    } catch (error: any) {
      const dataRes = error.response?.data;
      if (dataRes?.code === 401) {
        toast('Incorrect username or password', {
          type: 'error',
        });
      } else {
        toast('Something went wrong, please try again later', {
          type: 'error',
        });
      }

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
  };
}
