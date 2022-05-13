import type { CreateAxiosConfig, AxiosTransform } from './axios'
import type { CustomResqusetOptions } from '#/axios'

import { Axios } from './axios'
import { objectDeepMerge } from '@/utils/object-deepmerge'


const transform: AxiosTransform = {

  beforeRequestHook(config, options) {
    // Before request Hook

    return config
  },
  transformResponseHook(res, options) {
    // Response Hook

    return res
  },
  requestInterceptor(config, options) {
    // request Intercept

    return config
  },
  resqonseInterceptors(res) {
    // response Intercept
    
    return res
  },
}

export const customDefaultOptins: CustomResqusetOptions | CreateAxiosConfig = {
  transform,
  joinTime: true
}

export function createAxios(opt?: CreateAxiosConfig) {
  return new Axios(objectDeepMerge(customDefaultOptins, opt || {}))
}

/**
 * send Axios request
 * it has Get\Post\Put\Delete method.
 */
export const defHttp = createAxios({})