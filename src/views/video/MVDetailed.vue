<template>
    <div class="MV_detailed" :class="[$store.state.theme == 'night' ? 'MV_detailed_night':'']">
        <div class="Placeholder"></div>
        <div class="video_box" v-if="videos_data!=''" :class="full_screen_index == index && full_screen ? 'full_screen':''" ref="video" >
        <VideoPlay :Video-data-video-id="VideoDataVideoId" :Video-data="videos_data" v-if="videos_data.video_id != null" :full_screen="full_screen" @Full_Screen="Full_Screen"></VideoPlay>
        </div>
        <div class="video_comment_height">
            <div class="title_box">
              <div class="comment_box">
                <span>评论</span>
              </div>
              <div class="liked_box" @click="mv_liked">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 853.321 768.04">
                  <path v-if="mv_like" id="路径_1" data-name="路径 1" d="M669.781,130.752c71.637-11.093,138.9,11.477,193.344,64.533,55.317,53.931,81.835,124.992,74.283,199.531-7.467,73.643-46.549,146.368-112.32,210.475-18.347,17.9-67.669,66.219-138.453,135.637-31.829,31.232-65.707,64.448-99.84,97.984L553.6,871.467l-13.184,12.949a40.555,40.555,0,0,1-56.832,0l-114.6-112.64-24.213-23.723q-72.917-71.237-145.893-142.647C133.141,541.184,94.08,468.48,86.613,394.816c-7.552-74.539,18.944-145.6,74.283-199.531C215.339,142.229,282.6,119.68,354.24,130.752,407.4,138.965,461.333,165.44,512.021,207.7c50.709-42.24,104.619-68.736,157.781-76.949Z" transform="translate(-85.35 -127.996)" fill="#cf4949"/>
                  <path v-else id="路径_1" data-name="路径 1" d="M669.781,130.752c71.637-11.093,138.9,11.477,193.344,64.533,55.317,53.931,81.835,124.992,74.283,199.531-7.467,73.643-46.549,146.368-112.32,210.475-18.347,17.9-67.669,66.219-138.453,135.637-31.829,31.232-65.707,64.448-99.84,97.984L553.6,871.467l-13.184,12.949a40.555,40.555,0,0,1-56.832,0l-114.6-112.64-24.213-23.723q-72.917-71.237-145.893-142.647C133.141,541.184,94.08,468.48,86.613,394.816c-7.552-74.539,18.944-145.6,74.283-199.531C215.339,142.229,282.6,119.68,354.24,130.752,407.4,138.965,461.333,165.44,512.021,207.7c50.709-42.24,104.619-68.736,157.781-76.949Z" transform="translate(-85.35 -127.996)" fill="#ECEBEB"/>
                </svg>
              </div>
            </div>
<!--            v-if="user_comments != null"-->
        <UserCommentCurrency :Comment-data="user_comments" v-if="false"></UserCommentCurrency>
            <UserComment :Comment-data="user_comments"></UserComment>
        </div>

        <div style="position: fixed;bottom: 0;width: 100%">
            <Reply :comment_key="comment_key" @push_user_comment="push_user_comment"></Reply>
        </div>
        <div style="position: fixed; top:3.5rem;left:1rem;z-index: 9">
            <Back :color="1"></Back>
        </div>

        <div :class="full_screen ? 'full_Screen_black':''"></div>
    </div>
</template>

