<template>
  <div id="app">
    <div v-if="isAllowShow">
      <!-- include 希望缓存的组件   -->
      <!-- exclude 不希望被缓存的组件 -->
      <!-- exclude 优先级高于 include -->
      <keep-alive
        include="AboutIndex"
        max="1"
        :exclude="isKeepalive ? '' : 'AboutIndex'"
      >
        <router-view v-if="isShow" />
      </keep-alive>
    </div>
    <div v-else>
      <div>测试测试测试</div>
      <van-skeleton title avatar :row="3" />
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      isShow: true, //验证用户是否是移动端预览
      isKeepalive: false, //是否对详情进行缓存

      isAllowShow: false, //是否允许显示页面，初次进来会显示一次，仅从github进来的时候才会为true
    };
  },
  methods: {
    /**
     * 验证设备
     */
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
          message: "请使用移动设备来浏览该网页,以此得到更友好的体验!",
        }).then(() => {
          // on close
        });
      }
    },
  },
  created() {
    //验证来源，非 github 直接拦截
    let sourceIsAllow =
      location.href.split("?")[1] &&
      location.href.split("?")[1].includes("github");
    if (sourceIsAllow) {
      this.isAllowShow = true;
      window.sessionStorage.setItem("sourceIsAllow", true);
    } else {
      this.isAllowShow = false;
    }
  },
  watch: {
    //监听路由 判断是否进行keep-alive动态缓存
    $route: function (to, from) {
      let source = window.sessionStorage.getItem("sourceIsAllow");
      if (source == "true") {
        this.isAllowShow = true;
      } else {
        this.isAllowShow = false;
      }
      if (to.name === "detail" || to.name === "about") {
        this.isKeepalive = true;
      } else {
        this.isKeepalive = false;
      }
    },
  },
};
</script>

<style lang="less">
html {
  font-size: 100vw / 3.75;
}

body {
  font-size: 0.14rem;
}
#app {
  overflow: hidden;
}
</style>