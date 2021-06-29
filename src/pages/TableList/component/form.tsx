import React from 'react'
import { Modal, Form , Input, Switch } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useEffect } from 'react'
import { useState } from 'react'
import { connect } from '@/.umi/plugin-dva/exports'
import type { ArticleType, Dispatch } from 'umi'
import type { ConnectState } from '@/models/connect'
import { getproductArticleInfo } from '@/services/productArticle'

export type FormType = {
  title?: string;
  author?: string;
  summary?: string;
  isShow?: boolean;
  editId?: string;
  setIsShow?: any;
  refresh?: any;
  dispatch: Dispatch;
  loading: boolean;
}

type StateType = {
  dispatch?: Dispatch;
  loading: boolean;
}&ConnectState

const ArticleForm: React.FC<FormType> = ({ isShow, editId, setIsShow, refresh, dispatch, loading }) => {
    const [form] = Form.useForm()
    const [title, setTitle] = useState<string>('')
    const [modelForm, setModelForm] = useState<ArticleType>({})

    const initForm = () => {
        setIsShow(false)
        form.resetFields()
        // 刷新父组件
        refresh()
    }
    const handleOk = () => {
        form.validateFields().then(() => {
            const v = form.getFieldsValue()
            dispatch({
                type: 'Article/saveArticle',
                payload: {
                    article: { ...modelForm ,...v, isShow: v.isShow ? 1 : 0 },
                    callback: initForm
                }
            })
        })
    }
    const handleCancel = () => {
        setIsShow(false)
        form.resetFields()
    }

    useEffect(() => {
        if (editId && isShow) {
        // 获取表单详情
            const getproductArticle = async(): Promise<void> => {
                const res = await getproductArticleInfo(editId!)
                const { productArticle } = res.data
                form.setFieldsValue(productArticle)
                setModelForm(productArticle)
            }
            getproductArticle()
            setTitle('编辑')
        }else if(isShow && !editId) {
            setTitle('新增')
        }
    }, [isShow, editId, form])
    return (
        <Modal
            title={title}
            visible={isShow}
            onOk={handleOk}
            onCancel={handleCancel}
            confirmLoading={loading}
        >
            <Form
                form={form}
                initialValues={{
                    isShow: true
                }}
                labelCol={{ span: 4 }}
                wrapperCol={{ span:20 }}
            >
                <Form.Item
                    label="标题"
                    rules={
                        [{ required: true, message: '标题不能为空!' }]
                    }
                    name="title"
                >
                    <Input placeholder="请输入文章标题"></Input>
                </Form.Item>
                <Form.Item 
                    label="作者"
                    rules={
                        [{ required: true, message: '作者不能为空!' }]
                    }
                    name="author"
                >
                    <Input placeholder="请输入作者"></Input>
                </Form.Item>
                <Form.Item
                    label="文章概要"
                    name="summary"
                >
                    <TextArea></TextArea>
                </Form.Item>
                <Form.Item
                    label="文章显示"
                    name="isShow"
                    valuePropName="checked"
                >
                    <Switch checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked></Switch>
                </Form.Item>
            </Form>
        </Modal>
    )
}

const mapStateToProps = (state: StateType) => {
    return {
        loading: state.loading.effects['Article/saveArticle'] as boolean
    }
}
export default connect(mapStateToProps)(ArticleForm)