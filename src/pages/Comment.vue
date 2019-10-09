<template>
  <div class="container">
      <UserHead title="精彩评论"/>
      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
     <div class="normal-comment" 
        v-for=" (item,index) in list"
        :key="index">
          <div class="user-info">
          <img src="../../static/defaults_img.jpg" alt="">
          <div class="user">
              <p>{{item.user.nickname}}</p>
              <span>2019-9-30</span>
          </div>
          <span class="reply">回复</span>
      </div>
      <div class="comment-content">
          {{item.content}}
      </div>
     </div>
    </van-list>
    <PostFooter :post="post"/>
  </div>
</template>

<script>
import UserHead from '@/components/UserHead'
import PostFooter from '@/components/PostFooter'
import ParentComment from '@/components/ParentComment'
export default {
    data(){
        return {
            list:[],
            post:{},
            loading:false,
            finished:false,
            pageIndex:1,
            pageSize:5
        }
    },
    components:{
        UserHead,
        PostFooter,
        ParentComment
    },
    
    methods:{
        getComment(){
                const {id} = this.$route.params
                this.$axios({
                url:`/post_comment/${id}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
                }).then(res=>{
                   console.log(res)
                   console.log(this.pageIndex)
                const {data} = res.data
                this.list = [...this.list,...data]
                this.loading = false
                if(data.length < 5){
                    this.finished = true
                    return
                }
                this.pageIndex++
            })
        },
        onLoad(){
            setTimeout(() => {
                this.getComment()
            }, 2000);
        }
    },
    mounted(){
        const {id} = this.$route.params

       this.getComment()

       this.$axios({
           url:'/post/' +id
       }).then(res=>{
           
           const {data} = res.data
           this.post = data
       })
    }
}
</script>

<style scoped lang="less">
.container{
    padding-bottom: 100/360*100vw;
}
    .normal-comment{
        padding:0 15px 20px 15px;
        margin-bottom: 15px;
        border-bottom: 1px #ccc solid;
        .user-info{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            img{
                width: 30/360*100vw;
                height: 30/360*100vw;
                border-radius: 50%
            }
            .user{
                flex: 1;
                margin-left: 5px;
                font-size: 14px;
                span{
                    font-size: 12px;
                    color: #666;
                }
            }
            .reply{
                font-size: 14px;
            }
        }
    }
</style>