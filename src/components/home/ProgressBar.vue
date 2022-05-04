<template>
    <div class="ProgressBar">
        <div class="progress">
            <!--                歌曲播放实时时间-->
            <span class="Real_time">{{ audio.currentTimeMin }}</span>
            <el-slider v-show="!controlList.noProcess" v-model="sliderTime" :format-tooltip="formatProcessToolTip" @change="changeCurrentTime" class="music_progress_bar"></el-slider>
            <!--                歌曲总时间-->
            <span class="Total_time">{{ audio.maxTimeMin }}</span>
        </div>
        <!--            播放按钮-->
        <div class="music_assembly">
            <!--                列表循环-->
            <svg  v-show="$store.state.count == 0" @click="increment0" xmlns="http://www.w3.org/2000/svg" width="27" height="19.115" viewBox="0 0 27 19.115">
                <g id="Icon_ionic-ios-repeat" data-name="Icon ionic-ios-repeat" transform="translate(-4.5 -8.439)">
                    <path d="M23.667,11.074,21.3,8.726a.985.985,0,0,0-.956-.253.84.84,0,0,0-.246.105.981.981,0,0,0-.478.921,1.031,1.031,0,0,0,.3.64l1.125,1.118H9.984A5.5,5.5,0,0,0,4.5,16.734v1.125a.987.987,0,0,0,.984.984h0a.987.987,0,0,0,.984-.984V16.734a3.529,3.529,0,0,1,3.516-3.516H20.911l-1.125,1.118a1,1,0,0,0-.3.612.991.991,0,0,0,.984,1.083.973.973,0,0,0,.7-.288l2.5-2.489a1.521,1.521,0,0,0,.457-1.09A1.568,1.568,0,0,0,23.667,11.074Z" fill="#BBBBBB"/>
                    <path d="M30.516,17.156h0a.987.987,0,0,0-.984.984v1.125a3.529,3.529,0,0,1-3.516,3.516H15.089l1.125-1.118a1,1,0,0,0,.3-.619.991.991,0,0,0-.984-1.083.973.973,0,0,0-.7.288l-2.5,2.489a1.528,1.528,0,0,0,0,2.18L14.7,27.267a.985.985,0,0,0,.956.253.84.84,0,0,0,.246-.105.981.981,0,0,0,.478-.921,1.031,1.031,0,0,0-.3-.64l-1.125-1.118H26.016A5.491,5.491,0,0,0,31.5,19.252V18.127A.984.984,0,0,0,30.516,17.156Z" fill="#BBBBBB"/>
                </g>
            </svg>
            <!--                单曲循环-->
            <svg v-show="$store.state.count == 1" @click="increment1" xmlns="http://www.w3.org/2000/svg" width="27" height="19.115" viewBox="0 0 27 19.115">
                <g id="Icon_ionic-ios-repeat" data-name="Icon ionic-ios-repeat" transform="translate(-4.5 -8.439)">
                    <path d="M23.667,11.074,21.3,8.726a.985.985,0,0,0-.956-.253.84.84,0,0,0-.246.105.981.981,0,0,0-.478.921,1.031,1.031,0,0,0,.3.64l1.125,1.118H9.984A5.5,5.5,0,0,0,4.5,16.734v1.125a.987.987,0,0,0,.984.984h0a.987.987,0,0,0,.984-.984V16.734a3.529,3.529,0,0,1,3.516-3.516H20.911l-1.125,1.118a1,1,0,0,0-.3.612.991.991,0,0,0,.984,1.083.973.973,0,0,0,.7-.288l2.5-2.489a1.521,1.521,0,0,0,.457-1.09A1.568,1.568,0,0,0,23.667,11.074Z" fill="#BBBBBB"/>
                    <path d="M30.516,17.156h0a.987.987,0,0,0-.984.984v1.125a3.529,3.529,0,0,1-3.516,3.516H15.089l1.125-1.118a1,1,0,0,0,.3-.619.991.991,0,0,0-.984-1.083.973.973,0,0,0-.7.288l-2.5,2.489a1.528,1.528,0,0,0,0,2.18L14.7,27.267a.985.985,0,0,0,.956.253.84.84,0,0,0,.246-.105.981.981,0,0,0,.478-.921,1.031,1.031,0,0,0-.3-.64l-1.125-1.118H26.016A5.491,5.491,0,0,0,31.5,19.252V18.127A.984.984,0,0,0,30.516,17.156Z" fill="#BBBBBB"/>
                </g>
                <path id="Icon_material-repeat-one" data-name="Icon material-repeat-one" d="M21.15,17.014Zm-3.514,1.757V13.5h-.879L15,14.379v.879h1.318v3.514Z" transform="translate(-3.25 -5.943)" fill="#BBBBBB"/>
            </svg>
            <!--                随机播放-->
            <svg v-show="$store.state.count == 2" @click="increment2" xmlns="http://www.w3.org/2000/svg" width="27" height="19.125" viewBox="0 0 27 19.125">
                <g id="Icon_ionic-ios-shuffle" data-name="Icon ionic-ios-shuffle" transform="translate(-4.5 -8.445)">
                    <path d="M28.54,20.257a.99.99,0,0,0-.7-.288.973.973,0,0,0-.7.288.961.961,0,0,0-.288.7,1,1,0,0,0,.288.7l1.146,1.139H22.985l-8.719-10.9-.007-.007a1.009,1.009,0,0,0-.759-.352H5.484a.984.984,0,0,0,0,1.969h7.552l3.691,4.641-3.691,4.641H5.484a.984.984,0,0,0,0,1.969H13.5a.982.982,0,0,0,.752-.352l.007-.007L18,19.695l3.741,4.7.007.007a.982.982,0,0,0,.752.352h5.934l-1.146,1.139a.95.95,0,0,0-.288.7,1,1,0,0,0,.288.7.99.99,0,0,0,.7.288.973.973,0,0,0,.7-.288l2.362-2.348a1.528,1.528,0,0,0,0-2.18Z" fill="#BBBBBB"/>
                    <path d="M19.645,16.552a.4.4,0,0,0,.323.148h.007a.41.41,0,0,0,.323-.155l2.665-3.326h5.33l-1.146,1.139a.95.95,0,0,0-.288.7,1,1,0,0,0,.288.7.99.99,0,0,0,.7.288.973.973,0,0,0,.7-.288l2.5-2.489a1.528,1.528,0,0,0,0-2.18L28.68,8.733a.99.99,0,0,0-.7-.288.973.973,0,0,0-.7.288.961.961,0,0,0-.288.7,1,1,0,0,0,.288.7l1.146,1.139H22.5a.982.982,0,0,0-.752.352l-.007.007-2.834,3.53a.415.415,0,0,0,.007.534Z" fill="#BBBBBB"/>
                </g>
            </svg>
            <!--上一首-->
            <svg  xmlns="http://www.w3.org/2000/svg" width="22.5" height="22.5" viewBox="0 0 22.5 22.5" @click="previous_song">
                <path id="Icon_ionic-ios-skip-backward" data-name="Icon ionic-ios-skip-backward" d="M12.3,7.031V16.72L28.4,6.9a.566.566,0,0,1,.851.485V28.617a.565.565,0,0,1-.851.485L12.3,19.28v9.689a.282.282,0,0,1-.281.281H7.031a.282.282,0,0,1-.281-.281V7.031a.282.282,0,0,1,.281-.281h4.992A.282.282,0,0,1,12.3,7.031Z" transform="translate(-6.75 -6.75)" fill="#5ab4f0"/>
            </svg>
            <!--                暂停-->
            <svg v-if="music_playing" @click="startPlayOrPause" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path id="Icon_awesome-pause" data-name="Icon awesome-pause" d="M5.786,20.18H1.929A1.929,1.929,0,0,1,0,18.251V4.108A1.929,1.929,0,0,1,1.929,2.18H5.786A1.929,1.929,0,0,1,7.714,4.108V18.251A1.929,1.929,0,0,1,5.786,20.18ZM18,18.251V4.108A1.929,1.929,0,0,0,16.071,2.18H12.214a1.929,1.929,0,0,0-1.929,1.929V18.251a1.929,1.929,0,0,0,1.929,1.929h3.857A1.929,1.929,0,0,0,18,18.251Z" transform="translate(0 -2.18)" fill="#5ab4f0"/>
            </svg>
            <!--                播放-->
            <svg v-else @click="startPlayOrPause" xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21">
                <path id="Icon_awesome-play" data-name="Icon awesome-play" d="M17.052,8.807,2.909.272A1.918,1.918,0,0,0,0,1.966V19.031a1.927,1.927,0,0,0,2.909,1.694l14.143-8.531a1.988,1.988,0,0,0,0-3.388Z" transform="translate(0 -0.002)" fill="#5ab4f0"/>
            </svg>
            <!--下一首-->
            <svg xmlns="http://www.w3.org/2000/svg" width="22.5" height="22.5" viewBox="0 0 22.5 22.5" @click="next_song">
                <path id="Icon_ionic-ios-skip-forward" data-name="Icon ionic-ios-skip-forward" d="M23.7,7.031V16.72L7.6,6.9a.565.565,0,0,0-.851.485V28.617A.565.565,0,0,0,7.6,29.1L23.7,19.28v9.689a.282.282,0,0,0,.281.281h4.992a.282.282,0,0,0,.281-.281V7.031a.282.282,0,0,0-.281-.281H23.977A.282.282,0,0,0,23.7,7.031Z" transform="translate(-6.75 -6.75)" fill="#5ab4f0"/>
            </svg>
            <!--                菜单-->
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="21.375" viewBox="0 0 27 21.375" @click="to_play_list">
                <g id="Icon_ionic-ios-list" data-name="Icon ionic-ios-list" transform="translate(-4.5 -7.313)">
                    <path d="M8.438,18a1.969,1.969,0,1,1-1.969-1.969A1.969,1.969,0,0,1,8.438,18Z" fill="#BBBBBB"/>
                    <path d="M8.438,9.281A1.969,1.969,0,1,1,6.469,7.313,1.969,1.969,0,0,1,8.438,9.281Z" fill="#BBBBBB"/>
                    <path d="M8.438,26.719A1.969,1.969,0,1,1,6.469,24.75a1.969,1.969,0,0,1,1.969,1.969Z" fill="#BBBBBB"/>
                    <path d="M30.375,16.875H13.465a1.125,1.125,0,0,0,0,2.25h16.91a1.125,1.125,0,0,0,0-2.25Z" fill="#BBBBBB"/>
                    <path d="M30.375,25.594H13.465a1.125,1.125,0,0,0,0,2.25h16.91a1.125,1.125,0,0,0,0-2.25Z" fill="#BBBBBB"/>
                    <path d="M13.465,10.406h16.91a1.125,1.125,0,0,0,0-2.25H13.465a1.125,1.125,0,0,0,0,2.25Z" fill="#BBBBBB"/>
                </g>
            </svg>


        </div>
    </div>
