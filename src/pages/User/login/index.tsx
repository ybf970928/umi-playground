import {
    LockOutlined,
    UserOutlined
} from '@ant-design/icons'
import React from 'react'
import { Form, Input, Button, Alert } from 'antd'
import { connect } from 'umi'
import type { Dispatch } from 'umi'
import type { StateType } from '@/models/login'
import type { LoginParamsType } from '@/services/login'
import type { ConnectState } from '@/models/connect'

import styles from './index.less'

export type LoginProps = {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
    <Alert
        style={{
            marginBottom: 24
        }}
        message={content}
        type="error"
        showIcon
    />
)

const Login: React.FC<LoginProps> = (props) => {
  
    const { userLogin = {}, submitting } = props
    const { success, message } = userLogin
  
    const handleSubmit = (values: LoginParamsType) => {
        const { dispatch } = props
        dispatch({
            type: 'login/login',
            payload: { ...values }
        })
    }
  
    return (
        <div className={styles.main}>
            <Form
                name="normal_login"
                initialValues={{ remember: true }}
                onFinish={handleSubmit}
                size='large'
            >
                { typeof success === 'boolean' && !success && (
                    <LoginMessage
                        content={ message as string}
                    />
                )}  
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '用户名是必填项！' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                        allowClear placeholder="用户名" className={styles.prefixIcon}/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '密码是必填项！' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        className={styles.prefixIcon}
                        placeholder="密码"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}
                        loading={submitting}>
          登陆
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default connect(({ login, loading }: ConnectState) => ({
    userLogin: login,
    submitting: loading.effects['login/login']
}))(Login)
