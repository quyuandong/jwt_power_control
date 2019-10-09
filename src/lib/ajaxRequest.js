import axios from "axios"
import store from "../store";
import { getLocalStorage } from "./LocalStorage";
//封装自己的axios对象
class AjaxRequest{
    //构造函数
    constructor(){
        //请求的基础路径
        this.baseURL = process.env.NODE_ENV== "production" ? "/" : "/api";
        
        //请求的延迟 3秒
        this.timeout = 3000;

        //存放每一次的请求（避免多次请求，多次加载动画）
        this.queue = {};

    }

    //拼接axios的配置项，合并参数
    merge(options){
        return {...options,baseURL:this.baseURL,timeout:this.timeout}
    }

    //拦截
    setInterceptor(instance, url){

        //请求拦截，（为每个请求加上一个loading效果）
        instance.interceptors.request.use((config) => {

            config.headers.Authorization = getLocalStorage("token")

            // 第1次请求时，显示Loading动画
            if(Object.keys(this.queue).length === 0){
                store.commit("showLoading");
            }
            this.queue[url] = url;
            return config;
        })

        //响应
        instance.interceptors.response.use((res) => {

            //最后一次的响应结束，结束动画
            delete this.queue[url]
            if(Object.keys(this.queue).length === 0){
                store.commit('hideLoading')
            }
            return res.data;
        })
    }



    //请求，发起请求
    request(options){
        //创建一个axios的实例
        let instance = axios.create();

        // 设置拦截
        this.setInterceptor(instance,options.url); 

        //获取到axios的配置项
        let config = this.merge(options)

        return instance(config)
    }


}

export default new AjaxRequest();