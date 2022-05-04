<template>
    <!--        回复-->
    <div class="reply_box" :class="[$store.state.theme == 'night' ? 'reply_box_night':'']">
        <div class="reply">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 29.25 29.25">
            <path id="Icon_ionic-md-happy" data-name="Icon ionic-md-happy" d="M18,3.375A14.625,14.625,0,1,0,32.625,18,14.621,14.621,0,0,0,18,3.375ZM18,29.7A11.7,11.7,0,1,1,29.7,18,11.735,11.735,0,0,1,18,29.7Zm5.119-13.163a2.194,2.194,0,1,0-2.194-2.194A2.154,2.154,0,0,0,23.119,16.538Zm-10.237,0a2.194,2.194,0,1,0-2.194-2.194A2.154,2.154,0,0,0,12.881,16.538ZM18,26.044a7.968,7.968,0,0,0,7.459-5.119H10.541A7.968,7.968,0,0,0,18,26.044Z" transform="translate(-3.375 -3.375)" fill="#C2C2C2"/>
          </svg>
          <div class="reply_content_box" :class="[$store.state.theme == 'night' ? 'reply_content_box_night':'']">
            <input type="text" class="reply_content" :class="[$store.state.theme == 'night' ? 'reply_content_night':'']" v-model="reply_content" placeholder="发布一条友善的评论">
          </div>

          <svg @click="user_comment(comment_key)" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 30 30">
            <path v-if="reply_content==''" id="路径_244" data-name="路径 244" d="M0,30,3.12,16.11l17.25-1.08L3.12,13.86,0,0,30,15Z" transform="translate(0 30) rotate(-90)" fill="#c2c2c2"/>
            <path v-else id="路径_213" data-name="路径 213" d="M0,30,3.12,16.11l17.25-1.08L3.12,13.86,0,0,30,15Z" transform="translate(0 30) rotate(-90)" fill="#5ab4f0"/>
          </svg>

        </div>
    </div>
</template>

<script>
    import { Dialog } from 'vant';
    import ajax from '../http'
    import axios from "axios";
    export default {
        name: "Reply",
        data () {
            return{
                reply_content: ''
            }
        },
        props:{
            comment_key:Object
        },
        methods:{
            user_comment(data){
               if (this.$store.state.user_cookie != undefined && this.reply_content!=''){
                   // type=6，评论动态
                   if (data.type == 6){
                        ajax(
                           this.$store.state.api_url+'comment',
                           {t:1,type:data.type,threadId:data.threadId,content:this.reply_content,cookie:this.$store.state.user_cookie},
                           'post'
                       ).then((res)=>{
                           console.log(res);
                           this.$emit('push_user_comment',this.reply_content)
                           this.reply_content = ''
                       }).catch((err)=>{
                           console.log(err);
                           this.$toast('未知错误')
                       })
                   }else if(data.type == 9){
                     console.log(data)
                     axios.post(
                         'http://localhost:3001/noiseReviews',
                         {userid:data.account_id,content:this.reply_content,avatar:data.account_img,username:data.account_name,noise:data.noise}
                     ).then((res)=>{
                       console.log(res);
                       this.$emit('push_user_comment',this.reply_content)
                       this.reply_content = ''
                     }).catch((err)=>{
                       console.log(err);
                       this.$toast('未知错误')
                     })
                   }else
                       {
                        ajax(
                           this.$store.state.api_url+'comment',
                           {t:1,type:data.type,id:data.id,content:this.reply_content,cookie:this.$store.state.user_cookie},
                           'post'
                       ).then((res)=>{
                           console.log(res);
                           this.$emit('push_user_comment',this.reply_content)
                           this.reply_content = ''
                       }).catch((err)=>{
                           console.log(err);
                            this.$toast('未知错误')
                       })
                   }
               }else if (this.$store.state.user_cookie == undefined ) {
                   Dialog.alert({
                       message: '登录后评论',
                   }).then(() => {
                       // on close

                   });
               }
            }
        }
    }
</script>

<style scoped>
    .reply_box{
        height:4.75rem;
        width: 100%;
        background-color: #F6F6F6;
        display: flex;
        align-items: center;
    }
    .reply{
        width: 100%;
        height: 3.5rem;
        /*background-color: white;*/
        display: flex;
        justify-content: space-evenly;
        margin-top: 0.5rem;
    }
    .reply_content_box{
      width: 19rem;
      height: 1.75rem;
      border-radius: 1rem;
      font-size: 13px;
      border: none;
      background-color: #FFFFFF;
      display: flex;
      justify-content: center;
    }
    .reply_content{
        width: 17rem;
        height: 1.75rem;
        /*border-radius: 1rem;*/
        font-size: 13px;
        border: none;
        caret-color:#5AB4F0;
        /*border:1px solid black;*/
        /*background-color: #FFFFFF;*/
    }
    .reply_svg{
      width: 15%;
      height: 1.75rem;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      margin-left: 0.5rem;
    }

    /*input:focus{*/
    /*    outline: none;*/
    /*    border-color: #409eff;*/
    /*}*/

    .reply_box_night{
        width: 100%;
        height:4.75rem;
        background-color: #1C1C1C;
        color: white;
    }
    .reply_content_night{
        width: 17rem;
        height: 1.75rem;
        border-radius: 1rem;
        font-size: 13px;
        border: none;
        /*border:1px solid black;*/
        background-color: #282828;
        caret-color:#5AB4F0;
    }
    .reply_content_box_night{
      width: 19rem;
      height: 1.75rem;
      border-radius: 1rem;
      font-size: 13px;
      border: none;
      background-color: #282828;
      display: flex;
      justify-content: center;
    }
</style>