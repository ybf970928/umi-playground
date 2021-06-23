import React from 'react'
// import { PageLoading } from '@ant-design/pro-layout';
import type { ConnectProps } from 'umi'
import { Redirect, connect } from 'umi'
import { stringify } from 'querystring'
import type { ConnectState } from '@/models/connect'
import type { CurrentUser } from '@/models/user'
import { getToken } from '@/utils/auth'

type SecurityLayoutProps = {
  currentUser?: CurrentUser;
} & ConnectProps;


class SecurityLayout extends React.Component<SecurityLayoutProps> {

    // componentDidMount() {
    //   const { dispatch } = this.props;
    //   if (dispatch) {
    //     dispatch({
    //       type: 'user/fetchCurrent',
    //       payload: {a: 1}
    //     });
    //   }
    // }

    render() {
        const { children } = this.props
        // You can replace it to your authentication rule (such as check token exists)
        // You can replace it with your own login authentication rules (such as judging whether the token exists)
        // const isLogin = currentUser && currentUser.userID
        const isToken = getToken()
        const queryString = stringify({
            redirect: window.location.href
        })

        // if ((!isLogin && loading)) {
        //   return <PageLoading />;
        // }
        if (!isToken && window.location.pathname !== '/user/login') {
            return <Redirect to={`/user/login?${queryString}`} />
        }
        return children
    }
}

export default connect(({ user }: ConnectState) => ({
    currentUser: user.currentUser
    // loading: loading.models.user,
}))(SecurityLayout)
