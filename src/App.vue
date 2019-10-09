<template>
  <div>
     <keep-alive include="index,search">
        <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Login from '@/pages/Login'
export default {};
</script>

<style lang="less">
@import url(http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css);
@import url("../node_modules/vant/lib/index.css");
* {
  margin: 0;
  padding: 0;
}
a:hover {
  text-decoration: none;
}
a {
  color: inherit;
}
ul,
li,
ol {
  list-style: none;
}
i,
em {
  font-style: normal;
}
</style>