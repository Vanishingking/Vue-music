<template>
    <div class="music_cd_box">
<!--        <div class="music_cd" :class="{musicImgRotate:$store.state.music_isPlaying,pause:$store.state.music_isPaused}">-->
            <div class="music_cd">
            <div class="cd_outside_box">
                <svg xmlns="http://www.w3.org/2000/svg" width="17.75rem" height="17.75rem" viewBox="0 0 355 355">
                    <g id="椭圆_15" data-name="椭圆 15" fill="#fff" stroke="#707070" stroke-width="1" opacity="0.1">
                        <circle cx="177.5" cy="177.5" r="177.5" stroke="none"/>
                        <circle cx="177.5" cy="177.5" r="177" fill="none"/>
                    </g>
                    <circle id="椭圆_16" data-name="椭圆 16" cx="162.5" cy="162.5" r="162.5" transform="translate(15 15)"/>
                    <g id="椭圆_17" data-name="椭圆 17" transform="translate(20 20)" fill="none" stroke="#fff" stroke-width="1" opacity="0.52">
                        <circle cx="157.5" cy="157.5" r="157.5" stroke="none"/>
                        <circle cx="157.5" cy="157.5" r="157" fill="none"/>
                    </g>
                    <g id="椭圆_18" data-name="椭圆 18" transform="translate(25 25)" fill="none" stroke="#fff" stroke-width="1" opacity="0.52">
                        <circle cx="152.5" cy="152.5" r="152.5" stroke="none"/>
                        <circle cx="152.5" cy="152.5" r="152" fill="none"/>
                    </g>
                    <g id="椭圆_25" data-name="椭圆 25" transform="translate(30 30)" fill="none" stroke="#fff" stroke-width="1" opacity="0.52">
                        <circle cx="147.5" cy="147.5" r="147.5" stroke="none"/>
                        <circle cx="147.5" cy="147.5" r="147" fill="none"/>
                    </g>
                    <g id="椭圆_19" data-name="椭圆 19" transform="translate(35 35)" fill="none" stroke="#fff" stroke-width="1" opacity="0.52">
                        <circle cx="142.5" cy="142.5" r="142.5" stroke="none"/>
                        <circle cx="142.5" cy="142.5" r="142" fill="none"/>
                    </g>
                    <g id="椭圆_20" data-name="椭圆 20" transform="translate(40 40)" fill="none" stroke="#fff" stroke-width="1" opacity="0.52">
                        <circle cx="137.5" cy="137.5" r="137.5" stroke="none"/>
                        <circle cx="137.5" cy="137.5" r="137" fill="none"/>
                    </g>
                    <g id="椭圆_21" data-name="椭圆 21" transform="translate(45 45)" fill="none" stroke="#fff" stroke-width="1" opacity="0.52">
                        <circle cx="132.5" cy="132.5" r="132.5" stroke="none"/>
                        <circle cx="132.5" cy="132.5" r="132" fill="none"/>
                    </g>
                    <g id="椭圆_22" data-name="椭圆 22" transform="translate(50 50)" fill="none" stroke="#fff" stroke-width="1" opacity="0.52">
                        <circle cx="127.5" cy="127.5" r="127.5" stroke="none"/>
                        <circle cx="127.5" cy="127.5" r="127" fill="none"/>
                    </g>
                    <g id="椭圆_23" data-name="椭圆 23" transform="translate(55 55)" fill="none" stroke="#fff" stroke-width="1" opacity="0.52">
                        <circle cx="122.5" cy="122.5" r="122.5" stroke="none"/>
                        <circle cx="122.5" cy="122.5" r="122" fill="none"/>
                    </g>
                    <g id="椭圆_24" data-name="椭圆 24" transform="translate(60 60)" fill="none" stroke="#fff" stroke-width="1" opacity="0.52">
                        <circle cx="117.5" cy="117.5" r="117.5" stroke="none"/>
                        <circle cx="117.5" cy="117.5" r="117" fill="none"/>
                    </g>
                </svg>
            </div>
            <div class="cd_image_box" v-if="private_fm_song_data != null">
                <img src='../../../public/img/fire.jpg' class="cd_image" v-if="private_fm_song_data.song_cover == 'Rest1'">
                <img src='../../../public/img/forest.jpg' class="cd_image" v-else-if=" private_fm_song_data.song_cover == 'Rest2'">
                <img src='../../../public/img/rain.jpg' class="cd_image" v-else-if="private_fm_song_data.song_cover == 'Rest3'">
                <img src='../../../public/img/seawater.jpg' class="cd_image" v-else-if="private_fm_song_data.song_cover == 'Rest4'">
                <img :src='private_fm_song_data.song_cover' class="cd_image" v-else>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Music_cd",
        data() {
            return{
                CD_image: '',

            }
        },
        methods: {

        },
        props:{
            private_fm_song_data:{
                type:Array,
                default(){
                    return []
                }
            },
        }

    }
</script>

<style scoped>
    .music_cd{
        width: 17.75rem;
        height: 17.75rem;
        /*margin-top: 12rem;*/
    }
    .cd_outside_box{
        width: 17.75rem;
        height: 17.75rem;
        position: absolute;
        margin-top: 0;
        z-index: 0;
    }
    .cd_image_box{
        width: 17.75rem;
        height: 17.75rem;
        /*background-color: yellow;*/
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        margin-top: 0;
        z-index: 1;

    }
    .cd_image{
        width:  11rem;
        height: 11rem;
        border-radius: 11rem;
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
</style>