<!--<template>-->
<!--<div class="MP">-->
<!--    &lt;!&ndash; 这里设置了ref属性后，在vue组件中，就可以用this.$refs.audio来访问该dom元素 &ndash;&gt;-->
<!--    <audio ref="audio"-->
<!--           :preload="audio.preload"-->
<!--           @play="onPlay"-->
<!--           @error="onError"-->
<!--           @waiting="onWaiting"-->
<!--           @pause="onPause"-->
<!--           @timeupdate="onTimeupdate"-->
<!--           @loadedmetadata="onLoadedmetadata">-->
<!--        <source :src="music_url">-->
<!--    </audio>-->
<!--    <MusicPlayInterface  v-if="isSelected"-->
<!--                         :music="music"-->
<!--                        @Music-play="startPlayOrPause"-->
<!--                        @format-process-tool-tip="formatProcessToolTip"-->
<!--                        @change-current-time="changeCurrentTime"-->
<!--                        @start-play-or-pause="startPlayOrPause"-->
<!--                        v-model:sliderTime="sliderTime">-->
<!--    </MusicPlayInterface>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--    import {computed} from "vue";-->
<!--    import {useRoute} from 'vue-router'-->
<!--    // 歌曲时间转换-->
<!--    import MusicPlayInterface from "../../components/home/MusicPlayInterface";-->
<!--    function secondToDate(result) {-->
<!--        var m ,s-->
<!--        if ((result/60)<10){-->
<!--            m = Math.floor((result / 60 % 60));-->
<!--            if ((result%60)<10){-->
<!--                s = Math.floor((result % 60));-->
<!--                result =  '0'+ m + ":" + '0'+s ;-->
<!--            }else {-->
<!--                s = Math.floor((result % 60));-->
<!--                result =  '0'+ m + ":"+s ;-->
<!--            }-->
<!--        }else {-->
<!--            m = Math.floor((result / 60 % 60));-->
<!--            if ((result%60)<10){-->
<!--                s = Math.floor((result % 60));-->
<!--                result =   m + ":" + '0'+s ;-->
<!--            }else {-->
<!--                s = Math.floor((result % 60));-->
<!--                result =   m + ":"+s ;-->
<!--            }-->
<!--        }-->

<!--        return result-->
<!--    }-->

