import Vue from 'vue'

import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import App from './App.vue'
import Vant,{Lazyload} from 'vant';
import 'vant/lib/index.css';
import "@/components/Js/index"
Vue.use(Vant);
Vue.use(Lazyload);
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')