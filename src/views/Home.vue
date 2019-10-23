<template>
  <div>
    <serch @serch="serch" />
    <div id="content">
      <van-row>
        <van-col span="8" v-for="(item,index) in data" :key="index">
          <router-link :to="{path:'/about',query:{url:item.url}}">
            <div class="list">
              <div class="img_box">
                <img :src="item.cover" />
              </div>
              <div>
                <h3 class="tit">{{item.name}}</h3>
                <p class="zj">{{item.latest}}</p>
              </div>
            </div>
          </router-link>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { homeApi } from "@/api/api";
import serch from "./Module/Search";
export default {
  name: "home",

  data() {
    return {
      list: [],
      data: []
    };
  },
  methods: {
    serch(list){
      this.data = [];
      this.data = list;
      load.clear();
    }
  },
  created() {
    homeApi().then(res => {
      let {
        data: { mhlist }
      } = res;
      this.data = mhlist.slice(0, 30);
    });
  },
  components: {
    serch
  }
};
</script>

<style lang="less">
.top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: all ease 0.3;
}
.list {
  height: 190px;
  margin: 5px;
  box-sizing: border-box;
}
#content {
  margin-top: 56px;
}
.img_box,
.img_box img {
  width: 100%;
  height: 150px;
}
.tit,
.zj {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 2px 0 0 0;
}
.tit {
  color: #202121;
  font-size: 13px;
}
.zj {
  color: #999;
  font-size: 12px;
}
</style>