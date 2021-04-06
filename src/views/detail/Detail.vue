<template>
  <div>
    <!-- 图片盒子 -->
    <div id="img_box" @click="choseType">
      <!-- <img :src="item" v-for="(item, i) in list" :key="i" /> -->
      <van-image
        width="100vw"
        height="auto"
        :lazyLoad="true"
        v-for="(item, i) in list"
        :key="i"
        :src="item"
      />
    </div>
    <!-- 操作按钮 -->
    <div class="nav" v-if="isShow">
      <div class="back" @click="back">
        <img src="./../../assets/return-details.png" alt />
      </div>
      <div class="morezj">
        <van-button round color="#fb7299" @click="more" type="info">{{
          json.num && json.num.length > 7
            ? json.num.substring(0, 7) + ".."
            : json.num
        }}</van-button>
      </div>
      <div class="nextZj">
        <van-button round color="#000" @click="prevGet" type="info"
          >上一话</van-button
        >
        <van-button round color="#000" @click="nextGet(false)" type="info"
          >下一话</van-button
        >
      </div>
    </div>

    <!-- 选择章节 -->
    <van-popup
      v-model="popup"
      @close="cancle"
      :duration="0.2"
      round
      position="bottom"
      class="popupClass"
      :style="{ height: '70%' }"
    >
      <div>
        <van-row>
          <van-col span="8" v-for="(item, i) in mhlist" :key="i">
            <div class="list_box">
              <router-link
                :to="{
                  path: '/detail',
                  query: { url: item.url, num: item.num },
                }"
                :class="index == i ? 'span active' : 'span'"
                @click.native="goDetail(item)"
                >{{ item.tit }}</router-link
              >
            </div>
          </van-col>
        </van-row>
      </div>
    </van-popup>
  </div>
</template>

<script>
/**
 * 漫画详情页
 */
