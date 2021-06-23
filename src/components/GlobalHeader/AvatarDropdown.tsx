import { LogoutOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React from 'react'
import type { ConnectProps } from 'umi'
import { history, connect } from 'umi'
import type { ConnectState } from '@/models/connect'
import type { CurrentUser } from '@/models/user'
import HeaderDropdown from '../HeaderDropdown'
import styles from './index.less'

export type GlobalHeaderRightProps = {
  currentUser?: CurrentUser;
  menu?: boolean;
} & Partial<ConnectProps>;

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
  onMenuClick = (event: {
    key: React.Key;
  }) => {
      const { key } = event
      if (key === 'logout') {
          const { dispatch } = this.props

          if (dispatch) {
              dispatch({
                  type: 'login/logout'
              })
          }

          return
      }

      history.push(`/account/${key}`)
  };

  render(): React.ReactNode {
      const {
          currentUser = {
              // avatar: '',
              nickname: ''
          }
      } = this.props
    
      const menuHeaderDropdown = (
          <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
              <Menu.Item key="logout">
                  <LogoutOutlined />
          退出登录
              </Menu.Item>
          </Menu>
      )
      return (
          <HeaderDropdown overlay={menuHeaderDropdown}>
              <span className={`${styles.action} ${styles.account}`}>
                  {/* <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" /> */}
                  <span className={`${styles.name} anticon`}>{currentUser.nickname}</span>
              </span>
          </HeaderDropdown>
      )
  }
}

export default connect(({ user }: ConnectState) => ({
    currentUser: user.currentUser
}))(AvatarDropdown)
