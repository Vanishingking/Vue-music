<template>
    <ul>
        <li v-for="(item,index) in videos_data" v-bind:key="item">
            <div class="video_box" :class="[$store.state.theme == 'night' ? 'video_box_night':'']">

                <div class="video_mv_box" :class="full_screen_index == index && full_screen ? 'full_screen':''" ref="video" >  <!--:style="{height: full_screen ? video_high+'px':'11.25rem',width: full_screen ? (video_high/9)*16+'px':'20rem' }" -->
                  <VideoPlay :Video-data="item" :full_screen="full_screen" @Full_Screen="Full_Screen(index)"></VideoPlay>
                </div>
                <span class="MV_name">{{ item.video_name }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20rem" height="1" viewBox="0 0 388 1">
                    <line id="直线_4" data-name="直线 4" x2="388" transform="translate(0 0.5)" fill="none" stroke="#707070" stroke-width="1"/>
                </svg>

                <div class="user_box">
                    <img :src="mv_user_img" class="user_avatar">
                    <span>{{  item.artists_name }}</span>
                    <div class="like_comment_more">

                        <svg @click="mvdetailed(item.video_id)"  xmlns="http://www.w3.org/2000/svg" width="25.573" height="22.572" viewBox="0 0 33.573 30.572">
                            <path id="路径_252" data-name="路径 252" d="M85.3,107.52H60.915a4.6,4.6,0,0,0-4.6,4.6v14.723a4.6,4.6,0,0,0,4.6,4.6h1.407l.563,6.658,5.814-6.658H85.3a4.6,4.6,0,0,0,4.6-4.6V112.115A4.6,4.6,0,0,0,85.3,107.52ZM64.666,121.306a2.251,2.251,0,1,1,2.251-2.251A2.166,2.166,0,0,1,64.666,121.306Zm8.44,0a2.251,2.251,0,1,1,2.251-2.251A2.282,2.282,0,0,1,73.106,121.306Zm8.346,0a2.251,2.251,0,1,1,2.251-2.251A2.166,2.166,0,0,1,81.453,121.306Z" transform="translate(-56.32 -107.52)" fill="#a5a5a5"/>
                        </svg>

                        <svg @click="video_likeed(index,item.video_id)" xmlns="http://www.w3.org/2000/svg" width="18.813" height="19.097" viewBox="0 0 18.813 19.097">
                                <path v-if="item.video_like == -1" id="路径_250" data-name="路径 250" d="M64,91.049v8.682a1.5,1.5,0,0,0,1.5,1.5h1.354V89.559L65.5,89.545A1.5,1.5,0,0,0,64,91.049Zm17.707-3.081L75.729,88a9.784,9.784,0,0,0,.423-2.639c0-1.754-1.536-3.471-3.071-3.248-1.353.2-1.5,1.366-1.5,2.831v1.323a3.433,3.433,0,0,1-3.077,3.3l-.217,0v11.661H80.061a2.293,2.293,0,0,0,2.253-1.866l1.646-8.682a2.293,2.293,0,0,0-2.253-2.719Z" transform="translate(-64 -82.099)" fill="#a5a5a5"/>
                                <path v-if="item.video_like == item.video_id" id="路径_251" data-name="路径 251" d="M64,91.049v8.682a1.5,1.5,0,0,0,1.5,1.5h1.354V89.559L65.5,89.545A1.5,1.5,0,0,0,64,91.049Zm17.707-3.081L75.729,88a9.784,9.784,0,0,0,.423-2.639c0-1.754-1.536-3.471-3.071-3.248-1.353.2-1.5,1.366-1.5,2.831v1.323a3.433,3.433,0,0,1-3.077,3.3l-.217,0v11.661H80.061a2.293,2.293,0,0,0,2.253-1.866l1.646-8.682a2.293,2.293,0,0,0-2.253-2.719Z" transform="translate(-64 -82.099)" fill="#5ab4f0"/>
                        </svg>


                        <div @click="video_share" style="height: 25px;width: 25px;display: flex;align-items: center;justify-content: center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2.847" height="14.383" viewBox="0 0 2.847 14.383">
                                <g id="Icon_ionic-ios-more" data-name="Icon ionic-ios-more" transform="translate(18.175 -4.5) rotate(90)">
                                    <path id="路径_50" data-name="路径 50" d="M16.737,15.328a1.423,1.423,0,1,0,1.423,1.423,1.423,1.423,0,0,0-1.423-1.423Z" transform="translate(-5.053)" fill="#b7b7b7"/>
                                    <path id="路径_51" data-name="路径 51" d="M5.923,15.328a1.423,1.423,0,1,0,1.423,1.423,1.423,1.423,0,0,0-1.423-1.423Z" fill="#b7b7b7"/>
                                    <path id="路径_52" data-name="路径 52" d="M27.58,15.328A1.423,1.423,0,1,0,29,16.751a1.423,1.423,0,0,0-1.423-1.423Z" transform="translate(-10.12)" fill="#b7b7b7"/>
                                </g>
                            </svg>
                        </div>

                    </div>
                </div>
                <div class="mvdetailed" @click="mvdetailed(item.video_id)"></div>
            </div>
        </li>

        <div :class="full_screen ? 'full_Screen_black':''"></div>
    </ul>
</template>

<script>
    import ajax from '../../http/index'
    import VideoPlay from "./VideoPlay";
    export default {
        name: "VideoMv",
        components: {
            VideoPlay
        },
      props:{
        data_index:Number
      },
        data() {
          return{
              videoElement: [], // 创建一个数组,
              video_name:'mp4.mp4',
              videos_data:[],
              kkl:[{
                  video_name:'45656',
                  video_id:'45656',
                  video_image:'45656',
                  artists_id:'45656',
                  artists_name:'45656',
              }],
              mv_user_img:'https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png',
              loll:false,
              full_screen:false,
              full_screen_index:-1,
              video_high:document.documentElement.clientWidth,
          }
        },
        mounted() {

            ajax(
                // 'http://127.0.0.1:3000/mv/first?limit=20'
                this.$store.state.api_url+'mv/first?limit=20'
            ).then((res)=>{
                for(let i = 0; i<res.data.length; i++){


                    this.videos_data.push(
                        {
                            video_name:res.data[i].name,
                            video_id:res.data[i].id,
                            video_image:res.data[i].cover,
                            artists_id:res.data[i].artistId,
                            artists_name:res.data[i].artistName,
                            video_like:-1
                        })
                }
                console.log(res)
            }).catch((error)=>{
                console.log(error)
            })
        },
        methods: {
            kk(){
                console.log(this.videos_data[0])
            },
            // 全屏
            Full_Screen(index){
                // 全屏状态下
                if (this.full_screen){
                    this.full_screen_index = -1
                    this.full_screen = false
                }else {
                    this.full_screen_index = index
                    this.full_screen = true
                }

            },

            //判断播放video，只只允许一个视频播放
            handlePlay (index){
                const videoElement = this.videoElement
                if (videoElement && videoElement.length > 0) {
                    for (let i = 0; i < videoElement.length; i++) {
                        if (i === index) {
                            if (!this.videoElement[i].paused){
                                this.videoElement[i].play()
                            }else {
                                this.videoElement[i].pause()
                            }


                        } else {
                            this.videoElement[i].pause()
                        }
                    }
                }
            },
            video_likeed(index,id){
                if (this.videos_data[index].video_like == id){
                    this.videos_data[index].video_like = -1
                }else {
                    this.videos_data[index].video_like = id
                }



            },
            mvdetailed(index) {
                this.$store.commit('advance')
                this.$router.push(`/video/mv/${index}`)
            },
            video_share(){
                this.$emit('video_share')
            }


        },
      watch:{
        data_index(){
          console.log(this.data_index)
          if (this.data_index == 0){
            this.videos_data = []
            ajax(
                // 'http://127.0.0.1:3000/mv/first?limit=20'
                this.$store.state.api_url+'mv/first?limit=20'
            ).then((res)=>{
              for(let i = 0; i<res.data.length; i++){
                this.videos_data.push(
                    {
                      video_name:res.data[i].name,
                      video_id:res.data[i].id,
                      video_image:res.data[i].cover,
                      artists_id:res.data[i].artistId,
                      artists_name:res.data[i].artistName,
                        video_like:-1
                    })
              }
              console.log(res)
            }).catch((error)=>{
              console.log(error)
            })
          }else {
            this.videos_data = []
            ajax(
                this.$store.state.api_url+'personalized/mv'
            ).then((res)=>{
              for (let i = 0; i<res.result.length;i++){
                  this.videos_data.push({
                        video_name:res.result[i].name,
                        video_id:res.result[i].id,
                        video_image:res.result[i].picUrl,
                        artists_id:res.result[i].artistId,
                        artists_name:res.result[i].artistName,
                        video_like:-1
                      })
              }
              console.log(res)
            }).catch((error)=>{
              console.log(error)
            })
          }
        }
      }
    }
</script>

<style scoped>
    .video_mv_box{
        width: 20rem;
        height: 11.25rem;
        margin-top: 1rem;
        z-index: 2;
    }
    .video_box{
        width: 100%;
        height: 19.25rem;
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 0.5rem;

    }
    .user_box{
        width: 100%;
        height: 3.5rem;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .user_box span{
        width: 15rem;
        /*border: 1px solid black;*/
    }
    .user_avatar{
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 1rem;
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .like_comment_more{
        width: 20rem;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        z-index: 2;
    }

.MV_name{
    width: 20rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    /*超过两行自动省略号*/
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

    /*border: 1px solid black;*/
}
    .mvdetailed{
        position: absolute;
        width: 100%;
        height: 19.25rem;
        z-index: 1;
    }
    .video_box_night{
        width: 100%;
        height: 19.25rem;
        background-color: #222225;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 0.5rem;

    }

    .full_screen{
      position: fixed;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 999;
      background-color: black;
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
        /*-webkit-animation:rotate 0.5s ease-in-out 0s 1 alternate forwards;*/
    }
    @keyframes rotate {
        0% {
            transform: rotateZ(0deg);
            width: 20rem;
            height: 11.25rem;
            margin-top: 1rem;
            z-index: 2;
            /*从0度开始*/
        }
        100% {
            position: absolute;
            z-index: 9999;
            /*width: 812px;*/
            /*height: 375px;*/
            /*height: expression(document.documentElement.clientWidth);*/
            top:200px;
            /*margin-top: 5rem;*/
            transform: rotateZ(90deg);
            /*360度结束*/
        }

    }

    .full_Screen_black{
        width: 100%;
        height: 100%;
        background-color: black;
        position: absolute;
        top: 0;
        z-index: 998;
    }



</style>