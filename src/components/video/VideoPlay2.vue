<template>
    <div class="mv" v-if="VideoDataVideoId != null ">
        <video ref="video"
               @click="iSselect"
               class="videos"
               :poster="VideoDataVideoImage"
               @play="onPlay"
               @error="onError"
               @waiting="onWaiting"
               @pause="onPause"
               @timeupdate="onTimeupdate"
               @loadedmetadata="onLoadedmetadata">
            <source>
        </video>
        <div class="kzq" v-show="!video_show" >

            <div class="play_btn_box" @click="startPlayOrPause">

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
                <span style="margin-left: 0.5rem">00:00</span><span>/</span><span>{{ TotalDuration }}</span>
                <svg @click="Full_Screen" xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 24.75 24.75">
                    <path id="Icon_ionic-ios-resize" data-name="Icon ionic-ios-resize" d="M29.412,5.625h-7.77a.965.965,0,0,0-.963.963V6.6a.965.965,0,0,0,.963.963h5.379L7.566,27.021V21.642a.965.965,0,0,0-.963-.963H6.588a.965.965,0,0,0-.963.963v7.77a.965.965,0,0,0,.963.963h7.77a.965.965,0,0,0,.963-.963V29.4a.965.965,0,0,0-.963-.963H8.979L28.434,8.979v5.379a.965.965,0,0,0,.963.963h.014a.965.965,0,0,0,.963-.963V6.588A.96.96,0,0,0,29.412,5.625Z" transform="translate(30.375 -5.625) rotate(90)" fill="#fff"/>
                </svg>
            </div>
            <el-slider v-model="video.sliderTime" class="video_kzq" :format-tooltip="formatProcessToolTip" @change="changeCurrentTime"></el-slider>
            <div class="mv_progress_kzq" @click="iSselect"></div>
        </div>

    </div>
</template>

<script>
    import ajax from '../../http/index'
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
              type: Array,
              default() {
                  return [];
              }
            },
            VideoDataVideoImage:{
                type:String
            },
            VideoDataVideoId:{
                type:Number
            }

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
            }
        },
        methods:{
            kkp(){

            },
            iSselect(){
                this.video_show = ! this.video_show
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
                this.video.playing = true
                this.$refs.video.play()
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
                // let ele = document.getElementsByTagName('video');
            }
        },
        mounted() {

            if (this.VideoDataVideoId.length<20){
                ajax(
                    'http://127.0.0.1:3000/mv/url?id='+this.VideoDataVideoId
                ).then((res)=>{
                    console.log(res)
                    this.$refs.video.src = res.data.url
                }).catch((error)=>{
                    console.log(error)
                })
            }else {
                ajax(
                    'http://127.0.0.1:3000/video/url?id='+this.VideoDataVideoId
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

<style>
    .mv{
        /*width: 20rem;*/
        /*height: 11.25rem;*/
        width: 100%;
        height: 100%;
        background-color: black;
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
    }
    .kzq span{
        color: white;
        font-size: 10px;
    }
    .play_btn_box{
        position: absolute;
        z-index: 2;
    }

    .videos{
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: fill;
    }
    .video_kzq{
        /*display: inline-block;*/
        width: 100%;
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
</style>