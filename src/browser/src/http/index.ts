import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  type CreateAxiosDefaults,
} from "axios";

export  function useHttp(
  config: CreateAxiosDefaults,
  interceptors?: {
    request?: (
      value: InternalAxiosRequestConfig
    ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
    response?: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
  }
) {
  const instance = axios.create(config);
  const requestInterceptors = instance.interceptors.request.use(
    (interceptors && interceptors.request) || null,
    (error) => {
      return Promise.reject(error);
    }
  );

  const responseInterceptors = instance.interceptors.response.use(
    (interceptors && interceptors.response) || null,
    (error) => {
      return Promise.reject(error);
    }
  );

  return {
   instance,requestInterceptors,responseInterceptors
  };
}

export *  from './download'
export * from './sse'
