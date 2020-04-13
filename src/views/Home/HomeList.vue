<template>
  <div class="home_box">
    <div class="index_border" />
    <div class="flex flexCen head">
      <div class="tit">{{tit.title}}</div>
      <div class="flex flexCen more">
        <span>更多</span>
        <van-icon name="arrow" size="0.18rem" />
      </div>
    </div>
    <div class="content">
      <van-row>
        <van-col class="home_box_list" span="8" v-for="(v,i) in data" :key="i">
          <router-link :to="v.link">
            <div>
              <img :src="v.img" />
              <p class="tit textOverflow">{{v.tit}}</p>
              <p class="txt textOverflow">{{v.txt}}</p>
            </div>
          </router-link>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: {
    tit: { type: Object, default: {} },
    data: { type: Array, default: [] }
  }
};
</script>

<style lang="less" scoped>
.home_box {
  background: #fff;
}
.head {
  height: 0.24rem;
  line-height: 0.24rem;
  padding: 0.12rem 0.12rem 0.06rem;
}
.head .tit {
  font-size: 0.2rem;
  color: #121212;
  letter-spacing: 0;
  font-weight: bold;
}
.home_box .more span {
  margin-right: 0.06rem;
  font-size: 0.14rem;
}
.content {
  padding: 0 0.06rem;
}
.content .home_box_list {
  padding:  0 0.06rem;
  box-sizing: border-box;
}
.content div:nth-child(3n) {
  margin-right: 0;
}
.content img {
  width: 100%;
  height: 1.4rem; 
  border-radius: 0.06rem;
}
.content .tit {
  font-size: 0.16rem;
  color: #121212;
  letter-spacing: 0;
  line-height: 0.24rem;
  margin: 0;
}
.content .txt {
  font-size: 0.12rem;
  color: #909090;
  letter-spacing: 0;
  line-height: 0.14rem;
  min-height: 0.14rem;
  margin: 0 0 0.06rem;
}
</style>