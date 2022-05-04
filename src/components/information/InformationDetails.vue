<template>
    <div class="InformationDetails" :class="[$store.state.theme == 'night' ? 'InformationDetails_night':'']">
        <audio ref="audio">
            <source :src="music_url">
        </audio>
        <ul v-if="dynamic_message.length>0">
            <li v-for="(item,index) in dynamic_message" :key="item">
                <div class="information_box">
                    <div class="information_box_head">
                        <img :src="item.user.avatarUrl" class="ID_user_avatar">
                        <span class="ID_user_name">{{ item.user.nickname }}</span>
                        <div class="information_menu_box" @click="information_menu(item,index)" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="0.17rem" height="0.86rem" viewBox="0 0 3.412 17.24">
                                <g id="Icon_ionic-ios-more" data-name="Icon ionic-ios-more" transform="translate(18.74 -4.5) rotate(90)">
                                    <path id="路径_63" data-name="路径 63" d="M17.02,15.328a1.706,1.706,0,1,0,1.706,1.706,1.705,1.705,0,0,0-1.706-1.706Z" transform="translate(-3.909)" fill="#7a7a7a"/>
                                    <path id="路径_64" data-name="路径 64" d="M6.206,15.328a1.706,1.706,0,1,0,1.706,1.706,1.705,1.705,0,0,0-1.706-1.706Z" fill="#7a7a7a"/>
                                    <path id="路径_65" data-name="路径 65" d="M27.862,15.328a1.706,1.706,0,1,0,1.706,1.706,1.705,1.705,0,0,0-1.706-1.706Z" transform="translate(-7.828)" fill="#7a7a7a"/>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div class="information_box_main_box">
                        <div class="information_box_main" :class="[$store.state.theme == 'night' ? 'information_box_main_night':'']">
                            <p>{{ item.share_content.msg }}</p>
                        </div>
<!--                            音乐-->
                        <div class="audio_box" :class="[$store.state.theme == 'night' ? 'audio_box_night':'']" v-if="item.share_content.song != undefined">
                           <div class="audio_ico">
                               <img class="share_music_pic" :src="item.share_content.song.album.blurPicUrl">
                           </div>
                            <span v-if="item.share_content.song.alias != undefined && item.share_content.song.alias.length>0" class="share_song_name">{{ item.share_content.song.name }}({{item.share_content.song.alias[0]}})</span>
                            <span v-else class="share_song_name">{{ item.share_content.song.name }}</span>
<!--                            <span v-if="item.share_content.song.alias != undefined" class="share_song_name">{{ item.share_content.song.name }}({{item.share_content.song.alias[0]}})</span>-->
                            <div class="audio_playing" >
                                <svg  v-show="!(share_music_playing === index)" @click="share_music_play_or_stop(index,item.share_content.song.id)" xmlns="http://www.w3.org/2000/svg" width="18" height="20.998" viewBox="0 0 18 20.998">
                                    <path id="Icon_awesome-play" data-name="Icon awesome-play" d="M17.052,8.807,2.909.272A1.918,1.918,0,0,0,0,1.966V19.031a1.927,1.927,0,0,0,2.909,1.694l14.143-8.531a1.988,1.988,0,0,0,0-3.388Z" transform="translate(0.001 0.004)" fill="#fff"/>
                                </svg>

                                <svg v-show="share_music_playing === index" @click="share_music_play_or_stop(index,item.share_content.song.id)" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                    <path id="Icon_awesome-pause" data-name="Icon awesome-pause" d="M5.786,20.18H1.929A1.929,1.929,0,0,1,0,18.251V4.108A1.929,1.929,0,0,1,1.929,2.18H5.786A1.929,1.929,0,0,1,7.714,4.108V18.251A1.929,1.929,0,0,1,5.786,20.18ZM18,18.251V4.108A1.929,1.929,0,0,0,16.071,2.18H12.214a1.929,1.929,0,0,0-1.929,1.929V18.251a1.929,1.929,0,0,0,1.929,1.929h3.857A1.929,1.929,0,0,0,18,18.251Z" transform="translate(0 -2.18)" fill="#fff"/>
                                </svg>
                            </div>
                        </div>
                    </div>
<!--                    图片-->
                    <div v-if="item.share_img.length>0">
                       <ul class="share_img_box">
                           <li v-for="item in item.share_img" :key="item">
                               <img :src="item.originUrl" class="share_img">
                           </li>
                       </ul>
                    </div>
<!--                    菜单栏-->
                    <div class="information_box_tail">
