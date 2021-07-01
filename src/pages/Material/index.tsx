import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Card, Table, Tooltip, Col, Row, Form, Button, Input } from 'antd'
import type { Dispatch } from 'umi'
import { connect } from 'umi'
import type { ConnectState } from '@/models/connect'
import type { MaterialType } from './model'
import { useEffect } from 'react'
import type { ColumnsType } from 'antd/lib/table'
import { useState } from 'react'
import { useCallback } from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

const { Meta } = Card
const namespace = 'Material'
type StateType = {
    materialList: MaterialType[];
    total: number;
    dispatch: Dispatch; 
    loading: boolean;
}&ConnectState

export type PropsType = {
    dispatch: Dispatch;
    materialList: MaterialType[];
    total: number;
    loading: boolean;
  }

const Material: React.FC<PropsType> = ({ dispatch, materialList, total, loading }) => {
    const [current, setCurrent] = useState<number>(1)
    const [pageSize,setPageSize] = useState<number>(5)
    const [params, setParams] = useState<MaterialType>({})
    const [expand, setExpand] = useState(false)
    const [form] = Form.useForm()

    const initList = useCallback(() => {
        dispatch({
            type: `${namespace}/fetchMaterialList`,
            payload: {
                start: current,
                limit: pageSize,
                params
            }
        })
    }, [current, pageSize, dispatch, params])

    const handleSubmit = (values: MaterialType) => {
        setParams(values)
        setCurrent(1)
    }
    useEffect(() => {
        initList()
    }, [current, pageSize, initList])

    const formItemLayout = {
        labelCol: {
            sm: { span: 6 }
        },
        wrapperCol: {
            sm: { span: 18 }
        }
    }
    const getFields = () => {
        const shwoFormItems = [
            { label: '商品名称', name: 'name' },
            { label: '商品分类', name: 'productCategoryId' },
            { label: '商品SN码', name: 'productSn' }
        ]
        const hideFormItem = [
            { label: '发布状态', name: 'publishStatus' },
            { label: '验证状态', name: 'verifyStatus' }
        ]
        return (
            shwoFormItems.concat(expand ? hideFormItem : []).map(item => {
                return (
                    <Col span={8} key={item.name}>
                        <Form.Item
                            name={item.name}
                            label={item.label}
                        >
                            <Input placeholder='请输入' />
                        </Form.Item>
                    </Col>
                )
            })
        )
    }
    const expandedRowRender = (record: MaterialType) => {
        const albumPics = record.albumPics!.split('https:').filter(node => node)
        return (
            <Row gutter={16}>
                {albumPics.map(pic => {
                    return (
                        <Col span={8} key={pic}>
                            <Card
                                hoverable
                                style={{ width: '200px' }}
                                cover={<img alt="example" src={pic} />}
                            >
                                <Meta title="Europe Street beat" description="www.instagram.com" />
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        )
    }
    const colums: ColumnsType<MaterialType> = [
        {
            title: '商品名称',
            dataIndex: 'detailTitle',
            width: '240px',
            ellipsis: {
                showTitle: false
            },
            render: detailTitle => (
                <Tooltip placement="topLeft" title={detailTitle}>
                    {detailTitle}
                </Tooltip>
            )
        },
        {
            title: '品牌',
            dataIndex: 'brandName'
        },
        {
            title: '备注',
            dataIndex: 'note',
            ellipsis: {
                showTitle: false
            },
            render: note => (
                <Tooltip placement="topLeft" title={note}>
                    {note}
                </Tooltip>
            )
        },
        {
            title: '商品分类',
            dataIndex: 'productCategoryName'
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: '200px'
        },
        {
            title: '编辑时间',
            dataIndex: 'modifyTime',
            width: '200px'
        }
    ]
    return (
        <PageContainer>
            <Card title="商品管理" style={{ width: '100%', marginBottom: '30px' }}>
                <Form
                    form={form}
                    {...formItemLayout}
                    onFinish={handleSubmit}
                >
                    <Row gutter={24}>{getFields()}</Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button
                                style={{ margin: '0 8px' }}
                                onClick={() => {
                                    form.resetFields()
                                }}
                            >
            重置
                            </Button>
                            <Button type="primary" htmlType="submit">
            查询
                            </Button>
                            <a
                                style={{ fontSize: 14, display: 'inline-block', paddingLeft: '16px' }}
                                onClick={() => {
                                    setExpand(!expand)
                                }}
                            >
                                {expand ? '收起' : '展开'}
                                {expand ? <UpOutlined /> : <DownOutlined />} 
                            </a>
                        </Col>
                    </Row>
                </Form>
            </Card>
            <Card>
                <Table columns={colums} dataSource={materialList} rowKey={'id'} loading={loading}
                    expandable={{ expandedRowRender }}
                    pagination={{
                        total, current, pageSize, onChange(v) {
                            setCurrent(v)
                        }, onShowSizeChange(size) {
                            setPageSize(size)
                        }
                    }}
                />
            </Card>
        </PageContainer>
    )
}

export default connect((state: StateType) => ({
    materialList: state[namespace].materialList,
    total: state[namespace].total,
    loading: state.loading.effects['Material/fetchMaterialList'] as boolean
}))(Material)