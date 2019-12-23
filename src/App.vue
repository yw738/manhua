<template>
  <div id="app">
    <router-view  v-if="isShow"/>
  </div>
</template>
<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      isShow: false
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
    this.init();
  }
};
</script>