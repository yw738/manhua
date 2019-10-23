<template>
  <div class="top">
    <van-search v-model="value" placeholder="请输入搜索关键词" @search="onSearch" show-action shape="round">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
  </div>
</template>

<script>
import { mhSerchApi } from "@/api/api";
import { Toast } from "vant";
export default {
  name: "",
  data() {
    return {
      value: ""
    };
  },
  methods: {
    onSearch() {
      let { value: val } = this;
      if (val.trim() === "") return;
      loading();
      mhSerchApi(val).then(res => {
        let { list, code } = res.data;
        if (code === 0) {
          this.$emit("serch", list);
        } else {
          Toast.fail("服务器挂了");
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
</style>