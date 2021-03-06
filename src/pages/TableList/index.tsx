import React from 'react'
import { Button, Card, Col, Form, Input, Row, Space, Table, Popconfirm, Alert } from 'antd'
import type { Dispatch } from 'umi'
import type { ArticleType } from './model'
import { connect } from 'umi'
import { useEffect } from 'react'
import type { ConnectState } from '@/models/connect'
import { useState } from 'react'
import { pickBy } from '@/utils/pickBy'
import ArticleForm from './component/form'
import styles from './index.less'
import { PageContainer } from '@ant-design/pro-layout'

const namespace = 'Article'
type StateType = {
  articleList: ArticleType[];
  total: number;
  dispatch: Dispatch;
  loading: boolean;
}&ConnectState

export type PropsType = {
  dispatch: Dispatch;
  articleList: ArticleType[];
  total: number;
  loading: boolean;
};

const TableList: React.FC<PropsType> = ({ articleList, total, dispatch, loading }) => {
    const [params, setParams] = useState({})
    const [current, setCurrent] = useState<number>(1)
    const [pageSize,setPageSize] = useState<number>(5)
    const [isShow, setIsShow] = useState<boolean>(false)
    const [editId, setEditId] = useState<string>('')
    const [checkedList, setCheckedList] = useState<number>(0)

    const refreshList = () => {
        setCurrent(1)
        setPageSize(5)
    }
    useEffect(() => {
        const initList = () => {
            dispatch({
                type: 'Article/fetchArticleList',
                payload: {
                    start: current,
                    limit: pageSize,
                    params
                }
            })
        }
        initList()
    }, [current, dispatch, pageSize, params])
    const [form] = Form.useForm()
    const handleSubmit = (values: {title?: string, author?: string}) => {
        const useParams = pickBy({ ...values })
        setParams({ ...useParams })
        setCurrent(1)
    }
  
    const handleAdd = () => {
        setEditId('')
        setIsShow(true)
    }
    const handleEdit = (item: ArticleType) => {
        setEditId(item.id!)
        setIsShow(true)
    }

    const handleDelete = (item: ArticleType) => {
        dispatch({
            type: 'Article/delArticle',
            payload: {
                article: item,
                callback: refreshList
            }
        })
    }
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: ArticleType[]) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setCheckedList(selectedRows.length)
        }
    }
    const colums = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: '??????',
            dataIndex: 'title'
        },
        {
            title: '??????',
            dataIndex: 'author'
        },
        {
            title: '?????????',
            dataIndex: 'viewCount',
            sorter: (a: ArticleType, b: ArticleType) => a.viewCount! - b.viewCount!
      
        },
        {
            title: '????????????',
            dataIndex: 'createTime'
        },
        {
            title: '??????',
            dataIndex: '',
            render: (text: string, record: any) => {
                return (
                    <Space size="middle">
                        <a onClick={() => handleEdit(record)}>??????</a>
                        <Popconfirm title="Are you sure???" onConfirm={() => handleDelete(record)}>
                            <a href="#">??????</a>
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]
    return (
        <PageContainer>
            <Card title="????????????" style={{ width: '100%', marginBottom: '30px' }}>
                <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} form={form}
                    onFinish={handleSubmit}
                >
                    <Row gutter={32}>
                        <Col span={6}>
                            <Form.Item label="??????" name="title">
                                <Input placeholder='?????????' allowClear/>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="??????" name="author">
                                <Input placeholder='?????????' allowClear/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={32}>
                        <Col span={6} offset={18} style={{ textAlign: 'right' }}>
                            <Button onClick={() => {
                                form.resetFields()
                            }}>??????</Button>
                            <Button type="primary" style={{ marginLeft: 30 }} htmlType="submit">
                ??????
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
            <Card>
                <div className={styles['table-list-toolbar']}>
                    <Button onClick={handleAdd} type="primary">??????</Button>
                </div>
                { checkedList > 0 && <Alert message={`????????? ${checkedList} ???`} type="info" style={{ marginBottom: '20px' }}/>} 
                <Table columns={colums} dataSource={articleList} rowKey={'id'} loading={loading}
                    pagination={{ total, current, pageSize, onChange(v) {
                        setCurrent(v)
                    }, onShowSizeChange(size) {
                        setPageSize(size)
                    } }}
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection
                    }}
                />
            </Card>
            <ArticleForm isShow={isShow} editId={editId} setIsShow={setIsShow} 
                refresh={refreshList}
            />
        </PageContainer>
    )
}

const mapStateToProps = (state: StateType) => ({
    articleList: state[namespace].articleList,
    total: state[namespace].total,
    loading: state.loading.effects['Article/fetchArticleList'] as boolean
})
export default connect(mapStateToProps)(TableList)