</template>

<script>
    // 歌曲时间转换
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
        name: "ProgressBar",
        props: {
            theUrl: {
                type: String,
                required: true,
            },
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
        data() {

            return {
                Background_map:'',
                counter:'mpp.mp3',
                // url: this.theUrl || '../assets/mp3/mpp.mp3',\
                // url:'../assets/mp3/mpp.mp3',
                audio: {
                    currentTime: 0,
                    maxTime: 0,
                    // 开始时间-分
                    currentTimeMin: '00:00',
                    // 结束时间-分
                    maxTimeMin: '00:00',
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
                kkl: '1',
                kkt: false,
                music_playing:false

            }
        },
        methods: {
            back(){
                this.$router.go(-1)
                this.$store.commit('router_back')
            },

            increment0() {
                this.$store.commit('increment0')
            },
            increment1() {
                this.$store.commit('increment1')
            },
            increment2() {
                this.$store.commit('increment2')
            },
            // 歌曲评论
            song_comment(){
                let id = this.$route.params.id
                this.$store.commit('advance')
                this.$router.push(`/home/songcomment/${ id }`)
            },


            setControlList () {
                let controlList = this.theControlList.split(' ')
                controlList.forEach((item) => {
                    if(this.controlList[item] !== undefined){
                        this.controlList[item] = true
                    }
                })
            },
            changeSpeed() {
                let index = this.speeds.indexOf(this.audio.speed) + 1
                this.audio.speed = this.speeds[index % this.speeds.length]
                this.$refs.audio.playbackRate = this.audio.speed
            },
            startMutedOrNot() {
                this.$refs.audio.muted = !this.$refs.audio.muted
                this.audio.muted = this.$refs.audio.muted
            },
            // 音量条toolTip
            formatVolumeToolTip(index) {
                return '音量条: ' + index
            },
            // 进度条toolTip
            formatProcessToolTip(index = 0) {
                index = parseInt(this.audio.maxTime / 100 * index)
                return '进度条: ' + realFormatSecond(index)
            },
            // 音量改变
            changeVolume(index = 0) {
                this.$refs.audio.volume = index / 100
                this.volume = index
            },
            // 播放跳转
            changeCurrentTime(index) {
                this.$refs.audio.currentTime = parseInt(parseInt(index) / 100 * this.audio.maxTime)

            },
            startPlayOrPause() {
                console.log('77')
                return this.audio.playing ? this.pausePlay() : this.startPlay()
            },
            // 开始播放
            startPlay() {
                this.$store.commit('music_playing')
                this.$store.commit('music_isPlaying_true')
                this.$store.commit('music_paused_false')
                this.$refs.audio.play()
            },
            // 暂停
            pausePlay() {
                this.$store.commit('music_stop')
                this.$store.commit('music_paused_true')
                this.$refs.audio.pause()
            },
            // 当音频暂停
            onPause () {
                this.audio.playing = false
            },
            // 当发生错误, 就出现loading状态
            onError () {
                this.audio.waiting = true
            },
            // 当音频开始等待
            onWaiting (res) {
                console.log(res)
            },
            // 当音频开始播放
            onPlay (res) {
                console.log(res)
                this.audio.playing = true
                this.audio.loading = false
                if(!this.controlList.onlyOnePlaying){
                    return
                }
                let target = res.target
                let audios = document.getElementsByTagName('audio');
                [...audios].forEach((item) => {
                    if(item !== target){
                        item.pause()
                    }
                })
            },
            // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
            onTimeupdate(res) {
                // console.log('timeupdate')
                // console.log(res)
                this.audio.currentTime = res.target.currentTime
                this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
                this.audio.currentTimeMin = secondToDate(parseInt(res.target.currentTime))


            },
            // 当加载语音流元数据完成后，会触发该事件的回调函数
            // 语音元数据主要是语音的长度之类的数据
            onLoadedmetadata(res) {
                console.log('loadedmetadata')
                console.log(res)
                this.audio.waiting = false

                this.audio.maxTime = parseInt(res.target.duration)
                this.audio.maxTimeMin = secondToDate(parseInt(res.target.duration))


            }
        },
        computed: {
            formatSecond(second = 0) {
                return realFormatSecond(second)
            },
            // transPlayPause(value) {
            //     return value ? '暂停' : '播放'
            // },
            // transMutedOrNot(value) {
            //     return value ? '放音' : '静音'
            // },
            // transSpeed(value) {
            //     return '快进: x' + value
            // }
        },
        created() {
            this.setControlList()
        },
    }
</script>

<style>
    .progress{
        width: 100%;
        height: 1.75rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-top: 2.75rem;
    }
    .progress span{
        font-size: 0.5rem;
        color: white;
    }
    .Play_button{
        width: 58%;
        display: flex;
        /*flex-direction:;*/
        /*justify-content: flex-start;*/
        justify-content: flex-end;

    }
    .music_assembly {
        width: 100%;
        height: 4.75rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .Play_button svg{
        margin-right: 15px;
    }


    .Hover_player_box .Song_name{
        margin-left: 17px;
        font-size: 20px;
        margin-right: 10px;
    }


    .music_progress_bar {
        display: inline-block;
        width: 16rem;
        /*position: relative;*/
        /*top: 14px;*/
        /*margin-left: 15px;*/
    }
    /*球*/
    .music_progress_bar .el-slider__button {
        width: 0.5rem;
        height: 0.5rem;
        border: 0.05rem solid #409eff;
        background-color: #fff;
        margin-top: -0.25rem;

    }
    /*已完成进度条*/
    .music_progress_bar .el-slider__bar {
        height: 0.1rem;
    }
    /*未完成进度进度条*/
    .music_progress_bar .el-slider__runway{
        background-color: #e0eaf3;
        height: 0.1rem;

    }

    .dn{
        display: none;
    }


</style>