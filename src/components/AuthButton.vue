<template>
  <div class="button" @click="$emit('click',$event)" >
      {{text}}

  </div>
</template>

<script>
export default {
    props:['text']
}
</script>

<style scoped lang="less">
.button{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 48/360*100vw;
    background-color: red;
    color: #fff; 
    border-radius:50px;
    font-size: 20px;

}
</style>