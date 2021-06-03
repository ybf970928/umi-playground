import  React from 'react';
import { connect } from 'umi';
import type { CurrentUser } from '@/models/user';
import type { ConnectState } from '@/models/connect';
import { PageContainer } from '@ant-design/pro-layout';

type UserInfo = {
    userInfo?: CurrentUser;
  }
const TestPage1: React.FC<UserInfo> = ({ userInfo }) => {
    return (
        <PageContainer>
            {/* <p>姓名: {userInfo?.name}</p>
            <p>身份证: {userInfo?.userid}</p> */}
        </PageContainer>
    )
}

export default connect(({user}: ConnectState) => ({
    userInfo: user.currentUser}))(TestPage1)