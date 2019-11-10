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
import { mapActions, mapState } from "vuex";
export default {
  name: "",
  data() {
    return {
      value: ""
    };
  },
  inject: ["getHomeData"],
  methods: {
    ...mapActions(["setSerchKey"]),
    onSearch() {
      let { value: val, getHomeData } = this;
      console.log('搜索的值:',val);
      if (val.trim() === "") {
        getHomeData();
        this.setSerchKey("");
        return;
      }
      loading();
      mhSerchApi(val).then(res => {
        let { list, code } = res.data;
        if (code === 0) {
          this.setSerchKey(val);
          this.$emit("serch", list);
        } else {
          Toast.fail("服务器挂了");
        }
      });
    }
  },
  created() {
    let { serchKey, onSearch } = this;
    if (serchKey !== "") {
      this.value = serchKey;
      onSearch();
    }
  },
  computed: {
    ...mapState(["serchKey"])
  }
};
</script>

<style lang='less' scoped>
</style>