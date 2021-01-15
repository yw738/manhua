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
          <router-link :to="item.link" @click.native="selectList(item)">
            <img :src="item.cover" />
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
import { mapState, mapMutations } from "vuex";
import homeList from "./home/HomeList";
import { Dialog } from "vant";
import { imgList } from "@/util/home.js";

export default {
  name: "home",
  data() {
    return {
      imgList: imgList,
      topBoxList: [],
      bottomList: [],
      topBox: {
        title: "人氣推薦",
      },
      bottomBox: {
        title: "編輯推薦",
      },
    };
  },
  methods: {
    ...mapMutations(["setMhData"]),
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
    /**
     * 点击回调
     */
    selectList(item) {
      this.setMhData(item);
      sessionStorage.setItem("mhItem", JSON.stringify(item));
    },
  },
  created() {
    let homeList = sessionStorage.getItem("homeList");
    if (homeList) {
      this.topBoxList = JSON.parse(homeList).slice(0, 6);
      this.bottomList = JSON.parse(homeList).slice(6, 12);
    } else {
      homeApi().then((res) => {
        let { code } = res.data;
        let list = res.data.data.data || [];
        if (code === 0) {
          list = list.map((item) => {
            return {
              ...item,
              link: `/about?url=${item.cartoonId}`,
            };
          });
          this.topBoxList = list.slice(0, 6);
          this.bottomList = list.slice(6, 12);
          sessionStorage.setItem("homeList", JSON.stringify(list)); //首页数据
        }
      });
    }
  },
  components: {
    homeList,
  },
};
</script>

<style lang="less" scope>
.swiper {
  height: 2.2rem;
  width: 100vw;
  overflow: hidden;
  .van-swipe {
    height: 100%;
  }
  .van-swipe__indicators {
    z-index: 99;
  }
}
.swiper img {
  min-height: 100%;
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
