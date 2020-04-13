<template>
  <div>
    <!-- 图片盒子 -->
    <div id="img_box" @click="choseType">
      <img :src="v.img" v-for="(v,i) in list" :key="i" />
    </div>
    <!-- 操作按钮 -->
    <div class="nav" v-if="isShow">
      <div class="back" @click="back">
        <img src="./../assets/return-details.png" alt />
      </div>
      <div class="morezj">
        <van-button
          round
          color="#fb7299"
          @click="more"
          type="info"
        >{{json.num&&json.num.length>7?json.num.substring(0,7) + '..':json.num}}</van-button>
      </div>
      <div class="nextZj">
        <van-button round color="#000" @click="prevGet" type="info">上一话</van-button>
        <van-button round color="#000" @click="nextGet" type="info">下一话</van-button>
      </div>
    </div>

    <!-- 选择章节 -->
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
          <van-col span="8" v-for="(item,i) in mhlist" :key="i">
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
import { Toast } from "vant";
export default {
  name: "",
  data() {
    return {
      allList: [], //所有的图片
      list: [], //图片列表
      json: {}, //当前章节
      isShow: false, //是否显示操作栏
      popup: false, //是否显示章节列表
      mhlist: [], //该漫画所有章节列表
      index: null, //当前漫画的章节
      timer: true, //延时执行
      page: {
        pageSize: 5, //页数
        pageNo: 1, //页码
        maxPage: 1 //最大页数
      }, //分页
      pageIsOver: false //当前章节分页是否结束
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
    //页面数据初始化
    getData() {
      this.init();
      let { pageSize, pageNo } = this.page;
      let { url } = this.json;
      loading();
      mhDetailsApi(url).then(res => {
        let { code, list } = res.data;
        if (code === 0) {
          this.allList = list;
          this.list = list.slice(parseInt(pageNo.toString()) - 1, parseInt(pageSize.toString()));
          this.page = {
            pageSize: pageSize,
            pageNo: pageNo,
            maxPage: Math.ceil(list.length / parseInt(pageSize))
          };
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
      Object.assign(this.json,item);
      this.getData();
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
    getPrevUrl() {
      let { url } = this.json;
      let list = JSON.parse(window.sessionStorage.getItem("mhList"));
      let nextJson = null;
      list.forEach((v, i) => {
        if (url === v.url) {
          if (i - 1 < 0) return false; //如果是最后一章 直接弹出。
          nextJson = list[i - 1];
        }
      });
      if (nextJson === null) {
        console.log("第一话");
        return false;
      } else {
        return nextJson;
      }
    },
    /*
     * 调用分页
     */
    pageChange() {
      let {
        allList,
        page: { pageSize, pageNo, maxPage }
      } = this;
      pageNo++;
      if (pageNo <= maxPage) {
        this.page = {
          pageNo: pageNo,
          pageSize: pageSize,
          maxPage: maxPage
        };
        this.list = allList.slice(0, pageNo * pageSize);
      } else {
        if(!this.pageIsOver){
          console.log("分页结束");
          Toast("到底了");
          this.pageIsOver = true;
        }
      }
    },
    /*
     *监听下拉
     */
    scroll() {
      let box = document.querySelector("#img_box");
      let that = this;
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let pageHeight = window.screen.availHeight;
      if (box == null) return;
      let h = box.clientHeight;
      if (scrollTop + pageHeight + 300 > h) {
        clearTimeout(that.timer);
        that.timer = setTimeout(() => {
          that.pageChange(); //开始分页
        }, 300);
        return;
      }
    },
    init() {
      this.page = {
        pageSize: 5, //页数
        pageNo: 1, //页码
        maxPage: 1 //最大页数
      }; 
      this.pageIsOver = false;
      this.isShow=false;
      this.popup=false;
      this.$nextTick(()=>{
        document.documentElement.scrollTop?document.documentElement.scrollTop=0:document.body.scrollTop=0;
      }) //滚动条清零
    },
    /*
     * 切换章节
     */
    prevGet() {
      if (!this.getPrevUrl()) {
        Toast("没有上一章");
        return;
      } //检测是否是第一话
      this.json = this.getPrevUrl();
      this.getData();
    },
    nextGet() {
      if (!this.getNextUrl()) {
        Toast("最后一话!");
        return;
      } //检测是否是最后一章
      this.json = this.getNextUrl();
      this.getData();
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
  width: 100vw;
}
#img_box img {
  float: left;
  width: 100vw;
  border-bottom: 0.04rem solid black;
}
.nav {
  position: fixed;
  bottom: 0.15rem;
  left: 0.1rem;
  right: 0.1rem;
  z-index: 999;
}
.nav .back {
  position: relative;
  width: 0.4rem;
  height: 0.4rem;
  padding: 0;
  left: 0;
  top: 0;
}
.nav > div {
  float: left;
}
.nav .back img {
  width: 0.4rem;
  height: 0.4rem;
  background: black;
  border-radius: 50%;
}
.morezj {
  margin-left: 0.1rem;
}
.popupClass {
  padding: 0.1rem 0;
}
.nav .nextZj {
  float: right;
  line-height: 0.4rem;
  font-size: 0.12rem;
}
.nav .nextZj  button{
  margin-left:0.05rem; 
}
</style>