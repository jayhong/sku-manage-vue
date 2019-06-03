// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/main.css'
import './assets/dark-theme.css'
import './common/filters';

Vue.config.productionTip = false

Vue.use(elementUI);

// router.beforeEach((to, form, next) => {
//   let permission = sessionStorage.getItem('ts_permission');
//   if(permission === null){
//     permission = '';
//   }
//   let whiteList = "index,403,login";
//   let target = to.path.slice(1);
//   if(whiteList.indexOf(target) !== -1){next();}
//   else if(permission.indexOf(target) !== -1){next();}
//   else{
//     next('/403');
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
