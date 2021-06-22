import request from '@/utils/request';

export type LoginParamsType = {
  userName: string;
  password: string;
};

export async function accountLogin(params: LoginParamsType) {
  return request('/lejuAdmin/index/login', {
    method: 'POST',
    data: params,
  });
}
