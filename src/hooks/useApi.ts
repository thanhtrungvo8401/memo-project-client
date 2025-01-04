import axios from 'axios';

export default function useApi() {
  const { VITE_API_ENDPOINT } = import.meta.env;

  const instance = axios.create({
    baseURL: `${VITE_API_ENDPOINT}/api`,
  });

  return instance;
}
