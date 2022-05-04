<template>
    <div class="Comment" :class="[$store.state.theme == 'night' ? 'Comment_night':'']">
        <div class="title" :class="[$store.state.theme == 'night' ? 'title_night':'']">
            <TitleHead title="评论"></TitleHead>
        </div>
        <div class="Placeholder"></div>
        <!--        歌曲信息-->
        <div class="song_singer_box" :class="[$store.state.theme == 'night' ? 'song_singer_box_night':'']">
            <img :src="music_image" alt="" class="Album_img">
            <div class="song_singer_span">
                <span class="song_name">{{ music_name }}</span>
                <span class="singer_name">{{ music_singer }}</span>
            </div>
        </div>
        <!--        评论-->
        <div class="Comment_height" ref="Comment_height" :style="{height:comment_height}">
            <div class="title_small" :class="[$store.state.theme == 'night' ? 'title_small_night':'']">
                <span @click="kk">精彩评论</span>
            </div>
            <div style="width: 100%;height: 100%;overflow-y: auto">
                <UserComment :Comment-data="music_comment"></UserComment>
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
    import Reply from '../../components/Reply'
    import ajax from '../../http/index'
    import TitleHead from "../../components/TitleHead";
    export default {
        name: "Comment",
        components: {TitleHead, UserComment,Reply},

        data() {
            return{
                Album_img: '',
                reply_content: '',
                Single_review:[],
                music_comment:[],
                music_information:[],
                music_image:'',
                music_name:'',
                music_singer:'',
                comment_key:[],
                account_name:'',
                account_img:''
                // comment_height:(document.documentElement.clientHeight - (7.25*16))
            }
        },
        methods:{
            kk(){
                console.log(this.music_image )
            },
            touchmove(){
                var h = document.documentElement.clientHeight
                console.log(h)
                // console.log(this.$refs.Comment_height.getBoundingClientRect().top)
            },
            //评论歌曲
            push_user_comment(data){
                let time = new Date();
                this.music_comment.unshift({
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

            Promise.all([
                ajax(this.$store.state.api_url+'comment/music?id='+id),
                ajax(this.$store.state.api_url+'user/account', {cookie:this.$store.state.user_cookie})
            ]).then((res)=>{

                this.music_comment.splice(0,this.music_comment.length)
                if (res[0].comments.length!=null){
                    for (let i = 0; i<res[0].comments.length;i++){
                        this.music_comment.push({
                            user_name:res[0].comments[i].user.nickname,
                            user_comment:res[0].comments[i].content,
                            user_image:res[0].comments[i].user.avatarUrl,
                            user_time:res[0].comments[i].time,
                            liked:false
                        })
                    }
                }


                //用户详情
                this.account_name = res[1].profile.nickname
                this.account_img = res[1].profile.avatarUrl
            }).catch((err)=>{
                console.log(err);
            })


            // ajax(
            //     // 'http://127.0.0.1:3000/comment/music?id='+id
            //     this.$store.state.api_url+'comment/music?id='+id
            // ).then((res)=>{
            //     this.music_comment.splice(0,this.music_comment.length)
            //     if (res.comments.length!=null){
            //         for (let i = 0; i<res.comments.length;i++){
            //             this.music_comment.push({
            //                 user_name:res.comments[i].user.nickname,
            //                 user_comment:res.comments[i].content,
            //                 user_image:res.comments[i].user.avatarUrl,
            //                 user_time:res.comments[i].time,
            //                 liked:false
            //             })
            //         }
            //     }
            //
            // }).catch((error)=>{
            //     console.log(error)
            // })
            ajax(
                this.$store.state.api_url+'song/detail?ids='+id
            ).then((res)=>{
                this.music_name  = res.songs[0].al.name
                this.music_image = res.songs[0].al.picUrl
                this.music_singer = res.songs[0].ar[0].name
            }).catch((err)=>{
                console.log(err);
            })
            this.comment_key = ({type:0,id:id})
            this.music_information = this.$store.state.play_music_information
            console.log(this.music_comment)
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
        margin-top: 0.5rem;
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
        font-weight: bold;
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


    .Comment_night{
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        background-color:#2B2B2B ;
        color: white;
    }
    .title_night{
        position: fixed;
        top: 0;
        width: 100%;
        height: 6rem;
        font-size: 21px;
        display: flex;
        justify-content: center;
        z-index: 1;
        font-weight: bold;
        background-color: #222225;
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
        font-weight: bold;
    }
</style>



