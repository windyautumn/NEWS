<template>
  <div>
      <router-link to="edit_profile">
        <div class="head">
            <img :src="profile.head_img" alt="">
            <div class="content">
                <i class="iconfont" :class="profile.gender ===1? 'iconxingbienan':'iconxingbienv'"></i>
            <span>{{profile.nickname}}</span>
            <em>2019-9-24</em>
            </div>
            <div class="iconfont iconjiantou1"></div>
        </div>
      </router-link>
      <router-link to="user_follow">
      <CellBar label="我的关注" text="关注的用户"></CellBar>
      </router-link>
      <router-link to="user_comment">
      <CellBar label="我的跟帖" text="跟帖/回复"></CellBar>
      </router-link>
      <CellBar label="我的收藏" text="文章/视频"></CellBar>
      <CellBar label="退出" @click="handleLogout"></CellBar>
  </div>
</template>

<script>
import CellBar from '@/components/CellBar.vue'
export default {
    data(){
        return {
            profile:{}
            }
    },
    components:{
        CellBar
    },
    mounted(){
        this.$axios({
            url:'/user/'+localStorage.getItem("user_id"),
            headers:{
                Authorization:localStorage.getItem('token')
            }
        }).then(res=>{
            const {data} =res.data
            this.profile = data
            if(data.head_img){
                this.profile.head_img = this.$axios.defaults.baseURL + this.profile.head_img
            }else{
                this.profile.head_img = './static/defaults_img.jpg'
            }
        })
    },
    methods:{
        handleLogout(){
            localStorage.removeItem('token')
            localStorage.removeItem('user_id')
            this.$router.replace('/login')
        }
    }
}
</script>

<style scoped lang="less">
    .head{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30px 20px;
        border-bottom: 5px #ddd solid;
        img{
            display: block;
            background: #000;
            width: 70/360*100vw;
            height: 70/360*100vw;
        }
        .content{
            flex: 1;
            margin-left: 10px;
            .iconxingbienan{
                color:blue
            }
            .iconxingbienv{
                color:red
            }
            em{
                display: block;
                margin-top: 5px;
                font-size: 14px;
                color:#666
            }
        }
    }
</style>