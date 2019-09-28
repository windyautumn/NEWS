<template>
  <div>
      <div class="header">
          <UserHead title="编辑资料"/>
      </div>
      <div class="userimg">
          <img :src="$axios.defaults.baseURL + data.head_img" alt="">
          <van-uploader :after-read="afterRead" class="upload" />
      </div>
      <CellBar label="昵称" :text="data.nickname" @click="show1= !show1"/>
      <van-dialog
        v-model="show1"
        title="编辑昵称"
        show-cancel-button
        @confirm="handleNickname"
      >
         <van-field :value="data.nickname" placeholder="请输入用户名"  ref="nickname"/>
      </van-dialog>
      <CellBar label="密码" type="password" :text="data.password"  @click="show2= !show2"/>
       <van-dialog
        v-model="show2"
        title="编辑密码"
        show-cancel-button
        @confirm="handlePassword"
      >
         <van-field :value="data.password" placeholder="请输入用户名"  ref="password"/>
      </van-dialog>
      <CellBar label="性别" :text="data.gender == 1 ? '男':'女'"  @click="show3= !show3" />
      <van-dialog
        v-model="show3"
        title="编辑性别"
        show-cancel-button
        @confirm="handleGender"
      >
      <van-radio-group v-model="gender">
        <van-cell-group>
            <van-cell title="男" clickable @click="gender = '1'">
            <van-radio slot="right-icon" name="1" />
            </van-cell>
            <van-cell title="女" clickable @click="gender = '0'">
            <van-radio slot="right-icon" name="0" />
            </van-cell>
        </van-cell-group>
        </van-radio-group>
                
      </van-dialog>
  </div>
</template>

<script>
import UserHead from '@/components/UserHead'
import CellBar from '@/components/CellBar' 
export default {
    data(){
        return {
            data:{},
            show1:false,
            show2:false,
            show3:false,
            gender:'1'
        }
    },
    components:{
        UserHead,
        CellBar
    },
    methods:{
        editprofile(data,callback){
            this.$axios({
                    url:'/user_update/'+localStorage.getItem('user_id'),
                    headers:{
                        Authorization:localStorage.getItem('token')
                    },
                    method:'post',
                    data
                }).then(res=>{
                    const {message} = res.data
                    if(message ==="修改成功"){
                        callback && callback()
                        this.$toast.success(message)
                    }
                })
        },
        afterRead(file){
            const newData = new FormData()
            newData.append('file',file.file)
            this.$axios({
                url:'/upload',
                method:'POST',
                headers:{
                    Authorization:localStorage.getItem('token')
                },
                data:newData
            }).then(res=>{
                const {data} = res.data
                this.editprofile({head_img:data.url},()=>{
                    this.data.head_img = data.url
                })
            })
        },
        handleNickname(){
            const value = this.$refs.nickname.$refs.input.value
            this.editprofile({nickname:value},()=>{
                    this.data.nickname = value
            })
        },
        handlePassword(){
            const value = this.$refs.password.$refs.input.value
            this.editprofile({password:value},()=>{
                    this.data.password = value
            })
        },
        handleGender(){
            this.editprofile({gender:this.gender},()=>{
                    this.data.gender = +this.gender
            })
        }
    },
    mounted(){
        this.$axios({
            url:'/user/'+localStorage.getItem('user_id'),
            headers:{
                Authorization:localStorage.getItem('token')
            }
        }).then(res=>{
            const {data} = res.data
            this.data = data
            this.gender = String(data.gender)
        })
    }
}
</script>

<style scoped lang="less">
    .userimg{
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        // padding: 10px;
        img{
            display: block;
            width: 80/360*100vw;
            height: 80/360*100vw;
            border-radius: 50%
        }
        .van-uploader{
            position: absolute;
            width: 80 / 360 * 100vw;
            height: 80 / 360 * 100vw;
            opacity: 0;
        }
    }
</style>