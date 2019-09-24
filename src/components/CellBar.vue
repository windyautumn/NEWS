<template>
  <div class="main" @click="$emit('click',$event)">
      <div class="containt">
      <span>{{label}}</span>
      <em>{{text}}</em>
      <i class="iconfont iconjiantou1"></i>
  </div>
  </div>
</template>

<script>
export default {
    props:[
        "label",
        "text"
    ],
   
}
</script>

<style scoped lang="less">
   .main{
       padding-left: 20px;
        .containt{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px #ddd solid;
        line-height: 48/360*100vw;
        em{
            flex:1;
            text-align: right;
            color:#666;
            margin-right: 5px;
            font-size: 14px;
        }
    }
   }
</style>