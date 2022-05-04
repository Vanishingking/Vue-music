<template>
    <div class="Rest">
        <div style="position: fixed;z-index: 999">
            <audio ref="audio" @play="onPlay" @pause="onPause" @timeupdate="onTimeupdate"  @loadedmetadata="onLoadedmetadata">
                <source :src="music_url[0]">
            </audio>
        </div>

        <div class="Rest_title_box">
            <span>休息</span>
        </div>
        <!--专辑图片-->
        <div class="Song_cover">
            <div style="margin-left: 8rem;z-index: 9">
                <div :class="[music_play?'Singing_Arm_box_spin':'Singing_Arm_box']">
                    <SingingArm></SingingArm>
                </div>
            </div>
            <div :class="{musicImgRotate:music_isPlaying,pause:music_isPaused}">
                <Music_cd :private_fm_song_data="img_url[noise]" ></Music_cd>
            </div>

        </div>

        <div class="private_fm_btn_box">
            <!--歌曲进度条-->
            <div class="progress">
                <!--                歌曲播放实时时间-->
                <span class="Real_time">{{ secondToDate(real_music_time) }}</span>
                <div class="slider">
                    <van-slider v-model="slider_Time" active-color="#ffffff" @change="changeCurrentTime">
                        <template #button>
                            <div class="custom-button"></div>
                        </template>
                    </van-slider>
                </div>
                <!--                歌曲总时间-->
                <span class="Total_time">{{ secondToDate(total_music_time) }}</span>
            </div>
            <!--            播放按钮-->
            <div class="music_assembly">
                <svg v-if="noise==0" xmlns="http://www.w3.org/2000/svg" width="30" height="34.646" viewBox="0 0 30 34.646">
                    <path id="路径_231" data-name="路径 231" d="M177.911,108.359c1.6.533,2.133-.933,1.467-1.467a5.826,5.826,0,0,1-2.4-6.533c.8-2.667,2.933-3.733,2.933-7.733,0,0,2.667,2,2.133,5.066,2.667-3.066,1.467-7.066.933-8.933,6.8,3.6,12.666,11.466,5.866,18.132-.8.667,0,1.867,1.2,1.467,18.532-10.533,4.533-26.265,2.133-28.132.8,1.867.933,4.8-.667,6.266-2.8-10.533-9.6-12.666-9.6-12.666.8,5.466-3.066,11.333-6.666,15.866a12.093,12.093,0,0,0-1.333-5.733c-.267,3.866-3.333,7.066-4.133,11.066-1.067,5.333.8,9.2,8.133,13.333h0Z" transform="translate(-169.501 -73.828)" fill="#fff"/>
                </svg>

                <svg v-if="noise==1" xmlns="http://www.w3.org/2000/svg" width="30" height="29.171" viewBox="0 0 30 29.171">
                    <path id="路径_232" data-name="路径 232" d="M131.8,155.867H103.731a.884.884,0,1,1,0-1.768h8.785l.387-2.983h-5.193a.465.465,0,0,1-.387-.221.605.605,0,0,1,0-.442l.829-1.326-.387.055h-.055a.47.47,0,0,1-.387-.718l2.762-4.53-1.271.166h-.055a.417.417,0,0,1-.387-.221.334.334,0,0,1,0-.442l.773-1.326-.276.055a.458.458,0,0,1-.442-.166.414.414,0,0,1,0-.5l2.1-3.481h-.884a.465.465,0,0,1-.387-.221.417.417,0,0,1,.055-.442l1.713-2.21h-.442a.442.442,0,0,1-.387-.663l3.978-7.569a.37.37,0,0,1,.387-.221.465.465,0,0,1,.387.221l3.978,7.514a.332.332,0,0,1,.055.221.475.475,0,0,1-.442.442H118.1l1.657,2.21a.422.422,0,0,1,.111.276.475.475,0,0,1-.442.442h-.884l2.1,3.425a.422.422,0,0,1,.11.276.475.475,0,0,1-.442.442h-.11l-.276-.055.718,1.271a.414.414,0,0,1,.055.276.436.436,0,0,1-.442.442h-.111l-1.271-.111,2.762,4.53a.414.414,0,0,1,0,.5.37.37,0,0,1-.442.166l-.387-.055.829,1.271a.422.422,0,0,1,.111.276.436.436,0,0,1-.442.442h-5.249l.442,2.983h6.8l.221-1.713h-3.536a.3.3,0,0,1-.276-.166.247.247,0,0,1,0-.276l.221-.332h1.271a.828.828,0,0,0,.829-.884.771.771,0,0,0-.166-.5l-.387-.552a.743.743,0,0,0,.387-.331.833.833,0,0,0,0-.939l-.166-.829-.718-1.16-.055-.111-.331-.552-.773-1.271.442.055h.166a.828.828,0,0,0,.829-.884v-.166c0-.111-.055-.166-.111-.276a.2.2,0,0,1,.055-.166l1.16-1.492h-.276a.3.3,0,0,1-.276-.166.247.247,0,0,1,0-.276l2.707-5.083a.313.313,0,0,1,.552,0l2.707,5.083a.2.2,0,0,1,.055.166.261.261,0,0,1-.276.276h-.276l1.1,1.492c.055.055.055.111.055.221a.261.261,0,0,1-.276.276h-.608l1.436,2.32a.2.2,0,0,1,.055.166.261.261,0,0,1-.276.276h-.387l.5.884a.2.2,0,0,1,.055.166.261.261,0,0,1-.276.276l-.884-.111,1.878,3.039a.352.352,0,0,1,0,.331.2.2,0,0,1-.276.11l-.276-.055.552.884a.2.2,0,0,1,.055.166.261.261,0,0,1-.276.276h-3.536l.276,1.713h5.8a.873.873,0,0,1,.884.884,1.123,1.123,0,0,1-1.05.994Zm-23.039-13.646Z" transform="translate(-102.847 -126.696)" fill="#fff"/>
                </svg>

                <svg v-if="noise==2" xmlns="http://www.w3.org/2000/svg" width="30" height="25" viewBox="0 0 30 25">
                    <g id="组_30" data-name="组 30" transform="translate(-75.372 -145.264)">
                        <path id="路径_216" data-name="路径 216" d="M432.563,825.811a.9.9,0,1,0,.917.9A.911.911,0,0,0,432.563,825.811Z" transform="translate(-344.108 -657.356)" fill="#fff"/>
                        <path id="路径_217" data-name="路径 217" d="M320.246,781.491a.9.9,0,1,0,.917.9A.911.911,0,0,0,320.246,781.491Z" transform="translate(-235.626 -614.845)" fill="#fff"/>
                        <path id="路径_218" data-name="路径 218" d="M432.563,599.661a.911.911,0,0,0-.918.9v6.558a.917.917,0,0,0,1.834,0v-6.558A.91.91,0,0,0,432.563,599.661Z" transform="translate(-344.108 -440.439)" fill="#fff"/>
                        <path id="路径_219" data-name="路径 219" d="M320.246,555.365a.911.911,0,0,0-.918.9v6.557a.917.917,0,0,0,1.834,0V556.27A.911.911,0,0,0,320.246,555.365Z" transform="translate(-235.626 -396.981)" fill="#fff"/>
                        <path id="路径_220" data-name="路径 220" d="M657.223,825.811a.9.9,0,1,0,.918.9A.91.91,0,0,0,657.223,825.811Z" transform="translate(-561.099 -657.356)" fill="#fff"/>
                        <path id="路径_221" data-name="路径 221" d="M657.223,599.661a.911.911,0,0,0-.917.9v6.558a.917.917,0,0,0,1.834,0v-6.558A.911.911,0,0,0,657.223,599.661Z" transform="translate(-561.099 -440.439)" fill="#fff"/>
                        <path id="路径_222" data-name="路径 222" d="M544.882,781.491a.9.9,0,1,0,.918.9A.911.911,0,0,0,544.882,781.491Z" transform="translate(-452.592 -614.845)" fill="#fff"/>
                        <path id="路径_223" data-name="路径 223" d="M100.509,151.993a9.639,9.639,0,0,0-9.389-6.729,9.864,9.864,0,0,0-8.668,5,7.6,7.6,0,0,0-7.081,7.411,7.522,7.522,0,0,0,5.76,7.168l.008-.031a.734.734,0,0,0,.16.031.7.7,0,0,0,.72-.682.682.682,0,0,0-.564-.651l.008-.03c-2.842-.931-4.542-2.992-4.542-5.806a6.124,6.124,0,0,1,5.936-5.968,6.575,6.575,0,0,1,4.856,2.484l.006,0a.774.774,0,0,0,.665.377.758.758,0,0,0,.779-.736.7.7,0,0,0-.065-.293l.005,0c-.031-.045-.068-.084-.1-.129a.722.722,0,0,0-.079-.1A7.137,7.137,0,0,0,84.16,150.4a8.344,8.344,0,0,1,6.961-3.667,8.082,8.082,0,0,1,7.991,6.011l.1.43.451.113a5.345,5.345,0,0,1,4.155,5.1,5.215,5.215,0,0,1-3.88,5.144v0a.68.68,0,0,0-.456.63.665.665,0,0,0,.858.655v0l.013,0a.719.719,0,0,0,.192-.064,6.624,6.624,0,0,0-.041-12.759Z" transform="translate(0 0)" fill="#fff"/>
                        <path id="路径_224" data-name="路径 224" d="M544.882,555.365a.911.911,0,0,0-.918.9v6.557a.918.918,0,0,0,1.835,0V556.27A.911.911,0,0,0,544.882,555.365Z" transform="translate(-452.592 -396.981)" fill="#fff"/>
                    </g>
                </svg>

                <svg v-if="noise==3" xmlns="http://www.w3.org/2000/svg" width="30" height="19.999" viewBox="0 0 30 19.999">
                    <path id="Icon_awesome-water" data-name="Icon awesome-water" d="M29.281,21.165a6.016,6.016,0,0,1-3.016-1.193,2.02,2.02,0,0,0-2.511,0,6.526,6.526,0,0,1-7.59-.078,1.933,1.933,0,0,0-2.433.094A6.529,6.529,0,0,1,6.168,19.9a1.964,1.964,0,0,0-2.454.1A5.906,5.906,0,0,1,.708,21.17.809.809,0,0,0,0,21.988v1.677a.822.822,0,0,0,.87.833A9.362,9.362,0,0,0,5.006,23.15a9.988,9.988,0,0,0,10,0,9.988,9.988,0,0,0,10,0,9.63,9.63,0,0,0,4.12,1.344A.822.822,0,0,0,30,23.66V22.014a.836.836,0,0,0-.719-.849Zm0-7.5a6.017,6.017,0,0,1-3.016-1.193,2.02,2.02,0,0,0-2.511,0,6.526,6.526,0,0,1-7.59-.078,1.933,1.933,0,0,0-2.433.094A6.529,6.529,0,0,1,6.168,12.4a1.964,1.964,0,0,0-2.454.1A5.906,5.906,0,0,1,.708,13.669.809.809,0,0,0,0,14.487v1.677A.822.822,0,0,0,.87,17a9.362,9.362,0,0,0,4.136-1.349,9.988,9.988,0,0,0,10,0,9.988,9.988,0,0,0,10,0,9.63,9.63,0,0,0,4.12,1.344.822.822,0,0,0,.87-.833V14.513a.836.836,0,0,0-.719-.849Zm0-7.5A6.064,6.064,0,0,1,26.265,4.97a2.02,2.02,0,0,0-2.511,0,6.526,6.526,0,0,1-7.59-.078,1.933,1.933,0,0,0-2.433.094A6.529,6.529,0,0,1,6.168,4.9,1.964,1.964,0,0,0,3.714,5,5.906,5.906,0,0,1,.708,6.168.809.809,0,0,0,0,6.986V8.663A.822.822,0,0,0,.87,9.5,9.362,9.362,0,0,0,5.006,8.147a9.988,9.988,0,0,0,10,0,9.988,9.988,0,0,0,10,0,9.63,9.63,0,0,0,4.12,1.344A.822.822,0,0,0,30,8.658V7.012a.836.836,0,0,0-.719-.849Z" transform="translate(0 -4.503)" fill="#fff"/>
                </svg>


                <!--上一首-->
                <svg @click="noise_last" xmlns="http://www.w3.org/2000/svg" width="22.5" height="22.5" viewBox="0 0 22.5 22.5" >
                    <path id="Icon_ionic-ios-skip-backward" data-name="Icon ionic-ios-skip-backward" d="M12.3,7.031V16.72L28.4,6.9a.566.566,0,0,1,.851.485V28.617a.565.565,0,0,1-.851.485L12.3,19.28v9.689a.282.282,0,0,1-.281.281H7.031a.282.282,0,0,1-.281-.281V7.031a.282.282,0,0,1,.281-.281h4.992A.282.282,0,0,1,12.3,7.031Z" transform="translate(-6.75 -6.75)" fill="#ffffff"/>
                </svg>
                <!--                暂停-->
                <svg v-if="music_play" @click="music_play_start()" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                    <path id="Icon_awesome-pause" data-name="Icon awesome-pause" d="M5.786,20.18H1.929A1.929,1.929,0,0,1,0,18.251V4.108A1.929,1.929,0,0,1,1.929,2.18H5.786A1.929,1.929,0,0,1,7.714,4.108V18.251A1.929,1.929,0,0,1,5.786,20.18ZM18,18.251V4.108A1.929,1.929,0,0,0,16.071,2.18H12.214a1.929,1.929,0,0,0-1.929,1.929V18.251a1.929,1.929,0,0,0,1.929,1.929h3.857A1.929,1.929,0,0,0,18,18.251Z" transform="translate(0 -2.18)" fill="#ffffff"/>
                </svg>
                <!--                播放-->
                <svg v-if="!music_play" @click="music_play_start()" xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21">
                    <path id="Icon_awesome-play" data-name="Icon awesome-play" d="M17.052,8.807,2.909.272A1.918,1.918,0,0,0,0,1.966V19.031a1.927,1.927,0,0,0,2.909,1.694l14.143-8.531a1.988,1.988,0,0,0,0-3.388Z" transform="translate(0 -0.002)" fill="#ffffff"/>
                </svg>
                <!--下一首-->
                <svg @click="noise_next" xmlns="http://www.w3.org/2000/svg" width="22.5" height="22.5" viewBox="0 0 22.5 22.5">
                    <path id="Icon_ionic-ios-skip-forward" data-name="Icon ionic-ios-skip-forward" d="M23.7,7.031V16.72L7.6,6.9a.565.565,0,0,0-.851.485V28.617A.565.565,0,0,0,7.6,29.1L23.7,19.28v9.689a.282.282,0,0,0,.281.281h4.992a.282.282,0,0,0,.281-.281V7.031a.282.282,0,0,0-.281-.281H23.977A.282.282,0,0,0,23.7,7.031Z" transform="translate(-6.75 -6.75)" fill="#ffffff"/>
                </svg>
                <!--                评论-->
                <svg @click="noise_reviews(noise)" id="组_25" data-name="组 25" xmlns="http://www.w3.org/2000/svg" width="35.634" height="27.401" viewBox="0 0 35.634 27.401">
                    <path id="路径_189" data-name="路径 189" d="M17.279,0a1.864,1.864,0,1,1-.728.147A1.866,1.866,0,0,1,17.279,0Zm-7.7,0a1.867,1.867,0,1,1-.729.147A1.866,1.866,0,0,1,9.576,0Zm-7.7,0a1.867,1.867,0,1,1-.729.147A1.866,1.866,0,0,1,1.873,0Z" transform="translate(8.236 10.912)" fill="#bbb"/>
                    <path id="路径_190" data-name="路径 190" d="M17.812,0a24.5,24.5,0,0,1,6.93.979,19.643,19.643,0,0,1,5.666,2.668A13.364,13.364,0,0,1,34.231,7.6a9.257,9.257,0,0,1,1.4,4.836,9.049,9.049,0,0,1-.43,2.754,10.1,10.1,0,0,1-1.255,2.57,12.5,12.5,0,0,1-2.025,2.308,16.083,16.083,0,0,1-2.741,1.968c.023.093.053.2.087.31s.073.229.114.347.082.235.122.347l.113.312c.12.33.234.642.331.939a7.237,7.237,0,0,1,.228.843,3,3,0,0,1,.062.753,1.762,1.762,0,0,1-.169.671,1.515,1.515,0,0,1-.157.258,1.467,1.467,0,0,1-.442.389,1.518,1.518,0,0,1-.275.123q-.055.018-.109.032c-.036.009-.073.017-.109.023s-.073.011-.111.014-.075,0-.113,0a1.867,1.867,0,0,1-.582-.1,4.772,4.772,0,0,1-.722-.318c-.272-.143-.58-.323-.936-.543s-.761-.479-1.227-.779l-.588-.377c-.207-.132-.42-.266-.625-.391s-.4-.242-.573-.34a4.7,4.7,0,0,0-.432-.222q-.636.136-1.284.238t-1.306.171q-.658.069-1.324.1t-1.339.034a24.491,24.491,0,0,1-6.93-.979,19.631,19.631,0,0,1-5.665-2.668A13.36,13.36,0,0,1,1.4,17.272,9.052,9.052,0,0,1,1.4,7.6a13.346,13.346,0,0,1,3.82-3.953A19.629,19.629,0,0,1,10.882.979,24.493,24.493,0,0,1,17.812,0Zm0,22.587q.638,0,1.271-.034t1.256-.1q.623-.068,1.236-.169t1.212-.236a1.444,1.444,0,0,1,.595-.007,3.047,3.047,0,0,1,.734.256c.282.133.61.316,1,.554s.856.531,1.406.885l.24.155.257.165.266.169.268.169-.023-.067-.023-.065-.022-.063-.021-.059c-.134-.369-.273-.75-.384-1.126a5.362,5.362,0,0,1-.223-1.092,2,2,0,0,1,.126-.95,1.428,1.428,0,0,1,.663-.7,14.44,14.44,0,0,0,2.417-1.624,10.684,10.684,0,0,0,1.788-1.893,8.063,8.063,0,0,0,1.109-2.093,6.763,6.763,0,0,0,.381-2.225,7.2,7.2,0,0,0-1.222-3.945,11.26,11.26,0,0,0-3.331-3.226A17.653,17.653,0,0,0,23.85,3.089a23.225,23.225,0,0,0-12.078,0A17.653,17.653,0,0,0,6.836,5.266,11.26,11.26,0,0,0,3.506,8.492a7.2,7.2,0,0,0-1.222,3.945,7.208,7.208,0,0,0,1.222,3.947,11.26,11.26,0,0,0,3.331,3.227,17.649,17.649,0,0,0,4.936,2.177A22.7,22.7,0,0,0,17.812,22.587Z" fill="#bbb"/>
                </svg>
            </div>
        </div>

        <div style="position: fixed; top:3.5rem;left:1rem;z-index: 9">
            <Back :color="2"></Back>
        </div>
    </div>
