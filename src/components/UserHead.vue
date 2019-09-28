<template>
  <div class="head">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <h4>{{title}}</h4>
      <i class="iconfont iconjiantou2"></i>
  </div>
</template>

<script>
export default {
    props:[
        'title'
    ]
}
</script>

<style scoped lang="less">
    .head{
        padding:30px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
            font-size: 20px;
        }
        i{
            opacity: 0;
        }
    }
</style>