<template>
  <div class="main" @click="$emit('click',$event)">
      <div class="cellbar">
          <span>{{label}}</span>
          <em>{{ type=="password" ? '******' : text}}</em>
           <i class="iconfont iconjiantou1"></i>
      </div>


  </div>
</template>

<script>
export default {
    props:[
        'label',
        'text',
        'type'
    ]
}
</script>

<style scoped lang="less">
.main{
    padding-left: 20px;
    .cellbar{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 10px;
        line-height: 48/360*100vw;
        border-bottom: 1px #ddd solid;
        em{
            flex: 1;
            text-align: right;
            margin-right: 5px;
            color:#666;
            font-size: 14px;
        }
    }
}

</style>