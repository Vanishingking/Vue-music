<template>
    <div class="UserComment" v-if="CommentData.length>0">
        <ul>
            <li class="user_comment_data" :class="[$store.state.theme == 'night' ? 'user_comment_data_night':'']" v-for="(item) in CommentData" :key="item">
                <div class="comment_user">
                    <!--                        评论用户头像-->
<!--                    <img :src="require('../../../public/img/'+user_img)"  class="user_img">-->
                    <img :src="item.comment_user_image"  class="user_img">
                    <!--                 Single_review[index].user.nickname       评论用户信息-->
                    <div class="user_material">
                        <span class="user_name">{{ item.comment_user_name }}</span>
                        <span class="response_time">{{ dateFormat(item.comment_user_time) }}</span>
                    </div>
                    <!--                        评论获赞数-->
                    <div class="praised">
                        <svg xmlns="http://www.w3.org/2000/svg" width="0.8rem" height="0.8rem" viewBox="0 0 15.765 16">
                            <path id="Icon_feather-thumbs-up" data-name="Icon feather-thumbs-up" d="M12,8.25v-3A2.25,2.25,0,0,0,9.75,3l-3,6.75V18h8.46a1.5,1.5,0,0,0,1.5-1.275l1.035-6.75a1.5,1.5,0,0,0-1.5-1.725ZM6.75,18H4.5A1.5,1.5,0,0,1,3,16.5V11.25a1.5,1.5,0,0,1,1.5-1.5H6.75" transform="translate(-2.5 -2.5)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                        </svg>
                    </div>
                </div>
                <div class="comment_content">
                    <p>{{ item.comment_user_content }}</p>
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
        },
        mounted() {
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
        height: 70%;
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
        width: 15rem;
    }
    .response_time{
        font-size: 10px;
        color: darkgray;
    }
    .praised{
        margin-left: 2rem;
    }
    .comment_content{
        width: 16.5rem;
        /*height: auto;*/
        margin-top: 1rem;
        margin-left: 3.75rem;
        max-height: 20rem;
    }
    .comment_content p{
        word-wrap: break-word;
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