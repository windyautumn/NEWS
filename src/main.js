import Vue from 'vue'

import Vant from 'vant';
import {Toast} from 'vant'
import axios from 'axios'
//路由
import VueRouter from 'vue-router'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Personal from '@/pages/Personal.vue'


import app from '@/App.vue'

Vue.use(VueRouter)
Vue.use(Vant)

// 把axios挂载到原型
Vue.prototype.$axios = axios; // this.$axios


// 基准路径，以后每次请求都会自动在前面加上该路径
axios.defaults.baseURL = "http://localhost:3000";

// 是routes   不是 routers  没有r   r  r  r  r  r  r
var routes = [
    {path:"/login",component:Login},
    {path:"/register",component:Register},
    {path:"/personal",component:Personal},
]
var router = new VueRouter({
    routes
})
//添加路由守卫
router.beforeEach( (to, from, next) => {
    // 是否有token
    const hasToken = localStorage.getItem("token");

    // 判断是否是需要登陆权限的页面
    if(to.path === "/personal"){

        // 判断本地是否有token
        if(hasToken){
            // 正常跳转
            next();
        }else{
            // 没有token正常跳转到登录
            next("/login")
        }

    }else{
        // 所有人都可以访问的页面正常浏览
        next();
    }

})
//拦截所有响应错误
axios.interceptors.response.use(res=>{
    const {message,statusCode} = res.data;
    if(statusCode === 401){
        Toast.fail(message);
    }
    if(message=="用户信息验证失败"){
        setTimeout(()=>{
          router.push('/login')  
        },3000)
    }
    return res
})


new Vue({
    el:'#app',
    render(createElement){
        return createElement(app)
    },
    router
})
