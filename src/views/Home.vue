<template>
  <div class>
    <div class="flex tipBox">
      <van-search class="serchBox" disabled placeholder="请输入搜索关键词" @click="toSearch" shape="round" />
    </div>
    <div class="swiper">
      <van-swipe :autoplay="3000" :loop="true" indicator-color="white">
        <van-swipe-item v-for="(item, i) in imgList" :key="i">
          <router-link :to="item.link" @click.native="selectList(item)">
            <van-image :src="item.cover" fit="cover" />
            <div class="swiperBotton">{{ item.title }}</div>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>

    <homeList :tit="topBox" :data="topBoxList" />
    <homeList :tit="bottomBox" :data="bottomList" />
    <div class="sm">
      声明 :
      <br />数据均来源于网络，并不参与存储、上传、创作，版权争议与本站无关。
      仅学习交流使用，请勿用于商业（非法）用途！否则，一切后果请自行承担！
    </div>
  </div>
</template>

<script>
/**
 * 首页
 */
import { homeApi, homePageApi } from '@/api/api'
import { mapState, mapMutations } from 'vuex'
import homeList from './Home/HomeList'
import { Dialog } from 'vant'

export default {
  name: 'home',
  components: {
    homeList,
  },
  data() {
    return {
      imgList: [],
      topBoxList: [],
      bottomList: [],
      topBox: {
        title: '人氣推薦',
      },
      bottomBox: {
        title: '編輯推薦',
      },
    }
  },
  methods: {
    ...mapMutations(['setMhData']),
    toSearch() {
      this.$router.push({ path: '/search' })
    },
    /**
     * 点击回调
     */
    selectList(item) {
      this.setMhData(item)
      sessionStorage.setItem('mhItem', JSON.stringify(item))
    },
    // 获取轮播图
    getSwiper() {
      let homePageList = sessionStorage.getItem('homePageList')
      if (homePageList) {
        this.imgList = JSON.parse(homePageList)
      } else {
        homePageApi().then((res) => {
          let { code } = res.data
          let list = res.data.data || []
          if (code === 0) {
            this.imgList = list.map((item) => {
              return {
                ...item,
                link: `/about?url=${item.comicId}`,
              }
            })
            sessionStorage.setItem('homePageList', JSON.stringify(this.imgList)) //首页数据
          }
        })
      }
    },
    // 获取列表
    getList() {
      let homeList = sessionStorage.getItem('homeList')
      if (homeList) {
        this.topBoxList = JSON.parse(homeList).slice(0, 6)
        this.bottomList = JSON.parse(homeList).slice(6, 12)
      } else {
        homeApi().then((res) => {
          let { code } = res.data
          let list = res.data.data || []
          if (code === 0) {
            list = list.map((item) => {
              return {
                ...item,
                link: `/about?url=${item.comicId}`,
              }
            })
            this.topBoxList = list.slice(0, 6)
            this.bottomList = list.slice(6, 12)
            sessionStorage.setItem('homeList', JSON.stringify(list)) //首页数据
          }
        })
      }
    },
  },
  created() {
    this.getSwiper() //获取首页
    this.getList() //获取列表
  },
}
</script>

<style lang="less" scope>
.swiper {
  height: 2.2rem;
  width: 100vw;
  overflow: hidden;
  position: relative;
  .van-swipe {
    height: 100%;
  }
  .van-swipe__indicators {
    z-index: 99;
  }
}
.swiper img {
  min-height: 100%;
  width: 100vw;
}
.tipBox {
  justify-content: space-between;
  align-items: center;
}
.serchBox {
  // width: 55vw;
  width: 100vw;
}
.tipBox img {
  height: 0.28rem;
  width: 0.28rem;
  margin: 0 0.06rem;
}
.sm {
  text-align: left;
  padding: 0.1rem;
  color: red;
}
.swiperBotton {
  position: absolute;
  height: 0.2rem;
  width: auto;
  max-width: calc(100% - 0.4rem);
  bottom: 0.1rem;
  left: 0.1rem;
  padding: 0.1rem;
  background: #3333338f;
  color: #fff;
  letter-spacing: 0.02rem;
  font-size: 0.14rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
