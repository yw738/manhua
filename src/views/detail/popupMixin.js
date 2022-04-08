// Detail组件的mixin
import { mhDetailsApi } from '@/api/api'
export default {
    data() {
        return {
            isShow: false, //是否显示操作栏
            popup: false, //是否显示章节列表
            index: null, //当前漫画的章节
            timer: true, //延时执行
            timerFn: null, //节流的函数
            isShowMark: false, //是否显示遮罩层
        }
    },
    methods: {
        /**
         * 返回上一级
         */
        back() {
            let url = window.sessionStorage.getItem('parentUrl')
            this.$router.push({
                path: '/about',
                query: {
                    url: url,
                },
            })
        },
        /**
         * 数据初始化
         */
        init() {
            this.list = []
            this.isShow = false
            this.popup = false
            this.$nextTick(() => {
                    document.documentElement.scrollTop ?
                        (document.documentElement.scrollTop = 0) :
                        (document.body.scrollTop = 0)
                }) //滚动条清零
        },
        /**
         * 请求漫画详情列表
         * @param {str} id 详情id
         * @returns {array} 返回的数据
         */
        async getList(id) {
            this.isShowMark = true
            this.isShow = false
            this.popup = false
            loading()
            try {
                return await mhDetailsApi(id).then((res) => {
                    let { data } = res.data
                    this.isShowMark = false
                    load.clear()
                    return data || []
                })
            } catch (err) {
                load.clear()
                this.isShowMark = false
                console.log(err)
            }
        },
        /**
         * 模态框 取消回调
         */
        cancle() {
            this.isShow = false
            this.popup = false
        },
        /**
         * 是否显示操作按钮
         */
        choseType() {
            this.isShow ? (this.isShow = false) : (this.isShow = true)
        },
        /**
         * 点击获取更多章节信息
         * 打开模态框
         */
        more() {
            let { url } = this.json
            this.mhlist = JSON.parse(window.sessionStorage.getItem('mhList'))
                // 回显选中状态
            this.mhlist.forEach((v, i) => {
                if (v.chapterId === url) {
                    this.index = i
                    return false
                }
            })
            this.popup = true
        },
        /**
         * 模态框里的章节点击回调
         */
        goDetail(item) {
            Object.assign(this.json, {
                url: item.chapterId,
                num: item.title,
            })
            this.getData()
        },
        /**
         * 节流 (立即执行)
         * 防止多次请求下一页的数据
         */
        throttle(fn, delay) {
            let valid = true
            return function() {
                if (valid) {
                    //休息时间 暂不接客
                    // 工作时间，执行函数并且在间隔期内把状态位设为无效
                    valid = false
                    fn.apply(this, arguments)
                    console.log('立即执行一次')
                    setTimeout(() => {
                        valid = true
                    }, delay)
                } else {
                    console.log('拦截成功')
                }
            }
        },
        /**
         * 更新地址栏，防止丢失
         * 及时更新地址栏url，防止刷新导致当前章节丢失
         * @param {object} newVal json 数据
         */
        setPathUrl(newVal) {
            if (newVal && typeof newVal === 'object') {
                this.$router.push({
                    path: '/detail',
                    query: {...newVal },
                })
            }
        },
    },
    mounted() {
        window.addEventListener('scroll', this.scroll, false)
    },
    beforeDestroy() {
        /**
         * 解绑事件
         */
        if (window.removeEventListener) {
            window.removeEventListener('scroll', this.scroll, false)
        } else if (window.attachEvent) {
            window.attachEvent('scroll', this.scroll, false)
        }
        console.log('初始化scroll事件。')
    },
    watch: {
        /**
         * 监听 当前章节变化
         * 及时更新地址栏url，防止刷新导致当前章节丢失
         */
        json(newVal) {
            this.setPathUrl(newVal)
        },
    },
}