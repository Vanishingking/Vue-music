<template>
    <div  class="Hover_player_box" v-if="private_fm_song_data!=[]">
        <audio ref="audio"
               @timeupdate="onTimeupdate"
               @loadedmetadata="onLoadedmetadata">
            <source :src="music_url">
        </audio>
        <!--            虚化背景-->
        <div class="blur_box">
            <img :src="private_fm_song_data[pfs_index].song_cover" class="blur" v-if="private_fm_song_data!=''">
        </div>
        <!--返回键-->
        <div class="private_fm_title_box">
            <span>个性音乐</span>
        </div>
        <!--专辑图片-->
        <div class="Song_cover">
            <div style="margin-left: 8rem;z-index: 9">
            <div :class="[music_play?'Singing_Arm_box_spin':'Singing_Arm_box']">
                <SingingArm></SingingArm>
            </div>
            </div>
            <div :class="{musicImgRotate:music_isPlaying,pause:music_isPaused}">
                <Music_cd :private_fm_song_data="private_fm_song_data[pfs_index]"></Music_cd>
            </div>

            <div class="song_name" >
                <span v-if="song_name!=''">{{ song_name }}</span>
            </div>

        </div>

        <div class="private_fm_btn_box">
        <!--歌曲进度条-->
        <div class="progress">
            <!--                歌曲播放实时时间-->
            <span class="Real_time">{{ secondToDate(currentTime) }}</span>
            <div class="slider">
            <van-slider v-model="sliderTime" active-color="#ffffff" @change="changeCurrentTime">
                <template #button>
                    <div class="custom-button"></div>
                </template>
            </van-slider>
            </div>
            <!--                歌曲总时间-->
            <span class="Total_time">{{ secondToDate(maxTime) }}</span>
        </div>
        <!--            播放按钮-->
        <div class="music_assembly">
<!--                心动模式-->
            <svg xmlns="http://www.w3.org/2000/svg" width="45.598" height="37.4" viewBox="0 0 45.598 37.4">
                <path id="路径_188" data-name="路径 188" d="M35.189,127.875a1.6,1.6,0,0,1-1.568-1.3,11.875,11.875,0,0,1,3.132-10.491,11.285,11.285,0,0,1,16.234,0l.593.609.593-.608a11.286,11.286,0,0,1,16.235,0A11.9,11.9,0,0,1,73.59,126.3a1.6,1.6,0,1,1-3.154-.517,8.708,8.708,0,0,0-2.318-7.47,8.086,8.086,0,0,0-11.654,0l-1.1,1.126a2.489,2.489,0,0,1-3.571,0l-1.1-1.126a8.085,8.085,0,0,0-11.652,0,8.684,8.684,0,0,0-2.281,7.675,1.6,1.6,0,0,1-1.573,1.891Zm18.392,22.164a3.365,3.365,0,0,1-2.426-1.026l-11.87-12.167a1.6,1.6,0,1,1,2.29-2.226l11.872,12.167a.181.181,0,0,0,.272,0l12.137-12.441a1.6,1.6,0,1,1,2.29,2.226L56.008,149.013A3.365,3.365,0,0,1,53.581,150.039Zm-1.8-11.181a2.5,2.5,0,0,1-2.276-1.474l-2.286-5.034H32.377a1.6,1.6,0,0,1,0-3.191h15.3a2.509,2.509,0,0,1,2.277,1.473l1.678,3.695,2.709-9.608a2.5,2.5,0,0,1,4.687-.033l.055.145.73,4.22H74.784a1.6,1.6,0,0,1,0,3.191H59.207a2.519,2.519,0,0,1-2.337-1.619l-.055-.145-.3-1.718-2.382,8.447a2.5,2.5,0,0,1-2.256,1.649l-.1,0ZM47.675,132.35Z" transform="translate(-30.781 -112.639)" fill="#BBBBBB"/>
            </svg>
