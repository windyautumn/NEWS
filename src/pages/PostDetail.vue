<template>
  <div class="post_detail">
      <div class="post" v-if="post.type === 1">
          <div class="post-head">
              <div class="head-left">
                  <span class="iconfont iconjiantou2" @click="$router.back()"></span>
                  <span class="iconfont iconnew"></span>
              </div>
              <span class="foucs" v-if="!post.has_follow" @click="handleFollow">
                  关注
              </span>
              <span class="unfoucs" v-if="post.has_follow" @click="handleUnfollow">
                  已关注
              </span>
          </div>
          <h3>{{post.title}}</h3>
          <p class="post-info">{{post.user.nickname}} 2019-9-28</p>
          <div class="content" v-html="post.content">
              
          </div>
      </div>
      <div class="video" v-if="post.type ===2">
           <div class="post-head">
              <div class="head-left">
                  <span class="iconfont iconjiantou2" @click="$router.back()"></span>
                  <span class="iconfont iconnew"></span>
              </div>
              <span class="foucs" v-if="!post.has_follow" @click="handleFollow">
                  关注
              </span>
              <span class="unfoucs" v-if="post.has_follow" @click="handleUnfollow">
                  已关注
              </span>
          </div>
          <video 
        src="https://video.pearvideo.com/mp4/adshort/20190927/cont-1607446-14434032_adpkg-ad_hd.mp4"
        class="video"
        controls
        poster="https://timgmb04.bdimg.com/timg?searchbox_feed&quality=100&wh_rate=0&size=b576_324&ref=http%3A%2F%2Fwww.baidu.com&sec=1568739067&di=612dd27cae470b93b01a4b32ef72fbac&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2Fe18c6ffa079441431f8988ca4c3ac106.jpeg"
        ></video>
         <div class="video-info">
            <div class="video-user">
                <img :src="$axios.defaults.baseURL + post.user.head_img" >
                <span>{{post.user.nickname}}</span>
            </div>
        </div>
        <h3>{{post.title}}</h3>
      </div>
        <div class="post-btns">
              <span :class="{active:post.has_like}" @click="handleLike">
                  <i class="iconfont icondianzan" ></i>
                     {{post.like_length}}
              </span>
              <span>
                  <i class="iconfont iconweixin"></i>
                   微信
              </span>
        </div>
        <PostFooter :post="post"/>
  </div>
</template>

<script>
import PostFooter from '@/components/PostFooter'
export default {
    data(){
        return {
            post:{
                user:{}
            }
        }
    },
    components:{
        PostFooter
    },
    methods:{
        handleFollow(){
            this.$axios({
                url:'/user_follows/'+this.post.user.id,
                headers:{
                        Authorization:localStorage.getItem('token')
                }
            }).then(res=>{
                console.log(res.data)
                const {message} = res.data
                if(message ==="关注成功"){
                    this.post.has_follow= true
                    this.$toast.success(message)
                }
            })
        },
        handleUnfollow(){
            this.$axios({
                url:'/user_unfollow/'+this.post.user.id,
                headers:{
                        Authorization:localStorage.getItem('token')
                }
            }).then(res=>{
                const {message} = res.data
                if(message ==="取消关注成功"){
                    this.post.has_follow= false
                    this.$toast.success(message)
                }
            })
        },
        handleLike(){
            this.$axios({
                url:'/post_like/'+this.post.id,
                headers:{
                        Authorization:localStorage.getItem('token')
                }
            }).then(res=>{
                const {message} = res.data
               if(message==="点赞成功"){
                   this.post.has_like = true
                   this.post.like_length++
               }
               if(message==="取消成功"){
                   this.post.has_like = false
                   this.post.like_length--
               }
               this.$toast.success(message)
            })
        }
    },
    mounted(){
         const {id} = this.$route.params
        const config={
            url:'/post/'+id
        }
       
        const Authorization = localStorage.getItem('token')
        if(Authorization){
           config.headers = {Authorization:localStorage.getItem('token')}
        }
        this.$axios(config).then(res=>{
           const {data} = res.data
           this.post = data
        })
    }
}
</script>

<style scoped lang="less">
    .post{
        padding:0 20px;
        padding-top:60/360*100vw;
        .content{
            /deep/img{
                max-width: 100%
            }
        }
        
        h3{
            margin-bottom: 5px;
            font-size: 16px;
        }
        .post-info{
            font-size: 12px;
            color:#999;
            margin-bottom: 10px;
        }
        .content{
            line-height: 1.5;
        }
    }
    .post-head{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 60/360*100vw;
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            background-color: #fff;
            padding: 0 15px;
            box-sizing: border-box;
            .head-left{
                *{
                    vertical-align: middle
                }
            }
            .iconnew{
                font-size: 50/360*100vw
            }
           
        }
    .post-btns{
        margin-top: 20px;
        display: flex;
        justify-content: space-around;
        padding-bottom: 80/360*100vw;
        .active{
            background-color: pink;
           .icondianzan{
                color:red;
           }
        }
        span{
            padding: 0 15px;
            height: 30/360*100vw;
            line-height: 30/360*100vw;
            font-size: 12px;
            border: 1px #ddd solid;
            border-radius: 50px;
        }
        .iconweixin{
            color:#07c907;
        }
    }
    .video{
        width: 100%;
        margin-top: 20/360*100vw;
        h3{
            padding: 10px;
        }
        .video-info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        .video-user{
           img{
            width:18px;
            height:18px;
            border-radius: 50%;
            margin-right:10px;
           }
        }
        }
    }
     .foucs{
        width: 62/360*100vw;
        height: 26/360*100vw;
        line-height: 26/360*100vw;
        text-align: center;
        background-color: red;
        color:#fff;
        border-radius: 50px;
        font-size: 12px;
        border:1px red solid;
            }
    .unfoucs{
        display: block;
        width: 62/360*100vw;
        height: 26/360*100vw;
        line-height: 26/360*100vw;
        text-align: center;
        border:1px #ddd solid;
        color:#999;
        border-radius: 50px;
        font-size: 12px;
    }
   
</style>