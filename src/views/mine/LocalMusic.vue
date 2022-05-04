<template>
    <div class="Local_Music" :class="[$store.state.theme == 'night' ? 'Local_Music_night':'']">
        <div class="Local_Music_head">
            <TitleHeadTwo title="我的收藏"></TitleHeadTwo>
        </div>
        <div class="filter_box" :class="[$store.state.theme == 'night' ? 'filter_box_night':'']">
            <Filter :content="lm_Classification" @boxClick="select_classification" ref="filter"></Filter>
        </div>

        <!--        播放全部按钮-->
        <div class="play_all" v-if="selected_type == '单曲'">
            <!--            播放全部-->
            <svg style="margin-left:0.9rem " xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" viewBox="0 0 31.25 31.25">
                <path id="Icon_ionic-ios-play-circle" data-name="Icon ionic-ios-play-circle" d="M18,3.375A14.625,14.625,0,1,0,32.625,18,14.623,14.623,0,0,0,18,3.375Zm5.892,14.9L14.245,24.11a.313.313,0,0,1-.471-.274V12.164a.312.312,0,0,1,.471-.274l9.647,5.836A.322.322,0,0,1,23.892,18.274Z" transform="translate(-2.375 -2.375)" fill="none" stroke="#5ab4f0" stroke-width="2"/>
            </svg>
            <span>播放全部</span>
        </div>

        <div class="Local_Music_body" v-if="$store.state.user_cookie ==''" style="display: flex; align-items: center;justify-content: center">
            <van-empty
                    class="custom-image"
                    image="https://img.yzcdn.cn/vant/custom-empty-image.png"
                    description="暂时没有数据"
            />
        </div>
        <div class="Local_Music_body" v-if="$store.state.user_cookie !=''" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd'>

          <transition :name="sliding_style">
    <!--        收藏歌曲-->
            <div  v-if="selected_type == '单曲'" style="position: absolute;width: 100%">
                <div>
                    <van-search v-if="$store.state.theme =='white'" v-model="search_value" placeholder="请输入搜索关键词" input-align="center"  shape="round"/>
                    <Search v-if="$store.state.theme =='night'" value="请输入搜索关键词"></Search>
                </div>
            <Single :Song-data="favorite_song_data" @boxClick="operation"></Single>
            </div>
          </transition>

          <transition :name="sliding_style">
    <!--        收藏歌手-->
            <div v-if="collection_singer_data.length>0&&selected_type == '歌手'" style="position: absolute">
                <ul>
                    <li v-for="item in collection_singer_data" :key="item">
                        <div class="collection_singer_box" @click="get_singer(item.collection_singer_id)">
    <!--                        头像-->
                            <img :src="item.collection_singer_img" class="collection_singer_img">
    <!--                        名字-->
                            <span class="collection_singer_name">{{ item.collection_singer_name }}</span>
                        </div>
                    </li>
                </ul>
            </div>
          </transition>

          <transition :name="sliding_style">
    <!--        收藏视频-->
            <div v-if="selected_type == '视频'" style="position: absolute;width: 100%">
            <PlayedMv :recently_played_videos_data='favorite_video_data'></PlayedMv>
            </div>
          </transition>

          <transition :name="sliding_style">
<!--          收藏歌单-->

          <div v-if="selected_type == '歌单'" style="position: absolute;width: 100%">
            <FavoritePlaylist :favorite_playlist_data="favorite_playlist_data" @cancel_collection="cancel_collection" ></FavoritePlaylist>
          </div>
          </transition>
        </div>
        <div>
            <Menu1 :menu_show="4"></Menu1>
        </div>

<!--        菜单弹窗-->
        <van-popup v-model:show="song_menu_show" position="bottom" :style="{ height: '45%' }" round  closeable>
            <OperationPanel :operation_song_information="operation_song_information"></OperationPanel>
        </van-popup>
    </div>
</template>

