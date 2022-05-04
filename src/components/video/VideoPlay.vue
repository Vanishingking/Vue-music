<template>
    <div class="mv" v-if="VideoData != null " :class="[full_screen ? 'mv_fill_screen':'mv']">

<!--      初始化视频封面-->
        <div class="video_img" v-if="buffer_cover">
            <img :src="VideoData.video_image" >
            <div class="play_btn_box2" @click="get_video_url(VideoData.video_id)" v-if="buffer">
                <svg v-show="!video.playing" xmlns="http://www.w3.org/2000/svg" width="18.002" height="22.501" viewBox="0 0 18.002 22.501">
                    <path id="Icon_ionic-ios-play" data-name="Icon ionic-ios-play" d="M9,7.334V28.666a.549.549,0,0,0,.823.506l16.91-10.666a.6.6,0,0,0,0-1.005L9.823,6.834A.544.544,0,0,0,9,7.334Z" transform="translate(-9 -6.751)" fill="#fff"/>
                </svg>
                <svg v-show="video.playing" xmlns="http://www.w3.org/2000/svg" width="18" height="22.5" viewBox="0 0 18 22.5">
                    <g id="Icon_ionic-ios-pause" data-name="Icon ionic-ios-pause" transform="translate(-9 -6.75)">
                        <path id="路径_142" data-name="路径 142" d="M14.055,29.25H9.57A.566.566,0,0,1,9,28.688V7.313a.566.566,0,0,1,.57-.562h4.486a.566.566,0,0,1,.57.563V28.688A.566.566,0,0,1,14.055,29.25Z" fill="#fff"/>
                        <path id="路径_143" data-name="路径 143" d="M26.43,29.25H21.945a.566.566,0,0,1-.57-.562V7.313a.566.566,0,0,1,.57-.562H26.43a.566.566,0,0,1,.57.563V28.688A.566.566,0,0,1,26.43,29.25Z" fill="#fff"/>
                    </g>
                </svg>
            </div>
            <div class="buffer_ico" v-if="!buffer" >
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" class="buffer_ico_svg">
                    <path d="M24,4V8" fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                    <path d="M34,6.679l-2,3.464" fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                    <path d="M41.321,14l-3.464,2" fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                    <path d="M44,24H40" fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                    <path d="M41.321,34l-3.464-2" fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                    <path d="M34,41.321l-2-3.464" fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                    <path d="M24,44V40" fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                    <path d="M14,41.321l2-3.464" fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                    <path d="M6.679,34l3.464-2" fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                    <path d="M4,24H8" fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                    <path d="M6.679,14l3.464,2" fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                    <path d="M14,6.679l2,3.464" fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                </svg>
            </div>
        </div>

        <div v-if="video_url != ''"
             :class="[full_screen ? 'video_picture_box_screen':'video_picture_box']"
             :style="{width : full_screen ? fs_video_width + 'px' : '',height : full_screen ? fs_video_height + 'px' : '' }">
          <video v-if="video_url != null"
                ref="video"
               @click="iSselect"
               class="videos"
               :poster="VideoData.video_image"
               @play="onPlay"
               @error="onError"
               @waiting="onWaiting"
               @pause="onPause"
               @timeupdate="onTimeupdate"
               @loadedmetadata="onLoadedmetadata">
            <source :src="video_url">
          </video>
        </div>

      <div class="kzq" v-show="!video_show &&!full_screen" >
        <div class="play_btn_box" @click="startPlayOrPause">
