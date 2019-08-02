// 报告相关页面的路由
const routes = [
  {
    name: 'inquiry',
    path: 'inquiry',
    component: () => import('@/views/inquiry'),
    meta: {
      title: "报告解读",
      // menu: false,
      // keepAlive: false
    },
    children: []
  }
]
export default routes
