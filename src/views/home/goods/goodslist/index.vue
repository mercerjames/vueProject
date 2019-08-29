<template>
  <div class="goods-list">
    <!-- <h2>goodslist</h2> -->
    <!-- <div class="goods-item" v-for="good in goods" :key="good.id" :to="'/home/goodsinfo/'+good.id">
      <img :src="good.img_url" alt />
      <h1 class="title">{{good.title}}</h1>
      <div class="info">
        <p class="price">
          <span>平台价格: {{good.sell_price}}</span>
          <br>
          <span>市场价格: <s>{{good.market_price}}</s></span>

        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩下{{good.stock_quantity}}件</span>
        </p>
      </div>
    </div> -->
    <router-link  v-for="good in goods" :key="good.id" class="good-box" :to="'/home/goodsinfo/'+good.id">
      <!-- <div class="goods-item"> -->
        <img :src="good.img_url" alt />
        <h1 class="title">{{good.title}}</h1>
        <div class="info">
          <p class="price">
            <span>平台价格: {{good.sell_price}}</span>
            <br>
            <span>市场价格: <s>{{good.market_price}}</s></span>
          </p>
          <p class="sell">
            <span>热卖中</span>
            <span>剩下{{good.stock_quantity}}件</span>
          </p>
      </div>
      <!-- </div> -->
    </router-link>
  </div>
</template>

<script>
export default {
  data: () => ({
    pageindex: 0,
    goods: [],
    limit: 3,
    hasFlag: false
  }),
  created() {
    this.getGoods()
  },
  methods: {
    async getGoods() {
      //   if (this.hadFlag !== false) return
      this.pageindex++
      const {
        data: { message, status, count }
      } = await this.$http.get(`api/getgoods?pageindex=${this.pageindex}&limit=${this.limit}`)
      if (status !== 0) return this.$Toast(message)

      this.goods = this.goods.concat(message)
      this.hasFlag = this.pageindex * this.limit > count
    },
    getMore() {
      this.getGoods()
    }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
    display: flex;
    height: 1000px;
    width: 100%;
    .good-box{
        width: 48%;
        height: 200px;
        img{
            width: 100%;
            height: 50%;
        }
        .title{
            font-size: 20px;
            font-weight: 400;
        }
        .info{
            .price{
                font-size: 10px;
                color: red;
            }
        }
    }
}
</style>
