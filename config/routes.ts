export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: './Welcome',
              },
              {
                name: '内容管理',
                icon: 'table',
                path: '/content',
                routes: [
                  {
                    name: '商品列表',
                    path: '/content/list',
                    component: './TableList',
                  },
                  {
                    name: '商品管理',
                    path: '/content/material',
                    component: './Material',
                  }
                ],
              },
              {
                name: '测试路由',
                icon: 'warning',
                path: '/page',
                routes: [
                  {
                    path: '/page/page1',
                    name: '子路由1',
                    icon: 'smile',
                    component: './TestPage1',
                  },
                  {
                    path: '/page/page2',
                    name: '子路由2',
                    icon: 'smile',
                    component: './TestPage2',
                  },
                  {
                    path: '/page/UseMemo',
                    name: '测试Memo',
                    icon: 'smile',
                    component: './UseMemo',
                  }
                ],
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