<!--          视频播放/暂停按钮-->
          <svg v-show="!video.playing" xmlns="http://www.w3.org/2000/svg" width="18.002" height="22.501" viewBox="0 0 18.002 22.501">
            <path id="Icon_ionic-ios-play" data-name="Icon ionic-ios-play" d="M9,7.334V28.666a.549.549,0,0,0,.823.506l16.91-10.666a.6.6,0,0,0,0-1.005L9.823,6.834A.544.544,0,0,0,9,7.334Z" transform="translate(-9 -6.751)" fill="#fff"/>
          </svg>
          <svg v-show="video.playing" xmlns="http://www.w3.org/2000/svg" width="18" height="22.5" viewBox="0 0 18 22.5">
            <g id="Icon_ionic-ios-pause" data-name="Icon ionic-ios-pause" transform="translate(-9 -6.75)">
              <path id="路径_142" data-name="路径 142" d="M14.055,29.25H9.57A.566.566,0,0,1,9,28.688V7.313a.566.566,0,0,1,.57-.562h4.486a.566.566,0,0,1,.57.563V28.688A.566.566,0,0,1,14.055,29.25Z" fill="#fff"/>
              <path id="路径_143" data-name="路径 143" d="M26.43,29.25H21.945a.566.566,0,0,1-.57-.562V7.313a.566.566,0,0,1,.57-.562H26.43a.566.566,0,0,1,.57.563V28.688A.566.566,0,0,1,26.43,29.25Z" fill="#fff"/>
            </g>
          </svg>
        </div>
        <div class="mv_progress">
<!--          视频时间-->
          <span style="margin-left: 0.5rem">{{ real_time }}</span><span>/</span><span>{{ TotalDuration }}</span>
