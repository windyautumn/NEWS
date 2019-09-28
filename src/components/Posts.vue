<template>
  <div>
      <!-- 单图 -->
      <div class="posts" v-if="post.cover.length>0&&post.cover.length<3&&post.type==1">
            <div class="post-left">
                <router-link :to="'/post_detail/'+ post.id">
                    <div class="title">{{post.title}}</div>
                </router-link>
            <p>
                <span>{{post.user.nickname}}</span>
                <i>{{post.comment_length}}跟帖</i>
            </p>
            </div>
            <div class="post-right">
                <router-link :to="'/post_detail/'+ post.id">
                    <img :src="post.cover[0].url" alt="">
                </router-link>
            </div>
       </div>
       <!-- 多张图片 -->
       <div class="imgs" v-if="post.cover.length>=3">
            <div class="imgs-left">
                <router-link :to="'/post_detail/'+ post.id">
                    <div class="title">{{post.title}}</div>
                </router-link>
                
            </div>
            <router-link :to="'/post_detail/'+ post.id">
                <div class="imgs-right">
                    <img :src="item.url" v-for="(item,index) in post.cover" :key="index" v-if="index<3">
                </div>
            </router-link>
            <p>
                <span>{{post.user.nickname}}</span>
                <i>{{post.comment_length}}跟帖</i>
            </p>
        </div>
        <!-- 视屏 -->
        <div class="video" v-if="post.type===2">
            <div class="video-left">
                <router-link :to="'/post_detail/'+ post.id">
                    <div class="title">{{post.title}}</div>
                </router-link>
                
            </div>
            <div class="video-right">
                <router-link :to="'/post_detail/'+ post.id">
                    <img :src="post.cover[0].url" >
                </router-link>   
                <span class="videobo">
                    <i class="iconfont iconshipin"></i>
                </span>
            </div>
            <p>
                <span>{{post.user.nickname}}</span>
                <i>{{post.comment_length}}跟帖</i>
            </p>
        </div>
  </div>
</template>

<script>
export default {
    props:[
        "post"
    ]
}
</script>

<style scoped lang="less">
    .posts{
        display: flex;
        padding: 10px;
        justify-content: space-between;
        align-items: center;
        .post-right{
            // position: relative;
            img{
                display: block;
                width: 120/360*100vw;
                height: 80/360*100vw;
                object-fit: cover;
            }
            // span{
            //     display: block;
            //     position: absolute;

            // }
        }
        .post-left{
            flex:1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            .title{
                font-size: 16px;
                line-height: 1.5;
                margin-bottom: 15px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
            p{
                font-size: 12px;
                color: #999
            }
        }
    }
    .imgs{
        padding: 10px;
        padding: 10px;
        .imgs-left{
            .title{
                font-size: 16px;
                line-height: 1.5;
                margin-bottom: 15px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
        }
        .imgs-right{
            display: flex;
            justify-content: space-between;
            img{
                display: block;
                width:33%;
                height: 80/360*100vw;
                object-fit: cover;
            }
        }
        p{
            font-size: 12px;
            color:#999
        }
    }
    .video{
        padding: 10px;
        padding: 10px;
        .video-left{
            .title{
                font-size: 16px;
                line-height: 1.5;
                margin-bottom: 15px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
        }
        .video-right{
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                display: block;
                width:100%;
                height: 170/360*100vw;
                object-fit: cover;
            }
            span{
                 position: absolute;
                background: rgba(54, 54, 54, 0.3);
                width:46 / 360 * 100vw;
                height:46 / 360 * 100vw;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                i{
                    font-size: 38/360*100vw;
                    color:#fff
                }
            }
        }
        p{
            font-size: 12px;
            color:#999
        }
    }
</style>