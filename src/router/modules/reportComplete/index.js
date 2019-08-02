// 选择报告页面的路由
const routes = [
    {
      name: 'reportComplete',
      path: 'reportComplete',
      component: () => import('@/views/reportComplete'),
      meta: {
        title: "",
        // menu: false,
        // keepAlive: false
      },
      children: []
    }
  ]
  export default routes