<!--          全屏按钮-->
          <svg @click="Full_Screen" xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 24.75 24.75">
            <path id="Icon_ionic-ios-resize" data-name="Icon ionic-ios-resize" d="M29.412,5.625h-7.77a.965.965,0,0,0-.963.963V6.6a.965.965,0,0,0,.963.963h5.379L7.566,27.021V21.642a.965.965,0,0,0-.963-.963H6.588a.965.965,0,0,0-.963.963v7.77a.965.965,0,0,0,.963.963h7.77a.965.965,0,0,0,.963-.963V29.4a.965.965,0,0,0-.963-.963H8.979L28.434,8.979v5.379a.965.965,0,0,0,.963.963h.014a.965.965,0,0,0,.963-.963V6.588A.96.96,0,0,0,29.412,5.625Z" transform="translate(30.375 -5.625) rotate(90)" fill="#fff"/>
          </svg>
        </div>
        <!--            进度条-->
        <div class="video_kzq" v-if="!buffer_cover">
          <van-slider v-model="video.sliderTime" active-color="#409eff" @change="changeCurrentTime">
            <template #button>
              <div class="custom-button"></div>
            </template>
          </van-slider>
        </div>


        <div class="mv_progress_kzq" @click="iSselect"></div>
      </div>

        <div style="width: 100%;display: flex;justify-content: center">
            <!--          进度条二-->
            <div class="video_kzq_two" v-if="buffer_cover_two">
                <van-slider v-model="video.sliderTime" active-color="#409eff">
                    <template #button>
                        <div class="custom-button-two"></div>
                    </template>
                </van-slider>
            </div>
        </div>

        <!--            全屏控制器-->

      <div class="mv_cs" v-if="!video_show && full_screen" > <!--:style="{width: fs_video_width + 'px',height: fs_video_height + 'px'}" -->
        <div class="kzq_menu_box">
          <div class="kzq_menu_box_bag"></div>
          <div class="kzq_menu">
            <div class="kzq_menu_back">
              <svg @click="Full_Screen" xmlns="http://www.w3.org/2000/svg" width="25" height="13.557" viewBox="0 0 25 13.557">
                <path id="路径_1" data-name="路径 1" d="M151.928,267.871,140.448,256.5c-.017-.017-.039-.022-.057-.037s-.005-.01-.009-.014a1.042,1.042,0,0,0-1.471.006L127.537,267.93a1.039,1.039,0,1,0,1.476,1.464l10.65-10.747,10.8,10.7a1.039,1.039,0,1,0,1.464-1.476Z" transform="translate(-127.236 -256.144)" fill="#fff"/>
              </svg>
            </div>
            <div class="kzq_menu_video_name">
            </div>
          </div>
        </div>
        <!--                播放暂停-->
        <div class="play_btn_box_fs" @click="startPlayOrPause">
          <svg v-show="!video.playing" xmlns="http://www.w3.org/2000/svg" width="18.002" height="22.501" viewBox="0 0 18.002 22.501">
            <path id="Icon_ionic-ios-play" data-name="Icon ionic-ios-play" d="M9,7.334V28.666a.549.549,0,0,0,.823.506l16.91-10.666a.6.6,0,0,0,0-1.005L9.823,6.834A.544.544,0,0,0,9,7.334Z" transform="translate(-9 -6.751)" fill="#fff"/>
          </svg>
          <svg v-show="video.playing" xmlns="http://www.w3.org/2000/svg" width="18" height="22.5" viewBox="0 0 18 22.5">
            <g id="Icon_ionic-ios-pause" data-name="Icon ionic-ios-pause" transform="translate(-9 -6.75)">
              <path id="路径_142" data-name="路径 142" d="M14.055,29.25H9.57A.566.566,0,0,1,9,28.688V7.313a.566.566,0,0,1,.57-.562h4.486a.566.566,0,0,1,.57.563V28.688A.566.566,0,0,1,14.055,29.25Z" fill="#fff"/>
              <path id="路径_143" data-name="路径 143" d="M26.43,29.25H21.945a.566.566,0,0,1-.57-.562V7.313a.566.566,0,0,1,.57-.562H26.43a.566.566,0,0,1,.57.563V28.688A.566.566,0,0,1,26.43,29.25Z" fill="#fff"/>
            </g>
          </svg>
        </div>
        <div class="kzq_menu_box" style="left: 0">
          <div class="kzq_menu_box_bag"></div>
          <div class="kzq_menu">
            <div class="kzq_slider_time">
              <span style="margin-left: 0.5rem;margin-right: 0.5rem;color: white">{{ real_time }}</span>
              <!--            进度条-->
              <div style="height: 80%">
                <van-slider v-model="video.sliderTime" active-color="#409eff" @change="changeCurrentTime" vertical>
                  <template #button>
                    <div class="custom-button"></div>
                  </template>
                </van-slider>
              </div>

              <span style="margin-left: 0.5rem;margin-right: 0.5rem; color: white">{{ TotalDuration }}</span>
            </div>
            <div class="kzq_full_screen">
              <svg @click="Full_Screen" xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 24.75 24.75">
                <path id="Icon_ionic-ios-resize" data-name="Icon ionic-ios-resize" d="M29.412,5.625h-7.77a.965.965,0,0,0-.963.963V6.6a.965.965,0,0,0,.963.963h5.379L7.566,27.021V21.642a.965.965,0,0,0-.963-.963H6.588a.965.965,0,0,0-.963.963v7.77a.965.965,0,0,0,.963.963h7.77a.965.965,0,0,0,.963-.963V29.4a.965.965,0,0,0-.963-.963H8.979L28.434,8.979v5.379a.965.965,0,0,0,.963.963h.014a.965.965,0,0,0,.963-.963V6.588A.96.96,0,0,0,29.412,5.625Z" transform="translate(30.375 -5.625) rotate(90)" fill="#fff"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="mv_progress_kzq" @click="iSselect"></div>
      </div>

    </div>
</template>

