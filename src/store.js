import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userObj: {},
        mhData: {},
        serchKey: ''
    },
    mutations: {
        /**
         * 改变用户数据
        */
        setUserObj(state, data) {

        },
        /**
         * 漫画章节 信息
        */
        setMhData(state, data) {
            state.mhData = data;
        },
        /**
         * 查询条件
        */
        setSerchKey(state, key) { state.serchKey = key; }
    },
    actions: {
        setUserObj({ commit }, data) {
            commit('setUserObj', data)
        },
        setMhData({ commit }, data) {
            commit('setMhData', data)
        },
        setSerchKey({ commit }, key) {
            commit('setSerchKey', key)
        },
    }
})