<template>
    <audio ref="audio"
           :preload="audio.preload"
           @error="onError"
           @waiting="onWaiting"
           @pause="onPause"
           @ended="onEnded"
           @timeupdate="onTimeupdate"
           @loadedmetadata="onLoadedmetadata">
        <source :src="music_url">
<!--        @play="onPlay"-->
    </audio>

    <router-view :music="music"
                 @format-process-tool-tip="formatProcessToolTip"
                 @change-current-time="changeCurrentTime"
                 v-model:sliderTime="sliderTime"
                 @rest="rest"
                 @home_play="home_play"
                 @endplay-revise="endplay_revise"
                 :endplay="endplay"
                 @get_music_url="get_music_url">
    </router-view>

    <Back v-if="false"></Back>
<!--    <Open_music v-if="$store.state.music_display"></Open_music>-->
</template>

<script>
import Back from "./components/menu/Back";
import ajax from './http'
// import Open_music from "./views/home/OpenMusic";
import {useRoute} from "vue-router";
import {computed} from "vue";
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
  name: 'App',
    props: {
        theSpeeds: {
            type: Array,
            default () {
                return [1, 1.5, 2]
            }
        },
        theControlList: {
            type: String,
            default: ''
        }
    },
    components: {
        // Music_player,
        // Open_music,
        Back,
  },
    data() {

        return {
            music:[{
                Played_time:'00:00',
                Total_time:'00:00',
                playing:false,
                currentTime:0,
                maxTime:0,
            }],
            music_url:'#',
            audio: {
                currentTime: 0,
                maxTime: 0,
                playing: false,
                muted: false,
                speed: 1,
                waiting: true,
                preload: 'auto'
            },
            sliderTime: 0,
            volume: 100,
            speeds: this.theSpeeds,
            controlList: {
                // 不显示下载
                noDownload: false,
                // 不显示静音
                noMuted: false,
                // 不显示音量条
                noVolume: false,
                // 不显示进度条
                noProcess: false,
                // 只能播放一个
                onlyOnePlaying: false,
                // 不要快进按钮
                noSpeed: false
            },
            endplay:false

        }
    },
    methods: {
        home_play(){
            if (this.$refs.audio.paused){
                this.$refs.audio.play()
                this.music.playing = true
                this.$store.commit('home_music_playing_true')

            }else {
                this.$refs.audio.pause()
                this.music.playing = false
                this.$store.commit('home_music_playing_false')
            }
        },
        get_music_url(id){

            ajax(
                this.$store.state.api_url+'song/url?id='+id,

            ).then((res)=>{
                // console.log(res.data[0].url);
                this.$refs.audio.src = res.data[0].url
            }).catch((err)=>{
                console.log(err);
                this.rest()
            })
        },

        rest(){
            if (this.music.playing){
                this.music.playing == false
                this.$refs.audio.pause()

            }
            if (this.$store.state.music_play){
                this.$store.commit('music_stop')
                this.$refs.audio.pause()
                // this.$store.state.music_play = false
            }
                this.$refs.audio.pause()
                this.music.playing = false
                this.$store.commit('home_music_playing_false')
        },
      //修改播放结束的值
      endplay_revise(){
          this.endplay = false
      },

        // 音量条toolTip
        formatVolumeToolTip(index) {
            return '音量条: ' + index
        },
        // 进度条toolTip
        formatProcessToolTip(index) {
            index = parseInt(this.audio.maxTime / 100 * index)
            return realFormatSecond(index)
        },
        // 音量改变
        changeVolume(index = 0) {
            this.$refs.audio.volume = index / 100
            this.volume = index
        },
        // 播放跳转
        changeCurrentTime(index) {
            console.log(index)
            this.$refs.audio.currentTime = index
        },
        // 当音频暂停
        onPause () {
            this.music.playing = false
        },
        // 当发生错误, 就出现loading状态
        onError () {
            this.music.waiting = true
        },
      //播放结束
      onEnded(){
        this.endplay = true
      },
        // 当音频开始等待
        onWaiting () {
        },
        // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
        onTimeupdate(res) {
            this.audio.currentTime = res.target.currentTime
            this.music.currentTime = this.audio.currentTime
            this.audio.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
            this.music.Played_time = secondToDate(parseInt(res.target.currentTime))
            this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
        },
        // 当加载语音流元数据完成后，会触发该事件的回调函数
        // 语音元数据主要是语音的长度之类的数据
        onLoadedmetadata(res) {
            console.log(res)
            this.audio.waiting = false
            this.audio.maxTime = parseInt(res.target.duration)
            this.music.maxTime = this.audio.maxTime
            this.music.Total_time = secondToDate(parseInt(res.target.duration))
        }
    },
    computed: {
        formatSecond(second = 0) {
            return realFormatSecond(second)
        },
        audio_paused(){

            return this.$store.state.music_play_id
        }
    },

    watch:{
        audio_paused(){
            console.log('77777777')
        }
    },

    mounted() {
        if (this.$route.params.songid != undefined){
          let  id = this.$route.params.songid

            this.$refs.audio.src = 'https://music.163.com/song/media/outer/url?id='+id+'.mp3'

        }
        if (this.$store.state.music_play ){
            this.startPlay()
        }
    },
    setup(){

        const route = useRoute()
        //ture false
        const isSelected = computed(()=>{
            return route.path.includes('/musicplay')
        })

        return{
            isSelected,
        }


    },
}
</script>

<style>
@import "../public/css/Route_Jump_Style.css";
    *{
        margin: 0;
        padding: 0;
        font-family: 宋体;
        line-height: 1.5;
        letter-spacing: 2px;
    }
    /*隐藏滚动条*/
    html,body{
        width: 100%;
        height: 100%;
        overflow: scroll;
    }
    *{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-tap-highlight-color:transparent;
    }
    html::-webkit-scrollbar,
    body::-webkit-scrollbar
    {
        width:0px;
        height:0px;
    }
.Placeholder{
    width: 100%;
    height: 6rem;
    /*background-color: white;*/
}

</style>
