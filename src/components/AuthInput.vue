<template>
  <input class="input"
  :class="{
      success:status ==='success',
      error:status ==='error'
  }"
  :placeholder="placeholder"
  :value="value"
  @input="handleInput"
  @change="handleChange"
  >
</template>

<script>
export default {
    data(){
        return{
            status:''
        }
    },
   props:[
       'placeholder',
       'value',
       'name',
       'rule',
       'err_message'
   ],
   methods:{
       handleInput(event){
           let {value} = event.target
           this.$emit("input",value)
           if(this.rule){
               if(this.rule.test(value)){
                   this.status = 'success'
               }else{
                   this.status = 'error'
               }
           }
       },
       handleChange(){
           if(this.err_message && this.status =='error'){
            //    alert(this.err_message)
             this.$toast.fail(this.err_message)
           }
       }
   }
}
</script>

<style  scoped  lang="less">
    .input{
        width: 100%;
        height: 38/360*100vw;
        border: none;
        border-bottom: 2px #ddd solid;
        background-color: #fff;
        outline: none;
        margin-bottom: 20px;
        font-size: 20px;
    }
    .success{
        border-color:blue,
    }
    .error{
        border-color:red,
    }
</style>