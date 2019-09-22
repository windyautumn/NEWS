import Vue from 'vue'
//路由
import VueRouter from 'vue-router'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'

import app from '@/App.vue'

Vue.use(VueRouter)
// 是routes   不是 routers  没有r   r  r  r  r  r  r
var routes = [
    {path:"/login",component:Login},
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
