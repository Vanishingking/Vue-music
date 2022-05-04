<template>
    <div class="recentlyplayed" :class="[$store.state.theme == 'night' ? 'recentlyplayed_night':'']">
        <div class="recentlyplayed_head">
            <TitleHeadTwo title="最近播放"></TitleHeadTwo>
        </div>
        <div class="filter_box" :class="[$store.state.theme == 'night' ? 'filter_box_night':'']">
            <Filter :content="lm_Classification" @box-click="boxFunc" ref="filter"></Filter>
        </div>
<!--        播放全部按钮-->
        <div class="play_all" v-show="song_show">
            <!--            播放全部-->
            <svg style="margin-left:0.9rem " xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" viewBox="0 0 31.25 31.25">
                <path id="Icon_ionic-ios-play-circle" data-name="Icon ionic-ios-play-circle" d="M18,3.375A14.625,14.625,0,1,0,32.625,18,14.623,14.623,0,0,0,18,3.375Zm5.892,14.9L14.245,24.11a.313.313,0,0,1-.471-.274V12.164a.312.312,0,0,1,.471-.274l9.647,5.836A.322.322,0,0,1,23.892,18.274Z" transform="translate(-2.375 -2.375)" fill="none" stroke="#5ab4f0" stroke-width="2"/>
            </svg>
            <span>播放全部</span>
        </div>

        <div class="recentlyplayed_body" v-if="$store.state.user_cookie ==''" style="display: flex; align-items: center;justify-content: center">
            <van-empty
                    class="custom-image"
                    image="https://img.yzcdn.cn/vant/custom-empty-image.png"
                    description="暂时没有数据"
            />
        </div>
        <div class="recentlyplayed_body" v-if="$store.state.user_cookie !=''" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd'>

          <transition :name="sliding_style">
            <!--        最近播放歌曲-->
            <div v-show="song_show" style="position: absolute;width: 100%">
                <Single :Song-data="recently_played_data" @box-click="open_song_menu"></Single>
            </div>
          </transition>

          <transition :name="sliding_style">
            <!--        最近播放视频-->
            <div v-show="video_show" style="position: absolute">
                <div class="Placeholder" style="height:  2rem"></div>
                <PlayedMv :recently_played_videos_data="recently_played_videos_data"></PlayedMv>
            </div>
          </transition>
        </div>


        <van-popup v-model:show="song_menu_show" position="bottom" :style="{ height: '45%',backgroundColor:theme_color }" round  closeable>
            <OperationPanel :operation_song_information="operation_song_information"></OperationPanel>
        </van-popup>
        <div>
            <Menu1 :menu_show="4"></Menu1>
        </div>
    </div>
</template>

<script>
    import OperationPanel from "../../components/home/OperationPanelTow";
    import Menu1 from "../../components/Menu1";
    import Single from "../../components/mine/SingleTwo";
    import Filter from "../../components/home/Filter";
    import PlayedMv from "../../components/mine/PlayedMv";
    // import ajax from "../../http";
    import TitleHeadTwo from "../../components/TitleHeadTwo";
    export default {
        name: "RecentlyPlayed",
        components: {
            TitleHeadTwo,
            PlayedMv,
            Filter,
            Single,Menu1,OperationPanel
        },
        data() {
            return{
                song_classification_choice: 0,
                song_show:true,
                video_show:false,
                lm_Classification:[
                    {
                    types:'歌曲',
                        url:'/recentlyplayed/song'
                    },
                    {
                        types:'视频',
                        url: '/recentlyplayed/video'

                    },
                ],
                // 最近播放歌曲数据
                recently_played_data:[],
                operation_song_information:[],
                // 最近播放视频数据
                recently_played_videos_data:[],
                song_menu_show:false,
                theme_color:'#ffffff',
                sliding_style:'swipe_left'

            }
        },
        methods: {
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
              if (this.disX>0){
                if (this.video_show){
                  this.sliding_style = 'swipe_left'
                  this.song_show = true
                  this.video_show = false
                  this.$refs.filter.song_classification_choice = 0
                }
              }else if(this.disX<0){
                if (this.song_show ){
                  this.sliding_style = 'swipe_right'
                  this.video_show = true
                  this.song_show = false
                  this.$refs.filter.song_classification_choice = 1
                }
              }
            }

          },
            // 歌曲菜单栏 获取歌曲粗略信息
            open_song_menu(data){
                this.song_menu_show = true
                this.operation_song_information = data

            },
            choice_song_list(index){
                this.song_classification_choice = index

            },
            boxFunc(){

            if (this.song_show){
              this.song_show = false
              this.video_show = true
              this.sliding_style = 'swipe_right'
            }else {
              this.song_show = true
              this.video_show = false
              this.sliding_style = 'swipe_left'
            }


            }
        },
        mounted() {
            if (this.$store.state.recently_played_local_data.song.length>0){
                for (let i=0;i<this.$store.state.recently_played_local_data.song.length;i++){
                    this.recently_played_data.push(this.$store.state.recently_played_local_data.song[i])
                }
            }
            if (this.$store.state.recently_played_local_data.video.length>0){
                for (let i=0;i<this.$store.state.recently_played_local_data.video.length;i++){
                    this.recently_played_videos_data.push(this.$store.state.recently_played_local_data.video[i])
                }
                console.log(this.$store.state.recently_played_local_data.video)
                console.log(this.recently_played_videos_data)
            }

        }
    }
</script>

<style scoped>
    .recentlyplayed{
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
.recentlyplayed_head{
    width: 100%;
    height: 6rem;
}
    .song_list_classification>hr{
        margin-top: 0.5rem;
        border: 0;/*是去掉fierfoxf的一条阴影线*/
        height: 0.2rem;/* 水平高度*/
    }
    .song_list_classification span{
        font-size: 18px;
    }
    .hr_select{
        background-color: #409eff;
        margin-top: 0.5rem;
        border: 0;/*是去掉fierfoxf的一条阴影线*/
        height: 0.2rem;/* 水平高度*/
    }
    .span_select{
        color: #409eff;
    }
    .seize{
        width: 100%;
        height: 7rem;
    }
    .recentlyplayed_body{
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }
    .title_box{
        width: 100%;
        height: 3rem;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 3.25rem;
    }
    .local_music_box{
        display: flex;
        align-items: center;
    }
    .local_music_box span{
        font-size: 20px;
        margin-left: 0.5rem;
        font-weight: bold;
    }
    .play_all{
        width: 100%;
        height: 3rem;
        display: flex;
        align-items: center;
    }
    .play_all span{
        margin-left: 0.5rem;
    }

    .recentlyplayed_night{
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: #222225;
        color: white;
    }

    .title_box_night{
        width: 100%;
        height: 3rem;
        background-color: #222225;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 3.25rem;
    }
    .filter_box{
        width: 100%;
        background-color: white;
    }

    .filter_box_night{
        width: 100%;
        background-color: #222225
    }

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