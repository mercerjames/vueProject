<template>
  <div class="photolist">
      <h2>photolist</h2>
      <van-tabs @change="getImgs">
          <van-tab v-for="cate in cates" :title="cate.title" :key="cate.id">
              <template v-if="imgs.length !==0">
                  <router-link v-for="img in imgs" :key="img.id" class="img-box" v-lazy="img" :to="'/home/photoinfo/'+img.id">
                    <!-- <div v-for="img in imgs" :key="img.id" class="img-box" v-lazy="img" >
                      <img :src="img.img_url" alt="">
                    </div> -->
                    <img :src="img.img_url" alt="">
                  </router-link>
              </template>
              <div v-else>暂无数据</div>
          </van-tab>
      </van-tabs>
  </div>
</template>

<script>
export default {
  data: () => ({
    cates: [],
    imgs: []
  }),
  created() {
    this.getImgCategory()
    this.getImgs(0)
  },
  methods: {
    async getImgCategory() {
      const {
        data: { status, message }
      } = await this.$http.get('/api/getimgcategory')
      if (status !== 0) this.$Toast('获取分类失败')
      // 手动 添加 全部 选项
      message.unshift({ id: 0, title: '全部' })
      this.cates = message
    },
    // 默认传递  index title
    // getImgs(index, title){
    //     console.log(index,title)
    // }
    async getImgs(index) {
      const {
        data: { status, message }
      } = await this.$http.get(`/api/getimages/${index}`)
      if (status !== 0) this.$Toast('获取图片失败')
      this.imgs = message
    }
  }
}
</script>

<style lang="less" scoped>

</style>
