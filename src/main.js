import Vue from 'vue'

import Vant from 'vant';
import axios from 'axios'
//路由
import VueRouter from 'vue-router'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'

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
]
var router = new VueRouter({
    routes
})
new Vue({
    el:'#app',
    render(createElement){
        return createElement(app)
    },
    router
})
