<template>
  <div class="home_box">
    <div class="index_border" />
    <div class="flex flexCen head">
      <div class="tit">{{ tit.title }}</div>
      <div class="flex flexCen more">
        <span>更多</span>
        <van-icon name="arrow" size="0.18rem" />
      </div>
    </div>
    <div class="content">
      <van-row>
        <van-col class="home_box_list" span="8" v-for="(v, i) in data" :key="i">
          <router-link :to="v.link">
            <div>
              <img :src="v.img" />
              <p class="tit textOverflow">{{ v.tit }}</p>
              <p class="txt textOverflow">{{ v.txt }}</p>
            </div>
          </router-link>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
/**
 * 首页的卡片
*/
export default {
  props: {
    //标题
    tit: { type: Object, default: {} },
    //数据
    data: { type: Array, default: [] },
  },
};
</script>

<style lang="less" scoped>
@import url("./HomeList.less");
</style>