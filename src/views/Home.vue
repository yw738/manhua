<template>
  <div class>
    <div class="flex tipBox">
      <van-search placeholder="请输入搜索关键词" @focus="toSearch" shape="round" />
      <div>
        <img src="http://css.mangabz.com/v201911081548/mangabz/images/mobile/class.png" alt />
        <img src="http://css.mangabz.com/v201911081548/mangabz/images/mobile/icon_user.png" alt />
      </div>
    </div>
    <div class="swiper">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,i) in imgList" :key="i">
          <img :src="item.url" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <homeList />
    <homeList />
    <!-- 申明 -->
    <div class="sm">声明 : 数据均来源于网络，并不参与存储、上传、创作，版权争议与本站无关。 仅学习交流使用，请勿用于商业（非法）用途！否则，一切后果请自行承担！</div>
  </div>
</template>

<script>
import { homeApi } from "@/api/api";
import { mapState } from "vuex";
import homeList from "./Home/HomeList.vue";
export default {
  name: "search",
  data() {
    return {
      imgList: [
        {
          link: "",
          url:
            "https://img.zcool.cn/community/01e4d85ddb6183a8012129e2fb9ece.png@1280w_1l_2o_100sh.png"
        },
        {
          link: "",
          url:
            "https://img.zcool.cn/community/01fdf75ddb6180a8012129e2321a82.png@1280w_1l_2o_100sh.png"
        },
        {
          link: "",
          url:
            "https://img.zcool.cn/community/01d55e5ddb617ca8012053c08ce83d.png@1280w_1l_2o_100sh.png"
        }
      ]
    };
  },
  methods: {
    toSearch() {
      this.$router.push({ path: "/search" });
    }
  },
  created() {},
  computed: {},
  components: {
    homeList
  }
};
</script>

<style lang="less" scope>
.swiper,
.swiper img {
  height: 240px;
}
.tipBox {
  justify-content: space-between;
  align-items: center;
}
.tipBox img {
  height: 2.4rem;
  width: 2.4rem;
  margin: 0 1rem;
}
.sm {
  text-align: center;
  padding: 1rem;
  font-size: 0.8rem;
}
</style>