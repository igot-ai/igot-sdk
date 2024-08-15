import { ApiConfig } from '../types';

const config: ApiConfig = {
  apiKey: '',
  apiSecret: '',
};

export const setConfig = ({ apiKey, apiSecret }: ApiConfig) => {
  config.apiKey = apiKey;
  config.apiSecret = apiSecret;
};

export const getConfig = () => config;
