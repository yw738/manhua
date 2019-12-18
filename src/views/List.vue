<template>
  <div>
    <serch @serch="serch" />
    <div id="content">
      <van-row>
        <van-col span="8" v-for="(item, index) in data" :key="index">
          <router-link :to="{ path: '/about', query: { url: item.url } }">
            <div class="list">
              <div class="img_box">
                <img :src="item.cover" />
              </div>
              <div>
                <h3 class="tit">{{ item.name }}</h3>
                <p class="zj">{{ item.latest }}</p>
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
import serch from "./Module/Search.vue";
import { mapState } from "vuex";
export default {
  name: "list",
  data() {
    return {
      data: [],
      allList:[],
      page:{
        pageSize:20,
        pageNo:1
      }
    };
  },
  provide() {
    return {
      getHomeData: this.getHomeData
    };
  },
  methods: {
    serch(list) {
      this.data = [];
      this.data = list;
      if(load&&load.clear)load.clear();
    },
    getHomeData() {
      homeApi().then(res => {
        let { mhlist } = res.data;
        this.data = mhlist.slice(0, 30);
      });
    },
  },
  created() {
    if (this.serchKey === "") {
      this.getHomeData();
    }
  },
  computed: {
    ...mapState(["serchKey"])
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
