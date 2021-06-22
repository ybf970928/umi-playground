/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 *
 * @see You can view component api by: https://github.com/ant-design/ant-design-pro-layout
 */
import type {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import React, { useRef, useState } from 'react';
import type { Dispatch } from 'umi';
import { Link, connect, history } from 'umi';
// import { Result, Button } from 'antd';
// import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import type { ConnectState } from '@/models/connect';
// import { getMatchMenu } from '@umijs/route-utils';
import logo from '../assets/logo.png';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
// const noMatch = (
//   <Result
//     status={403}
//     title="403"
//     subTitle="Sorry, you are not authorized to access this page."
//     extra={
//       <Button type="primary">
//         <Link to="/user/login">Go Login</Link>
//       </Button>
//     }
//   />
// );
export type BasicLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
} & ProLayoutProps;
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: Record<string, MenuDataItem>;
};
/** Use Authorized check all menu item */

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    return localItem
  });

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    // dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;

  const menuDataRef = useRef<MenuDataItem[]>([]);
  const [collapsed, setCollapsed] = useState(false);

  // const handleMenuCollapse = (payload: boolean): void => {
  //   if (dispatch) {
  //     dispatch({
  //       type: 'global/changeLayoutCollapsed',
  //       payload,
  //     });
  //   }
  // };
  // get children authority
  // const authorized = useMemo(
  //   () =>
  //     getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
  //       authority: undefined,
  //     },
  //   [location.pathname],
  // );
  return (
    <ProLayout
      // formatMessage={formatMessage}
      {...props}
      {...settings}
      menuHeaderRender={() => {
        return (
          <div id="customize_menu_header" style={{width: '100%'}}>
            <img src={logo} alt="logo"/>
          </div>
        )
      }}
      collapsedButtonRender={false}
      collapsed={collapsed}
      headerContentRender={() => {
        return (
          <div
            onClick={() => setCollapsed(!collapsed)}
            style={{
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        );
      }}
      onMenuHeaderClick={() => history.push('/')}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: 'home',
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      menuDataRender={menuDataRender}
      rightContentRender={() => <RightContent />}
      postMenuData={(menuData) => {
        menuDataRef.current = menuData || [];
        return menuData || [];
      }}
    >
      {/* <Authorized authority={authorized!.authority} noMatch={noMatch}> */}
        {children}
      {/* </Authorized> */}
    </ProLayout>
  );
};

export default connect(({ settings }: ConnectState) => ({
  settings,
}))(BasicLayout);
