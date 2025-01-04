import useApi from '../../../hooks/useApi';
import { toast } from 'react-toastify';

export default function useSignup() {
  const { post } = useApi();

  const signUp = async (data: { username: string; password: string }) => {
    try {
      const res = await post(`/sign-up`, data);
      toast('Signing up successfully', { type: 'success' });

      return res.data;
    } catch (error: any) {
      const dataRes = error.response?.data;
      if (dataRes?.code === 100) {
        toast('Username existed, please change to another one!', {
          type: 'error',
        });
      } else {
        toast('Something went wrong, please try again later', {
          type: 'error',
        });
      }

      return false;
    }
  };

  return {
    signUp,
  };
}
