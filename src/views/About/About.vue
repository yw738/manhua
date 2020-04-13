<template>
  <div class="about">
    <div class="back" @click="back">
      <img src="./../../assets/return-details.png" alt />
    </div>
    <div class="img_box">
      <img :src="data.cover" @error="imgErr" class="img" />
    </div>
    <div class="item_box">
      <van-row class="positionR">
        <van-col span="7" class="about_img">
          <img :src="data.cover" />
        </van-col>
        <van-col span="17">
          <div class="tit_box">
            <h3 class="title textOverflow">{{data.name}}</h3>
            <p class="txt">
              <van-icon name="user-o" />
              {{data.author}}
            </p>
            <p class="txt">
              <van-icon name="underway-o" />
              {{data.time}}
            </p>
          </div>
          <div class="btn_box">
            <!-- like -->
            <!-- <van-icon
              :name="isHouse?'like':'like-o'"
              size="2em"
              color="#fb7299"
              @click="setHouse"
              class="like"
            />-->
            <van-button round color="#fb7299" @click="start" type="info">观看{{startJson.name}}</van-button>
          </div>
        </van-col>
      </van-row>
    </div>
    <div
      :class="['tips tips_box',isAllShowTips?'':'isShow' ]"
      @click="isAllShowTips = !isAllShowTips"
    >{{data.introduce}}</div>
    <div class="zj_box">
      <van-row>
        <van-col span="12">
          <div class="sort" style="float:left">全部章节({{list.length}})</div>
        </van-col>
        <van-col span="12">
          <div class="sort" @click="sortFn">
            {{sort?'升序':'降序'}}
            <van-icon size="1.4em" class="sortTop" name="exchange" />
          </div>
          <div class="sort" @click="chListFn" style="margin: 0 1em;">
            <van-icon size="1.4em" class="sortTop" name="apps-o" />
          </div>
        </van-col>
      </van-row>
    </div>
    <div id="list_box">
      <van-row>
        <van-col :span="listSize" v-for="(item,i) in list" :key="i">
          <div class="list_box">
            <router-link
              :to="{path:'/detail',query:{url:item.url,num:item.num}}"
              class="span"
            >{{item.tit}}</router-link>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { mhListApi } from "@/api/api";
export default {
  name: "AboutIndex",
  data() {
    return {
      data: {
        introduce: ""
      },
      list: [],
      sort: true,
      startJson: {
        name: "",
        url: ""
      },
      isAllShowTips: false,
      backUrl: null,
      listSize: 8
    };
  },
  methods: {
    back() {
      this.$router.push({ path: this.backUrl || "/" });
    },
    init() {
      loading();
      let { url } = this.$route.query;
      window.sessionStorage.setItem("parentUrl", url);
      let reg = /0|1|2|3|4|5|6|7|8|9|一|二|三|四|五|六|七|八|九|十/g;
      mhListApi(url)
        .then(res => {
          let { data, list, code } = res.data;
          if (code === 0) {
            list.map(v => {
              v.tit = v.num.substring(0, 10);
            });
            this.startJson = {
              name: list[0].tit,
              url: list[0].url
            };
            window.sessionStorage.setItem("mhList", JSON.stringify(list));
            this.data = data;
            this.list = list;
          }
          load.clear();
        })
        .catch(err => {
          load.clear();
        });
    },
    sortFn() {
      //DESC ASC
      this.sort = !this.sort;
      let arr = this.list;
      this.list = [];
      this.list = arr.reverse();
    },
    chListFn() {
      this.listSize == 8 ? (this.listSize = 12) : (this.listSize = 8);
    },
    start() {
      let { url } = this.startJson; //这个url 类似id
      this.$router.push({
        path: "/detail",
        query: {
          url: url
        }
      });
    },
    setHouse() {
      //添加收藏
    },
    imgErr() {
      let imgBg = document.querySelector(".img_box .img");
      imgBg.style.background = "#fb7299b5";
    }
  },
  created() {
    this.init();
  },
  computed: {
    isHouse: function() {
      return false;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === "home" || from.name === "list") {
        vm.backUrl = from.path;
      }
    });
  }
};
</script>

<style lang='less' scoped>
@imgHeight: 1.6rem;
.color,
.about {
  color: "#333";
}
.img_box {
  width: 100%;
  height: @imgHeight;
  overflow: hidden;
}
.img {
  width: 100%;
  height: @imgHeight * 2;
  margin-top: -0.50rem;
  filter: blur(0.1rem);
}
.tips_box {
  padding: 0 0.1rem;
  margin: 0.7rem 0 0.1rem;
  text-indent: 2em;
  color: #999;
  font-size: 0.12rem;
  line-height: 0.16rem;
}
.tips_box.isShow{
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.item_box {
  width: 93%;
  margin: 0 3.5%;
  height: auto;
  position: absolute;
  top: 0.76rem;
  left: 0;
}
.item_box img {
  height: 100%;
  border-radius: 0.02rem;
  box-shadow: 0px 0px 0.11rem -0.1rem #000;
}
.tit_box {
  padding: 0 4%;
  box-sizing: border-box;
}
.title {
  font-size: 0.2rem;
  font-weight: bold;
  margin: 0;
  color: #fff;
}
.txt {
  font-size: 0.12rem;
  margin: 2% 0;
  font-weight: normal;
  color: #fff;
}
.txt i {
  margin: 0.03rem 0.03rem 0 0;
  float: left;
}
.btn_box {
  position: absolute;
  bottom: 0;
  right: 0;
}
.btn_box button {
  width: 2rem;
}
.zj_box {
  color: #505050;
  padding: 0 0.1rem;
  box-sizing: border-box;
  font-size: 0.14rem;
  height: 0.2rem;
  line-height: 0.2rem;
}
.zj_box .sort {
  height: 0.2rem;
  line-height: 0.2rem;
  font-size: 0.14rem;
  text-align: right;
  color: #505050;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sortTop {
  float: right;
  margin-left: 0.04rem;
  transform: rotate(90deg);
  color: #fb7299;
}
.like {
  margin: 0.06rem 0.06rem 0 0;
  float: left;
}
#list_box {
  margin-bottom: 0.3rem;
}
.about_img {
  height: 1.4rem;
  overflow: hidden;
}
</style>