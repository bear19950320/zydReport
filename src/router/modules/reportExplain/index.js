// 选择报告页面的路由
const routes = [
    {
      name: 'reportExplain',
      path: 'reportExplain',
      component: () => import('@/views/reportExplain'),
      meta: {
        title: "会诊意见",
        // menu: false,
        // keepAlive: false
      },
      children: []
    }
  ]
  export default routes