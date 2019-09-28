<template>
  <div>
      <UserHead title="我的关注"/>
      <div class="follow" v-for="(item,index) in data" :key ="index">
          <img :src="$axios.defaults.baseURL + item.head_img" alt="">
          <div class="tital">
              <span>{{item.nickname}}</span>
              <p>2019-9-27</p>
          </div>
          <div class="cancel">
              <span @click="handleCancel(index)">取消关注</span>
          </div>
      </div>
  </div>
</template>

<script>
import UserHead from '@/components/UserHead'
export default {
    data(){
        return{
            data:[]
        }
    },
    components:{
        UserHead
    },
    methods:{
        handleCancel(index){
            const id = this.data[index].id
            this.$axios({
                url:'/user_unfollow/'+ id,
                headers:{
                    Authorization:localStorage.getItem('token')
                },
            }).then(res=>{
                const {message} = res.data
                console.log(message)
                if(message ==="取消关注成功"){
                    this.data.splice(index,1)
                    this.$toast.success(message)
                }
            })
        }
    },
    mounted(){
        this.$axios({
            url:'/user_follows',
            headers:{
                Authorization:localStorage.getItem('token')
            },
        }).then(res=>{
            const {data} = res.data
            this.data = data
            console.log(data)
        })
    }
}
</script>

<style scoped lang="less">
.follow{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px #666 solid;
    img{
        display: block;
        width: 70/360*100vw;
        height: 70/360*100vw;
        border-radius: 50%;
    }
    .tital{
        flex:1;
        margin-left: 5px;
        span{
            font-size: 18px;
        }
        p{
            font-size: 14px;
            color:#666;
            margin-top: 5px;
        }
    }
    .cancel{
        height: 34/360*100vw;
        padding: 0 20px;
        background-color: #ccc;
        line-height: 34/360*100vw;
        color:rgb(46, 45, 45);
        border-radius: 50px;
        font-size: 14px;
    }
}
</style>