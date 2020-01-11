import Vue from 'vue'
import Router from 'vue-router'
import List from './views/List.vue'
import Search from './views/Search.vue'
Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: () =>
                import ('./views/Home.vue')
        }, {
            path: '/list',
            name: 'list',
            component: List
        },
        {
            path: '/search',
            name: 'search',
            component: Search
        },
        {
            path: '/about',
            name: 'about',
            component: () =>
                import ('./views/About/About.vue'),
            // meta: {
            //     isUseCache: true, // 是否需要缓存
            //     keepAlive: true // 缓存
            // }
        },
        {
            path: '/detail',
            name: 'detail',
            component: () =>
                import ('./views/Detail.vue')
        }
    ]
})