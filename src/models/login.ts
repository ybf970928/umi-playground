import { stringify } from 'querystring'
import type { Effect, Reducer } from 'umi'
import { history } from 'umi'
import { accountLogin } from '@/services/login'
import { getPageQuery } from '@/utils/utils'
import { message } from 'antd'
// import { codeMessage } from '@/utils/request';
import { removeToken, setToken } from '@/utils/auth'

export type StateType = {
  code?: 0 | 1 | 2;
  data?: any;
  message?: string;
  success?: boolean
};


export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
};

const Model: LoginModelType = {
    namespace: 'login',
    state: {},

    effects: {
        *login({ payload }, { call, put }) {
            const response = yield call(accountLogin, payload)
            yield put({
                type: 'user/saveCurrentUser',
                payload: response.data.userInfo
            })
      
            yield put({
                type: 'changeLoginStatus',
                payload: response
            })
            // Login successfully
            if (response.success) {
                setToken(response.data.token)
                const urlParams = new URL(window.location.href)
                const params = getPageQuery()
                message.success('🎉 🎉 🎉  登录成功！')
                let { redirect } = params as { redirect: string }
                if (redirect) {
                    const redirectUrlParams = new URL(redirect)
                    if (redirectUrlParams.origin === urlParams.origin) {
                        redirect = redirect.substr(urlParams.origin.length)
                        if (window.routerBase !== '/') {
                            redirect = redirect.replace(window.routerBase, '/')
                        }
                        if (redirect.match(/^\/.*#/)) {
                            redirect = redirect.substr(redirect.indexOf('#') + 1)
                        }
                    } else {
                        window.location.href = '/'
                        return
                    }
                }
                history.replace(redirect || '/')
            }
        },

        logout() {
            const { redirect } = getPageQuery()
            removeToken()
            // Note: There may be security issues, please note
            if (window.location.pathname !== '/user/login' && !redirect) {
                history.replace({
                    pathname: '/user/login',
                    search: stringify({
                        redirect: window.location.href
                    })
                })
            }
        }
    },

    reducers: {
        changeLoginStatus(state, { payload }) {
            return {
                ...state,
                code:payload.code,
                data: payload.data,
                message: payload.message,
                success: payload.success
            }
        }
    }
}

export default Model
