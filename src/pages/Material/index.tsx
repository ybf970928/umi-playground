import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Card, Table, Tooltip, Col, Row, Popconfirm, Space, Tag } from 'antd'
import type { Dispatch } from 'umi'
import { connect } from 'umi'
import type { ConnectState } from '@/models/connect'
import type { MaterialType } from './model'
import { useEffect } from 'react'
import type { ColumnsType } from 'antd/lib/table'
import { useState } from 'react'
import { useCallback } from 'react'
import MaterialForm from './component/MaterialForm'

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
            title: '商品分类',
            dataIndex: 'productCategoryName'
        },
        {
            title: '是否上架',
            dataIndex: 'publishStatus',
            width: '120px',
            render: (text: number) => <Tag color={text ? 'success' : 'processing'}>
                {text ? '上架' : '下架'}
            </Tag>
        },
        // {
        //     title: '创建时间',
        //     dataIndex: 'createTime',
        //     width: '200px'
        // },
        {
            title: '编辑时间',
            dataIndex: 'modifyTime',
            width: '200px'
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
            title: '操作',
            dataIndex: '',
            render: () => {
                return (
                    <Space size="middle">
                        <a onClick={() => {}}>编辑</a>
                        <Popconfirm title="Are you sure？" onConfirm={() => {}}>
                            <a href="#">删除</a>
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]
    return (
        <PageContainer>
            <Card title="商品管理" style={{ width: '100%', marginBottom: '30px' }}>
                <MaterialForm handleSubmit={handleSubmit} />
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