<!--    function realFormatSecond(second) {-->
<!--        var secondType = typeof second-->
<!--        if (secondType === 'number' || secondType === 'string') {-->
<!--            second = parseInt(second)-->
<!--            var hours = Math.floor(second / 3600)-->
<!--            second = second - hours * 3600-->
<!--            var mimute = Math.floor(second / 60)-->
<!--            second = second - mimute * 60-->
<!--            return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)-->
<!--        } else {-->
<!--            return '0:00:00'-->
<!--        }-->
<!--    }-->
<!--    export default {-->
<!--        components: {MusicPlayInterface},-->
<!--        name: "Musicplayer",-->
<!--        props: {-->
<!--            theSpeeds: {-->
<!--                type: Array,-->
<!--                default () {-->
<!--                    return [1, 1.5, 2]-->
<!--                }-->
<!--            },-->
<!--            theControlList: {-->
<!--                type: String,-->
<!--                default: ''-->
<!--            }-->
<!--        },-->
<!--        data() {-->

<!--            return {-->
<!--                music:{-->
<!--                    Played_time:'00:00',-->
<!--                    Total_time:'00:00',-->
<!--                    playing:false,-->
<!--                    currentTime:0,-->
<!--                    maxTime:0,-->
<!--                },-->
<!--                music_url:'',-->
<!--                audio: {-->
<!--                    currentTime: 0,-->
<!--                    maxTime: 0,-->
<!--                    playing: false,-->
<!--                    muted: false,-->
<!--                    speed: 1,-->
<!--                    waiting: true,-->
<!--                    preload: 'auto'-->
<!--                },-->
<!--                sliderTime: 0,-->
<!--                volume: 100,-->
<!--                speeds: this.theSpeeds,-->
<!--                controlList: {-->
<!--                    // 不显示下载-->
<!--                    noDownload: false,-->
<!--                    // 不显示静音-->
<!--                    noMuted: false,-->
<!--                    // 不显示音量条-->
<!--                    noVolume: false,-->
<!--                    // 不显示进度条-->
<!--                    noProcess: false,-->
<!--                    // 只能播放一个-->
<!--                    onlyOnePlaying: false,-->
<!--                    // 不要快进按钮-->
<!--                    noSpeed: false-->
<!--                },-->

<!--            }-->
<!--        },-->
<!--        methods: {-->
<!--            back(){-->
<!--                this.$router.go(-1)-->
<!--                this.$store.commit('router_back')-->
<!--            },-->

<!--            increment0() {-->
<!--                this.$store.commit('increment0')-->
<!--            },-->
<!--            increment1() {-->
<!--                this.$store.commit('increment1')-->
<!--            },-->
<!--            increment2() {-->
<!--                this.$store.commit('increment2')-->
<!--            },-->
<!--            // 歌曲评论-->
<!--            song_comment(){-->
<!--                let id = this.$route.params.id-->
<!--                this.$store.commit('advance')-->
<!--                this.$router.push(`/home/songcomment/${ id }`)-->
<!--            },-->


<!--            setControlList () {-->
<!--                let controlList = this.theControlList.split(' ')-->
<!--                controlList.forEach((item) => {-->
<!--                    if(this.controlList[item] !== undefined){-->
<!--                        this.controlList[item] = true-->
<!--                    }-->
<!--                })-->
<!--            },-->
<!--            changeSpeed() {-->
<!--                let index = this.speeds.indexOf(this.audio.speed) + 1-->
<!--                this.audio.speed = this.speeds[index % this.speeds.length]-->
<!--                this.$refs.audio.playbackRate = this.audio.speed-->
<!--            },-->
<!--            startMutedOrNot() {-->
<!--                this.$refs.audio.muted = !this.$refs.audio.muted-->
<!--                this.audio.muted = this.$refs.audio.muted-->
<!--            },-->
<!--            // 音量条toolTip-->
<!--            formatVolumeToolTip(index) {-->
<!--                return '音量条: ' + index-->
<!--            },-->
<!--            // 进度条toolTip-->
<!--            formatProcessToolTip(index) {-->
<!--                index = parseInt(this.audio.maxTime / 100 * index)-->
<!--                return realFormatSecond(index)-->
<!--            },-->
<!--            // 音量改变-->
<!--            changeVolume(index = 0) {-->
<!--                this.$refs.audio.volume = index / 100-->
<!--                this.volume = index-->
<!--            },-->
<!--            // 播放跳转-->
<!--            changeCurrentTime(index) {-->
<!--                console.log(index)-->
<!--                this.$refs.audio.currentTime = index-->
<!--            },-->
<!--            startPlayOrPause() {-->
<!--                return this.music.playing ? this.pausePlay() : this.startPlay()-->
<!--            },-->
<!--            // 开始播放-->
<!--            startPlay() {-->
<!--                this.$refs.audio.play()-->
<!--            },-->
<!--            // 暂停-->
<!--            pausePlay() {-->
<!--                this.$refs.audio.pause()-->
<!--            },-->
<!--            // 当音频暂停-->
<!--            onPause () {-->
<!--                this.music.playing = false-->
<!--            },-->
<!--            // 当发生错误, 就出现loading状态-->
<!--            onError () {-->
<!--                this.music.waiting = true-->
<!--            },-->
<!--            // 当音频开始等待-->
<!--            onWaiting (res) {-->
<!--                console.log(res)-->
<!--            },-->
<!--            // 当音频开始播放-->
<!--            onPlay (res) {-->
<!--                console.log(res)-->
<!--                this.music.playing = true-->
<!--                this.audio.loading = false-->
<!--                if(!this.controlList.onlyOnePlaying){-->
<!--                    return-->
<!--                }-->
<!--                let target = res.target-->
<!--                let audios = document.getElementsByTagName('audio');-->
<!--                [...audios].forEach((item) => {-->
<!--                    if(item !== target){-->
<!--                        item.pause()-->
<!--                    }-->
<!--                })-->
<!--            },-->
<!--            // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间-->
<!--            onTimeupdate(res) {-->
<!--                this.audio.currentTime = res.target.currentTime-->
<!--                this.music.currentTime = this.audio.currentTime-->
<!--                this.audio.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)-->
<!--                this.music.Played_time = secondToDate(parseInt(res.target.currentTime))-->
<!--                this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)-->
<!--            },-->
<!--            // 当加载语音流元数据完成后，会触发该事件的回调函数-->
<!--            // 语音元数据主要是语音的长度之类的数据-->
<!--            onLoadedmetadata(res) {-->
<!--                console.log(res)-->
<!--                this.audio.waiting = false-->
<!--                this.audio.maxTime = parseInt(res.target.duration)-->
<!--                this.music.maxTime = this.audio.maxTime-->
<!--                this.music.Total_time = secondToDate(parseInt(res.target.duration))-->
<!--            }-->
<!--        },-->
<!--        computed: {-->
<!--            formatSecond(second = 0) {-->
<!--                return realFormatSecond(second)-->
<!--            },-->
<!--        },-->
<!--        created() {-->
<!--            this.setControlList()-->
<!--        },-->
<!--        mounted() {-->
<!--            let id = this.$route.params.id-->
<!--            this.music_url ='https://music.163.com/song/media/outer/url?id='+id-->

<!--        },-->
<!--        setup(){-->

<!--            const route = useRoute()-->
<!--            //ture false-->
<!--            const isSelected = computed(()=>{-->
<!--                return route.path.includes('/musicplay')-->
<!--            })-->
<!--            return{-->
<!--                isSelected,-->
<!--            }-->


<!--        }-->
<!--    }-->
<!--            // //选项是否选中-->



