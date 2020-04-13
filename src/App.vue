<template>
  <div id="app">
    <keep-alive include="AboutIndex" max="1" :exclude="isKeepalive?'':'AboutIndex'">
      <router-view v-if="isShow" />
    </keep-alive>
  </div>
</template>
<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      isShow: true,//验证用户是否是移动端预览
      isKeepalive: false,//是否对详情进行缓存
    };
  },
  methods: {
    init() {
      var sUserAgent = navigator.userAgent.toLowerCase();
      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
      var bIsMidp = sUserAgent.match(/midp/i) == "midp";
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
      var bIsAndroid = sUserAgent.match(/android/i) == "android";
      var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
      var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
      if (
        bIsIpad ||
        bIsIphoneOs ||
        bIsMidp ||
        bIsUc7 ||
        bIsUc ||
        bIsAndroid ||
        bIsCE ||
        bIsWM
      ) {
        this.isShow = true;
        //这是移动端
      } else {
        //这是pc端
        this.isShow = false;
        Dialog.alert({
          title: "提示",
          message: "请使用移动设备来浏览该网页,以此得到更友好的体验!"
        }).then(() => {
          // on close
        });
      }
    }
  },
  created() {
    // this.init();
  },
  watch: {
    //监听路由 判断是否进行keep-alive动态缓存 
    $route: function(to, from) {
      if (to.name === "detail"||to.name === "about") {
        this.isKeepalive = true;
      }else{
        this.isKeepalive = false;
      }
    }
  },
};
</script>

<style lang="less">
html {
    font-size: 100vw / 3.75;
}

body {
    font-size: 0.14rem;
    overflow: hidden;
}

</style>