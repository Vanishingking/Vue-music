<template>
    <div class="box" :class="[$store.state.theme == 'night' ? 'box_night':'']">
    <div class="Singer_Information" :class="[$store.state.theme == 'night' ? 'Singer_Information_night':'']" ref="slide" v-if="singer_name.length>0">
        <div class="Singer_image_box" ref="Singer_image_box">
            <img :src="singer_image" class="Singer_image">
            <div class="Singer_material_box">
            <span class="Singer_name">{{ singer_name }}</span>
            </div>
          <div class="collection_btn_box">
            <!--                关注-->
            <div class="user_edit" v-if="collection_singer ==-1" @click="follow_singer">
              <div class="user_edit_bag"></div>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15.943 15.943">
                <g id="组_28" data-name="组 28" transform="translate(-90.9 -90.9)">
                  <path id="路径_201" data-name="路径 201" d="M872.8,755.632h0v0Z" transform="translate(-767.102 -652.142)" fill="#fff"/>
                  <path id="路径_202" data-name="路径 202" d="M104.51,93.232a7.975,7.975,0,1,0,0,11.278,7.983,7.983,0,0,0,0-11.278M103.7,103.7a6.83,6.83,0,1,1,0-9.659,6.838,6.838,0,0,1,0,9.659" fill="#fff"/>
                  <path id="路径_203" data-name="路径 203" d="M290.968,338.737a2.311,2.311,0,0,0-1.714.892,2.306,2.306,0,0,0-1.712-.892,2.7,2.7,0,0,0-2.585,2.789A3.407,3.407,0,0,0,286,343.757c.539.666,2.73,2.662,3.262,2.662.507,0,2.642-1.908,3.224-2.638a3.436,3.436,0,0,0,1.067-2.256,2.7,2.7,0,0,0-2.585-2.789m.8,4.255-.063.057-.053.066a15.048,15.048,0,0,1-2.389,2.139,16.368,16.368,0,0,1-2.429-2.169l-.051-.063-.06-.055a2.38,2.38,0,0,1-.694-1.441,1.628,1.628,0,0,1,1.515-1.719,1.291,1.291,0,0,1,.905.523l.807.929.808-.929a1.293,1.293,0,0,1,.906-.524,1.629,1.629,0,0,1,1.515,1.719,2.4,2.4,0,0,1-.718,1.466" transform="translate(-190.383 -243.146)" fill="#fff"/>
                </g>
              </svg>
              <span style="z-index: 2;color: white;margin-left: 0.5rem">收藏</span>
            </div>

            <!--                取消关注-->
            <div class="user_edit" v-if="collection_singer !=-1" @click="no_follow_singer">
              <div class="user_edit_bag"></div>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 19.257 19.01">
                <path id="路径_204" data-name="路径 204" d="M96.387,85.333a5.307,5.307,0,0,1,2.795,9.818,9.617,9.617,0,0,1,3.456,1.887.724.724,0,0,1-.938,1.1,8.2,8.2,0,0,0-13.484,5.541.724.724,0,1,1-1.442-.123,9.651,9.651,0,0,1,6.819-8.407,5.307,5.307,0,0,1,2.794-9.818Zm9.406,14.187.024.023a.674.674,0,0,1,0,.982l-3.669,3.459a.772.772,0,0,1-1.03,0L99.011,102a.674.674,0,0,1,0-.982l.024-.023a.724.724,0,0,1,.993,0l1.6,1.513L104.8,99.52a.724.724,0,0,1,.993,0ZM96.387,86.78a3.859,3.859,0,1,0,3.859,3.859A3.859,3.859,0,0,0,96.387,86.78Z" transform="translate(-86.772 -85.333)" fill="#fff"/>
              </svg>
              <span style="z-index: 2;color: white;margin-left: 0.5rem">已收藏</span>
            </div>
          </div>
        </div>
        <div class="information_classification">
            <Filter :content="classify" @boxClick="cut" ref="filter"></Filter>
        </div>
        <div  class="Singer_information_box" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd'>

          <transition :name="sliding_style">
            <!--        歌手资料-->
            <div v-show="cut_page == '主页'" class="Singer_information_box_in" ref="Singer_information_box_in" :style="{maxHeight:main_content_height}">
                <div class="Singer_information_title">歌手资料</div>
               <div class="singer_information_name">{{ singer_name }}</div>
                <div class="Singer_introduction">歌手介绍：</div>
                <div class="Singer_introduction_briefDesc">{{"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+singer_information }}</div>
                <div style="height: 1rem;width: 100%"></div>
            </div>
          </transition>

          <transition :name="sliding_style">
<!--            歌手音乐-->
            <div v-show="cut_page == '音乐'" class="Singer_Music_box" :style="{maxHeight:main_content_height}">
                <Single :Song-data="singer_song" @boxClick="open_song_menu"></Single>
                <div class="leave_blank"></div>
            </div>
          </transition>

          <transition :name="sliding_style">
<!--            歌手视频-->
            <div class="singer_video_box" v-show="cut_page == '视频'" ref="singer_video_box" :style="{maxHeight:main_content_height}">
                    <SingerVideo :Video-result="singer_mv" v-if="singer_mv!=''"></SingerVideo>
            </div>
          </transition>
        </div>
    </div>
    <!--        歌手音乐菜单-->
        <van-popup v-model:show="song_menu_show" position="bottom" :style="{ height: '45%',backgroundColor:theme_color }" round>
            <OperationPanel :operation_song_information="operation_song_information"></OperationPanel>
        </van-popup>

        <div style="position: fixed;bottom: 0;z-index: 9;width: 100%">
            <Menu1 :menu_show="1"></Menu1>
        </div>
        <div style="position: fixed; top:3.5rem;left:1rem;z-index: 9">
            <Back :color="1"></Back>
        </div>
    </div>
</template>

<script>
    import Menu1 from "../../components/Menu1";
    import Back from '../../components/menu/Back'
    import ajax from "../../http";
    import Filter from "../../components/home/Filter";
    import Single from "../../components/mine/SingleTwo";
    import SingerVideo from "../../components/home/SingerVideo";
    import OperationPanel from "../../components/home/OperationPanelTow";
    export default {
        name: "SingerInformation",
        components: {
            SingerVideo,
            Single,
            Filter,
            OperationPanel,Back,Menu1
        },
        computed:{
            opacity:function () {

                return 0
            }
        },
        data() {
          return{
              classify:[
                  {
                      id:0,
                      types:'主页'
                  },
                  {
                      id:1,
                      types:'音乐'
                  },
                  {
                      id:2,
                      types:'视频'
                  },
              ],
              transparency:'',
              cut_page:'主页',
              singer_name:'xxxx',
              singer_image:'',
              singer_song:[],
              singer_mv:[],
              singer_information:[],
              operation_song_information:[],
              follow:false,
              song_menu_show:false,
              theme_color:'#ffffff',
              main_content_height:0,
              collection_singer:-1,
              sliding_style:'swipe_left' ,// swipe_right,
              startX:0,//开始触摸的位置
              moveX:0,//滑动时的位置
              endX:0,//结束触摸的位置
              disX:0,//移动距离

          }
        },
        methods: {
            touchmove(){
                this.transparency = -((this.$refs.slide.getBoundingClientRect().top+130)/100-1.3)
                console.log(this.$refs.slide.getBoundingClientRect().top)
            },
            cut(data){
              if (this.cut_page == '主页'){
                switch (data){
                  case '音乐': this.sliding_style = 'swipe_right';break;
                  case '视频':this.sliding_style = 'swipe_right';break;
                }
              }else  if (this.cut_page == '音乐'){
                switch (data){
                  case '主页': this.sliding_style = 'swipe_left';break;
                  case '视频':this.sliding_style = 'swipe_right';break;
                }
              }else if (this.cut_page == '视频'){
                switch (data){
                  case '主页': this.sliding_style = 'swipe_left';break;
                  case '音乐':this.sliding_style = 'swipe_left';break;
                }
              }
                this.cut_page = data
            },
          //开始滑动
          touchStart(ev){
            if(ev.touches.length == 1) {    //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
              this.startX = ev.touches[0].clientX; // 记录开始位置
            }

          },
          //滑动距离
          touchMove(ev){
            if(ev.touches.length == 1) {
              //滑动时距离浏览器左侧的距离
              this.moveX = ev.touches[0].clientX;
              //实时的滑动的距离-起始位置=实时移动的位置
              this.disX = this.moveX-this.startX;
            }

          },
          //结束滑动
          touchEnd(ev){
            if (ev.changedTouches.length == 1){
              let endX = ev.changedTouches[0].clientX;
              this.disX = endX-this.startX;
              if (this.disX>60){
                if (this.cut_page == '音乐'){
                   this.sliding_style = 'swipe_left'
                   this.cut_page = '主页'
                  this.$refs.filter.song_classification_choice = 0
                }else if (this.cut_page == '视频'){
                   this.sliding_style = 'swipe_left'
                   this.cut_page = '音乐'
                  this.$refs.filter.song_classification_choice = 1
                }
              }else if(this.disX<-60){
                if (this.cut_page == '主页'){
                  this.sliding_style = 'swipe_right'
                  this.cut_page = '音乐'
                  this.$refs.filter.song_classification_choice = 1
                }else if (this.cut_page == '音乐'){
                  this.sliding_style = 'swipe_right'
                  this.cut_page = '视频'
                  this.$refs.filter.song_classification_choice = 2
                }
              }
            }

          },
            // 歌曲菜单栏 获取歌曲粗略信息
            open_song_menu(data){
                this.operation_song_information = data
                this.song_menu_show = true
            },
          // 收藏歌手
          follow_singer(){
            let id = this.$route.params.id
            ajax(
                this.$store.state.api_url+'artist/sub',
                {id:id,t:'1',cookie:this.$store.state.user_cookie}
            ).then((res)=>{
              console.log(res);
              this.collection_singer = 1
              this.$toast('已收藏')
            }).catch((err)=>{
              console.log(err);
             this.$toast('发生错误')
            })
          },
          no_follow_singer(){
            let id = this.$route.params.id
            ajax(
                this.$store.state.api_url+'artist/sub',
                {id:id,t:'0',cookie:this.$store.state.user_cookie}
            ).then((res)=>{
              console.log(res);
              this.collection_singer = -1
              this.$toast('取消收藏')
            }).catch((err)=>{
              console.log(err);
              this.$toast('发生错误')
            })
          },

        },
        mounted() {

            let id = this.$route.params.id

            Promise.all([
                ajax(
                    // 'http://127.0.0.1:3000/artist/detail?id='+id
                    this.$store.state.api_url+'artist/detail?id='+id,
                    {cookie:this.$store.state.user_cookie}
                ),
                ajax(
                    // 'http://127.0.0.1:3000/artists?id='+id
                    this.$store.state.api_url+'artists?id='+id
                ),
                ajax(
                    // 'http://127.0.0.1:3000/artist/mv?id='+id
                    this.$store.state.api_url+'artist/mv?id='+id
                )

            ]).then((res)=>{
                console.log(res[0])
                // 歌曲结果
                this.singer_name = res[0].data.artist.name
                this.singer_image = res[0].data.artist.cover
                // 歌手信息
                this.singer_information = res[0].data.artist.briefDesc
                // 歌手结果
                for (let i = 0;i<res[1].hotSongs.length;i++){
                    this.singer_song.push({
                        song_name:res[1].hotSongs[i].name,
                        song_id:res[1].hotSongs[i].id,
                        song_singer:res[1].artist.name,
                        song_image:res[1].hotSongs[i].al.picUrl,
                    })
                }

                // 视频结果
                for (let i=0;i<res[2].mvs.length;i++){
                    this.singer_mv.push({
                        video_id:res[2].mvs[i].id,
                        video_image:res[2].mvs[i].imgurl,
                        video_name:res[2].mvs[i].name,
                        video_user_name:res[2].mvs[i].artistName,
                    })
                }

            }).catch((error)=>{
                console.log(error)
            })


            //长度
            // let h = document.documentElement.clientHeight

            this.$nextTick(() => { //使用nextTick为了保证dom元素都已经渲染完毕

            });
            this.$nextTick(()=>{
                setTimeout(()=>{
                    // 屏幕高度
                    let h = document.documentElement.clientHeight
                    // 盒子距离屏幕顶部的距离
                    let k =  this.$refs.Singer_information_box_in.getBoundingClientRect().top
                    // 盒子的高度 96为菜单栏高度 需要减去
                    this.main_content_height = h-k-96-10+'px'
                    console.log(this.main_content_height)
                },800)

            })

           //判断是否收藏该歌手
            this.collection_singer = this.$store.state.favorite_singer_id.findIndex(item=> item.id == id);


        }

    }
</script>

<style scoped>
    *{
        font-family: 宋体;
    }
.Singer_Information{
    position: absolute;
    top: 0;
    width: 100%;
    height: 130%;
    background-color: white;
    z-index: 1;
}
.Singer_Information_head{
    width: 100%;
    height: 5rem;
    position: absolute;
    top: 0;
    z-index: 1;
    background-color: white;
    display: flex;
    justify-content: center;
    font-size: 20px;
    opacity:0;

}
.Singer_Information_head span{
    margin-top: 3rem;
}
.Singer_Information_head_white{
    width: 100%;
    height: 5rem;
    background-color: white;

}
.Singer_image_box{
    width: 100%;
    height: 18.75rem;
    position: relative;
    top: 0;
    background-color: #409eff;
    z-index: 2;
}
    .Singer_image{
        width: 100%;
        height: 18.75rem;
        position: absolute;
        top: 0;
        z-index: 1;
    }
    .Singer_material_box{
        width: 100%;
        position: absolute;
        z-index: 1;
        display: flex;
        flex-direction: column;


    }
    .Singer_name{
        font-size: 40px;
        margin-top: 11rem;
        color: white;
        margin-left: 1rem;
        font-weight: bold;
    }
    .information_classification{
        margin-top: 1rem;
    }
.Singer_information_box{
    width:100% ;
    display: flex;
    justify-content: center;
    position: relative;

}
.Singer_information_box_in{
    width: 95%;
    max-height: 22rem;
    /*border: 1px solid black;*/
    border-radius: 1rem;
    margin-top: 1rem;
    overflow-y:auto;
    /*阴影*/
    -webkit-box-shadow: #DDDDDD 0px 0px 10px;
    -moz-box-shadow: #DDDDDD 0px 0px 10px;
    box-shadow: #DDDDDD 0px 0px 10px;
    position: absolute;
}
    .Singer_information_title{
        margin-top: 1rem;
        margin-left: 1rem;
        font-size: 18px;
    }
    .Singer_introduction{
        margin-top: 0.5rem;
        margin-left: 1rem;
        font-size: 15px;
    }
    .Singer_Music_box{
        width: 95%;
        max-height: 22rem;
        border-radius: 1rem;
        margin-top: 1rem;
        /*阴影*/
        -webkit-box-shadow: #DDDDDD 0px 0px 10px;
        -moz-box-shadow: #DDDDDD 0px 0px 10px;
        box-shadow: #DDDDDD 0px 0px 10px;
        overflow-y: scroll;
        position: absolute;

    }
    .singer_information_name{
        margin-left: 2.5rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
        font-size: 20px;
    }
    .Singer_introduction_briefDesc{
        margin-top: 1rem;
        width: 90%;
        margin-left: 5%;
    }
    .song_menu{
        width: 100%;
        height: 100%;
        /*height: 100%;*/
        position: absolute;
        top: 0;
        z-index: 13;

    }
    .song_menu_background{
        width: 100%;
        height: 100%;
       /*height: 800px;*/
        position: absolute;
        top: 0;
        z-index: 13;
        background-color: black;
    }
    .box{
        width: 100%;
        height: 100%;
        position: fixed;
        display: flex;
        flex-direction: column;

    }
.singer_video_box{
    /*overflow-y: scroll;*/
    width: 95%;
    /*mxa-height: 10rem;*/
    /*阴影*/
    -webkit-box-shadow: #DDDDDD 0px 0px 10px;
    -moz-box-shadow: #DDDDDD 0px 0px 10px;
    box-shadow: #DDDDDD 0px 0px 10px;
    border-radius: 1rem;
    margin-top: 1rem;
    position: absolute;
    overflow-y: auto;
}
    .follow_btn{
        width: 4rem;
        height: 2rem;
        background-color: #409eff;
        border-radius: 0.75rem;
        text-align: center;
        line-height: 2rem;
        color: white;
    }
.follow_btn_{
    width: 4rem;
    height: 2rem;
    background-color: #9E9E9E;
    border-radius: 0.75rem;
    text-align: center;
    line-height: 2rem;
    color: white;
}

    .box_night{
        width: 100%;
        height: 100%;
        position: fixed;
        background-color: #222225;
        color: white;

    }
    .Singer_Information_night{
        position: absolute;
        top: 0;
        width: 100%;
        height: 130%;
        background-color: #222225;
        z-index: 1;
    }


    .kkl{
        width: 100px;
        height: 100px;
        background-color: #39a9ed;
        z-index: 999;
        position: fixed;
        top: 100px;
    }
    .user_edit{
      position: absolute;
      right: 2rem;
      top: 10rem;
      width: 5rem;
      height: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .user_edit_bag{
      width: 100%;
      height: 100%;
      background-color: #C0C0C0;
      position: absolute;
      z-index: 1;
      opacity: 0.4;
      border-radius: 0.3rem;

    }
    .user_edit svg{
      z-index: 1;
    }
    /*.collection_btn_box{*/
    /*  position: absolute;*/
    /*  z-index: 999;*/
    /*}*/



    .swipe_right-enter-from{
      transform: translatex(100%);
      z-index: 3;
    }
    .swipe_right-enter-active{
      transform: translatex(100%);
      transition: all 0.5s ease-out;
      z-index: 2;

    }
    .swipe_right-enter-to{
      transform: translatex(0%);
      z-index: 1;
    }

    .swipe_right-leave-from{
      transform: translatex(0%);
      z-index: 1;
    }
    .swipe_right-leave-active{
      transform: translatex(0%);
      transition: all 0.5s ease-out;
      z-index: -1;

    }
    .swipe_right-leave-to{
      transform: translatex(-100%);
      z-index: -2;
    }


    .swipe_left-enter-from{
      transform: translatex(-100%);
      z-index: 3;
    }
    .swipe_left-enter-active{
      transform: translatex(-100%);
      transition: all 0.5s ease-out;
      z-index: 2;

    }
    .swipe_left-enter-to{
      transform: translatex(0%);
      z-index: 1;
    }

    .swipe_left-leave-from{
      transform: translatex(0%);
      z-index: 1;
    }
    .swipe_left-leave-active{
      transform: translatex(0%);
      transition: all 0.5s ease-out;
      z-index: -1;

    }
    .swipe_left-leave-to{
      transform: translatex(100%);
      z-index: -2;
    }

</style>