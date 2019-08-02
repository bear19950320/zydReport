// 选择报告页面的路由
const routes = [
    {
      name: 'orderList',
      path: 'orderList',
      component: () => import('@/views/orderList'),
      meta: {
        title: "我的订单",
        // menu: false,
        // keepAlive: false
      },
      children: []
    }
  ]
  export default routes