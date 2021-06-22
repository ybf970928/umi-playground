import request from '@/utils/request';

export type ArticleListSearchType = {
    start: number;
    limit: number;
    params?: {
      title?: string; 
      author?: string;
    }
  }

export async function articleList({start, limit, params}: ArticleListSearchType) {
  return request(`/lejuAdmin/productArticle/findArticles/${start}/${limit}`, {
    method: 'POST',
    data: params,
  });
}

export async function addArticle(params: ArticleListSearchType) {
  return request(`/lejuAdmin/productArticle/addArticle`, {
    method: 'POST',
    data: params,
  });
}

export async function updateArticle(params: ArticleListSearchType) {
  return request(`/lejuAdmin/productArticle/updateArticle`, {
    method: 'POST',
    data: params,
  });
}

export async function getproductArticleInfo(id: string) {
  return request(`/lejuAdmin/productArticle/productArticle/${id}`, {
    method: 'get'
  });
}

export async function deleteArticle(id: string) {
  return request(`/lejuAdmin/productArticle/del/${id}`, {
    method: 'DELETE'
  });
}