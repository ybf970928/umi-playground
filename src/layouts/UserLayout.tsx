import type { MenuDataItem } from '@ant-design/pro-layout'
import { getMenuData, getPageTitle } from '@ant-design/pro-layout'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import type { ConnectProps } from 'umi'
import { connect } from 'umi'
import React from 'react'
import type { ConnectState } from '@/models/connect'
import logo from '../assets/logo.png'
import styles from './UserLayout.less'

export type UserLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
} & Partial<ConnectProps>;

const UserLayout: React.FC<UserLayoutProps> = (props) => {
    const {
        route = {
            routes: []
        }
    } = props
    const { routes = [] } = route
    const {
        children,
        location = {
            pathname: ''
        }
    } = props
    const { breadcrumb } = getMenuData(routes)
    const title = getPageTitle({
        pathname: location.pathname,
        // formatMessage,
        breadcrumb,
        ...props
    })
    return (
        <HelmetProvider>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={title} />
            </Helmet>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.header}>
                            <div>
                                <img alt="logo" className={styles.logo} src={logo} />
                                <span className={styles.title}>赛美特智能制造系统</span>
                            </div>
                        </div>
                        <div className={styles.desc}>赛美特智能制造系统</div>
                    </div>
                    {children}
                </div>
                {/* <DefaultFooter /> */}
            </div>
        </HelmetProvider>
    )
}

export default connect(({ settings }: ConnectState) => ({ ...settings }))(UserLayout)
