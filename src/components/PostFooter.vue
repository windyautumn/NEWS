<template>
  <div class="post-footer">
    <div class="footert" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" @focus="handleFocus" />
      
      
      <span class="comment" @click="$router.push(`/post_comment/${post.id}`)">
        <em>1020</em>
        <i class="iconfont iconpinglun-"></i>
      </span>

      <i class="iconfont iconshoucang" @click="handleStar" :class="{active:post.has_star}"></i>

      <i class="iconfont iconfenxiang"></i>
    </div>

    <div class="comment-footer" v-show="isFocus">
      <textarea rows="3" ref="textarea" :autofocus="isFocus" @blur="isFocus=false"></textarea>
      <span class="comment">发送</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],
  data() {
    return {
      isFocus: false
    };
  },
  methods: {
    handleFocus() {
      this.isFocus = true;
    },
    handleStar() {
      this.$axios({
        url: "/post_star/" + this.post.user.id,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res.data);
        const { message } = res.data;
          if(message==="收藏成功"){
             this.post.has_star = true
         }
         if(message==="取消成功"){
             this.post.has_star = false
         }
         this.$toast.success(message)
      });
    }
  }
};
</script>

<style scoped lang="less">
.post-footer {
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  border-top: 1px #eee solid;
  box-sizing: border-box;
  padding: 0 10px;

  .footert {
    display: flex;
    height: 60/360 * 100vw;
    justify-content: space-between;
    align-items: center;
    .active {
      color: red;
    }
    input {
      width: 50%;
      height: 30/360 * 100vw;
      font-size: 12px;
      padding: 0 10px;
      border: none;
      background-color: #ccc;
      border-radius: 50px;
    }
    .comment {
      display: block;
      position: relative;
      em {
        position: absolute;
        display: block;
        background-color: red;
        border-radius: 50px;
        font-size: 10px;
        padding: 0 5px;
        height: 14px;
        line-height: 14px;
        left: 0;
        top: 0;
      }
    }
    .iconfont {
      font-size: 26px;
    }
  }
  .comment-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 10px 0;
    textarea {
      width: 260/360 * 100vw;
      font-size: 12px;
      border: none;
      background-color: #ccc;
      border-radius: 10px;
      resize: none;
      padding: 10px;
      box-sizing: border-box;
    }
    .comment {
      width: 60/360 * 100vw;
      height: 26/360 * 100vw;
      line-height: 26/360 * 100vw;
      background-color: red;
      color: #fff;
      border-radius: 50px;
      text-align: center;
      margin-right: 5px;
    }
  }
}
</style>