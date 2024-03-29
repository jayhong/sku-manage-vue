import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      component: resolve => require(['../frame/frame.vue'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['../components/Index.vue'], resolve)
        },
        {
          path: '/403',
          component: resolve => require(['../components/403.vue'], resolve)
        },
        {
          path: '/sysManage.usersManage',
          component: resolve => require(['../modules/sysManage/usersManage.vue'], resolve)
        },
        {
          path: '/skuManage.urlManage',
          component: resolve => require(['../modules/skuManage/urlManage.vue'], resolve)
        },
        {
          name: "skuProps",
          path: '/skuManage.skuProps',
          component: resolve => require(['../modules/skuManage/skuProps.vue'], resolve)
        },
        {
          name: "sku",
          path: '/skuManage.sku',
          component: resolve => require(['../modules/skuManage/sku.vue'], resolve)
        },
        {
          name: "sizeManage",
          path: '/skuManage.size',
          component: resolve => require(['../modules/skuManage/size.vue'], resolve)
        },
        {
          path: '/purchaseManage.orderManage',
          component: resolve => require(['../modules/purchaseManage/orderManage.vue'], resolve)
        },
        {
          name: "purchaseManage",
          path: '/purchaseManage.purchaseManage',
          component: resolve => require(['../modules/purchaseManage/purchaseManage.vue'], resolve)
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../frame/login.vue'], resolve)
    },
  ]
})