<script>
    import ajax from '../../http/index'
    import axios from "axios";
    function secondToDate(result) {
        var m ,s
        if ((result/60)<10){
            m = Math.floor((result / 60 % 60));
            if ((result%60)<10){
                s = Math.floor((result % 60));
                result =  '0'+ m + ":" + '0'+s ;
            }else {
                s = Math.floor((result % 60));
                result =  '0'+ m + ":"+s ;
            }
        }else {
            m = Math.floor((result / 60 % 60));
            if ((result%60)<10){
                s = Math.floor((result % 60));
                result =   m + ":" + '0'+s ;
            }else {
                s = Math.floor((result % 60));
                result =   m + ":"+s ;
            }
        }

        return result
    }

    function realFormatSecond(second) {
        var secondType = typeof second
        if (secondType === 'number' || secondType === 'string') {
            second = parseInt(second)
            var hours = Math.floor(second / 3600)
            second = second - hours * 3600
            var mimute = Math.floor(second / 60)
            second = second - mimute * 60
            return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
        } else {
            return '0:00:00'
        }
    }
    export default {
        name: "VideoPlay",
        props:{
            VideoData:{
                type: Object,
                // 对象或数组默认值必须从一个工厂函数获取
                default: function () {
                    return {  };
                },
            },
            full_screen:Boolean

        },
        data(){
            return{
                video_show:false,
                TotalDuration:'00:00',
                video: {
                    currentTime: 0,
                    maxTime: 0,
                    playing: false,
                    muted: false,
                    speed: 1,
                    waiting: true,
                    preload: 'auto'
                },
                video_url:"",
                buffer:true,
                buffer_cover: true,
                real_time:'00:00',
                video_full_screen:false,

                fs_video_height:document.documentElement.clientWidth,
                fs_video_width:document.documentElement.clientHeight,
                buffer_cover_two:false
              // fs_video_height:100,
              // fs_video_width:100,
            }
        },
        methods:{
            get_video_url(id){
                console.log(this.VideoData)
                let arr = {type:'video',id:this.VideoData.video_id,video_name:this.VideoData.video_name,video_singer:this.VideoData.artists_name,video_image:this.VideoData.video_image,video_play_time:''}
                this.$store.commit('push_recently_played_local_data',arr)
              if (this.$store.state.user_cookie != undefined){
                axios.post(
                    'http://localhost:3001/playedVideo',
                    {id:this.$store.state.my_user_id,type:'video',video_id:arr.id,video_name:arr.video_name,video_singer:arr.video_singer,video_image:arr.video_image,video_play_time:''}
                ).then((res)=>{
                  console.log(res);
                }).catch((err)=>{
                  console.log(err);
                })
              }

                ajax(
                    // "http://127.0.0.1:3000/mv/url?id="+id
                    this.$store.state.api_url+'mv/url?id='+id
                ).then((res)=>{
                    console.log(res)
                    this.video_url = res.data.url
                }).catch((err)=>{
                    console.log(err);
                    ajax(
                            // 'http://127.0.0.1:3000/video/url?id='+id
                        this.$store.state.api_url+'video/url?id='+id
                        ).then((res)=>{
                            console.log(res)
                            this.video_url = res.urls[0].url
                        }).catch((error)=>{
                            console.log(error)
                        })
                })
                this.buffer = false

                setTimeout(()=>{
                    if ( this.video_url != ''){
                        this.buffer_cover = false
                    }
                    this.video.playing = true
                    this.$refs.video.play()
                },800)

            },
            iSselect(){
                this.video_show = ! this.video_show
                if (this.buffer_cover_two){
                    this.buffer_cover_two = false
                }else {
                    this.buffer_cover_two = true
                }

                return this.video_show
            },
            // 进度条toolTip
            formatProcessToolTip(index = 0) {
                index = parseInt(this.video.maxTime / 100 * index )
                return realFormatSecond(index)
            },
            // 播放跳转
            changeCurrentTime(index) {
                this.$refs.video.currentTime = parseInt(this.video.maxTime / 100 * index )
            },

            startPlayOrPause() {

                return this.video.playing ? this.pausePlay() : this.startPlay()

            },
            // 开始播放
            startPlay() {

                if (this.VideoData.video_id.length<20){
                    ajax(
                        // 'http://127.0.0.1:3000/mv/url?id='+this.VideoData.video_id
                    this.$store.state.api_url+'mv/url?id='+this.VideoData.video_id
                    ).then((res)=>{
                        console.log(res)
                        this.video_url = res.data.url
                    }).catch((error)=>{
                        console.log(error)
                    })
                }else {
                    ajax(
                        // 'http://127.0.0.1:3000/video/url?id='+this.VideoData.video_id
                    this.$store.state.api_url+'video/url?id='+this.VideoData.video_id
                    ).then((res)=>{
                        console.log(res)
                        this.video_url = res.urls[0].url
                    }).catch((error)=>{
                        console.log(error)
                    })
                }
                    this.video.playing = true
                    this.$refs.video.play()
                let arr = {type:'video',id:this.VideoData.video_id,video_name:this.VideoData.video_name,video_singer:this.VideoData.artists_name,video_image:this.VideoData.video_image,video_play_time:''}
                this.$store.commit('push_recently_played_local_data',arr)

              if (this.$store.state.user_cookie != undefined){
                axios.post(
                    'http://localhost:3001/playedVideo',
                    {id:this.$store.state.my_user_id,type:'video',video_id:arr.id,video_name:arr.video_name,video_singer:arr.video_singer,video_image:arr.video_image,video_play_time:''}
                ).then((res)=>{
                  console.log(res);
                }).catch((err)=>{
                  console.log(err);
                })
              }

            },
            // 暂停
            pausePlay() {
                this.video.playing = false
                this.$refs.video.pause()
            },
            // 开始播放
            onPlay (res) {
                console.log(res)
                this.video.playing = true
                this.video.loading = false
                let target = res.target
                let audios = document.getElementsByTagName('video');
                [...audios].forEach((item) => {
                    if(item !== target){
                        item.pause()
                    }
                })

            },
            // 当音频暂停
            onPause () {
                this.video.playing = false
            },
            // 当发生错误, 就出现loading状态
            onError () {
                this.video.waiting = true
            },
            // 当音频开始等待
            onWaiting (res) {
                console.log(res)
            },

            // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
            onTimeupdate(res) {
                this.video.currentTime = res.target.currentTime
                // 更新进度当前时间
                this.video.sliderTime = parseInt((this.video.currentTime / this.video.maxTime) * 100)
                this.real_time = secondToDate(this.video.sliderTime)
                // console.log( secondToDate(this.video.sliderTime))
            },
            // 当加载语音流元数据完成后，会触发该事件的回调函数
            // 语音元数据主要是语音的长度之类的数据
            onLoadedmetadata(res) {
                console.log(res)
                this.video.waiting = false
                // 总时出
                this.video.maxTime = res.target.duration
                // 总时出
                this.TotalDuration = secondToDate(parseInt (res.target.duration))
            },
            // 进入全屏
            Full_Screen(){
                //false时进入全屏
                this.$emit('Full_Screen')
            }
        },
        mounted() {

            if (this.VideoData.video_id.length<20){
                ajax(
                    // 'http://127.0.0.1:3000/mv/url?id='+this.VideoData.video_id
                    this.$store.state.api_url+'mv/url?id='+this.VideoData.video_id
                ).then((res)=>{
                    console.log(res)
                    this.$refs.video.src = res.data.url
                }).catch((error)=>{
                    console.log(error)
                })
            }else {
                ajax(
                    // 'http://127.0.0.1:3000/video/url?id='+this.VideoData.video_id
                    this.$store.state.api_url+'video/url?id='+this.VideoData.video_id
                ).then((res)=>{
                    console.log(res)
                    this.$refs.video.src = res.urls[0].url
                }).catch((error)=>{
                    console.log(error)
                })
            }



        }
    }
