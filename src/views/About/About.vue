<template>
  <div class="about">
    <div class="back" @click="back">
      <img src="./../../assets/return-details.png" alt />
    </div>
    <div class="img_box">
      <img :src="mhData.cover" @error="imgErr" class="img" />
    </div>
    <div class="item_box">
      <van-row class="positionR">
        <van-col span="7" class="about_img">
          <img :src="mhData.cover" />
        </van-col>
        <van-col span="17">
          <div class="tit_box">
            <h3 class="title textOverflow">{{ mhData.title }}</h3>
            <p class="txt">
              <van-icon name="user-o" />
              {{ mhData.author }}
            </p>
            <p class="txt">
              <van-icon name="underway-o" />
              {{ mhData.updateTime }}
            </p>
          </div>
          <div class="btn_box">
            <van-button round color="#fb7299" @click="start" type="info"
              >阅读{{ startJson.num }}</van-button
            >
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- 描述 -->
    <div
      :class="['tips tips_box', isAllShowTips ? '' : 'isShow']"
      @click="isAllShowTips = !isAllShowTips"
    >
      {{ mhData.descs }}
    </div>
    <!-- 操作按钮 -->
    <div class="zj_box">
      <van-row>
        <van-col span="12">
          <div class="sort" style="float: left">
            全部章节({{ list.length }})
          </div>
        </van-col>
        <van-col span="12">
          <div class="sort" @click="sortFn">
            {{ sort ? "升序" : "降序" }}
            <van-icon size="1.4em" class="sortTop" name="exchange" />
          </div>
          <div class="sort" @click="chListFn" style="margin: 0 1em">
            <van-icon size="1.4em" class="sortTop" name="apps-o" />
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- 章节列表 -->
    <div id="list_box">
      <van-row>
        <van-col :span="listSize" v-for="(item, i) in list" :key="i">
          <div class="list_box" @click="toDetail">
            <router-link
              :to="{
                path: '/detail',
                query: { url: item.chapterId, num: item.tit },
              }"
              class="span"
              >{{ item.tit }}</router-link
            >
            <!-- <router-link
              :to="{}"
              class="span"
              >{{ item.tit }}</router-link
            > -->
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
/**
 * 漫画章节页
 */
import { mhListApi } from "@/api/api";
import { mapState, mapMutations } from "vuex";
import { Toast } from "vant";
export default {
  name: "AboutIndex",
  data() {
    return {
      // data: {}, //章节详情
      list: [], //章节列表
      sort: true, //排序规则
      startJson: {
        num: "",
        url: "",
      },
      isAllShowTips: false, //是否显示弹框
      backUrl: null, //返回的url
      listSize: 8,
    };
  },
  methods: {
    ...mapMutations(["setMhData"]),
    /**
     * 返回上一页
     */
    back() {
      this.$router.push({ path: this.backUrl || "/" });
    },
    /**
     * 页面初始化
     */
    init() {
      loading();
      let { url } = this.$route.query;
      window.sessionStorage.setItem("parentUrl", url);
      mhListApi(url)
        .then((res) => {
          let { code } = res.data;
          let list = res.data.data.data;
          if (code === 0) {
            list.map((v) => (v.tit = v.title.substring(0, 10)));
            list = list.sort((n, m) => n.chapterId - m.chapterId); //章节根据id 排个序
            this.startJson = {
              num: list[0].tit,
              url: list[0].chapterId,
            };
            window.sessionStorage.setItem("mhList", JSON.stringify(list));
            this.list = list;
          }
          load.clear();
        })
        .catch((err) => {
          load.clear();
        });
    },
    /**
     * 排序
     */
    sortFn() {
      //DESC ASC
      this.sort = !this.sort;
      let arr = this.list;
      this.list = [];
      this.list = arr.reverse();
    },
    /**
     * 更改 的排列方式
     */
    chListFn() {
      this.listSize == 8 ? (this.listSize = 12) : (this.listSize = 8);
    },
    /**
     * 开始阅读
     */
    start() {
      if (this.toDetail()) return;
      let { url, num } = this.startJson; //这个url 类似id
      this.$router.push({
        path: "/detail",
        query: {
          url: url,
          num: num,
        },
      });
    },
    /**
     * img 报错回调
     */
    imgErr() {
      let imgBg = document.querySelector(".img_box .img");
      imgBg.style.background = "#fb7299b5";
    },
    /**
     * 拦截跳转
     */
    toDetail() {
      // Toast('防止版权问题，暂不展示漫画详情！请本地预览。');
      // return true
    },
  },
  created() {
    this.init();
    //刷新的时候 更新vuex 里面的章节信息
    if (!Object.keys(this.mhData).length) {
      let item = sessionStorage.getItem("mhItem");
      if (item) this.setMhData(JSON.parse(item));
    }
  },
  computed: {
    ...mapState(["mhData"]),
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.name === "home" || from.name === "list") vm.backUrl = from.path;
    });
  },
};
</script>

<style lang='less' scoped>
@import url("./About.less");
</style>