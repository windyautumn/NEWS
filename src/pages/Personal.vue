<template>
<dir class="containt">
    <div class="head">
        <img :src="profile.head_img">
        <div class="name">
            <i class="iconfont iconxingbienan"></i>
            <span>{{profile.nickname}}</span>
            <em class="time"> 2019-9-24</em>
        </div>
        <div class="iconfont iconjiantou1"></div>
    </div>
    <CellBar label="我的关注" text="关注的用户"></CellBar>
    <CellBar label="我的跟帖" text="跟帖/回复"></CellBar>
    <CellBar label="我的收藏" text="文章/视频"></CellBar>
    <CellBar label="退出" @click="handleLogout"></CellBar>




</dir>
</template>

<script>
import CellBar from '@/components/CellBar'

export default {
     data(){
        return{
            profile:{}
        }
    },
    components:{
        CellBar
    },
     mounted(){
        this.$axios({
            url:"/user/"+localStorage.getItem("user_id"),
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(res=>{
            const {data} = res.data
            this.profile = data
            if(data.head_img){
                this.profile.head_img = this.$axios.defaults.baseURL + profile.head_img
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
    .containt {
        // padding:20px 20px;
        .head{
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 5px #ddd solid;
            padding: 30px 20px;
            img{
                display: block;
                width: 70/360*100vw;
                height: 70/360*100vw;
                background: #000;
            }
            .name{
                flex:1;
                text-align: left;
                margin-left: 10px;
                i{
                    color:blue;
                }
                em{
                    display: block;
                    font-size: 14px;
                    color:#666;
                    margin-top: 5px;
                }
            }
        }
    }
</style>