<!--</script>-->

<!--<style>-->
<!--    *{-->
<!--        margin: 0;-->
<!--        padding: 0;-->
<!--    }-->
<!--    .MP{-->
<!--        position: absolute;-->
<!--        width: 100%;-->
<!--        height: 100%;-->
<!--        /*background-color: #409eff*/-->
<!--    }-->
<!--    .slider {-->
<!--        display: inline-block;-->
<!--        width: 16rem;-->
<!--        /*position: relative;*/-->
<!--        /*top: 14px;*/-->
<!--        /*margin-left: 15px;*/-->
<!--    }-->
<!--    /*球*/-->
<!--    .slider .el-slider__button {-->
<!--        width: 0.5rem;-->
<!--        height: 0.5rem;-->
<!--        border: 0.05rem solid #409eff;-->
<!--        background-color: #fff;-->
<!--        margin-top: -0.25rem;-->

<!--    }-->
<!--    /*已完成进度条*/-->
<!--    .slider .el-slider__bar {-->
<!--        height: 0.1rem;-->
<!--    }-->
<!--    /*未完成进度进度条*/-->
<!--    .slider .el-slider__runway{-->
<!--        background-color: #e0eaf3;-->
<!--        height: 0.1rem;-->

<!--    }-->

<!--    .dn{-->
<!--        display: none;-->
<!--    }-->

<!--    .Hover_player_box{-->
<!--        width: 100%;-->
<!--        height: 100%;-->
<!--        position: absolute;-->
<!--        top: 0;-->
<!--        overflow-y: hidden;-->
<!--        overflow-x: hidden;-->
<!--        /*background-color: cornflowerblue;*/-->
<!--        display: flex;-->
<!--        /*align-items: center;*/-->
<!--        flex-direction: column;-->
<!--        align-items: center;-->

<!--    }-->
<!--    .blur{-->
<!--        position: absolute;-->
<!--        top:-5%;-->
<!--        left: -5%;-->
<!--        right: -5%;-->
<!--        width:110%;-->
<!--        height: 110%;-->
<!--        z-index: -1;-->
<!--        /*object-fit:cover;*/-->
<!--        /*模糊程度*/-->
<!--        -webkit-filter: blur(70px); /* Chrome, Opera */-->
<!--    }-->
<!--    .Back{-->
<!--        margin-top: 3rem;-->
<!--    }-->
<!--    .Hover_player_box .Song_cover{-->
<!--        width: 13.75rem;-->
<!--        height: 13.75rem;-->
<!--        border: 1px solid white;-->
<!--        border-radius: 5px;-->
<!--        margin-top: 4.75rem;-->

<!--    }-->
<!--    .ccd_box{-->
<!--        width: 100%;-->
<!--        height: 2.5rem ;-->
<!--        display: flex;-->
<!--        justify-content: space-evenly;-->
<!--        align-items: center;-->
<!--        margin-top: 10.5rem;-->

<!--    }-->
<!--    .progress{-->
<!--        width: 100%;-->
<!--        height: 1.75rem;-->
<!--        display: flex;-->
<!--        align-items: center;-->
<!--        justify-content: space-around;-->
<!--        margin-top: 6.75rem;-->
<!--    }-->
<!--    .progress span{-->
<!--        font-size: 0.5rem;-->
<!--    }-->
<!--        .Play_button{-->
<!--        width: 58%;-->
<!--        display: flex;-->
<!--        /*flex-direction:;*/-->
<!--        /*justify-content: flex-start;*/-->
<!--        justify-content: flex-end;-->

<!--    }-->
<!--    .music_assembly {-->
<!--        width: 100%;-->
<!--        height: 4.75rem;-->
<!--        display: flex;-->
<!--        justify-content: space-around;-->
<!--        align-items: center;-->
<!--    }-->

<!--    .Play_button svg{-->
<!--        margin-right: 15px;-->
<!--    }-->


<!--    .Hover_player_box .Song_name{-->
<!--        margin-left: 17px;-->
<!--        font-size: 20px;-->
<!--        margin-right: 10px;-->
<!--    }-->

<!--</style>-->