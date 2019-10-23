import Vue from 'vue'
import { Toast } from 'vant';
let vue = new Vue();

window.load = null;
window.loading = () => {
    load = Toast.loading({
        message: "加载中...",
        duration: 0
    });
}