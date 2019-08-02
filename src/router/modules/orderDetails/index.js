// 选择报告页面的路由
const routes = [
    {
      name: 'orderDetails',
      path: 'orderDetails',
      component: () => import('@/views/orderDetails'),
      meta: {
        title: "订单详情",
        // menu: false,
        // keepAlive: false
      },
      children: []
    }
  ]
  export default routes