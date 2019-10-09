import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.config.productionTip = false

router.beforeEach( async (to, from, next) => {
  let isLogin = await store.dispatch("validata")
  
  //needLogin  表示哪些路由需要在登录条件下才能访问
  let needLogin = to.meta.needLogin;
  if(needLogin){

    //需要登录
    if(isLogin){
      //登录过了
      next()
    }else{
      //没有登录过
      next("/login")

    }

  }else{
    //不需要登录
    if(isLogin && to.path === '/login'){
      next('/')
    }else{
      next();
    }

  }

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
