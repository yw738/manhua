import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        name: 'home',
        component: () => import('./views/Home.vue')
    }, {
        path: '/list',
        name: 'list',
        component: () => import('./views/list/List.vue')
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('./views/Search.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('./views/about/About.vue'),
    },
    {
        path: '/detail',
        name: 'detail',
        component: () => import('./views/detail/Detail.vue')
    }
    ]
})