</template>

<script>
    import Back from '../../components/menu/Back'
    import Music_cd from "../../components/home/Music_cd";
    import SingingArm from "../../components/home/SingingArm";
    import bonfire from '../../../public/audio/bonfire.mp3';
    import forest from '../../../public/audio/forest.mp3';
    import rain from '../../../public/audio/rain.mp3';
    import seawater from '../../../public/audio/seawater.mp3';
    import { defineComponent } from 'vue'
    export default defineComponent( {
        components: { Music_cd,SingingArm,Back},
        props:{
            sliderTime:Number,
            music:{
                type:Array,
                default(){
                    return []
                }
            },
        },
        name: "Musicplayer",
        data() {

            return {
                slider_Time:0,
                private_fm_song_data:[],
                pfs_index:0,
                img_url:[{song_cover:'Rest1'},{song_cover:'Rest2'},{song_cover:'Rest3'},{song_cover:'Rest4'}],
                music_url:[bonfire,forest,rain,seawater],//火，丛林，雨，海
                music_play:false,
                music_isPaused:false,
                music_isPlaying:false,

                total_music_time:'00:00',//总时间
                real_music_time:'00:00',//实时时间
                noise:0
            }
        },
        computed:{
            MusicPlayId(){
                return this.$store.state.music_play_id
            }
        },
        methods: {
            onPlay(){

            },
            onPause(){

            },
            changeCurrentTime(index){
                this.$refs.audio.currentTime = parseInt(index / 100 * this.total_music_time)
            },
            // 歌曲播放、暂停
            music_play_start(){
                return this.music_play ? this.pausePlay() : this.startPlay()

            },
            startPlay(){
                this.$emit('rest')
                // 音乐播放
                this.music_play = true
                //唱片旋转
                this.music_isPlaying = true
                this.music_isPaused = false

                this.$refs.audio.play()

            },
            pausePlay(){
                // 音乐暂停
                this.music_play = false
                //唱片旋转暂停
                this.music_isPaused = true

                this.$refs.audio.pause()

            },
            // 实时时间
            onTimeupdate(res){
                this.real_music_time = parseInt(res.target.currentTime)
            },
            // 音乐总时间
            onLoadedmetadata(res){
                this.total_music_time = parseInt(res.target.duration)
            },
            noise_last(){
                if (this.noise>0){
                    this.noise =  this.noise-1
                    this.$refs.audio.src = this.music_url[this.noise]
                    this.$refs.audio.currentTime = 0
                    if (this.music_play){
                        this.slider_Time = 0
                        this.$refs.audio.play()
                    }
                    this.$router.replace(`/home/rest/${this.noise}`)
                }else {
                    this.$toast('尽情期待')
                }


            },
            noise_next(){
                if (this.noise<3){
                    this.noise =  this.noise+1
                    this.$refs.audio.src = this.music_url[this.noise]
                    this.$refs.audio.currentTime = 0
                    if (this.music_play){
                        this.slider_Time = 0
                        this.$refs.audio.play()
                    }
                    this.$router.replace(`/home/rest/${this.noise}`)
                }else {
                    this.$toast('尽情期待')
                }

            },
          noise_reviews(type){
              this.$router.push({path:`/home/WhiteNoiseReviews/${type}`})
          }

        },
        mounted() {
            console.log(this.music_url)
        },
        setup(){
            function secondToDate(result) {
                if (result == '00:00'){
                    result = '00:00'
                }else {
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
                        m = Math.floor((result / 60));
                        if ((result%60)<10){
                            s = Math.floor((result % 60));
                            result =   m + ":" + '0'+s ;
                        }else {
                            s = Math.floor((result % 60));
                            result =   m + ":"+s ;
                        }
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
    .Rest_title_box{
        width: 100%;
        height: 15%;
    }
    .Rest_title_box span{
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
    .Rest{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: black;

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
        background-color: black;
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
    .musicImgRotate{
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

</style>