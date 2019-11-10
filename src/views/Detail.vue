<template>
  <div>
    <div id="img_box" @click="choseType">
      <img :src="v.img" v-for="(v,i) in list" :key="i" alt />
    </div>

    <div class="nav" v-if="isShow">
      <div class="back" @click="back">
        <img src="./../assets/return-details.png" alt />
      </div>
      <div class="morezj">
        <van-button round color="#fb7299" @click="more" type="info">{{json.num}}</van-button>
      </div>
    </div>

    <van-popup
      v-model="popup"
      @close="cancle"
      :duration=".2"
      round
      position="bottom"
      class="popupClass"
      :style="{ height: '70%'}"
    >
      <div>
        <van-row>
          <van-col span="6" v-for="(item,i) in mhlist" :key="i">
            <div class="list_box">
              <router-link
                :to="{path:'/detail',query:{url:item.url,num:item.num}}"
                :class="index ==i?'span active':'span' "
                @click.native="goDetail(item)"
              >{{item.tit}}</router-link>
            </div>
          </van-col>
        </van-row>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mhDetailsApi } from "@/api/api";

export default {
  name: "",
  data() {
    return {
      list: [], //图片列表
      json: {}, //当前章节
      isShow: false,
      popup: false,
      mhlist: [], //该漫画所有章节列表
      index: null, //当前漫画的章节
      timer: true
    };
  },
  methods: {
    back() {
      let url = window.sessionStorage.getItem("parentUrl");
      this.$router.push({
        path: "/about",
        query: {
          url: url
        }
      });
    },
    cancle() {
      this.isShow = false;
      this.popup = false;
    },
    choseType() {
      this.isShow ? (this.isShow = false) : (this.isShow = true);
    },
    getData() {
      let { url } = this.json;
      loading();
      mhDetailsApi(url).then(res => {
        let { code, list } = res.data;
        if (code === 0) {
          this.list = list;
        }
        load.clear();
      });
    },
    more() {
      let { url } = this.json;
      this.mhlist = JSON.parse(window.sessionStorage.getItem("mhList"));
      this.mhlist.forEach((v, i) => {
        if (v.url === url) {
          this.index = i;
          return false;
        }
      });
      this.popup = true;
    },
    goDetail(item) {
      // this.$router.go(0);
      window.open(window.location.href);
    },
    moreData(json) {
      let { url } = json;
      let arr = JSON.parse(JSON.stringify(this.list));
      mhDetailsApi(url).then(res => {
        let { code, list } = res.data;
        if (code === 0) {
          [...arr] = [...arr, ...list];
          // console.log(arr);
          this.list = arr;
          this.json = json;
        }
      });
    },
    getNextUrl() {
      let { url } = this.json;
      let list = JSON.parse(window.sessionStorage.getItem("mhList"));
      let nextJson = null;
      list.forEach((v, i) => {
        if (url === v.url) {
          if (i + 1 >= list.length) return false; //如果是最后一章 直接弹出。
          nextJson = list[i + 1];
        }
      });
      if (nextJson === null) {
        console.log("最后一话");
        return false;
      } else {
        return nextJson;
      }
    },
    scroll() {
      let box = document.querySelector("#img_box");
      let that = this;
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let pageHeight = window.screen.availHeight;
      if (box == null) return;
      let h = box.clientHeight;
      if (scrollTop + pageHeight + 100 > h) {
        if (!that.getNextUrl()) return; //是否是最后一章
        clearTimeout(that.timer);
        that.timer = setTimeout(() => {
          that.moreData(that.getNextUrl());
        }, 300);
      }
    }
  },
  created() {
    let { url, num } = this.$route.query;
    this.json = {
      url: url,
      num: num
    };
    this.getData();
  },
  mounted() {
    window.addEventListener("scroll", this.scroll, false);
  },
  beforeDestroy() {
    if (window.removeEventListener) {
      window.removeEventListener("scroll", this.scroll, false);
    } else if (window.attachEvent) {
      window.attachEvent("scroll", this.scroll, false);
    }
    console.log("初始化scroll事件。");
  }
};
</script>

<style lang='less' scoped>
#img_box {
  display: inline-block;
  width: 100%;
}
#img_box img {
  float: left;
  width: 100%;
  border-bottom: 4px solid black;
}
.nav {
  position: fixed;
  bottom: 15px;
  left: 10px;
  right: 10px;
  z-index: 999;
}
.nav .back {
  position: relative;
  width: 40px;
  height: 40px;
  padding: 0;
  left: 0;
  top: 0;
}
.nav > div {
  float: left;
}
.nav .back img {
  width: 40px;
  height: 40px;
  background: black;
  border-radius: 50%;
}
.morezj {
  margin-left: 20px;
}
.popupClass {
  padding: 10px 0;
}
</style>