<template>
  <div class="photoinfo">
    <h2>photoinfo + {{id}}</h2>
    <van-card :title="imgs.title">
      <div slot="price">
        <span class="add_time">发表时间:{{imgs.add_time}}</span>
      </div>
      <div slot="num">点击{{imgs.click}}次</div>
    </van-card>
    <hr />
    <div class="imgs-box">
      <div class="imgs-thum">
        <img :src="thum" alt v-for="(thum, index) in thums" :key="thum" @click="showImg(index)" />
      </div>
      <p class="desc">{{imgs.content}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    id: '',
    imgs: {},
    thums: []
  }),
  created() {
    this.id = this.$route.params.id
    this.getImgs()
    this.getThumImages()
  },
  methods: {
    async getImgs() {
      const {
        data: { status, message }
      } = await this.$http.get(`api/getimageInfo/${this.id}`)
      if (status !== 0) return this.$Toast(message)
      this.imgs = message
    },
    async getThumImages() {
      const {
        data: { status, message }
      } = await this.$http.get(`api/getthumimages/${this.id}`)
      if (status !== 0) return this.$Toast(message)

      let arr = []
      message.forEach(item => {
        if (item.src) {
          arr.push(item.src)
        }
      })
      this.thums = arr
    },
    showImg(index) {
      // this.$ImagePreview(this.thums)
      this.$ImagePreview({
        images: this.thums,
        startPosition: index
      })
    }

  }
}
</script>

<style lang="less" scoped>
    .photoinfo{
        .van-card__content{
            min-height: 45px;
            .van-card__title{
                height: 30px;
                margin: 0 auto;
                font-size: 20px;
                font-weight: 700;
                line-height: 30px;
            }
            .van-card__bottom{}
        }
        .imgs-box{
            .imgs-thum{
                display: flex;
                flex-direction: row-reverse;
                img{
                    width: 33.33%;
                }
            }
        }
    }
</style>
