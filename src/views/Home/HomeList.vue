<template>
  <div class="home_box">
    <div class="index_border" />
    <div class="flex flexCen head">
      <div class="tit">{{tit.title}}</div>
      <div class="flex flexCen more">
        <span>更多</span>
        <van-icon name="arrow" size="1.5rem" />
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
  height: 2rem;
  line-height: 2rem;
  padding: 1rem 1rem 0.5rem;
}
.head .tit {
  font-size: 20px;
  color: #121212;
  letter-spacing: 0;
  font-weight: bold;
}
.home_box .more span {
  margin-right: 0.4rem;
  font-size: 1rem;
}
.content {
  padding: 0 0.5rem;
}
.content .home_box_list {
  //   margin-right: 1rem;
  padding: 0.5rem;

  box-sizing: border-box;
}
.content div:nth-child(3n) {
  margin-right: 0;
}
.content img {
  width: 100%;
  height: 140px;
  border-radius: 0.5rem;
}
.content .tit {
  margin-top: 5px;
  font-size: 16px;
  color: #121212;
  letter-spacing: 0;
  line-height: 24px;
}
.content .txt {
  margin-top: 3px;
  font-size: 12px;
  color: #909090;
  letter-spacing: 0;
  line-height: 14px;
  min-height: 14px;
  margin-bottom: 0;
}
</style>