<!--                        分享-->
                        <div @click="forward" class="information_box_tail_btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="0.85rem" viewBox="0 0 18.969 15.804">
                                <path id="Icon_ionic-ios-share-alt" data-name="Icon ionic-ios-share-alt" d="M23.3,13.388,16.334,6.868a.356.356,0,0,0-.277-.119c-.217.01-.494.163-.494.4v3.27a.211.211,0,0,1-.178.2c-6.929,1.062-9.848,6.248-10.88,11.631-.04.212.247.41.38.242a12.6,12.6,0,0,1,10.471-5.3.244.244,0,0,1,.207.237v3.21a.424.424,0,0,0,.716.262L23.3,14.262a.545.545,0,0,0,.173-.415A.662.662,0,0,0,23.3,13.388Z" transform="translate(-4.502 -6.749)" fill="#a5a5a5"/>
                            </svg>
                        </div>


<!--                        评论-->
                        <div class="information_box_tail_btn" @click="dynamic_details(item)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="0.85rem" height="0.8rem" viewBox="0 0 16.317 15.055">
                                <path id="Icon_ionic-ios-text" data-name="Icon ionic-ios-text" d="M11.53,4.5c-4.5,0-8.155,2.948-8.155,6.587,0,2.544,1.788,4.752,4.4,5.849a5.124,5.124,0,0,1-1.313,2.372.156.156,0,0,0,.141.247,6.308,6.308,0,0,0,2-.5A6.187,6.187,0,0,0,10.42,17.61a10.438,10.438,0,0,0,1.117.063c4.5,0,8.155-2.948,8.155-6.587S16.034,4.5,11.53,4.5Z" transform="translate(-3.375 -4.5)" fill="#a5a5a5"/>
                            </svg>
                        </div>
<!--                        点赞-->
                        <div @click="thumbs_up(index)" class="information_box_tail_btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16.445" height="16.711" viewBox="0 0 16.445 16.711">
                                    <path v-if="like != index" id="路径_250" data-name="路径 250" d="M64,91.049v8.682a1.5,1.5,0,0,0,1.5,1.5h1.354V89.559L65.5,89.545A1.5,1.5,0,0,0,64,91.049Zm17.707-3.081L75.729,88a9.784,9.784,0,0,0,.423-2.639c0-1.754-1.536-3.471-3.071-3.248-1.353.2-1.5,1.366-1.5,2.831v1.323a3.433,3.433,0,0,1-3.077,3.3l-.217,0v11.661H80.061a2.293,2.293,0,0,0,2.253-1.866l1.646-8.682a2.293,2.293,0,0,0-2.253-2.719Z" transform="translate(-64 -82.099)" fill="#a5a5a5"/>
                                    <path v-else id="路径_251" data-name="路径 251" d="M64,91.049v8.682a1.5,1.5,0,0,0,1.5,1.5h1.354V89.559L65.5,89.545A1.5,1.5,0,0,0,64,91.049Zm17.707-3.081L75.729,88a9.784,9.784,0,0,0,.423-2.639c0-1.754-1.536-3.471-3.071-3.248-1.353.2-1.5,1.366-1.5,2.831v1.323a3.433,3.433,0,0,1-3.077,3.3l-.217,0v11.661H80.061a2.293,2.293,0,0,0,2.253-1.866l1.646-8.682a2.293,2.293,0,0,0-2.253-2.719Z" transform="translate(-64 -82.099)" fill="#5ab4f0"/>
                            </svg>
                        </div>
                    </div>
                    <div class="information_next" @click="dynamic_details(item)"></div>
                </div>
            </li>
        </ul>



    </div>
</template>

