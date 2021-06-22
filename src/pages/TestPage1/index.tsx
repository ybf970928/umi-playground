import  React from 'react';
import { connect } from 'umi';
import type { CurrentUser } from '@/models/user';
import type { ConnectState } from '@/models/connect';
import { PageContainer } from '@ant-design/pro-layout';

type UserInfo = {
    userInfo?: CurrentUser;
  }

 const Test1: React.FC = (props) => {
     return (
         <>
         <div>我是父组件</div>
         {props.children}
         </>
     )
 } 
 const Test2: React.FC = () => {
    return (
        <div>我是子组件</div>
    )
} 
const TestPage1: React.FC<UserInfo> = () => {
    return (
        <PageContainer>
            <Test1>
                <Test2 />
            </Test1>
        </PageContainer>
    )
}

export default connect(({user}: ConnectState) => ({
    userInfo: user.currentUser}))(TestPage1)