import Layout from "@/layouts/Layout.vue";

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: "/",
    meta: {
      title: "问诊",
      menu: false,
      keepAlive: false
    },
    redirect: "/workbench",
    component: Layout,
    children: [

    ]
  },
];
/**
 * 错误页面
 */
const errorPage = [
  // 404
  {
    path: "*",
    name: "redirect",
    redirect: { name: "404" }
  }
];
export default [...frameIn, ...errorPage];

// STATIC
import { test } from './utils_en.js'; // no dynamic locale
test();

// DYNAMIC
(async () => {
  const locale = 'en';

  const { test } = await import(`./utils_${locale}.js`);
  test('isDynamic');
})();