</script>

<style scoped>
    .mv{
        width: 100%;
        height: 100%;
        position: relative;

    }


    .kzq{
        width: 100%;
        height: 100%;
        position: absolute;
        margin-top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
    }
    .kzq span{
        color: white;
        font-size: 10px;
    }
    .play_btn_box{
        position: absolute;
        z-index: 2;
    }

    .play_btn_box2{
        position: absolute;
        z-index: 4;

    }
    .buffer_ico{
        position: absolute;
        z-index: 4;
    }
    .buffer_ico_svg{
        /*旋转*/
        animation: rotate 3s linear infinite;
    }

    .videos{
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: fill;
        z-index: 2;
        border-radius: 0.5rem;
    }
    .video_kzq{
        /*display: inline-block;*/
        width: 98%;
        height:2.5rem;
        position: absolute;
        z-index: 3;
        bottom: -1.25rem;
        display: flex;
        align-items: center;
    }
    .video_kzq_two{
        /*display: inline-block;*/
        width: 98%;
        height:2.5rem;
        position: absolute;
        z-index: 3;
        bottom: -1.25rem;
        display: flex;
        align-items: center;
    }
    .mv_progress_kzq{
        position: absolute;
        width: 100%;
        height: 100%;
        margin-top: 0;
        z-index: 1;
    }
    .mv_progress{
        position: absolute;
        width: 100%;
        bottom:0.5rem;
        z-index: 3;
    }
    .mv_progress svg{
        position: absolute;
        z-index: 3;
        right: 0.5rem;
        bottom: 0.5rem;
    }
    /*球*/
    .video_kzq .el-slider__button {
        width: 0.4rem;
        height: 0.4rem;
        border: 0.05rem solid #409eff;
        background-color: #409eff;
        margin-top: -0.3rem;

    }
    /*已完成进度条*/
    .video_kzq .el-slider__bar {
        height: 0.1rem;
        background-color: #409eff;
    }
    /*未完成进度进度条*/
    .video_kzq .el-slider__runway{
        background-color: #e0eaf3;
        height: 0.1rem;

    }
    .video_img{
        width: 100%;
        height: 100%;
        /*background-color: #409eff;*/
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3;


    }
    .video_img img {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 4;
        border-radius: 0.5rem;
    }
    .custom-button {
        width: 0.5rem;
        height: 0.5rem;
        color: #fff;
        font-size: 10px;
        line-height: 18px;
        text-align: center;
        background-color: #409eff;
        border-radius: 1rem;
    }
