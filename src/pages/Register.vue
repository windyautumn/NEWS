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
      <!-- 昵称 -->
      <AuthInput
        placeholder="请输入昵称"
        v-model="form.nickname"
        :rule="/^[0-9A-Za-z\u4E00-\u9FA5]{2,6}$/"
        err_message="昵称格式错误"
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
    <p>有账号？请<router-link to="/login">登录</router-link></p>
    <AuthButton text="注册" @click="handleRegister"></AuthButton>

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
        password: "",
        nickname:""
      }
    };
  },
  components: {
    AuthInput,
    AuthButton
  },
  methods:{
    handleRegister(){
    //   this.$router.push('/personal')
    this.$axios({
        url:'/register',
        method:'post',
        data:this.form
    }).then(res=>{
        let{message}=res.data
        if(message =='注册成功'){
            this.roter.push('/')
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