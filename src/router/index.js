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
          path: '/authsManage.usersManage',
          component: resolve => require(['../modules/authsManage/usersManage.vue'], resolve)
        },
        {
          path: '/authsManage.urlManage',
          component: resolve => require(['../modules/authsManage/urlManage.vue'], resolve)
        },
        {
          path: '/authsManage.divisionsManage',
          component: resolve => require(['../modules/authsManage/divisionsManage.vue'], resolve)
        },
        {
          path: '/authsManage.rolesManage',
          component: resolve => require(['../modules/authsManage/rolesManage.vue'], resolve)
        },
        {
          name: "purchaseManage",
          path: '/authsManage.purchaseManage',
          component: resolve => require(['../modules/authsManage/purchaseManage.vue'], resolve)
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../frame/login.vue'], resolve)
    },
  ]
})
