<template>
  <div class="top">
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      show-action
      shape="round"
    >
      <div slot="action" @click="cancel">取消</div>
    </van-search>
  </div>
</template>

<script>
/**
 * 搜索框
*/
import { mhSerchApi } from "@/api/api";
import { Toast } from "vant";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      value: "",
    };
  },
  inject: ["getHomeData"],
  methods: {
    ...mapActions(["setSerchKey"]),
    /**
     * 查询
    */
    onSearch() {
      let { value: val, getHomeData } = this;
      console.log("搜索的值:", val);
      if (val.trim() === "") {
        getHomeData();
        this.setSerchKey("");
        return;
      }
      this.$emit("serch", []);
      loading();
      mhSerchApi(val).then((res) => {
        let { data, code } = res.data;
        if (code === 0) {
          this.setSerchKey(val);
          this.$emit("serch", data.data);
        } else {
          Toast.fail("服务器出错");
        }
      });
    },
    /**
     * 取消
    */
    cancel() {
      this.$router.push({
        path: "/",
      });
    },
  },
  created() {
    let { serchKey, onSearch } = this;
    if (serchKey !== "") {
      this.value = serchKey;
      onSearch();
    }
  },
  computed: {
    ...mapState(["serchKey"]),
  },
};
</script>

<style lang='less' scoped>
</style>