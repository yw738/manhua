<template>
  <div>
    <div class="top">
      <van-search
        v-model="value"
        @search="onSearch"
        placeholder="请输入搜索关键词"
        autofocus
        show-action
        shape="round"
      >
        <div slot="action" @click="cancel">取消</div>
      </van-search>
    </div>
    <div class="history">
      <div class="tit">
        <div>搜索记录</div>
        <div @click="del">
          <van-icon name="delete" />
        </div>
      </div>
      <div v-if="historyList.length > 0">
        <span
          class="his_list"
          @click="keySearch(item)"
          v-for="(item,i) in historyList"
          :key="i"
        >{{item}}</span>
      </div>
      <div v-else class="noHis">暂无历史记录</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Dialog, Toast } from "vant";
export default {
  name: "search",
  data() {
    return {
      value: "",
      historyList: []
    };
  },
  methods: {
    ...mapActions(["setSerchKey"]),

    onSearch() {
      let { value, setSerchKey, historyPush } = this;
      if (value.trim() === "") {
        Toast("请输入内容再进行检索!");
        return;
      }
      setSerchKey(value).then(() => {
        historyPush(value);
        this.$router.push({
          path: "/list"
        });
      });
    },
    /*
     * 清空历史记录
     */
    del() {
      let that = this;
      if (that.historyList.length == 0) return;
      Dialog.confirm({
        title: "标题",
        message: "确定清空历史记录?"
      }).then(() => {
        that.historyList = [];
        window.localStorage.setItem("historyArr", JSON.stringify([]));
      });
    },
    /*
     * 历史记录新增
     */
    historyPush(key) {
      if (key == "") return;
      let arr = JSON.parse(window.localStorage.getItem("historyArr"));
      if (arr && typeof arr === "object") {
        if (arr.indexOf(key) < 0) arr.push(key);
        window.localStorage.setItem("historyArr", JSON.stringify(arr));
      } else {
        let array = [];
        array.push(key);
        window.localStorage.setItem("historyArr", JSON.stringify(array));
      }
    },
    /*
     * 关键字检索
     */
    keySearch(key) {
      let { setSerchKey } = this;
      setSerchKey(key).then(() => {
        this.$router.push({
          path: "/list"
        });
      });
    },
    init() {
      let arr = JSON.parse(window.localStorage.getItem("historyArr"));
      if (arr) this.historyList = arr;
    },
    //取消
    cancel() {
      this.$router.push({
        path:'/'
      })
    }
  },
  created() {
    this.init();
  },
  computed: {
    ...mapState(["serchKey"])
  }
};
</script>

<style lang="less" scope>
.top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: all ease 0.3;
}
.history {
  margin-top: 55px;
  padding: 0 1rem;
}
.history .tit {
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
}

.his_list {
  background: #f3eeee;
  color: #505050;
  padding: 0.4rem 0.6rem;
  border-radius: 0.2rem;
  display: inline-block;
  margin: 0.6rem 0.6rem 0 0;
}
.noHis {
  text-align: center;
  font-size: 1rem;
  color: #505050;
}
</style>