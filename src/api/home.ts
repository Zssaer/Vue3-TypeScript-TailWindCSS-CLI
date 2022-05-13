import { defHttp } from '@/utils/http'

enum API {
 HOME = '/home'
}

export function getHome() {
 return defHttp.get({ url: API.HOME })
}