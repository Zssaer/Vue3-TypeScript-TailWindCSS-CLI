import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import type { CustomResqusetOptions, CustomResponseResult } from "#/axios";
import axios from "axios";
import { cloneDeep, isFunction } from "lodash-es";

export interface CreateAxiosConfig extends AxiosRequestConfig {
  transform?: AxiosTransform;
  customResquestOptions?: CustomResqusetOptions;
}

export abstract class AxiosTransform {
  beforeRequestHook?: (
    config: AxiosRequestConfig,
    options: CustomResqusetOptions
  ) => AxiosRequestConfig;
  requestInterceptor?: (
    config: AxiosRequestConfig,
    options: CreateAxiosConfig
  ) => AxiosRequestConfig;
  transformResponseHook?: (
    res: AxiosResponse<any>,
    options: CustomResqusetOptions
  ) => AxiosResponse<any> | any;
  resqonseInterceptors?: (
    res: AxiosResponse<any>,
    options: CreateAxiosConfig
  ) => AxiosResponse<any> | Promise<AxiosResponse<any>> | any;
}

export class Axios {
  private axiosInstance: AxiosInstance;
  private readonly options: CreateAxiosConfig;

  constructor(options: CreateAxiosConfig) {
    this.options = options;
    this.axiosInstance = axios.create();
    this.setup();
  }

  private setup() {
    const transform = this.getTransform();
    if (!transform) return;

    const { requestInterceptor, resqonseInterceptors } = transform;

    // request intercept
    this.axiosInstance.interceptors.request.use((config) => {

      if (requestInterceptor && typeof isFunction(requestInterceptor)) {
        config = requestInterceptor(config, this.options);
      }
      return config;
    });
    // response intercept
    this.axiosInstance.interceptors.response.use((res) => {
      if (resqonseInterceptors && isFunction(resqonseInterceptors)) {
        res = resqonseInterceptors(res, this.options);
      }
      return res;
    });
  }

  private getTransform() {
    const { transform } = this.options;
    return transform;
  }

  getAxios() {
    return this.axiosInstance;
  }

  configAxios(config: CreateAxiosConfig) {
    if (!this.axiosInstance) return;
    this.axiosInstance = axios.create(config);
  }

  setHeader(header?: any) {
    if (!this.axiosInstance) return;
    Object.assign(this.axiosInstance.defaults.headers, header);
  }

  request<T = any>(
    config: AxiosRequestConfig,
    options?: CustomResqusetOptions
  ): Promise<T> {
    let conf: CreateAxiosConfig = cloneDeep(config);
    const { customResquestOptions } = this.options;
    let opt: CustomResqusetOptions = Object.assign(
      {},
      customResquestOptions,
      options
    ); 
    // meage default setting and the request send in it
    const transform = this.getTransform();
    const { beforeRequestHook, transformResponseHook } = transform || {};
    // request hook
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(config, opt);
    }

    conf.customResquestOptions = opt; 

    return new Promise((reslove, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<CustomResponseResult>>(conf)
        .then((res: AxiosResponse<CustomResponseResult>) => {
          if (transformResponseHook && isFunction(transformResponseHook)) {
            try {
              const transformResponse = transformResponseHook(res);
              reslove(transformResponse);
            } catch (err) {
              reject(err);
            }
            return;
          }
        })
        .catch((e: Error) => reject(e));
    });
  }

  get<T = any>(
    config: AxiosRequestConfig,
    options?: CustomResqusetOptions
  ): Promise<T> {
    return this.request({ ...config, method: "GET" }, options);
  }

  psot<T = any>(
    config: AxiosRequestConfig,
    options?: CustomResqusetOptions
  ): Promise<T> {
    return this.request({ ...config, method: "POST" }, options);
  }

  put<T = any>(
    config: AxiosRequestConfig,
    options?: CustomResqusetOptions
  ): Promise<T> {
    return this.request({ ...config, method: "PUT" }, options);
  }

  delete<T = any>(
    config: AxiosRequestConfig,
    options?: CustomResqusetOptions
  ): Promise<T> {
    return this.request({ ...config, method: "DELETE" }, options);
  }
}
