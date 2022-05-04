<template>
    <div class="Comment" :class="[$store.state.theme == 'night' ? 'Comment_night':'']" v-if="song_list_details !=''" >
        <div class="title" :class="[$store.state.theme == 'night' ? 'title_night':'']">
            <TitleHead title="评论"></TitleHead>
        </div>
        <div class="Placeholder"></div>
        <!--        歌曲信息-->
        <div class="song_singer_box" :class="[$store.state.theme == 'night' ? 'song_singer_box_night':'']">
            <img :src="song_list_details.coverImgUrl" alt="" class="Album_img">
            <div class="song_singer_span">
                <span class="song_name">{{ song_list_details.name }}</span>
            </div>
        </div>
        <!--        评论-->
        <div class="Comment_height" ref="Comment_height" :style="{height:comment_height}">
            <div class="title_small" :class="[$store.state.theme == 'night' ? 'title_small_night':'']">
                <span>精彩评论</span>
            </div>
            <div style="width: 100%;height: 100%;overflow-y: auto" v-if="false">
                <UserComment :songlistcomment="Song_list_comment_review"></UserComment>
            </div>

            <div style="width: 100%;height: 100%;overflow-y: auto">
                <UserComment :Comment-data="Song_list_comment_review"></UserComment>
            </div>

        </div>
        <!--        回复-->
        <div class="reply_box">
            <Reply :comment_key="comment_key" @push_user_comment="push_user_comment"></Reply>
        </div>
        <div class="Placeholder" style="background-color: white" v-if="$store.state.theme == 'white'"></div>
        <div class="Placeholder" style="background-color: #222225" v-if="$store.state.theme == 'night'"></div>
    </div>
</template>

<script>
    import UserComment from "../../components/home/UserComment";
    import Reply from "../../components/Reply";
    import ajax from "../../http";
    import TitleHead from "../../components/TitleHead";
    export default {
        name: "Comment",
        components: {
            TitleHead,
            UserComment,Reply
            // [Dialog.Component.name]: Dialog.Component,
        },

        data() {
            return{
                Album_img: '',
                reply_content: '',
                Song_list_comment_review:[],
                song_list_details:[],
                song_list_name:'',
                comment_key:[],
                account_name:'',
                account_img:''
            }
        },
        methods:{
            push_user_comment(data){
                let time = new Date();
                this.Song_list_comment_review.unshift({
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
            this.comment_key = ({type:2,id:id})
            Promise.all([
                ajax(this.$store.state.api_url+'comment/playlist?id='+id,{cookie:this.$store.state.user_cookie}),
                ajax(this.$store.state.api_url+'playlist/detail?id='+id),
                ajax(this.$store.state.api_url+'user/account', {cookie:this.$store.state.user_cookie})
                ]).then((res)=>{


                // 歌单评论
                this.Song_list_comment_review.splice(0,this.Song_list_comment_review.length);
                for (let i = 0; i<res[0].comments.length;i++){
                    // this.Song_list_comment_review.push(res[0].comments[i])
                    this.Song_list_comment_review.push({
                        user_name:res[0].comments[i].user.nickname,
                        user_comment:res[0].comments[i].content,
                        user_image:res[0].comments[i].user.avatarUrl,
                        user_time:res[0].comments[i].time,
                        liked:false
                    })
                }
              console.log( this.Song_list_comment_review)

                // 歌单详情
                this.song_list_details = res[1].playlist

                //用户详情
                this.account_name = res[2].profile.nickname
                this.account_img = res[2].profile.avatarUrl
            }).catch((err)=>{
                console.log(err);
            })


            //
            // // 歌单评论
            // ajax(
            //     // 'http://127.0.0.1:3000/comment/playlist?id='+id
            //     this.$store.state.api_url+'comment/playlist?id='+id
            // ).then((res)=>{
            //     this.Song_list_comment_review.splice(0,this.Song_list_comment_review.length);
            //     for (let i = 0; i<res.comments.length;i++){
            //         this.Song_list_comment_review.push(res.comments[i])
            //     }
            //     console.log(this.Song_list_comment_review[0])
            // }).catch((error)=>{
            //     console.log(error)
            // })
            // // 歌单详情
            // ajax(
            //     // 'http://127.0.0.1:3000/playlist/detail?id='+id
            //     this.$store.state.api_url+'playlist/detail?id='+id
            // ).then((res)=>{
            //     this.song_list_details = res.playlist
            // }).catch((error)=>{
            //     console.log(error)
            // })

        },
        setup(){
            const comment_height = document.documentElement.clientHeight - (10.25*16)+'px'

            return{
                comment_height,
            }
        }
    }
</script>

<style scoped>
    .Comment{
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        background-color: #F8F8F8;
        /*font-weight: bold;*/
    }
    .Comment::-webkit-scrollbar{
        /*display: none;*/
    }
    .title{
        position: fixed;
        top: 0;
        width: 100%;
        height: 6rem;
        background-color: white;
        font-size: 21px;
        display: flex;
        justify-content: center;
        z-index: 1;
        font-weight: bold;
    }
    .song_singer_box{
        display: flex;
        align-items: center;
        width: 100%;
        height: 7.25rem;
        background-color: white;
    }
    .Album_img{
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 0.5rem;
        margin-left: 1rem;
        margin-right: 0.75rem;
    }
    .song_singer_span{
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 75%;
        /*font-weight: bold;*/
    }
    .song_name{

    }
    .title_small{
        width: 100%;
        height: 4rem;
        display: flex;
        align-items: center;
        background-color: white;
        margin-top: 1rem;
        font-weight: bold;
    }
    .title_small span{
        margin-left: 1rem;
        font-size: 18px;
    }

    .reply_box{
        position: fixed;
        bottom: 0;
        z-index: 1;
    }
    .Comment_height{
        width: 100%;
        /*height: 80%;*/
        overflow-x: hidden;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
    }


    .Comment_night{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        background-color:#2B2B2B ;
        color: white;
    }
    .Comment_night::-webkit-scrollbar{
        display: none;
    }

    .title_night{
        position: fixed;
        top: 0;
        width: 100%;
        height: 6rem;
        background-color: #222225;
        font-size: 21px;
        display: flex;
        justify-content: center;
        z-index: 1;
    }
    .song_singer_box_night{
        display: flex;
        align-items: center;
        width: 100%;
        height: 7.25rem;
        background-color: #222225;
    }
    .title_small_night{
        width: 100%;
        height: 4rem;
        display: flex;
        align-items: center;
        background-color: #222225;
        margin-top: 1rem;
    }
    .title_small_night span{
        margin-left: 1rem;
        font-size: 18px;
    }

    .reply_box_night{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height:4.75rem;
        background-color: #222225;
        display: flex;
        align-items: center;
    }


</style>