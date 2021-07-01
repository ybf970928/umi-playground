import type { Effect, Reducer } from '@/.umi/plugin-dva/connect'
import { materialList } from '@/services/material'

export type MaterialType = {
    id?: string;
    brandName?: string;
    detailTitle?: string;
    name?: string;
    modifyTime?: string;
    pic?: string;
    price?: number;
    productCategoryName?: string;
    albumPics?: string
}

export type MaterialState = {
    materialList: MaterialType[];
    total?: number
}

export type MaterialModelType = {
    namespace: string;
    state: MaterialState;
    effects: {
      fetchMaterialList: Effect
    },
    reducers: {
        setMaterialList: Reducer<MaterialState>
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