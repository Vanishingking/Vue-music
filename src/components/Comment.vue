<template>
    <div class="Comment" >
        <div class="title">
            <span>评论</span>
        </div>
        <div class="Placeholder"></div>
<!--        歌曲信息-->
        <div class="song_singer_box" v-if="music_information.length>0">
            <img :src="music_information[0].music_image" alt="" class="Album_img">
            <div class="song_singer_span">
                <span class="song_name">{{ music_information[0].music_name }}</span>
                <span class="singer_name">{{ music_information[0].music_singer }}</span>
            </div>
        </div>
<!--        评论-->
        <div class="Comment_height" ref="Comment_height" :style="{height:comment_height}">
            <div class="title_small">
            <span>精彩评论</span>
            </div>
            <div style="width: 100%;height: 100%;overflow-y: auto" v-if="false">
                <UserComment :Comment-data="music_comment"></UserComment>
            </div>
        </div>
<!--        回复-->
        <div class="reply_box">
            <Reply :comment_key="comment_key"></Reply>
        </div>
        <div class="Placeholder" style="background-color: white"></div>

        <div style="position: fixed; top:3.5rem;left:1rem;z-index: 9">
            <Back :color="1"></Back>
        </div>
    </div>
</template>

<script>
    import Back from '../components/menu/Back'
    import UserComment from "./home/UserComment";
    import Reply from '../components/Reply'
    import ajax from '../http/index'
    export default {
        name: "Comment",
        components: {UserComment,Reply,Back},

        data() {
            return{
                Album_img: '',
                reply_content: '',
                Single_review:[],
                music_comment:[],
                music_information:[],
                comment_key:[],
                // comment_height:(document.documentElement.clientHeight - (7.25*16))
            }
        },
        methods:{
            kk(){
            console.log(this.music_information )
            },
            touchmove(){
                var h = document.documentElement.clientHeight
                console.log(h)
                // console.log(this.$refs.Comment_height.getBoundingClientRect().top)
            }
        },
        mounted() {
            console.log('89889')
            // this.comment_height = document.documentElement.clientHeight - (7.25*16)
            // console.log(this.comment_height)
            let id = this.$route.params.id
            ajax(
                // 'http://127.0.0.1:3000/comment/music?id='+id
                this.$store.state.api_url+'comment/music?id='+id
            ).then((res)=>{
                this.music_comment.splice(0,this.music_comment.length)
                if (res.comments.length!=null){
                    for (let i = 0; i<res.comments.length;i++){
                        this.music_comment.push({
                            user_name:res.comments[i].user.nickname,
                            user_comment:res.comments[i].content,
                            user_image:res.comments[i].user.avatarUrl,
                            user_time:res.comments[i].time
                        })
                    }
                }

            }).catch((error)=>{
                console.log(error)
            })
            this.comment_key = ({type:0,id:id})
           this.music_information = this.$store.state.play_music_information
        },
        setup(){
            const comment_height = document.documentElement.clientHeight - (10.25*16)+'px'

            return{
                comment_height
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
    }
    .Comment::-webkit-scrollbar{
        display: none;
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
    .title span{
        margin-top: 2.75rem;
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
    }
    .song_name{

    }
    .singer_name{
        font-size: 13px;
    }
    .title_small{
        width: 100%;
        height: 4rem;
        display: flex;
        align-items: center;
        background-color: white;
        margin-top: 1rem;
    }
    .title_small span{
        margin-left: 1rem;
        font-size: 18px;
    }
    .user_comment_data{
        width: 100%;
        margin-bottom: 2rem;
        border-bottom: 2px solid #f4f4f4;
    }
    .comment_user{
        display: flex;
        height: 2rem;
        align-items: center;
    }
    .user_img{
        width: 1.75rem;
        height: 1.75rem;
        border-radius: 1.75rem;
        margin-left: 1rem;
    }
    .user_material{
        display: flex;
        flex-direction: column;
        margin-left: 1rem;
    }
    .user_name{
        font-size: 15px;
    }
    .response_time{
        font-size: 10px;
        color: darkgray;
    }
    .praised{
       margin-left: 10rem;
    }
    .comment_content{
        width: 16.5rem;
        height: auto;
        margin-top: 1rem;
        margin-left: 3.75rem;
    }
    .comment_content p{
        word-wrap: break-word;
    }
    .reply_box{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height:4.75rem;
        z-index: 1000;
        background-color: white
    }
    .reply{
        width: 100%;
        height: 3.5rem;
        background-color: white;
        display: flex;
        justify-content: space-evenly;
        margin-top: 0.5rem;
    }
    .reply_content{
        width: 14.5rem;
        height: 1.75rem;
        border-radius: 1rem;
        font-size: 18px;
        border: 1px solid black;
    }
    input:focus{
        outline: none;
        border-color: #409eff;
    }
    .send{
        width: 3rem;
        height: 1.75rem;
        border-radius: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .send span {

    }
    .Comment_height{
        width: 100%;
        /*height: 80%;*/
        overflow-x: hidden;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
    }
</style>