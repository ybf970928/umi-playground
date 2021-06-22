import React from 'react';
import { Button, Col, Form, Input, Row, Card, Select } from 'antd';

export interface IFormValues {
    onFinishForm: (value: any) => void
}
export type FormItemProps = {
    name: string,
    label: string,
    option?: {id: number, name: string}[]
}
export type FormItemValues = {
    name: string,
    label: string,
    tag: string
}
export const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
const IsInput: React.FC<FormItemProps> = ({name, label}) => {
    return (
        <Form.Item
              name={name}
              label={label}
              {...formItemLayout}
            >
              <Input />
            </Form.Item>
    )
}
const { Option } = Select;

const IsSelect: React.FC<FormItemProps> = ({name, label, option}) => {
    return (
        <Form.Item
              name={name}
              label={label}
              {...formItemLayout}
            >
            <Select allowClear>
                {
                    option?.map(node => {
                        return (
                            <Option value={node.id}>{node.name}</Option>
                        )
                    })
                }
            </Select>
            </Form.Item>
    )
}
export const FormItemType = (node: FormItemValues) => {
  switch (node.tag) {
      case 'IsInput':
          return <IsInput {...node} />
          break;
      case 'IsSelect': 
          return <IsSelect {...node} />
          break;
      default:
          return null

  }
}
const FormRender: React.FC<IFormValues> = ({ onFinishForm }) => {
    const FormItemValues: FormItemValues[] = [
        {name: 'gender', label: 'Gender', tag: 'IsSelect'},
        {name: '备件编号', label: '备件编号', tag: 'IsInput'},
        {name: '设备名称', label: '设备名称', tag: 'IsInput'},
        {name: '备件类型', label: '备件类型', tag: 'IsInput'},
        {name: '标志位', label: '标志位', tag: 'IsInput'}
    ]
    const AdvancedSearchForm = () => {
        const [form] = Form.useForm();
        const getFields = () => {
          const children = () => {
            return (
              <>
              {FormItemValues.map(node => {
                  return (
                    <Col span={8} key={node.name}>
                      {FormItemType(node)}
                    </Col>
                  )
              })}
              </>
            )
          }
          return children();
        };
      
        const onFinish = (values: any) => {
          onFinishForm(values)
        };
      
        return (
          <Card style={{marginBottom: '24px'}}>
          <Form
            form={form}
            name="advanced_search"
            onFinish={onFinish}
          >
            <Row gutter={24}>{getFields()}</Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
                <Button
                  style={{ margin: '0 8px' }}
                  onClick={() => {
                    form.resetFields();
                  }}
                >
                  Clear
                </Button>
              </Col>
            </Row>
          </Form>
          </Card>
        );
      };
    return (
        <AdvancedSearchForm />
    )
}
export default FormRender