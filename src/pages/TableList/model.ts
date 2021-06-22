import type { Effect, Reducer } from 'umi';
import { articleList } from '@/services/productArticle'
import { addArticle, updateArticle, deleteArticle } from '@/services/productArticle'
import { message } from 'antd'

export type ArticleType = {
    id?: string;
    title?: string;
    author?: string;
    collectCount?: number;
    content1?: string;
    content2?: string;
    coverImg?: string;
    createTime?: string;
    editorType?: number;
    isShow?: number;
    modifyTime?: string;
    summary?: string;
    viewCount?: number;
    zanCount?: number;
}
export type ArticleState = {
    article?: ArticleType;
    articleList?: ArticleType[];
    total?: number;
  };
export type ArticleModelType = {
    namespace: string;
    state: ArticleState ;
    effects: {
      fetchArticleList: Effect;
      saveArticle: Effect;
      delArticle: Effect
    };
    reducers: {
        setArticleList: Reducer<ArticleState>
    };
  };

  const ArticleModel: ArticleModelType = {
      namespace: 'Article',
      state: {
        articleList: [],
        total: 0
      },
      effects: {
        *fetchArticleList({ payload },{ call, put }){
            const { success, data } = yield call(articleList, payload);
            if (success){
                yield put({
                    type: 'setArticleList',
                    payload: data
                  })
            }
          },
          *saveArticle({ payload },{ call }) {
            const { article, callback } = payload
            const { success, message: errMsg } = yield call(article.id ? updateArticle : addArticle , article);
            if (success){
              message.success(errMsg)
              if(callback && typeof callback === 'function'){
                callback();
              }
            }else{
              message.error(errMsg)
            }
          },
          *delArticle({ payload },{ call }) {
            const { article, callback } = payload
            const { success, message: errMsg } = yield call(deleteArticle, article.id);
            if (success){
              message.success(errMsg)
              if(callback && typeof callback === 'function'){
                callback();
              }
            }else{
              message.error(errMsg)
            }
          }
      },
      reducers: {
        setArticleList(state, { payload }) {
            const { total, rows } = payload
            return {
                ...state,
                total,
                articleList: rows
            }
        }
      }
  }
  export default ArticleModel;
