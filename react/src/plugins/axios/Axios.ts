import useStorage from '@/composable/useStorage';
import { CacheEnum } from '@/enum/CachEnum';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  CreateAxiosDefaults,
} from 'axios';
import axios from 'axios';

const storage = useStorage();

export default class Axios {
  private instance: AxiosInstance;
  constructor(config: CreateAxiosDefaults) {
    this.instance = axios.create(config);
    this.interceptors();
  }

  public async request<T, D = ResponseResult<T>>(config: AxiosRequestConfig) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.instance.request<D>(config);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    }) as Promise<D>;
  }

  private interceptors() {
    this.interceptorsRequest();
    this.interceptorsResponse();
  }

  private interceptorsRequest() {
    this.instance.interceptors.request.use(
      (config) => {
        const tokenStorage = storage.get(CacheEnum.TOKEN_NAME);
        if (tokenStorage)
          config.headers.Authorization = `Bearer ${tokenStorage.token}`;
        config.headers.Accept = 'application/json';
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  private interceptorsResponse() {
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error),
    );
  }
}
