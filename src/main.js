import Vue from 'vue'
import Vant from 'vant'
import { Toast } from 'vant'
import axios from 'axios'

//路由
import VueRouter from 'vue-router'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Personal from '@/pages/Personal.vue'
import EditProfile from '@/pages/EditProfile'
import UserFollow from '@/pages/UserFollow'
import UserComment from '@/pages/UserComment'
import Index from '@/pages/Index'
import PostDetail from '@/pages/PostDetail'



import app from '@/App.vue'

Vue.use(VueRouter)
Vue.use(Vant)
//将axio挂在Vue的实例原型上 可以在组件中用this.$axios直接调用
Vue.prototype.$axios = axios
// 基准路径，以后每次请求都会自动在前面加上该路径
axios.defaults.baseURL = "http://localhost:3000";
// 是routes   不是 routers  没有r   r  r  r  r  r  r
var routes = [
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/personal", component: Personal },
    { path: "/edit_profile", component: EditProfile },
    { path: "/user_follow", component: UserFollow },
    { path: "/user_comment", component: UserComment },
    { path: "/", component: Index },
    { path: "/post_detail/:id", component: PostDetail }
]
var router = new VueRouter({
    routes
})
//添加路由守卫
router.beforeEach((to, from, next) => {
    const hasToken = localStorage.getItem('token')
    if(to.path=='/personal'){
        if (hasToken) {
            return next()
        } else {
            return next('/login')
        }
    }else{
         next()
    }
})
//拦截所有错误响应
axios.interceptors.response.use(res => {
    const { message, statusCode } = res.data
    if (statusCode == 401) {
        Toast.fail(message)
    }
    if (message == '用户信息验证失败') {
        setTimeout(() => {
            router.push('/login')
        }, 3000);
    }
    return res
})
new Vue({
    el: '#app',
    render(createElement) {
        return createElement(app)
    },
    router
})
