<template>
    <div class="om_button" :class="[$store.state.theme == 'night' ? 'om_button_night':'']">
        <div class="om_body_box">
            <div :class="[$store.state.theme == 'night' ? 'body_bag_night':'body_bag']" :style="{backgroundColor:$store.state.floats_player_background}"></div>
            <div class="om_body">
                <img :src="$store.state.home_music_img" class="play_music_img" @click="open_music_play">
                <div class="om_span" @click="open_music_play">
                        <van-notice-bar :scrollable="scrollable" :text="text" :color="notice_color" background="none" style="font-size: 16px" ref="van_notice_bar"/>
<!--                    <span style="margin-right: 1rem">孤勇者</span>-<span style="margin-left: 1rem">陈奕迅</span>-->
                </div>
                <div class="om_but">
                  <svg  @click="home_play" v-if="!home_music " style="margin-right: 1rem;margin-left: 1rem" xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 36 36">
                    <g id="组_33" data-name="组 33" transform="translate(0.5 0.5)">
                      <path id="路径_248" data-name="路径 248" d="M17.5,0A17.5,17.5,0,1,0,35,17.5,17.551,17.551,0,0,0,17.5,0Zm0,33.542A16.042,16.042,0,1,1,33.542,17.5,16.089,16.089,0,0,1,17.5,33.542Z" fill="#fff" stroke="#fff" stroke-width="1"/>
                      <path id="路径_249" data-name="路径 249" d="M404.047,315.124l-5.773-3.825c-1.948-1.3-3.608-.433-3.608,1.948v8.659c0,2.381,1.588,3.247,3.608,1.948l5.773-3.825c1.948-1.443,1.948-3.608,0-4.907Z" transform="translate(-381.113 -300.004)" fill="#fff" stroke="#fff" stroke-width="1"/>
                    </g>
                  </svg>
                  <svg  @click="home_play" v-show="home_music " style="margin-right: 1rem;margin-left: 1rem" xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 36 36">
                    <g id="组_35" data-name="组 35" transform="translate(-161.5 -776.5)">
                      <g id="组_34" data-name="组 34" transform="translate(162 777)">
                        <path id="路径_248" data-name="路径 248" d="M17.5,0A17.5,17.5,0,1,0,35,17.5,17.551,17.551,0,0,0,17.5,0Zm0,33.542A16.042,16.042,0,1,1,33.542,17.5,16.089,16.089,0,0,1,17.5,33.542Z" fill="#fff" stroke="#fff" stroke-width="1"/>
                        <path id="路径_249" data-name="路径 249" d="M404.047,320.031Z" transform="translate(-381.113 -300.004)" fill="#fff" stroke="#fff" stroke-width="1"/>
                      </g>
                      <rect id="矩形_113" data-name="矩形 113" width="4" height="13" rx="2" transform="translate(174 788)" fill="#fff"/>
                      <rect id="矩形_114" data-name="矩形 114" width="4" height="13" rx="2" transform="translate(182 788)" fill="#fff"/>
                    </g>
                  </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ajax from "../../http";

    export default {
        name: "Open_music",
        data(){
            return{
                music_img:'https://p1.music.126.net/sgLmb9SK_I6fU23NQTOBmQ==/109951165264712038.jpg',
                scrollable:false,
                text:'孤勇者 - 陈奕迅',
                home_music:false,
                notice_color:'#fff'

            }
        },
        watch:{
            text(){
                let Width = this.$refs.van_notice_bar.$el.offsetWidth-30
                if (this.text.length*16>Width){
                   this.scrollable = true
                }
                // console.log(this.text.length)
                // console.log(this.$refs.van_notice_bar.$el.offsetWidth)
            }
        },
        methods: {
            open_music_play() {
                this.$store.commit('advance')
                this.$router.push(`/home/musicplay/${ this.$store.state.music_play_id }`)
            },
            kk(){
                this.text = '一一一一一一一一一一一一'
            },
            home_play(){
                this.home_music = !this.home_music
                this.$emit('home_play')
            },
            next_song(){
                let id = this.$store.state.music_play_id
                let arr = this.$store.state.play_song_information_later
                // 查找当前播放歌曲id下标
                let song_id_subscript = (arr).findIndex((arr) => arr.play_later_song_id == id )// 根据条件查找符号条件对象下标索引
                if (song_id_subscript < arr.length-1){

                    // 获取歌曲ID
                    let previous_id = arr[song_id_subscript+1].play_later_song_id
                    // 获取歌曲信息
                    ajax(
                        this.$store.state.api_url+'song/detail?ids='+previous_id
                    ).then((res)=>{
                        this.$store.commit('get_home_music_img',res.songs[0].al.picUrl)
                        let music_name =  res.songs[0].name  +' - '+ res.songs[0].ar[0].name
                        this.$store.commit('get_home_music_name',music_name)
                        this.$emit('home_next_song',previous_id)
                        this.$store.commit('get_music_play_id',previous_id)

                        let arr = {type:'song',song_id:previous_id,song_name:res.songs[0].name,song_singer:res.songs[0].ar[0].name,singer_id:res.songs[0].ar[0].id}
                        this.$store.commit('push_recently_played_local_data',arr)

                    }).catch((error)=>{
                        console.log(error);
                    })
                }else {
                    this.$toast('已经没有了')
                }
                if (this.home_music == false){
                    this.home_music = true
                }
            }
        },
        mounted() {
            if(this.$store.state.theme == 'night'){
                this.notice_color = '#fff'
            }
            this.text = this.$store.state.home_music_name
            if (this.$store.state.home_music_playing){
                this.home_music = this.$store.state.home_music_playing
            }else {
                this.home_music = this.$store.state.home_music_playing
            }
        }
    }
</script>

<style scoped>
.om_button{
    width: 90%;
    height: 3rem;


}
    .om_body_box{
        width: 100%;
        height: 3rem;
        position: relative;
    }
    .body_bag{
        width: 100%;
        height: 3rem;
        /*background-color: #FBFBFB;*/
        /*opacity: 0.98;*/
        position: absolute;
        z-index: 1;
        top: 0;
        border: none;
        border-bottom-right-radius: 1.5rem;
        border-top-right-radius: 1.5rem;
    }
    .om_body{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 2;
        top: 0;
        display: flex;
        align-items: center;
    }
    .play_music_img{
        width: 3rem;
        height: 3rem;
        border-radius: 1.5rem;
        margin-left: 1.5rem;
        margin-top: -1rem;
    }
    .om_span{
        width: 100%;
        height: 100%;
        /*display: flex;*/
        /*justify-content: center;*/
        /*align-items: center;*/
        /*font-size: 16px;*/
    }
    .om_but{
        /*width: 100%;*/
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

.om_button_night{
    width: 100%;
    height: 3rem;
    color: white;
}
.body_bag_night{
    width: 100%;
    height: 3rem;
    position: absolute;
    z-index: 1;
    top: 0;
    border: none;
    border-bottom-right-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
}

</style>