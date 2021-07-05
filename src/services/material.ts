import request from '@/utils/request'

export type MaterialSearchType = {
    start: number;
    limit: number;
    params?: {
        brandId?: string; 
        name?: string;
        productCategoryId?: string;
        productSn?: string;
        publishStatus?: number | string;
        verifyStatus?: string
    }
  }

export async function materialList({ start, limit, params }: MaterialSearchType) {
    return request(`/lejuAdmin/product/productsByPage/${start}/${limit}`, {
        method: 'post',
        data: params
    })
}

// 更改发布状态
export async function switchPublishStatus(params: {id: string, status: number}) {
    return request('/lejuAdmin/product/switchPublishStatus', {
        method: 'post',
        data: params
    })
}