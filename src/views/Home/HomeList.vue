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
          <router-link :to="v.link" @click.native="selectList(v)">
            <div>
              <img :src="v.cover" />
              <p class="tit textOverflow">{{ v.title }}</p>
              <p class="txt textOverflow">{{ v.title }}</p>
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
import { mapMutations } from "vuex";
export default {
  props: {
    //标题
    tit: { type: Object, default: {} },
    //数据
    data: { type: Array, default: [] },
  },
  methods: {
    ...mapMutations(['setMhData']),
    /**
     * 节点的点击事件（跳转之前触发）
     * 存储漫画信息
     */
    selectList(item) {
      this.setMhData(item);
      sessionStorage.setItem("mhItem", JSON.stringify(item));
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./HomeList.less");
</style>