<template>
  <div class="Comment" :class="[$store.state.theme == 'night' ? 'Comment_night':'']" >
<!--    v-if="song_list_details !=''"-->
    <div class="title" :class="[$store.state.theme == 'night' ? 'title_night':'']">
      <TitleHead title="评论"></TitleHead>
    </div>
    <div class="Placeholder"></div>
    <!--        歌曲信息-->
    <div class="song_singer_box" :class="[$store.state.theme == 'night' ? 'song_singer_box_night':'']">
      <img src="../../../public/img/fire.jpg" alt="" class="Album_img" v-if="coverImgUrl == 0">
      <img src="../../../public/img/forest.jpg" alt="" class="Album_img" v-if="coverImgUrl == 1">
      <img src="../../../public/img/rain.jpg" alt="" class="Album_img" v-if="coverImgUrl == 2">
      <img src="../../../public/img/seawater.jpg" alt="" class="Album_img" v-if="coverImgUrl == 3">
      <div class="song_singer_span">
        <span class="song_name">{{ song_name }}</span>
      </div>
    </div>
    <!--        评论-->
    <div class="Comment_height" ref="Comment_height" :style="{height:comment_height}">
      <div class="title_small" :class="[$store.state.theme == 'night' ? 'title_small_night':'']">
        <span>精彩评论</span>
      </div>
      <div style="width: 100%;height: 100%;overflow-y: auto">
        <UserComment :songlistcomment="Song_list_comment_review"></UserComment>
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
import UserComment from "../../components/home/UserCommentTwo";
import Reply from "../../components/Reply";
import ajax from "../../http";
import TitleHead from "../../components/TitleHead";
// import fire from '../../../public/img/fire.jpg'
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
      account_img:'',
      coverImgUrl:'',
      song_name:'xxx',
      account_id:''
    }
  },
  methods:{
    push_user_comment(data){
      let time = new Date();
      this.Song_list_comment_review.unshift({
        user:{avatarUrl:this.account_img,nickname:this.account_name},
        time:time,
        content:data
      })
    }
  },
  mounted() {
    let type = this.$route.params.type

    switch (type){
      case '0': this.song_name = '篝火'; this.coverImgUrl = 0 ; break;
      case '1': this.song_name = '丛林'; this.coverImgUrl = 1 ; break;
      case '2': this.song_name = '雨水'; this.coverImgUrl = 2 ; break;
      case '3': this.song_name = '海洋'; this.coverImgUrl = 3 ; break;
    }

    Promise.all([
      ajax('http://localhost:3001/noiseReviews',{noise:type}),
      ajax(this.$store.state.api_url+'user/account', {cookie:this.$store.state.user_cookie})
    ]).then((res)=>{


      console.log(res[0])
      for (let i = 0; i<res[0].length;i++){
        this.Song_list_comment_review.push({
          user:{ avatarUrl:res[0][i].avatar,nickname:res[0][i].user_name },
          time:res[0][i].time,
          liked:false,
          content:res[0][i].comment_content
        })
      }

      console.log(res[1])

      //用户详情
      this.account_name = res[1].profile.nickname
      this.account_img = res[1].profile.avatarUrl
      this.account_id = res[1].account.id
      this.comment_key = ({type:9,account_name:this.account_name,account_img:this.account_img,account_id:this.account_id,noise: this.$route.params.type})

    }).catch((err)=>{
      console.log(err);
    })


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
  font-weight: bold;
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