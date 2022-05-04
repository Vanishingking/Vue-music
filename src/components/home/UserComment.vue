<template>
    <div class="UserComment">
        <ul v-if="CommentData.length>0">
            <li class="user_comment_data" :class="[$store.state.theme == 'night' ? 'user_comment_data_night':'']" v-for="(item) in CommentData" :key="item">
                <div class="comment_user">
                    <div class="comment_user_left">
                        <!--                        评论用户头像-->
                        <!--                    <img :src="require('../../../public/img/'+user_img)"  class="user_img">-->
                        <img :src="item.user_image"  class="user_img">
                        <!--                 Single_review[index].user.nickname       评论用户信息-->
                        <div class="user_material">
                            <span class="user_name">{{ item.user_name }}</span>
                            <span class="response_time">{{ dateFormat(item.user_time)  }}</span>
                        </div>
                    </div>

                    <!--                        评论获赞数-->
                    <div class="praised">

                        <svg v-if="!item.liked" @click="fabulous(item)" xmlns="http://www.w3.org/2000/svg" width="20" height="19.14" viewBox="0 0 25 23.919">
                            <path id="路径_250" data-name="路径 250" d="M64,93.286v10.853a1.879,1.879,0,0,0,1.879,1.879h1.692V91.424l-1.692-.018A1.879,1.879,0,0,0,64,93.286Zm22.134-3.852-7.472.047a12.23,12.23,0,0,0,.529-3.3c0-2.192-1.921-4.338-3.838-4.06-1.691.246-1.877,1.707-1.877,3.538v1.654a4.291,4.291,0,0,1-3.846,4.129l-.271,0v14.576h14.72a2.866,2.866,0,0,0,2.816-2.332L88.95,92.833a2.866,2.866,0,0,0-2.816-3.4Z" transform="translate(-64 -82.099)" fill="#a5a5a5"/>
                        </svg>

                        <svg v-if="item.liked" @click="fabulous(item)" xmlns="http://www.w3.org/2000/svg" width="20" height="19.135" viewBox="0 0 20 19.135">
                            <path id="路径_251" data-name="路径 251" d="M64,91.049v8.682a1.5,1.5,0,0,0,1.5,1.5h1.354V89.559L65.5,89.545A1.5,1.5,0,0,0,64,91.049Zm17.707-3.081L75.729,88a9.784,9.784,0,0,0,.423-2.639c0-1.754-1.536-3.471-3.071-3.248-1.353.2-1.5,1.366-1.5,2.831v1.323a3.433,3.433,0,0,1-3.077,3.3l-.217,0v11.661H80.061a2.293,2.293,0,0,0,2.253-1.866l1.646-8.682a2.293,2.293,0,0,0-2.253-2.719Z" transform="translate(-64 -82.099)" fill="#5ab4f0"/>
                        </svg>

                    </div>
                </div>
                <div class="comment_content">
                    <p>{{ item.user_comment }}</p>
                </div>
                <div class="li_bottom"></div>
            </li>
        </ul>
    </div>
</template>

<script>
    import ajax from "../../http";

    export default {
        name: "UserComment",
        props:{
            CommentData:{
                type:Array,
                default(){
                    return [];
                }
            }
        },
        data() {
            return{
                user_img: '',
                Single_review:[],
                comment_time:''
            }
        },
        methods:{
            dateFormat(time) {
                let date = new Date(time);
                let y = date.getFullYear();// 年
                let MM = date.getMonth() + 1;// 月
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();// 日
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();// 时
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();// 分
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();// 秒
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
            },
            fabulous(item){
                item.liked =  !item.liked
            }
        },
        mounted() {

            console.log(this.CommentData)
                let id = this.$route.params.id
                console.log(id)
                ajax(
                    // 'http://127.0.0.1:3000/comment/music?id='+id
                    this.$store.state.api_url+'comment/music?id='+id
                ).then((res)=>{
                    this.Single_review.splice(0,this.Single_review.length);
                    for (let i = 0; i<res.comments.length;i++){
                        this.Single_review.push(res.comments[i])
                    }
                    // console.log(res.comments)
                    console.log(this.Single_review
                    )
                }).catch((error)=>{
                    console.log(error)
                })
        }
    }
</script>

<style scoped>
    .UserComment{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .UserComment::-webkit-scrollbar{
        display: none;
    }
    .user_comment_data{
        width: 100%;
        /*margin-bottom: 1rem;*/
        /*margin-top: 1rem;*/
        border-bottom: 0.2rem solid #f4f4f4;
        background-color: white;

    }


    .comment_user{
        display: flex;
        height: 3.5rem;
        align-items: center;
    }
    .comment_user_left{
        display: flex;
        height: 3.5rem;
        align-items: center;
        width: 80%;
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
        width: 100%;
    }
    .user_name{
        font-size: 15px;
        width: 100%;
    }
    .response_time{
        font-size: 10px;
        color: darkgray;
    }
    .praised{
        width: 20%;
        height: 3.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .comment_content{
        /*width: 16.5rem;*/
        /*height: auto;*/
        width: 100%;
        /*margin-top: 0.5rem;*/
        /*margin-left: 3.75rem;*/
        max-height: 20rem;
        display: flex;
        justify-content: center;

    }
    .comment_content p{
        width: 80%;
        word-wrap: break-word;
        line-height: 1.5;
        letter-spacing: 2px;
    }
    .li_bottom{
        width: 100%;
        height: 1rem;
    }


    .user_comment_data_night{
        width: 100%;
        /*margin-bottom: 1rem;*/
        /*margin-top: 1rem;*/
        border-bottom: 0.2rem solid #2B2B2B;
        background-color: #222225;

    }
</style>