<script>
    import ajax from "../../http";
    export default {
        name: "InformationDetails",
        data() {
            return{
                share_music_playing:-1,
                dynamic_message:[],
                music_url:'https://music.163.com/song/media/outer/url?id=1901371647.mp3',
                like:-1


            }
        },
        methods: {
            kk(data){
                console.log(data)
            },

            information_menu(data,index){
                this.$emit('information_menu',data,index)
            },
            dynamic_details(index) {
                this.$store.commit('get_share_dynamic_data',index)
                this.$store.commit('advance')
                this.$router.push(`/information/details/${index.share_info.commentThread.id}`)
            },
            share_music_play_or_stop(index,id){

                if (this.share_music_playing != index){
                    this.share_music_playing = index
                    let url = 'https://music.163.com/song/media/outer/url?id='+id+'.mp3'
                    if(this.$refs.audio.src != url ){
                        this.$refs.audio.src = 'https://music.163.com/song/media/outer/url?id='+id+'.mp3'
                        this.$emit("rest")
                        setTimeout(()=>{
                            this.$refs.audio.play()
                        },500)
                        this.$refs.audio.play()
                    }else {
                        this.$refs.audio.play()
                    }
                }else if (this.share_music_playing == index){
                    this.share_music_playing = -1
                    this.$refs.audio.pause()
                }
            },
          //转发
          forward(){
           this.$emit('forward')
          },
          //点赞
          thumbs_up(index){
              if (this.like == index){
                this.like = -1
              }else {
                this.like = index
              }
          },

          //修剪字符串
            prune_alias(str){
                console.log(str[0])
                console.log(str[0].substring(1,str[0].length-2))
            }

        },
        mounted() {
            ajax(
                this.$store.state.api_url+'event?pagesize=30',
                {cookie:this.$store.state.user_cookie}
            ).then((res)=>{
                console.log(res);
                for (let i = 0; i<res.event.length; i++){
                    this.dynamic_message.push({
                        share_content:JSON.parse(res.event[i].json),
                        user: res.event[i].user,
                        share_img:res.event[i].pics,
                        share_info:res.event[i].info,
                        id:res.event[i].id
                    })
                }
                // 解析json
                // this.dynamic_message = JSON.parse(res.event[0].json)
                console.log(this.dynamic_message)
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
</script>

<style scoped>
    .InformationDetails{
        background-color: #f4f4f4;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .InformationDetails::-webkit-scrollbar{
        display: none;
    }
    .InformationDetails li{
        margin-top: 1rem;
        background-color: white;
    }
    .information_box{
        width: 100%;
        max-height: 25rem;
        position: relative;
        /*background-color: #409eff;*/
    }
    .information_box_head{
        width: 100%;
        height: 3.5rem;
        /*background-color: white;*/
        /*border:1px solid black;*/
        display: flex;
        align-items: center;
        /*position: absolute;*/
        z-index: 1;
    }
    .ID_user_avatar{
        width: 2rem;
        height: 2rem;
        border-radius: 1rem;
        margin-left: 0.75rem;
        z-index: 1;

    }
    .ID_user_name{
        font-size: 18px;
        width: 75%;
        margin-left: 0.5rem;
        margin-right: 1rem;
        z-index: 1;
    }
    .information_box_main_box{
        max-height: 13.25rem;
        display: flex;
        /*justify-content: center;*/
        flex-direction: column;
        align-items: center;
    }
    .information_box_main{
        width: 85%;
        max-height: 13.25rem;
        overflow:hidden;
        background-color: white;
        display: flex;
        justify-content: center;
        line-height: 1.5;

    }
    .information_box_main p{
        width: 95%;
        max-height: 8rem;
        /*自动换行*/
        word-wrap:break-word;
        /*超出省略*/
        text-overflow:ellipsis;
        overflow:hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp:6;
        letter-spacing: 2px;

    }
    .audio_box{
        width: 80%;
        height: 4rem;
        background-color: #f4f4f4;
        display: flex;
        align-items: center;
        border-radius: 0.5rem;
        z-index: 2;
        margin-top: 1rem;
        margin-bottom: 1rem;
        position: relative;
        /*justify-content: space-around;*/

    }
    .audio_ico{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 1rem;
        z-index: 1;
    }
    .share_music_pic{
        width: 3rem;
        height: 3rem;
        border-radius: 0.5rem;

    }
    .audio_playing{
        position: absolute;
        margin-left: 2rem;
        /*margin-top: 0.3rem;*/
        z-index: 2;
        opacity: 0.8;
    }
    .information_box_tail{
        width: 100%;
        height: 2.5rem;
        /*border: 1px solid black;*/
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .information_box_tail_btn{
        display: flex;
        align-items: center;
        margin-left: 1rem;
        z-index: 1;


    }
    .information_box_tail_btn span{
        width: 3rem;
        text-align: center;
        font-size: 15px;
    }
    .qqw{
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
    }
    .information_next{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
    }
    .share_img_box{
        display: flex;
        justify-content: space-around;
        list-style: none;
        margin-bottom: 1rem;
    }
    .share_img{
        width: 6.25rem;
    }
    .share_song_name{
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        width:90%;
        font-size: 18px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }



    .InformationDetails_night{
        background-color: #2B2B2B;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .InformationDetails_night li{
        margin-top: 1rem;
        background-color: #222225;
    }

    .information_box_main_night{
        width: 22rem;
        max-height: 13.25rem;
        overflow:hidden;
        background-color: #222225;
        display: flex;
        justify-content: center;

    }
    .audio_box_night{
        width: 18rem;
        height: 3.5rem;
        background-color: #2B2B2B;
        display: flex;
        align-items: center;
        border-radius: 0.5rem;
        z-index: 2;
        margin-top: 1rem;
        margin-bottom: 1rem;
        /*justify-content: space-around;*/

    }
    .information_menu_box{
        width: 1rem;
        height: 1.5rem;
        /*background-color: #39a9ed;*/
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>