<script>
    import OperationPanel from "../../components/home/OperationPanelTow";
    import Menu1 from "../../components/Menu1";
    import Search from '../../components/mine/Search'
    import Single from "../../components/mine/SingleTwo";
    import Filter from "../../components/home/Filter";
    import PlayedMv from "../../components/mine/PlayedMv";
    import ajax from  "../../http/index"
    import TitleHeadTwo from "../../components/TitleHeadTwo";
    import FavoritePlaylist from "../../components/mine/FavoritePlaylist";
    export default {
        name: "LocalMusic",
        components: {
          FavoritePlaylist,
            TitleHeadTwo,
            Filter,
            Single,
            Search,
            PlayedMv,Menu1,OperationPanel
        },
        data() {
            return{
                song_classification_choice: 0,
                lm_Classification:[
                    {
                        id:0,
                        types:'单曲',
                        url:'single'
                    },
                    {
                        id:1,
                        types:'歌手',
                        url: 'singer'
                    },
                    {
                        id: 2,
                        types:'视频',
                        url: 'album'
                    },
                    {
                        id:3,
                        types:'歌单',
                        url:'list'
                    }
                ],
                collection_singer_data:[],
                collection_videos_data:[],
                favorite_song_list_id:'308409313',
                favorite_song_data:[],
                favorite_video_data:[],
                selected_type:'单曲',
                song_menu_show:false,
                operation_song_information:[],
                search_value:'',
                search_result:[],
                favorite_playlist_data:[],
                sliding_style:"swipe_left",
            }
        },
        methods: {
            choice_song_list(index){
                this.song_classification_choice = index
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
            // ev = ev || event;
            // ev.preventDefault();
            if (ev.changedTouches.length == 1){
              let endX = ev.changedTouches[0].clientX;
              this.disX = endX-this.startX;
              if (this.disX>0){
                if (this.selected_type == '歌单'){
                  this.sliding_style = 'swipe_left'
                  this.selected_type = '视频'
                  this.$refs.filter.song_classification_choice = 2
                }else if (this.selected_type == '视频'){
                  this.sliding_style = 'swipe_left'
                  this.selected_type = '歌手'
                  this.$refs.filter.song_classification_choice = 1
                }else if (this.selected_type == '歌手'){
                  this.sliding_style = 'swipe_left'
                  this.selected_type = '单曲'
                  this.$refs.filter.song_classification_choice = 0
                }
              }else if(this.disX<0){
                if (this.selected_type == '单曲'){
                  this.sliding_style = 'swipe_right'
                  this.selected_type = '歌手'
                  this.$refs.filter.song_classification_choice = 1
                }else if (this.selected_type == '歌手'){
                  this.sliding_style = 'swipe_right'
                  this.selected_type = '视频'
                  this.$refs.filter.song_classification_choice = 2
                }else if (this.selected_type == '视频'){
                  this.sliding_style = 'swipe_right'
                  this.selected_type = '歌单'
                  this.$refs.filter.song_classification_choice = 3
                }
              }
            }

          },
            get_singer(id){
                this.$router.push({ path:`/home/singerinformation/${ id }`})
            },
            select_classification(index){
              if (this.selected_type == '单曲'){
                switch (index){
                  case '歌手': this.sliding_style = 'swipe_right';break;
                  case '视频':this.sliding_style = 'swipe_right';break;
                  case '歌单':this.sliding_style = 'swipe_right';break;
                }
              }else if(this.selected_type == '歌手'){
                switch (index){
                  case '单曲': this.sliding_style = 'swipe_left';break;
                  case '视频':this.sliding_style = 'swipe_right';break;
                  case '歌单':this.sliding_style = 'swipe_right';break;
                }
              }else if(this.selected_type == '视频'){
                switch (index){
                  case '单曲': this.sliding_style = 'swipe_left';break;
                  case '歌手':this.sliding_style = 'swipe_left';break;
                  case '歌单':this.sliding_style = 'swipe_right';break;
                }
              }else if(this.selected_type == '歌单'){
                switch (index){
                  case '单曲': this.sliding_style = 'swipe_left';break;
                  case '歌手':this.sliding_style = 'swipe_left';break;
                  case '视频':this.sliding_style = 'swipe_left';break;
                }
              }

                this.selected_type = index

            },
            operation(data){
                console.log(data)
                this.operation_song_information = data
                this.song_menu_show = true
            },
          cancel_collection(index){

            ajax(
                this.$store.state.api_url+'playlist/subscribe',
                {cookie:this.$store.state.user_cookie,t:2,id:this.favorite_playlist_data[index].song_list_id},
                'post'
            ).then((res)=>{
              console.log(res)
              this.favorite_playlist_data.splice(index,1)
            }).catch((err)=>{
              console.log(err);
              this.$toast('失败')
            })
          }
        },

        mounted() {
            let favorite_song_list_id = this.$route.params.id
            Promise.all([
                // 获取收藏歌手数据
                ajax(
                    this.$store.state.api_url+'artist/sublist',
                    {cookie:this.$store.state.user_cookie},
                    'post'
                ),
                //获取收藏歌曲
                ajax(
                    this.$store.state.api_url+'playlist/detail',
                    {cookie:this.$store.state.user_cookie,id:favorite_song_list_id},
                    'post'
                ),
                //获取收藏视频
                ajax(
                    this.$store.state.api_url+'mv/sublist',
                    {cookie:this.$store.state.user_cookie},
                    'post'
                ),
                //获取收藏歌单
                ajax(
                    this.$store.state.api_url+'user/playlist',
                    {uid:this.$store.state.my_user_id},
                )
            ]).then((res)=>{
                console.log(res[1]);
                for (let i = 0; i<res[0].data.length; i++){
                    this.collection_singer_data.push({
                        collection_singer_img:res[0].data[i].picUrl,
                        collection_singer_name:res[0].data[i].name,
                        collection_singer_id:res[0].data[i].id
                    })
                }
                for (let i = 0; i<res[1].playlist.tracks.length;i++){
                    this.favorite_song_data.push({
                        song_name:res[1].playlist.tracks[i].name,
                        song_singer:res[1].playlist.tracks[i].ar[0].name,
                        song_id:res[1].playlist.tracks[i].id,
                        singer_id:res[1].playlist.tracks[i].ar[0].id,
                    })
                }
                //备份总结果
                this.search_result = this.favorite_song_data

                for (let i = 0;i<res[2].data.length;i++){
                    this.favorite_video_data.push({
                        video_image:res[2].data[i].coverUrl,
                        video_name:res[2].data[i].title,
                        video_singer:res[2].data[i].creator[0].userName,
                        video_play_time:''
                    })
                }

                for (let i =  1; i<res[3].playlist.length; i++){
                  this.favorite_playlist_data.push({
                    song_list_name:res[3].playlist[i].name,
                    song_list_id:res[3].playlist[i].id,
                    coverImgUrl:res[3].playlist[i].coverImgUrl,
                    trackCount:res[3].playlist[i].trackCount,
                      })
                }

              console.log(res[3])
            }).catch((err)=>{
                console.log(err);
            })
        },

        watch:{
            search_value(val){
              //模糊搜索
                this.favorite_song_data = this.search_result.filter(item => {return item.song_name.includes(val)});

            }
        }
    }
</script>

<style scoped>
    .Local_Music_head{
        width: 100%;
        height: 6rem;

    }
    .Placeholder{
        height: 10rem;
    }
    .Local_Music{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        display: flex;
        flex-direction: column;
    }

.local_music_box span{
    margin-left: 0.5rem;
}

.local_Classification{
    display: flex;
    font-size: 18px;
    margin-top: 1.1rem;
    margin-bottom: 1rem;
    /*border-bottom: 1px solid black;*/
    justify-content: space-around;
}
.local_classification{

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
    .collection_singer_box{
        width: 100%;
        height: 4rem;
        display: flex;
        align-items: center;
    }
    .collection_singer_img{
        width: 3rem;
        height: 3rem;
        border-radius: 1.5rem;
        margin-left: 1rem;
    }
    .collection_singer_name{
        font-size: 18px;
        margin-left: 1rem;
    }
    .Local_Music_body{
        width: 100%;
        height: 100%;
        overflow-y: auto;
      position: relative;
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


    .Local_Music_night{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        display: flex;
        flex-direction: column;
        color: white;
        background-color: #222225;
    }

    .filter_box{
        width: 100%;
        background-color: white;
    }

    .filter_box_night{
        width: 100%;
        background-color: #222225
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