.custom-button-two{
    /*width: 0.5rem;*/
    /*height: 0.5rem;*/
    color: #fff;
    font-size: 10px;
    line-height: 18px;
    text-align: center;
    /*background-color: red;*/
    border-radius: 1rem;
}
    .full_screen_kzq{
        position: absolute;
        z-index: 2;
        background-color: #5AB4F0;
      /*-webkit-animation:rotate 0.5s ease-in-out 0s 1 alternate forwards;*/
    }
    @keyframes rotate1 {
      0% {
        transform: rotateZ(0deg);
        z-index: 2;
        /*从0度开始*/
      }
      100% {
        transform: rotateZ(90deg);
        /*360度结束*/
      }

    }



    .play_btn_box_fs{
        position: absolute;
        z-index: 2;
    }

    .mv_progress_fs{
        position: absolute;
        width: 100%;
        bottom:0.5rem;
        z-index: 3;
    }
    .mv_progress_fs svg{
        position: absolute;
        z-index: 3;
        right: 0.5rem;
        bottom: 0.5rem;
    }
    .kzq_menu_box{
        width: 3.5rem;
        height: 100%;
        /*background-color: black;*/
        position: absolute;
        right: 0;
    }
    .kzq_menu_box_bag{
        width: 100%;
        height: 100%;
        background-color:black;
        position: absolute;
        opacity: 0.5;
        z-index: 1;
    }
    .kzq_menu{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 2;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .kzq_slider_time{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
      justify-content: space-evenly;
    }

    .kzq_slider_time span{
      width: 100%;
      height: 3.5rem;
      transform: rotateZ(90deg);
      line-height: 3.5rem;
    }
    .kzq_full_screen{
        width: 100%;
        height: 5%;
        display: flex;
        justify-content: center;
        /*align-items: last;*/
    }

    .kzq_menu_back{
        width: 100%;
        height: 5%;
        display: flex;
        justify-content: center;
        align-items: center;

    }
    .kzq_menu_video_name{
        width: 90%;
        height: 100%;
        display: flex;
        align-items: center;
    }

    .mv_fill_screen{
      position: relative;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      background-color: black;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .mv_cs{
      position: absolute;
      width: 100%;
      height: 100%;
      /*background-color: #D7676C;*/
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      /*-webkit-animation:rotate1 0.5s ease-in-out 0s 1 alternate forwards;*/
    }
    /*全屏*/
    .video_picture_box_screen{
      position: absolute;
      z-index: 9999;
      -webkit-animation:rotate1 0.5s ease-in-out 0s 1 alternate forwards;
    }

</style>