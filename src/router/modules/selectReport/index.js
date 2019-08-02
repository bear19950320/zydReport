// 选择报告页面的路由
const routes = [
    {
      name: 'selectReport',
      path: 'selectReport',
      component: () => import('@/views/selectReport'),
      meta: {
        title: "选择报告",
        // menu: false,
        // keepAlive: false
      },
      children: [
        
      ]
    }, {
      name: 'myReport',
      path: 'myReport',
      component: () => import('@/views/selectReport/myReport/index'),
      meta: {
        title: "我的报告",
        // menu: false,
        // keepAlive: false
      }
    }
  ]
  export default routes
  