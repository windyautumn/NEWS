<template>
  <div class="containt">
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <div class="input">
      <!-- 手机号 -->
      <AuthInput
        placeholder="请输入用户名"
        v-model="form.username"
        :rule="/^1[0-9]{4,10}$/"
        err_message="手机号格式错误"
      ></AuthInput>
      <!-- 密码 -->
       <AuthInput
       type="password"
        placeholder="请输入密码"
        v-model="form.password"
        :rule="/^[0-9A-Za-z]{3,10}$/"
        err_message="密码格式错误"
      ></AuthInput>
    </div>
    <p>没有账号？请<router-link to="/register">注册</router-link></p>
    <AuthButton text="登录" @click="handleLogin"></AuthButton>

  </div>
</template>

<script>
import AuthInput from "@/components/AuthInput";
import AuthButton from "@/components/AuthButton";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  components: {
    AuthInput,
    AuthButton
  },
  methods:{
    handleLogin(){
   this.$axios({
     url:'/login',
     method:'post',
     data:this.form
   }).then(res=>{
     let {message}=res.data
     if(message =="登录成功"){
        localStorage.setItem('token',res.data.data.token)
        localStorage.setItem('user_id',res.data.data.user.id)
        this.$router.push("/personal")
     }
   })
    }
  }
};
</script>

<style scoped lang="less">
.containt {
  padding: 20px;
}
.close {
  font-size: 27/360 * 100vw;
}
.logo {
  display: flex;
  justify-content: center;
  span {
    font-size: 126/360 * 100vw;
    color: red;
  }
}
p{
  text-align: right;
  a{
    color:blue
  }
}
</style>