<!--            收藏-->
            <svg xmlns="http://www.w3.org/2000/svg" width="38.004" height="33.505" viewBox="0 0 38.004 33.505">
                <path id="Icon_awesome-heart" data-name="Icon awesome-heart" d="M32.505,4.4a9.615,9.615,0,0,0-13.12.956L18,6.785,16.615,5.358A9.615,9.615,0,0,0,3.495,4.4,10.1,10.1,0,0,0,2.8,19.02L16.4,33.068a2.2,2.2,0,0,0,3.185,0L33.195,19.02A10.09,10.09,0,0,0,32.505,4.4Z" transform="translate(1.003 -1.244)" fill="none" stroke="#bbb" stroke-width="2"/>
            </svg>
            <!--                暂停-->
            <svg v-if="music_play" @click="fm_music_play_start" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path id="Icon_awesome-pause" data-name="Icon awesome-pause" d="M5.786,20.18H1.929A1.929,1.929,0,0,1,0,18.251V4.108A1.929,1.929,0,0,1,1.929,2.18H5.786A1.929,1.929,0,0,1,7.714,4.108V18.251A1.929,1.929,0,0,1,5.786,20.18ZM18,18.251V4.108A1.929,1.929,0,0,0,16.071,2.18H12.214a1.929,1.929,0,0,0-1.929,1.929V18.251a1.929,1.929,0,0,0,1.929,1.929h3.857A1.929,1.929,0,0,0,18,18.251Z" transform="translate(0 -2.18)" fill="#ffffff"/>
            </svg>
            <!--                播放-->
            <svg v-else @click="fm_music_play_start" xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21">
                <path id="Icon_awesome-play" data-name="Icon awesome-play" d="M17.052,8.807,2.909.272A1.918,1.918,0,0,0,0,1.966V19.031a1.927,1.927,0,0,0,2.909,1.694l14.143-8.531a1.988,1.988,0,0,0,0-3.388Z" transform="translate(0 -0.002)" fill="#ffffff"/>
            </svg>
            <!--下一首-->
            <svg @click="next_song" xmlns="http://www.w3.org/2000/svg" width="22.5" height="22.5" viewBox="0 0 22.5 22.5" >
                <path id="Icon_ionic-ios-skip-forward" data-name="Icon ionic-ios-skip-forward" d="M23.7,7.031V16.72L7.6,6.9a.565.565,0,0,0-.851.485V28.617A.565.565,0,0,0,7.6,29.1L23.7,19.28v9.689a.282.282,0,0,0,.281.281h4.992a.282.282,0,0,0,.281-.281V7.031a.282.282,0,0,0-.281-.281H23.977A.282.282,0,0,0,23.7,7.031Z" transform="translate(-6.75 -6.75)" fill="#ffffff"/>
            </svg>
            <!--                评论-->
            <svg @click="song_comment" id="组_25" data-name="组 25" xmlns="http://www.w3.org/2000/svg" width="35.634" height="27.401" viewBox="0 0 35.634 27.401">
                <path id="路径_189" data-name="路径 189" d="M17.279,0a1.864,1.864,0,1,1-.728.147A1.866,1.866,0,0,1,17.279,0Zm-7.7,0a1.867,1.867,0,1,1-.729.147A1.866,1.866,0,0,1,9.576,0Zm-7.7,0a1.867,1.867,0,1,1-.729.147A1.866,1.866,0,0,1,1.873,0Z" transform="translate(8.236 10.912)" fill="#bbb"/>
                <path id="路径_190" data-name="路径 190" d="M17.812,0a24.5,24.5,0,0,1,6.93.979,19.643,19.643,0,0,1,5.666,2.668A13.364,13.364,0,0,1,34.231,7.6a9.257,9.257,0,0,1,1.4,4.836,9.049,9.049,0,0,1-.43,2.754,10.1,10.1,0,0,1-1.255,2.57,12.5,12.5,0,0,1-2.025,2.308,16.083,16.083,0,0,1-2.741,1.968c.023.093.053.2.087.31s.073.229.114.347.082.235.122.347l.113.312c.12.33.234.642.331.939a7.237,7.237,0,0,1,.228.843,3,3,0,0,1,.062.753,1.762,1.762,0,0,1-.169.671,1.515,1.515,0,0,1-.157.258,1.467,1.467,0,0,1-.442.389,1.518,1.518,0,0,1-.275.123q-.055.018-.109.032c-.036.009-.073.017-.109.023s-.073.011-.111.014-.075,0-.113,0a1.867,1.867,0,0,1-.582-.1,4.772,4.772,0,0,1-.722-.318c-.272-.143-.58-.323-.936-.543s-.761-.479-1.227-.779l-.588-.377c-.207-.132-.42-.266-.625-.391s-.4-.242-.573-.34a4.7,4.7,0,0,0-.432-.222q-.636.136-1.284.238t-1.306.171q-.658.069-1.324.1t-1.339.034a24.491,24.491,0,0,1-6.93-.979,19.631,19.631,0,0,1-5.665-2.668A13.36,13.36,0,0,1,1.4,17.272,9.052,9.052,0,0,1,1.4,7.6a13.346,13.346,0,0,1,3.82-3.953A19.629,19.629,0,0,1,10.882.979,24.493,24.493,0,0,1,17.812,0Zm0,22.587q.638,0,1.271-.034t1.256-.1q.623-.068,1.236-.169t1.212-.236a1.444,1.444,0,0,1,.595-.007,3.047,3.047,0,0,1,.734.256c.282.133.61.316,1,.554s.856.531,1.406.885l.24.155.257.165.266.169.268.169-.023-.067-.023-.065-.022-.063-.021-.059c-.134-.369-.273-.75-.384-1.126a5.362,5.362,0,0,1-.223-1.092,2,2,0,0,1,.126-.95,1.428,1.428,0,0,1,.663-.7,14.44,14.44,0,0,0,2.417-1.624,10.684,10.684,0,0,0,1.788-1.893,8.063,8.063,0,0,0,1.109-2.093,6.763,6.763,0,0,0,.381-2.225,7.2,7.2,0,0,0-1.222-3.945,11.26,11.26,0,0,0-3.331-3.226A17.653,17.653,0,0,0,23.85,3.089a23.225,23.225,0,0,0-12.078,0A17.653,17.653,0,0,0,6.836,5.266,11.26,11.26,0,0,0,3.506,8.492a7.2,7.2,0,0,0-1.222,3.945,7.208,7.208,0,0,0,1.222,3.947,11.26,11.26,0,0,0,3.331,3.227,17.649,17.649,0,0,0,4.936,2.177A22.7,22.7,0,0,0,17.812,22.587Z" fill="#bbb"/>
            </svg>
        </div>
        </div>

        <div style="position: fixed; top:3.5rem;left:1rem;z-index: 9">
            <Back :color="1"></Back>
        </div>
    </div>
