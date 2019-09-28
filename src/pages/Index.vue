<template>
  <div>
    <div class="head">
      <i class="iconfont iconnew"></i>
      <div class="head-search">
        <span class="iconfont iconsearch"></span>
        <i>搜索新闻</i>
      </div>
      <router-link to="/personal">
        <i class="iconfont iconwode"></i>
      </router-link>
    </div>
    <van-tabs v-model="active" sticky swipeable>
      <van-tab v-for="(item,index) in categories" :title="item.name" :key="index">
        <!-- <Posts
            v-for="(item,index) in posts"
            :key="index"
            :post="item"
        />-->
        <van-list
          v-model="item.loading"
          :finished="item.finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <Posts v-for="(item,index) in item.posts" :key="index" :post="item" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Posts from "@/components/Posts";
export default {
  data() {
    return {
      active: localStorage.getItem("token") ? 1 : 0,
      categories: [],
      posts: [],
      cid: 999,
      pageSize: 5,
      pageIndex: 1
    };
  },
  components: {
    Posts
  },
  watch: {
    active() {
      this.cid = this.categories[this.active].id;
      this.onLoad();
    }
  },
  methods: {
    onLoad() {
      this.categories[this.active].loading = true;
      setTimeout(() => {
        this.$axios({
          url: `/post?pageIndex=${this.categories[this.active].pageIndex}&pageSize=${this.pageSize}&category=${this.cid}`
        }).then(res => {
          const { data } = res.data;
          if (data.length < this.pageSize) {
            this.categories[this.active].finished = true;
          }
          this.categories[this.active].posts = [
            ...this.categories[this.active].posts,
            ...data
          ];
          this.categories[this.active].pageIndex++;
          this.categories[this.active].loading = false;
          console.log(123);
        });
      }, 2000);
    }
  },
  mounted() {
    const config = {
      url: "/category"
    };
    if (localStorage.getItem("token")) {
      config.headers = {
        Authorization: localStorage.getItem("token")
      };
    }
    this.$axios(config).then(res => {
      const { data } = res.data;
      data.forEach(v => {
        v.pageIndex = 1;
        v.posts = [];
        v.loading = false;
        v.finished = false;
      });
      this.categories = data;
      this.$axios({
        url: `/post?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&category=${this.cid}`
      }).then(res => {
        // console.log(res.data)
        const { data } = res.data;
        this.categories[this.active].posts = data;
        this.categories[this.active].pageIndex++;
      });
    });
  }
};
</script>

<style scoped lang="less">
.head {
  padding: 0 20px;
  height: 50/360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: red;
  .iconnew {
    font-size: 60/360 * 100vw;
    color: #fff;
  }
  .head-search {
    flex: 1;
    height: 40/360 * 100vw;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 50px;
    margin: 0 30px 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 14px;
    i {
      margin-left: 5px;
    }
  }
  .iconwode {
    color: #fff;
    font-size: 25/360 * 100vw;
    // margin-left: 5px;
  }
}
</style>