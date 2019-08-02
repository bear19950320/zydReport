// 报告相关页面的路由
const routes = [
    {
      name: 'detailsReport',
      path: 'detailsReport',
      component: () => import('@/views/detailsReport'),
      meta: {
        title: "订单详情",
        // menu: false,
        // keepAlive: false
      },
      children: []
    }
  ]
  export default routes
  