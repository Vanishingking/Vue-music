<template>
    <div class="DynamicDetails" :class="[$store.state.theme == 'night' ? 'DynamicDetails_night':'']">
        <audio ref="audio">
            <source :src="music_url">
        </audio>
        <div class="information_head_box" :class="[$store.state.theme == 'night' ? 'information_head_box_night':'']">
            <TitleHead title="动态"></TitleHead>
        </div>

        <div class="information_body">
            <div class="information_box" :class="[$store.state.theme == 'night' ? 'information_box_night':'']">
                <div class="information_box_head">
                    <img :src="$store.state.share_dynamic_data.user.avatarUrl" class="ID_user_avatar">
                    <span class="ID_user_name">{{ $store.state.share_dynamic_data.user.nickname }}</span>
                </div>
                <div class="information_box_main_box">
                    <div class="information_box_main" :class="[$store.state.theme == 'night' ? 'information_box_main_night':'']">
                        <p>{{ $store.state.share_dynamic_data.share_content.msg }}</p>
                    </div>
                    <!--                            音乐-->
                    <div class="audio_box" v-if="$store.state.share_dynamic_data.share_content.song != undefined">
                        <div class="audio_ico">
                            <img class="share_music_pic" :src="$store.state.share_dynamic_data.share_content.song.album.blurPicUrl">
                        </div>
                        <span v-if="$store.state.share_dynamic_data.share_content.song.alias != undefined && $store.state.share_dynamic_data.share_content.song.alias.length>0" class="share_song_name">{{ $store.state.share_dynamic_data.share_content.song.name }}({{$store.state.share_dynamic_data.share_content.song.alias[0]}})</span>
                        <span v-else class="share_song_name">{{ $store.state.share_dynamic_data.share_content.song.name }}</span>
                        <div class="audio_playing">
                            <svg v-show="!share_music_playing "  @click="share_music_play_or_stop($store.state.share_dynamic_data.share_content.song.id)" xmlns="http://www.w3.org/2000/svg" width="18" height="20.998" viewBox="0 0 18 20.998">
                                <path id="Icon_awesome-play" data-name="Icon awesome-play" d="M17.052,8.807,2.909.272A1.918,1.918,0,0,0,0,1.966V19.031a1.927,1.927,0,0,0,2.909,1.694l14.143-8.531a1.988,1.988,0,0,0,0-3.388Z" transform="translate(0.001 0.004)" fill="#fff"/>
                            </svg>

                            <svg v-show="share_music_playing" @click="share_music_play_or_stop($store.state.share_dynamic_data.share_content.song.id)" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                <path id="Icon_awesome-pause" data-name="Icon awesome-pause" d="M5.786,20.18H1.929A1.929,1.929,0,0,1,0,18.251V4.108A1.929,1.929,0,0,1,1.929,2.18H5.786A1.929,1.929,0,0,1,7.714,4.108V18.251A1.929,1.929,0,0,1,5.786,20.18ZM18,18.251V4.108A1.929,1.929,0,0,0,16.071,2.18H12.214a1.929,1.929,0,0,0-1.929,1.929V18.251a1.929,1.929,0,0,0,1.929,1.929h3.857A1.929,1.929,0,0,0,18,18.251Z" transform="translate(0 -2.18)" fill="#fff"/>
                            </svg>
                        </div>
                    </div>
                    <!--                    图片-->
                    <div v-if="$store.state.share_dynamic_data.share_img.length>0">
                        <ul class="share_img_box">
                            <li v-for="item in $store.state.share_dynamic_data.share_img" :key="item">
                                <img :src="item.originUrl" class="share_img">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="DynamicComment" :class="[$store.state.theme == 'night' ? 'DynamicComment_night':'']" ref="DynamicComment">
                <div class="Comment_span">
                    <span>评论</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="3" viewBox="0 0 10 3">
                        <line id="直线_22" data-name="直线 22" x2="7" transform="translate(1.5 1.5)" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-width="3"/>
                    </svg>
                </div>
            </div>
            <div class="user_comment_box" :style="{height:user_comment_box_h}">
                <UserComment :Comment-data="share_comment"></UserComment>
            </div>
        </div>


        <Reply :comment_key="comment_type" @push_user_comment="push_user_comment"></Reply>

    </div>
</template>