</template>

<script>
    import Back from '../../components/menu/Back'
    import Music_cd from "../../components/home/Music_cd";
    import SingingArm from "../../components/home/SingingArm";
    import ajax from "../../http"
    import { defineComponent } from 'vue'

    export default defineComponent( {
        components: {Music_cd,SingingArm,Back},
        name: "Musicplayer",
        data() {

            return {
                private_fm_song_data:[],
                pfs_index:0,
                currentTime:0,
                sliderTime:0,
                maxTime:0,
                Played_time:0,
                music_url:'',
                Total_timeZ:0,
                music_play:false,
                song_id:'',
                music_isPaused:false,
                music_isPlaying:false,
                song_name:''

            }
        },
        computed:{
        },

        watch:{
            sliderTime(newVal){
                this.slider_Time = newVal
            },
            MusicPlayId(){
                this.$store.commit('destroy_music_play_name')
                setTimeout(()=>{
                    this.$emit('PlayMusic')
                },800)
                // this.$emit('PlayMusic')
            },
            song_id(val){
                ajax(
                    this.$store.state.api_url+'song/url?id='+val,
                ).then((res)=>{
                    // console.log(res.data[0].url);
                    this.$refs.audio.src = res.data[0].url
                }).catch((err)=>{
                    console.log(err);
                    this.rest()
                })
            },
        },
        methods: {
            song_comment(){
                let id = this.$route.params.songid
                this.$store.commit('advance')
                this.$router.push(`/home/songcomment/${ id }`)

            },
            // 下一首
            async next_song(data,index){

                if (this.pfs_index < this.private_fm_song_data.length-1){
                    this.pfs_index = this.pfs_index+1
                    var id = data[index+1].song_id
                    console.log(this.pfs_index)
                    this.$router.replace(`/home/privatefm/${id}`)
                }else {
                    await ajax(
                        this.$store.state.api_url+'personal_fm',
                        {cookie:this.$store.state.user_cookie},
                    ).then((res)=>{
                        console.log(res);
                        for (let i = 0; i<res.data.length;i++){
                            this.private_fm_song_data.push({
                                song_name:res.data[i].name,

                                song_cover:res.data[i].album.picUrl,
                                song_singer:res.data[i].album.artists[0].name,
                                song_singer_id:res.data[i].album.artists[0].id
                            })
                        }
                        this.song_id = res.data[0].id
                    }).catch((err)=>{
                        console.log(err);
                    })
                }
            },
            changeCurrentTime(index){
                this.$refs.audio.currentTime = parseInt(index / 100 * this.maxTime)
            },
            // 歌曲播放、暂停
            fm_music_play_start(){
                this.music_play  = !this.music_play
                if (this.music_play){
                    this.music_isPlaying = true
                    this.music_isPaused = false
                    this.$refs.audio.play()
                }else {
                    this.music_isPaused = true
                    this.$refs.audio.pause()
                }
            },

            // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
            onTimeupdate(res) {
                this.currentTime = parseInt(res.target.currentTime)
                this.sliderTime = parseInt(this.currentTime / this.maxTime * 100)
            },
            // 当加载语音流元数据完成后，会触发该事件的回调函数
            // 语音元数据主要是语音的长度之类的数据
            onLoadedmetadata(res) {
                //总时间
                this.maxTime =  parseInt(res.target.duration)

            }

        },
        mounted() {
                ajax(
                    this.$store.state.api_url+'personal_fm'
                ).then((res)=>{
                for (let i = 0; i<res.data.length;i++){
                            this.private_fm_song_data.push({
                                song_name:res.data[i].name,
                                song_id:res.data[i].id,
                                song_cover:res.data[i].album.picUrl,
                                song_singer:res.data[i].album.artists[0].name,
                                song_singer_id:res.data[i].album.artists[0].id
                            })
                }
                this.song_id = res.data[0].id
                    this.song_name = res.data[0].name

            }).catch((err)=>{
                console.log(err);
            })

        },


        setup(){
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
            return{
                secondToDate
            }
        }
    })
