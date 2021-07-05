import type { Effect, Reducer } from '@/.umi/plugin-dva/connect'
import { materialList, switchPublishStatus } from '@/services/material'
import { message } from 'antd'

export type MaterialType = {
    id?: string;
    brandName?: string;
    detailTitle?: string;
    name?: string;
    modifyTime?: string;
    pic?: string;
    price?: number;
    productCategoryName?: string;
    albumPics?: string;
    productCategoryId?: string;
    status?: number;
    brandId?: string
}

export type MaterialState = {
    materialList: MaterialType[];
    total?: number
}

export type MaterialModelType = {
    namespace: string;
    state: MaterialState;
    effects: {
      fetchMaterialList: Effect,
      switchPublishStatus: Effect
    },
    reducers: {
        setMaterialList: Reducer<MaterialState>,
    }
  }

const MaterialModel: MaterialModelType = {
    namespace: 'Material',
    state: {
        materialList: [],
        total: 0
    },
    effects: {
        *fetchMaterialList({ payload },{ call, put }) {
            const { success, data } = yield call(materialList, payload)
            if (success) {
                yield put({
                    type: 'setMaterialList',
                    payload: data
                })
            }
        },
        *switchPublishStatus({ payload }, { call }) {
            const { success } = yield call(switchPublishStatus, payload)
            if (!success) {
                message.error('上架失败')
            }
        }
    },
    reducers: {
        setMaterialList(state, { payload }) {
            const { total, rows } = payload
            return {
                ...state,
                total,
                materialList: rows
            }
        }
    }
}
export default MaterialModel