/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend } from 'umi-request'
import { notification } from 'antd'
import { getToken, removeToken } from './auth'
import { history } from 'umi'

export const codeMessage: Record<number, string> = {
    0: '操作失败',
    1: '操作成功',
    1002: '用户不存在',
    1003: '密码不正确',
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。'
}

/**
 * @zh-CN 异常处理程序
 * @en-US Exception handler
 */
const errorHandler = (error: { response: Response }): Response => {
    const { response } = error
    if (response && response.status) {
        const errorText = codeMessage[response.status] || response.statusText
        const { status, url } = response

        notification.error({
            message: `Request error ${status}: ${url}`,
            description: errorText
        })
    } else if (!response) {
        notification.error({
            description: 'Your network is abnormal and cannot connect to the server',
            message: 'Network anomaly'
        })
    }
    return response
}

/**
 * @en-US Configure the default parameters for request
 * @zh-CN 配置request请求时的默认参数
 */
const request = extend({
    timeout: 6000,
    errorHandler, // default error handling
    credentials: 'include' // Does the default request bring cookies
})

request.interceptors.request.use((url: string, options: RequestInit) => {
  
    if(getToken()) {
        const header: HeadersInit = {
            Token: getToken() as string
        }
        return {
            url,
            options: { ...options, interceptors: true, headers: header }
        }
    }
    return {
        url,
        options: { ...options, interceptors: true }
    }
})

request.interceptors.response.use(async(response: Response) => {
    const { status, url, code, message, success } = await response.clone().json()
    if (!success && code === 20001) {
        notification.error({
            message: `Request error ${status}: ${url} 返回信息: ${message}`,
            description: codeMessage[response.status] || response.statusText
        })
        history.replace({
            pathname: '/user/login'
        })
        removeToken()
    } 
    return response
})
export default request
