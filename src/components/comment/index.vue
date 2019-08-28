<template>
  <div class="comment">
      <h2>发表评论</h2>
      <hr />
      <textarea v-model="text" name="" id="" cols="30" rows="10" placeholder="请输入你要说的内容" class="text">
      </textarea>
      <van-button type="danger" class="btn">发表评论</van-button>
      <div class="comment-list" v-for="(comment,index) in comments" :key="comment.id">
          <div class="comment-title">
              <span>第{{index+1}}楼</span>
              <span>用户:{{comment.user_name}}</span>
              <span>发表时间:{{comment.add_time | datefmt}}</span>
          </div>
          <div class="comment-item">{{comment.content}}</div>
      </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    text: ''
  }),
  props: {
    comments: {
      type: Array
    }
  },
  created() {},
  methods: {
    addComment() {
      this.$emit('postcomment', this.text)
    }
  }
}
</script>

<style lang="less" scoped>
    .comment{
        h2{
            height: 50px;
            width: 100%;
            line-height: 50px;
            font-size: 20px;
            color: #000;
        }
        .text{
            width: 100%;
            border-style: none;
        }
        .btn{
            width: 100%;
        }
        .comment-list{
            margin-top: 5px;
            color: #000;
            .comment-title{
                background: #ccc;
            }
        }
    }

</style>