import { mhDetailsApi } from "@/api/api";
import { Toast } from "vant";
export default {
  data() {
    return {
      list: [], //图片列表
      json: {}, //当前章节
      isShow: false, //是否显示操作栏
      popup: false, //是否显示章节列表
      mhlist: [], //该漫画所有章节列表
      index: null, //当前漫画的章节
      timer: true, //延时执行
      timerFn: null,
    };
  },
  methods: {
    /**
     * 返回上一级
     */
    back() {
      let url = window.sessionStorage.getItem("parentUrl");
      this.$router.push({
        path: "/about",
        query: {
          url: url,
        },
      });
    },
    /**
     * 模态框 取消回调
     */
    cancle() {
      this.isShow = false;
      this.popup = false;
    },
    /**
     * 是否显示操作按钮
     */
    choseType() {
      this.isShow ? (this.isShow = false) : (this.isShow = true);
    },
    /**
     * 页面数据初始化
     */
    getData() {
      this.init();
      let { url } = this.json;
      loading();
      mhDetailsApi(url).then((res) => {
        let { code } = res.data;
        if (code === 0) {
          let arr = res.data.data.data[0]||res.data.data.data;
          let list = arr.content;
          this.list = list;
        }else{
          this.back();
        }
        load.clear();
      });
    },
    /**
     * 页面数据初始化2
     * 自然向下滚动
     */
    getNextData() {
      // this.init();
      let { url } = this.json;
      loading();
      mhDetailsApi(url).then((res) => {
        let { code } = res.data;
        let arr = res.data.data.data[0]||res.data.data.data;
        let list = arr.content;
        if (code === 0) {
          this.isShow = false;
          this.popup = false;
          this.list = [...this.list, ...list];
        }
        load.clear();
      });
    },
    /**
     * 点击获取更多章节信息
     * 打开模态框
     */
    more() {
      let { url } = this.json;
      this.mhlist = JSON.parse(window.sessionStorage.getItem("mhList"));
      this.mhlist.forEach((v, i) => {
        if (v.chapterId === url) {
          this.index = i;
          return false;
        }
      });
      this.popup = true;
    },
    /**
     * 模态框里的章节点击回调
     */
    goDetail(item) {
      Object.assign(this.json, {
        url: item.chapterId,
        num: item.title,
      });
      this.getData();
    },
    /*
     * 获取下一章节信息
     */
    getNextUrl() {
      let { url } = this.json;
      let list = JSON.parse(window.sessionStorage.getItem("mhList"));
      let nextJson = null;
      list.forEach((v, i) => {
        if (url === v.chapterId) {
          if (i + 1 >= list.length) return false; //如果是最后一章 直接弹出。
          nextJson = {
            url: list[i + 1].chapterId,
            num: list[i + 1].title,
          };
        }
      });
      if (nextJson === null) {
        return false;
      } else {
        return nextJson;
      }
    },
    /*
     * 获取上一章节信息
     */
    getPrevUrl() {
      let { url } = this.json;
      let list = JSON.parse(window.sessionStorage.getItem("mhList"));
      let prevJson = null;
      list.forEach((v, i) => {
        if (url === v.chapterId) {
          if (i - 1 < 0) return false; //如果是最后一章 直接弹出。
          prevJson = {
            url: list[i - 1].chapterId,
            num: list[i - 1].title,
          };
        }
      });
      if (prevJson === null) {
        return false;
      } else {
        return prevJson;
      }
    },
    /*
     *监听下拉
     */
    scroll() {
      let box = document.querySelector("#img_box");
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop; //距离最顶上的距离
      let pageHeight = window.screen.availHeight; //页面高度
      let boxH = box.clientHeight; //#img_box 图片盒子的高度
      let imgHeight = parseInt(boxH / this.list.length) * 1.5; //图片高度
      if (box == null) return;
      // console.log(scrollTop + pageHeight, imgHeight, "------", boxH);
      if (scrollTop + pageHeight + imgHeight > boxH) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          // this.nextGet(true)
          this.timerFn(true);
        }, 300);
        return;
      }
    },
    /**
     * 数据初始化
     */
    init() {
      this.list = [];
      this.isShow = false;
      this.popup = false;
      this.$nextTick(() => {
        document.documentElement.scrollTop
          ? (document.documentElement.scrollTop = 0)
          : (document.body.scrollTop = 0);
      }); //滚动条清零
    },
    /*
     * 上一章
     */
    prevGet() {
      if (!this.getPrevUrl()) {
        Toast("没有上一章");
        return;
      } //检测是否是第一话
      this.json = this.getPrevUrl();
      this.getData();
    },
    /*
     * 下一章
     * @param {Boolean} isNext 是否是向下滑动到最底部
     */
    nextGet(isNext = false) {
      if (!this.getNextUrl()) {
        Toast("最后一话!");
        return;
      } //检测是否是最后一章
      this.json = this.getNextUrl();
      if (isNext) {
        this.getNextData();
      } else {
        this.getData();
      }
    },
    /**
     * 节流 (立即执行)
     * 防止多次请求下一页的数据
     */
    throttle(fn, delay) {
      let valid = true;
      return function () {
        if (valid) {
          //休息时间 暂不接客
          // 工作时间，执行函数并且在间隔期内把状态位设为无效
          valid = false;
          fn.apply(this, arguments);
          console.log("立即执行一次");
          setTimeout(() => {
            valid = true;
          }, delay);
        } else {
          console.log("拦截成功");
        }
      };
    },
  },
  created() {
    let { url, num } = this.$route.query;
    this.json = {
      url: url,
      num: num,
    };
    this.getData();
    this.timerFn = this.throttle(this.nextGet, 2000);
  },
  mounted() {
    window.addEventListener("scroll", this.scroll, false);
  },
  beforeDestroy() {
    /**
     * 解绑事件
     */
    if (window.removeEventListener) {
      window.removeEventListener("scroll", this.scroll, false);
    } else if (window.attachEvent) {
      window.attachEvent("scroll", this.scroll, false);
    }
    console.log("初始化scroll事件。");
  },
  watch: {
    /**
     * 监听 当前章节变化
     * 及时更新地址栏url，防止刷新导致当前章节丢失
     */
    json(newVal) {
      if (newVal && typeof newVal === "object") {
        this.$router.push({
          path: "/detail",
          query: { ...newVal },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./Detail.less");
</style>
