import React, { useState } from 'react'
import { Button, Col, Form, Input, Row } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import type { MaterialType } from '../model'
import { pickBy } from '@/utils/pickBy'

interface IPropsType {
    handleSubmit: (values: MaterialType) => void
}

const MaterialForm: React.FC<IPropsType> = ({ handleSubmit }) => {
    const [form] = Form.useForm()
    const [expand, setExpand] = useState(false)

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
                            <Input placeholder='请输入' allowClear/>
                        </Form.Item>
                    </Col>
                )
            })
        )
    }
    const handleFormSubmit = (values: MaterialType) => {
        const useParams = pickBy({ ...values })
        handleSubmit(useParams)
    }
    
    return (
        <Form
            form={form}
            {...formItemLayout}
            onFinish={handleFormSubmit}
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
    )
}

export default MaterialForm