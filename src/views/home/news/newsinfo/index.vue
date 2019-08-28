<template>
  <div class="newsinfo">
    <van-card :title="news.title">
      <div slot="price">
        <span class="add_time">发表时间:{{news.add_time}}</span>
      </div>
      <div slot="num">点击{{news.click}}次</div>
    </van-card>
    <hr />
      <div class="newsinfo-body">{{news.content}}</div>
      <!-- 评论组件 -->
      <comment :comments="comments"></comment>
      <!-- 加载更多 -->
      <van-button plain type="danger" class="more">加载更多</van-button>
  </div>
</template>
<script>
import Comment from '@/components/comment'
export default {
  data: () => ({
    id: '',
    news: {},
    pageindex: 1,
    comments: []
  }),
  created() {
    this.id = this.$route.params.id
    this.getNewsInfo()
    this.getComments()
  },
  methods: {
    async getNewsInfo() {
      const { data: { message, status }
      } = await this.$http.get(`api/getnew/${this.id}`)
      if (status !== 0) return this.$Toast(message)
      this.news = message
      // console.dir(message)
    },
    async getComments() {
      // 节流
      // if (this.hasFlag !== false) return
      // this.pageindex++
      const {
        data: { message, status, count }
      } = await this.$http.get(`api/getcomments/${this.id}?pageindex=${this.pageindex}`)
      if (status !== 0) return this.$Toast(message)
      // else
      //   console.log("显示")
      this.comments = message
      console.log(message)
    }
  },
  components: {
    Comment
  }
}

</script>
<style lang="less" scoped>
    .newsinfo{
      .van-card__content{
        min-height: 40px;
        .van-card__title{
          margin: 0 auto;
          font-size: 15px;
          font-weight: 900;
          color: red;
        }
        .van-card__bottom{
          .add_time{
            color: green;
          }
        }
      }
      .newsinfo-body{
        font-size: 500;
        color: #ccc;
      }
      .more{
          margin-top: 5px;
          width: 100%;
          border-radius: inherit;
        }
    }
</style>
