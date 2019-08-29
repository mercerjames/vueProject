<template>
  <div class="goods-info">
    <!-- 移动的距离 = 起点的距离 - 目的的距离 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="isShow" id="ball" ref="ballRef"></div>
    </transition>
    <div style="width:375px;">
      <van-swipe :autoplay="3000" indicator-color="white" class="my-swipe">
        <van-swipe-item class="item" v-for="thum in thums" :key="thum.id">
          <img :src="thum.src" alt />
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-panel :title="info.title">
      <div class="panel-body">
        <div class="price-group">
          市场价格:
          <span class="old">{{info.market_price}}</span>
          销售价格:
          <span class="new">{{info.sell_price}}</span>
        </div>
        <!-- <p>现价:{{info.sell_price}}</p>
        <p>原价:{{info.market_price}}</p>
        <p>商品数量:{{info.stock_quantity}}</p> -->
      </div>
      购买数量:
      <van-stepper v-model="value" />
      <van-button type="primary">立即购买</van-button>
      <van-button type="danger" @click="addCart" :disabled="isDisable">加入购物车</van-button>
    </van-panel>
    <van-panel title="商品信息">
      <p>商品货号:{{info.goods_no}}</p>
      <p>库存情况:{{info.stock_quantity}}</p>
      <p>上架时间:{{info.add_time}}</p>
    </van-panel>
  </div>
</template>

<script>
export default {
  data: () => ({
    id: '',
    thums: [],
    info: {},
    value: 1,
    isShow: false,
    xDist: 0,
    yDist: 0,
    isDisable: false
  }),
  created() {
    this.id = this.$route.params.id
    this.getThumImages()
    this.getInfo()
    // this.show()
  },
  methods: {
    async getThumImages() {
      let id = Number(this.id) + 100
      const {
        data: { status, message }
      } = await this.$http.get(`api/getthumimages/${id}`)
      if (status !== 0) this.$Toast('缩略图获取失败')
      this.thums = message
      console.log(message)
    },
    async getInfo() {
      const {
        data: { status, message }
      } = await this.$http.get(`api/goods/getinfo/${this.id}`)
      if (status !== 0) this.$Toast('商品信息获取失败')
      this.info = message
      console.log(message)
    },
    getBound() {
      let ball = this.$refs.ballRef.getBoundingClientRect()
      let infor = document.querySelector('.van-info').getBoundingClientRect()
      this.xDist = infor.left - ball.left
      this.yDist = infor.top - ball.top
    },
    addCart() {
      this.isShow = !this.isShow
    },
    beforeEnter(el) {
      // 设置起始的位置
      el.style.transform = 'translate(0px,0px)'
      // transform: translate(132px,449px)
    },
    enter(el, done) {
      // eslint-disable-next-line no-unused-expressions
      el.offsetLeft

      // 获取移动的距离
      this.getBound()

      // 设置目的地的位置
      el.style.transform = `translate(${this.xDist}px,${this.yDist}px)`
      el.style.transition = 'all .3s ease'
      done()

      el.style.transform = 'translate(132px,449px)'
      el.style.transition = 'all .3s ease'
      done()
    },
    afterEnter() {
      this.isShow = false
      this.isDisable = true
      setTimeout(() => {
        this.isDisable = false
      }, 400)
    }
  }
}
</script>

<style lang="less" scoped>
// 完事样式安排一下
.app{
  // overflow-x: visible;
  .goods-info {
  position: relative;
  height: 1000px;
  .ball{
    z-index: 999;
    width: 15px;
    height: 15px;
    position: absolute;
    left: 120px;
    top: 330px;
    border-radius: 50%;
    background-color: #f00;
  }
  .my-swipe {
    width: 100%;
    height: 200px;
    .van-swipe-item{
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
}
</style>
