<template>
  <div class>
    <div class="flex tipBox">
      <van-search
        class="serchBox"
        disabled
        placeholder="请输入搜索关键词"
        @click="toSearch"
        shape="round"
      />
      <div class="flex tipBox">
        <img
          @click="setHouse"
          src="http://css.mangabz.com/v201911081548/mangabz/images/mobile/class.png"
          alt
        />
        <img
          @click="userHome"
          src="http://css.mangabz.com/v201911081548/mangabz/images/mobile/icon_user.png"
          alt
        />
      </div>
    </div>
    <div class="swiper">
      <van-swipe :autoplay="3000" :loop="true" indicator-color="white">
        <van-swipe-item v-for="(item, i) in imgList" :key="i">
          <router-link :to="item.link">
            <img :src="item.url" />
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>

    <homeList :tit="topBox" :data="topBoxList" />
    <homeList :tit="bottomBox" :data="bottomList" />
    <!-- <div class="index_border" /> -->
    <!-- 申明 -->
    <div class="sm">
      声明 :
      <br />数据均来源于网络，并不参与存储、上传、创作，版权争议与本站无关。
      仅学习交流使用，请勿用于商业（非法）用途！否则，一切后果请自行承担！
    </div>
  </div>
</template>

<script>
/**
 * 首页
*/
import { homeApi } from "@/api/api";
import { mapState } from "vuex";
import homeList from "./Home/HomeList.vue";
import { Dialog } from "vant";
import { imgList, topBoxList, bottomList } from "@/util/home.js";
export default {
  name: "search",
  data() {
    return {
      imgList: imgList,
      topBoxList: topBoxList,
      bottomList: bottomList,
      topBox: {
        title: "人氣推薦",
      },
      bottomBox: {
        title: "編輯推薦",
      },
    };
  },
  methods: {
    toSearch() {
      this.$router.push({ path: "/search" });
    },
    /*
     *用户收藏
     */
    setHouse() {
      Dialog.alert({
        title: "提示",
        message: "暂未开放收藏列表!",
      }).then(() => {
        // on close
      });
    },
    /*
     *用户
     */
    userHome() {
      Dialog.alert({
        title: "提示",
        message: "暂未开放个人中心!",
      }).then(() => {
        // on close
      });
    },
  },
  components: {
    homeList,
  },
};
</script>

<style lang="less" scope>
.swiper,
.swiper img {
  height: 2.2rem;
  width: 100vw;
}
.tipBox {
  justify-content: space-between;
  align-items: center;
}
.serchBox {
  width: 55vw;
}
.tipBox img {
  height: 0.28rem;
  width: 0.28rem;
  margin: 0 0.06rem;
}
.sm {
  text-align: left;
  padding: 0.1rem;
  color: red;
}
</style>
