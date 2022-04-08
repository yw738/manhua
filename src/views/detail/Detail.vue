<template>
  <div>
    <!-- 图片盒子 -->
    <div id="img_box" @click="choseType">
      <!-- <img :src="item" v-for="(item, i) in list" :key="i" /> -->
      <van-image width="100vw" height="auto" v-lazy="item" :lazyLoad="true" v-for="(item, i) in list" :key="i" :src="item" />
    </div>
    
    <!-- 操作按钮 -->
    <div class="nav" v-if="isShow">
      <div class="back" @click="back">
        <img src="./../../assets/return-details.png" alt />
      </div>
      <div class="morezj">
        <van-button round color="#fb7299" @click="more" type="info">{{
          json.num && json.num.length > 7
            ? json.num.substring(0, 7) + ".."
            : json.num
        }}</van-button>
      </div>
      <div class="nextZj">
        <van-button round color="#000" @click="prevGet" type="info">上一话</van-button>
        <van-button round color="#000" @click="nextGet(false)" type="info">下一话</van-button>
      </div>
    </div>

    <!-- 选择章节 -->
    <van-popup v-model="popup" @close="cancle" :duration="0.2" round position="bottom" class="popupClass" :style="{ height: '70%' }">
      <div>
        <van-row>
          <van-col span="8" v-for="(item, i) in mhlist" :key="i">
            <div class="list_box">
              <router-link :to="{
                  path: '/detail',
                  query: { url: item.url, num: item.num },
                }" :class="index == i ? 'span active' : 'span'" @click.native="goDetail(item)">{{ item.tit }}</router-link>
            </div>
          </van-col>
        </van-row>
      </div>
    </van-popup>
    <!-- 遮罩层 防止请求的时候点击 -->
    <van-overlay :show="isShowMark" />
  </div>
</template>

<script>
/**
 * 漫画详情页
 */
import { mhDetailsApi } from '@/api/api'
import { Toast } from 'vant'
import popupMixin from './popupMixin.js'
export default {
  mixins: [popupMixin],
  data() {
    return {
      list: [], //图片列表
      json: {}, //当前章节
      mhlist: [], //该漫画所有章节列表
    }
  },
  methods: {
    /**
     * 页面数据初始化
     */
    async getData() {
      let { url } = this.json
      this.list = await this.getList(url)
    },
    /**
     * 页面数据初始化2
     * 自然向下滚动
     */
    async getNextData() {
      let { url } = this.json
      let arr = await this.getList(url)
      this.isShow = false
      this.popup = false
      this.list = [...this.list, ...arr]
    },
    /*
     * 获取下一章节信息
     */
    getNextUrl() {
      let { url } = this.json
      let list = JSON.parse(window.sessionStorage.getItem('mhList'))
      let nextJson = null
      list.forEach((v, i) => {
        if (url === v.chapterId) {
          if (i + 1 >= list.length) return false //如果是最后一章 直接弹出。
          nextJson = {
            url: list[i + 1].chapterId,
            num: list[i + 1].title,
          }
        }
      })
      if (nextJson === null) {
        return false
      } else {
        return nextJson
      }
    },
    /*
     * 获取上一章节信息
     */
    getPrevUrl() {
      let { url } = this.json
      let list = JSON.parse(window.sessionStorage.getItem('mhList'))
      let prevJson = null
      list.forEach((v, i) => {
        if (url === v.chapterId) {
          if (i - 1 < 0) return false //如果是第一章 直接弹出。
          prevJson = {
            url: list[i - 1].chapterId,
            num: list[i - 1].title,
          }
        }
      })
      if (prevJson === null) {
        return false
      } else {
        return prevJson
      }
    },
    /*
     *监听下拉
     */
    scroll() {
      let box = document.querySelector('#img_box')
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop //距离最顶上的距离
      let pageHeight = window.screen.availHeight //页面高度
      let boxH = box.clientHeight //#img_box 图片盒子的高度
      let imgHeight = parseInt(boxH / this.list.length) * 1.5 //图片高度
      if (box == null) return
      // console.log(scrollTop + pageHeight, imgHeight, "------", boxH);
      if (scrollTop + pageHeight + imgHeight > boxH) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.timerFn(true)
        }, 300)
        return
      }
    },
    /**
     * 上一章
     */
    prevGet() {
      if (!this.getPrevUrl()) {
        Toast('没有上一章')
        return
      } //检测是否是第一话
      this.json = this.getPrevUrl()
      this.getData()
    },
    /**
     * 下一章
     * @param {Boolean} isNext 是否是向下滑动到最底部
     *
     */
    nextGet(isNext = false) {
      //检测是否是最后一章
      if (!this.getNextUrl()) {
        Toast('最后一话!')
        return
      }
      this.json = this.getNextUrl()
      isNext ? this.getNextData() : this.getData()
    },
  },
  created() {
    let { url, num } = this.$route.query
    this.json = {
      url: url,
      num: num,
    }
    this.setPathUrl(this.json)
    this.getData()
    // 对自动下一页，添加节流
    this.timerFn = this.throttle(this.nextGet, 2000)
  },
}
</script>

<style lang="less" scoped>
@import url('./Detail.less');
</style>
