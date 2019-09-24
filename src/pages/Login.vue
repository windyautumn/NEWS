<template>
  <div class="containt">
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>      
    </div>
    <!-- 手机号输入框 -->
    <div>
     <AuthInput 
     placeholder="请输入手机号码"
     :value="form.username"
     @input="handleUsername"
     :rule="/^1[0-9]{4,10}$/"
     err_message="手机号格式错误"
     ></AuthInput>
    </div>
    <!-- 密码输入框 -->
     <div>
     <AuthInput 
     placeholder="请输入密码"
     type="password"
     v-model="form.password"
     :rule="/^[0-9A-Za-z]{3,10}$/"
     err_message="密码格式错误"
     ></AuthInput>
    </div>
    <p class="tips">没有账号？请 
      <router-link to="/register">注册</router-link> 
    </p>

    <AuthButton text="登录" @click="handleClick"></AuthButton>
    
  </div>
</template>

<script>
import AuthInput from "@/components/AuthInput"
import AuthButton from "@/components/AuthButton"



export default {
  data(){
    return {
      list:[],
      form:{
        username:'',
        password:''
       }
    }
  },
  
   // 注册组件
  components: {
    AuthInput,
    AuthButton
  },
  methods:{
    handleUsername(value){
      this.form.username = value
    },
    handleClick(){
      this.$axios({
        url:"/login",
        method:'post',
        data:this.form
      }).then(res=>{
        let {message} = res.data
        if(message === '登录成功'){
          localStorage.setItem("token", res.data.data.token)
          localStorage.setItem("user_id", res.data.data.user.id)
          this.$router.push('/personal')
        }
      })
    }
  }
}
</script>

<style lang="less"  scoped>
.containt{
  padding:20px
}
.close{
  span{
    font-size:27/360*100vw
  }
}
.logo{
  display: flex;
  justify-content: center;
  .iconnew{
    display: block;
    font-size:126/360*100vw;
    color:red
  }
}
.tips{
  text-align: right;
  margin-bottom: 20px;
  a{
    color:blue;
  }
  
}



</style>