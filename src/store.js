import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userObj: {},
        mhData: {

        },
        serchKey: ''
    },
    mutations: {
        setUserObj(state, data) {
            //改变用户数据
        },
        setMhData(state, data) {

        },
        setSerchKey(state, key) { state.serchKey = key; }
    },
    actions: {
        setUserObj({ commit }) {
            commit('setUserObj')
        },
        setMhData({ commit }) {
            commit('setMhData')
        },
        setSerchKey({ commit }, key) {
            commit('setSerchKey', key)
        },
    }
})