</script>

<style scoped>
    .private_fm_title_box{
        width: 100%;
        height: 15%;
    }
    .private_fm_title_box span{
        display: flex;
        justify-content: center;
        font-size: 20px;
        font-weight: bold;
        margin-top: 3.75rem;
        color: white;
    }


    .slider {
        display: inline-block;
        width: 16rem;
    }
    .Hover_player_box{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        overflow-y: hidden;
        overflow-x: hidden;
        /*background-color: cornflowerblue;*/
        display: flex;
        /*align-items: center;*/
        flex-direction: column;
        align-items: center;

    }
    .blur{
        position: fixed;
        top:-5%;
        left: -5%;
        right: -5%;
        width:110%;
        height: 110%;
        z-index: 1;
        /*object-fit:cover;*/
        /*模糊程度*/
        -webkit-filter: blur(70px); /* Chrome, Opera */
    }
    .blur_box{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        z-index: -1;
    }
   .Song_cover{
        width: 100%;
        height: 60%;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: center;
    }
    .Song_cover img{
        width: 13.75rem;
        height: 13.75rem;
        border-radius: 5px;
    }
    .progress{
        width: 100%;
        height: 1.75rem;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin-top: 1rem;
    }
    .progress span{
        font-size: 0.5rem;
        color: white;
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
    .private_fm_btn_box{
        width: 100%;
        height: 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .Singing_Arm_box{
        /*旋转点左上*/
        transform-origin: 0.9rem 0.9rem;
        transform:rotate(10deg);
        transition: all 0.8s;
    }
    .Singing_Arm_box_spin{
        /*旋转点左上*/
        transform-origin: 0.9rem 0.9rem;
        transform:rotate(35deg);
        transition: all 0.8s;
    }
    .custom-button {
        width: 0.5rem;
        height: 0.5rem;
        color: #C5C5C5;
        font-size: 10px;
        line-height: 18px;
        text-align: center;
        background-color: #ffffff;
        border-radius: 1rem;
    }
    .custom-image .van-empty__image {
        width: 90px;
        height: 90px;
    }

    .musicImgRotate {
        width: 17.75rem;
        height: 17.75rem;
        animation: rotate 6s linear infinite;
    }
    @keyframes rotate {
        0% {
            transform: rotateZ(0deg);
            /*从0度开始*/
        }
        100% {
            transform: rotateZ(360deg);
            /*360度结束*/
        }
    }
    .pause{
        animation-play-state:paused;
    }

    .song_name{
        width: 100%;
        height: 8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 18px;
    }
</style>