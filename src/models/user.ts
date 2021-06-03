import type { Effect, Reducer } from 'umi';
import { queryCurrentUserInfo } from '@/services/user' 

// import { queryCurrent, query as queryUsers } from '@/services/user';

export type CurrentUser = {
  avatar?: string,
  id?: number | string,
  mobilePhone?: number | string,
  userID?: number | string,
  userName?: string
};

export type UserModelState = {
  currentUser?: CurrentUser;
};

export type UserModelType = {
  namespace: 'user';
  state: UserModelState;
  effects: {
    // fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>
  };
};

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetchCurrent({ payload },{ call, put }){
      const response = yield call(queryCurrentUserInfo, payload);
      yield put({
        type: 'saveCurrentUser',
        payload: response.data.user
      })
    }
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    }
  },
};

export default UserModel;