<script>
    import UserComment from "../../components/home/UserComment";
    import Reply from "../../components/Reply";
    import ajax from "../../http"
    import TitleHead from "../../components/TitleHead";
    export default {
        name: "DynamicDetails",
        components: {TitleHead, Reply, UserComment,},
        data() {
            return{

                share_music_playing:false,
                share_comment:[],
                dynamic_message:[],
                comment_type:[],
                account_name:'',
                account_img:'',
                music_url:''
            }
        },
        methods: {
            dynamic_details(index) {
                this.$store.commit('advance')
                this.$router.push(`/information/details/${index}`)
            },
            share_music_play_or_stop(id){
                if (!this.share_music_playing){
                    this.share_music_playing = true
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
                }else if (this.share_music_playing){
                    this.share_music_playing = false
                    this.$refs.audio.pause()
                }
            },
            push_user_comment(data){
                let time = new Date();
                this.share_comment.unshift({
                    user_image:this.account_img,
                    user_name:this.account_name,
                    user_time:time,
                    user_comment:data,
                    liked:false
                })
            }
        },
        mounted() {
            let id = this.$route.params.id
            this.comment_type = ({type:6,threadId:id})

            if (this.$store.state.share_dynamic_data !=''){
                this.dynamic_message = this.$store.state.share_dynamic_data
            }

            Promise.all([
                ajax(
                    this.$store.state.api_url+'comment/event?threadId='+id,
                    {cookie:this.$store.state.user_cookie}
                ),
                ajax(this.$store.state.api_url+'user/account', {cookie:this.$store.state.user_cookie})
            ]).then((res)=>{

                for (let i = 0; i<res[0].comments.length; i++){
                    this.share_comment.push({
                        user_comment:res[0].comments[i].content,
                        share_commentId:res[0].comments[i].commentId,
                        user_time:res[0].comments[i].time,
                        share_user_id:res[0].comments[i].user.userId,
                        user_name:res[0].comments[i].user.nickname,
                        user_image:res[0].comments[i].user.avatarUrl,
                    })
                }

                //用户详情
                this.account_name = res[1].profile.nickname
                this.account_img = res[1].profile.avatarUrl
            }).catch((err)=>{
                console.log(err);
            })

        },
        setup(){

            const user_comment_box_h = document.documentElement.clientHeight - (8.5*16) +'px'
            return{
                user_comment_box_h
            }
        }
    }
</script>

<style scoped>
    .DynamicDetails{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        background-color: #f4f4f4;
        display: flex;
        flex-direction: column;
    }
    .DynamicDetails::-webkit-scrollbar{
        display: none;
    }
    .information_box{
        width: 100%;
        max-height: 25rem;
        position: relative;
        background-color: white;
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
        flex-direction: column;
        align-items: center;
    }
    .information_box_main{
        width: 22rem;
        overflow:hidden;
        background-color: white;
        line-height: 1.5;
        letter-spacing: 2px;
    }

    .DynamicComment{
        width: 100%;
        height: 2.5rem;
        border-bottom: 2px solid #f4f4f4;
        background-color: white;
        display: flex;
        align-items: center;
        margin-top: 1rem;
    }
    .DynamicComment svg{
        margin-left: 0.75rem;
    }
    .Comment_span{
        display: flex;
        flex-direction: column;
        margin-left: 0.75rem;
        font-size: 16px;
        font-weight: bold;
        /*color: #409eff;*/
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

    }
    .audio_ico{
        height: 2.5rem;
        width: 2.5rem;
        border: 0.3rem solid white;
        border-radius: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 1rem;
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
    .share_img_box{
        display: flex;
        justify-content: space-around;
        list-style: none;
    }
    .share_img{
        width: 6.25rem;
    }
    .share_song_name{
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        width: 90%;
        font-size: 18px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }

    .information_head_box span{
        margin-top: 3.75rem;
    }
    .information_head_box hr{
        height: 2px;
        background-color: #409eff;
        border: none;
    }
    .edit{
        position: fixed;
        right: 1rem;
        top: 3.75rem;

    }
    .information_head_box{
        font-size: 20px;
        width: 100%;
        height: 6.5rem;
        display: flex;
        align-items: center;
        background-color: white;
        flex-direction: column;
        /*background-color: #409eff;*/
    }
    .information_head_box span{
        margin-top: 3.5rem;
        font-weight: bold;
    }
    .information_body{
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }
    .user_comment_box{
        width: 100%;
        overflow-y: auto;
    }



    .DynamicDetails_night{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        background-color: #2B2B2B;
        display: flex;
        flex-direction: column;
        color: white;
    }

    .information_head_box_night{
        font-size: 20px;
        width: 100%;
        height: 6.5rem;
        display: flex;
        align-items: center;
        background-color: #222225;
        flex-direction: column;
        /*background-color: #409eff;*/
    }

    .information_box_night{
        width: 100%;
        max-height: 25rem;
        position: relative;
        background-color: #222225;
    }
    .information_box_main_night{
        width: 22rem;
        overflow:hidden;
        background-color: #222225;
    }
    .DynamicComment_night{
        width: 100%;
        height: 2.5rem;
        border-bottom: 2px solid #2B2B2B;
        background-color: #222225;
        display: flex;
        align-items: center;
        margin-top: 1rem;
    }

    audio{
        position: absolute;
        top: 0;
        z-index: 999;
    }
</style>