<script>
    import Back from '../../components/menu/Back'
    import UserCommentCurrency from "../../components/home/UserCommentCurrency"
    import Reply from "../../components/Reply";
    import VideoPlay from "../../components/video/VideoPlay";
    import UserComment from "../../components/home/UserComment";
    import ajax from "../../http";
    export default {
        name: "MVDetailed",
        components: {
            VideoPlay,
            UserCommentCurrency,
            Reply,Back,UserComment
        },
        data(){
            return{
                videos_data:[],
                user_comments: [],
                VideoDataVideoId:'',
                comment_key:[],
                account_name:'',
                account_img:'',
                full_screen:false,
                video_high:document.documentElement.clientWidth,
              mv_like:false

            }
        },
        methods:{
            kkp(){
                console.log(this.user_comments)
            },
          mv_liked(){
            let id = this.$route.params.id
              if (!this.mv_like){
                ajax(
                    this.$store.state.api_url+'mv/sub',
                    {mvid:id,t:'1',cookie:this.$store.state.user_cookie}
                ).then((res)=>{
                  console.log(res);
                  this.mv_like = true
                  this.$toast('已收藏')
                }).catch((err)=>{
                  console.log(err);
                  if (this.$store.state.user_cookie == undefined){
                    this.$toast('请先登录')
                  }else {
                    this.$toast('发生错误')
                  }
                })

              }else {
                ajax(
                    this.$store.state.api_url+'mv/sub',
                    {mvid:id,t:'0',cookie:this.$store.state.user_cookie}
                ).then((res)=>{
                  console.log(res);
                  this.mv_like = false
                  this.$toast('取消收藏')

                }).catch((err)=>{
                  console.log(err);
                  this.$toast('发生错误')
                })
              }
          },
            push_user_comment(data){
                let time = new Date();
                this.user_comments.unshift({
                    comment_user_image:this.account_img,
                    comment_user_name:this.account_name,
                    comment_user_time:time,
                    comment_user_content:data
                })
            },
            Full_Screen(){
                // 全屏状态下
                if (this.full_screen){
                    this.full_screen = false
                }else {
                    this.full_screen = true
                }
            }
        },
        mounted() {
            let id = this.$route.params.id
            Promise.all([
                ajax(
                    // 'http://127.0.0.1:3000/mv/detail?mvid='+id
                    this.$store.state.api_url+'mv/detail?mvid='+id,
                    {cookie:this.$store.state.user_cookie}
                ),
                ajax(
                    // 'http://127.0.0.1:3000/comment/mv?id='+id
                    this.$store.state.api_url+'comment/mv?id='+id
                ),
                ajax(this.$store.state.api_url+'user/account', {cookie:this.$store.state.user_cookie})
            ]).then((res)=>{
                console.log(res[0]);
               this.mv_like = res[0].subed
                // 获取MV数据
                this.videos_data = {
                        video_name:res[0].data.name,
                        video_id:res[0].data.id,
                        video_image:res[0].data.cover,
                        artists_id:res[0].data.artistId,
                        artists_name:res[0].data.artistName,}
                // 获取MV评论
                for (let i = 0;i<res[1].comments.length;i++){

                    this.user_comments.push({
                        user_name:res[1].comments[i].user.nickname,
                        user_comment:res[1].comments[i].content,
                        user_image:res[1].comments[i].user.avatarUrl,
                        user_time:res[1].comments[i].time,
                        comment_content_id:res[1].comments[i].commentId,
                        liked:false
                    })

                    // this.user_comments.push({
                    //     comment_user_content:res[1].comments[i].content,
                    //     comment_user_name:res[1].comments[i].user.nickname,
                    //     comment_user_image:res[1].comments[i].user.avatarUrl,
                    //     comment_user_time:res[1].comments[i].time,
                    //     comment_user_id:res[1].comments[i].user.userId,
                    //     comment_content_id:res[1].comments[i].commentId
                    // })

                }


                //用户详情
                this.account_name = res[2].profile.nickname
                this.account_img = res[2].profile.avatarUrl
            }).catch((err)=>{
                console.log(err);
            })
            this.comment_key = ({type:1,id:id})

        }

    }
</script>

<style scoped>
    .MV_detailed{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;

    }
.title_box{
    font-size: 15px;
    width: 100%;
    height: 3rem;
    display: flex;
    /*flex-direction: column;*/
    align-items: center;
    /*justify-content: center;*/
    font-weight: bold;
    position: relative;
}
.comment_box{
  width: 4rem;
  height: 2rem;
  background-color: #F5F5F5;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
}
.liked_box{
  width: 5rem;
  height: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 2rem;
}
    .video_comment_height{
        width: 100%;
        height: 75%;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .video_box{
        width: 100%;
        height: 12rem;
        display: flex;
        justify-content: center;
    }
    .MV_detailed_night{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        background-color: #222225;
        color: white;

    }
    .full_Screen_black{
        width: 100%;
        height: 100%;
        background-color: black;
        position: absolute;
        top: 0;
        z-index: 998;
    }

    .full_screen{
      position: fixed;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 999;
      background-color: black;
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      /*-webkit-animation:rotate 0.5s ease-in-out 0s 1 alternate forwards;*/
    }
    @keyframes rotate {
      0% {
        transform: rotateZ(0deg);
        width: 20rem;
        height: 11.25rem;
        margin-top: 1rem;
        z-index: 2;
        /*从0度开始*/
      }
      100% {
        position: absolute;
        z-index: 9999;
        /*width: 812px;*/
        /*height: 375px;*/
        /*height: expression(document.documentElement.clientWidth);*/
        top:200px;
        /*margin-top: 5rem;*/
        transform: rotateZ(90deg);
        /*360度结束*/
      }
    }
</style>