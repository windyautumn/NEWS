<template>
  <div>
      <UserHead title="我的跟帖"/>
      <div class="main" v-for="(item,index) in data" :key="index">
          <span class="time">2019-9-27 14:15</span>
          <div class="parent" v-if="item.parent">
              <p>回复：{{item.parent.user.nickname}}</p>
              <span>
                {{item.parent.content}}
              </span>
          </div>
          <div class="content">
              {{item.content}}
          </div>
          <router-link to="#">
              <div class="yuanwen">
                <p>原文：{{item.post.title}}</p>
                <i class="iconfont iconjiantou1"></i>
              </div>
          </router-link>
          
      </div>
      <p class="more">更多跟帖  <i class="iconfont iconjiantou1"></i></p>
  </div>
</template>

<script>
import UserHead from '@/components/UserHead'
export default {
    data(){
        return {
            data:[]
        }
    },
    components:{
        UserHead
    },
    mounted(){
        this.$axios({
            url:'/user_comments',
            headers:{
                Authorization:localStorage.getItem('token')
            }
        }).then(res=>{
            const {data} = res.data
            this.data = data
        })
    }
}
</script>

<style scoped lang="less">
    .main{
        padding:20px;
        .time{
            color:#666;
            font-size: 14px;
        }
        .parent{
            padding:10px;
            background-color: #eee;
            color:#666;
            margin: 10px 0;
        }
        .content{
            margin-top: 10px;
        }
        .yuanwen{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
            font-size: 14px;
            color: #666;
            p{
                 overflow: hidden;
                text-overflow:ellipsis;
                margin-right: 15px;
                white-space: nowrap;
            }
        }
    }
    .more{
            display: block;
            width: 100%;
            text-align: center;
            margin: 40/360*100vw 0;
        }
</style>