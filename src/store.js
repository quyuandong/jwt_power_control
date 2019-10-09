import Vue from 'vue'
import Vuex from 'vuex'
import { login, validata } from './api/user';
import { setLocalStorage } from './lib/LocalStorage';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowLoading: false,
    username: "wangcai"
  },
  mutations: {
    showLoading(state){
      state.isShowLoading = true;
    },

    hideLoading(state){
      state.isShowLoading = false;
    },

    setUsername(state,username){
      state.username = username;
    }
  },
  actions: {

    //登录
    async toLogin({commit},username)  {
      let r = await login(username);
      //登录成功
      if(r.code === 0){
        commit("setUsername",r.username)
        setLocalStorage("token",r.token)

      }else{
        //登录失败
        return Promise.reject(r.data)
      }
    },

    //权限校验
    async validata({commit}){
      let r = await validata();
      if(r.code === 0){
        commit('setUsername',r.username)
        setLocalStorage('token',r.token)
      }
      // 返回token是否失效
      return r.code === 0;
    }
  }
})
