<template>
    <div class="SearchInterface" :class="[$store.state.theme == 'night' ? 'SearchInterface_night':'']">
        <div class="SearchInterface_head" :class="[$store.state.theme == 'night' ? 'SearchInterface_head_night':'']">
        <div class="Search_box" :class="[$store.state.theme == 'night' ? 'Search_box_night':'']">
            <Back :color="1"></Back>
            <div style="width: 80%;">
                <van-search v-if="$store.state.theme =='white'" v-model="search_value" placeholder="请输入搜索关键词" input-align="left"  shape="round" @click="show_search" ref="van_search" autocomplete="off"/>
                <Search v-if="$store.state.theme =='night'" @click="show_search" :value="search_value"></Search>
            </div>
        </div>
        <div class="Filter_box">
       <Filter :content="classification" @boxClick="cut" ref="filter"></Filter>
        </div>
        </div>
            <div class="search_result" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd'>

          <transition :name="sliding_style">
<!--            综合结果-->
            <div class="music_result" v-show="cut_page == '综合'">
                <Single :Song-data="search_song" @boxClick="song_menu"></Single>
            </div>
          </transition>

          <transition :name="sliding_style">
<!--            用户结果-->
            <div class="single_result" v-show="cut_page == '用户'">
                <FocusUsers :User-data="search_user"></FocusUsers>
            </div>
          </transition>

          <transition :name="sliding_style">
            <!--            视频结果-->
            <div class="video_result" v-show="cut_page == '视频'">
                <SingerVideo :Video-result="search_video"></SingerVideo>
            </div>
          </transition>

          <transition :name="sliding_style">
<!--            歌手结果-->
            <div class="singer_result" v-show="cut_page == '歌手'">
                <Singer :Singer-data="search_singer"></Singer>
            </div>
          </transition>

            <div class="Placeholder"></div>
        </div>
        <SearchGuide v-if="search_show" @Cancel-search="hide_search" :search_type="search_type" @search_originally="hide_search" @search_suggest="hide_search"></SearchGuide>
<!--        单曲菜单弹窗-->
        <van-popup v-model:show="song_menu_show" position="bottom" :style="{ height: '45%' }" closeable round>
        <OperationPanelTow :operation_song_information="operation_song_information"></OperationPanelTow>
        </van-popup>

    </div>
</template>

<script>
    import Back from '../../components/menu/Back'
    import Search from '../../components/mine/Search'
    import Filter from "../../components/home/Filter";
    import Single from "../../components/mine/SingleTwo";
    import SingerVideo from "../../components/home/SingerVideo";
    import Singer from "../../components/home/Singer";
    import FocusUsers from "../../components/home/FocusUsers";
    import SearchGuide from '../../components/home/SearchGuide'
    import ajax from "../../http";
    import OperationPanelTow from "../../components/home/OperationPanelTow";
    export default {
        name: "SearchInterface",
        components: {OperationPanelTow, Singer, SingerVideo, Single, Filter,FocusUsers,SearchGuide,Search,Back},
        data() {
            return{
                classification:[
                    {
                        id:0,
                        types:'综合'
                    },
                    {
                        id:1,
                        types:'歌手'
                    },
                    {
                        id:2,
                        types:'视频'
                    },
                    {
                        id:3,
                        types:'用户'
                    },
                ],
                search_value:'',
                cut_page:'综合',
                Song_search_results:[],
                video_search_results:[],
                get_song_data:[],
                get_singer_data:[],
                get_mv_data:[],
                search_video:[],
                search_singer:[],
                search_song:[],
                search_user:[],
                search_show:false,
                song_menu_show:false,
                operation_song_information:[],
                search_type:1,
                sliding_style:'swipe_left',
                startX:0,//开始触摸的位置
                moveX:0,//滑动时的位置
                endX:0,//结束触摸的位置
                disX:0,//移动距离
            }
        },
        methods: {

            show_search(){
                this.search_show = true
            },
            hide_search(){
                // this.search_value = this.$route.params.value
                this.search_show = false
            },
            cut(data){
              if (this.cut_page == '综合'){
                switch (data){
                  case '歌手': this.sliding_style = 'swipe_right';break;
                  case '视频': this.sliding_style = 'swipe_right';break;
                  case '用户': this.sliding_style = 'swipe_right';break;
                }
              }else  if (this.cut_page == '歌手'){
                switch (data){
                  case '综合': this.sliding_style = 'swipe_left';break;
                  case '视频':this.sliding_style = 'swipe_right';break;
                  case '用户': this.sliding_style = 'swipe_right';break;
                }
              }else if (this.cut_page == '视频'){
                switch (data){
                  case '综合': this.sliding_style = 'swipe_left';break;
                  case '歌手':this.sliding_style = 'swipe_left';break;
                  case '用户': this.sliding_style = 'swipe_right';break;
                }
              }else if(this.cut_page == '用户'){
                switch (data){
                  case '综合': this.sliding_style = 'swipe_left';break;
                  case '歌手':this.sliding_style = 'swipe_left';break;
                  case '视频': this.sliding_style = 'swipe_left';break;
                }
              }
                this.cut_page = data
            },
          //开始滑动
          touchStart(ev){

            if(ev.touches.length == 1) {    //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
              this.startX = ev.touches[0].clientX; // 记录开始位置
            }
              console.log('7878')

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
                if (this.cut_page == '用户'){
                  this.sliding_style = 'swipe_left'
                  this.cut_page = '视频'
                  this.$refs.filter.song_classification_choice = 2
                }else if (this.cut_page == '视频'){
                  this.sliding_style = 'swipe_left'
                  this.cut_page = '歌手'
                  this.$refs.filter.song_classification_choice = 1
                }else if (this.cut_page == '歌手'){
                  this.sliding_style = 'swipe_left'
                  this.cut_page = '综合'
                  this.$refs.filter.song_classification_choice = 0
                }
              }else if(this.disX<0){
                if (this.cut_page == '综合'){
                  this.sliding_style = 'swipe_right'
                  this.cut_page = '歌手'
                  this.$refs.filter.song_classification_choice = 1
                }else if (this.cut_page == '歌手'){
                  this.sliding_style = 'swipe_right'
                  this.cut_page = '视频'
                  this.$refs.filter.song_classification_choice = 2
                }else if (this.cut_page == '视频'){
                  this.sliding_style = 'swipe_right'
                  this.cut_page = '用户'
                  this.$refs.filter.song_classification_choice = 3
                }
              }
            }

          },
            song_menu(data){
                this.operation_song_information = data
                this.song_menu_show = true

            },
            back_page(){
                this.$router.replace('/home')
            },
            get_search_music_data(data){
                this.Song_search_results.splice(0,this.Song_search_results.length);
                if (data.result.songs.length != 0){
                    for (let i = 0; i<data.result.songs.length;i++){

                        this.Song_search_results.push(data.result.songs[i])
                    }
                }
                console.log(this.Song_search_results)

            },
        },
        computed: {
            search_result () {
                return this.$store.state.search_result
            },



        },
        watch: {
            search_video:{
                handler(val){
                    this.$store.commit('get_search_mv_data',val)
                },
                deep: true
            },
            search_singer:{
                handler(val){
                this.$store.commit('get_search_singer_data',val)
                },
                deep: true
            },
            search_song:{
                handler(val){
                this.$store.commit('get_search_song_data',val)
                },
                deep: true
            },

            video_search_results(){
                if (this.video_search_results.length>0){
                    console.log('有数据了')
                }
            },
            search_result(){
                this.video_search_results = this.$store.state.search_result
            },

            $route(){

                this.search_value = this.$route.params.value
                Promise.all([
                    ajax(
                        this.$store.state.api_url+'search?keywords='+this.search_value
                    ),
                    ajax(
                        this.$store.state.api_url+'cloudsearch?type=1014&keywords='+this.search_value
                    ),
                    ajax(
                        this.$store.state.api_url+'cloudsearch?type=100&keywords='+this.search_value
                    ),
                    ajax(
                        this.$store.state.api_url+'cloudsearch?type=1002&keywords='+this.search_value
                    )
                ]).then((res)=>{
                    console.log(res);
                    // 获取搜索歌曲结果
                    let arr_song = []
                    for (let i = 0; i<res[0].result.songs.length;i++){
                        if (res[0].result.songs[i].id != null){
                            arr_song.push({
                                song_name:res[0].result.songs[i].name,
                                song_id:res[0].result.songs[i].id,
                                song_singer:res[0].result.songs[i].artists[0].name,
                                song_url:'https://music.163.com/song/media/outer/url?id='+res[0].result.songs[i].id+'.mp3',
                                singer_id: res[0].result.songs[i].artists[0].id
                            })
                        }
                    }
                    this.search_song = arr_song

                    // 获取搜索视频结果
                    let arr_video = []
                    for (let i = 0; i<res[1].result.videos.length;i++){
                        arr_video.push({
                            video_name:res[1].result.videos[i].title,
                            video_user_name:res[1].result.videos[i].creator[0].userName,
                            video_user_id:res[1].result.videos[i].creator[0].userId,
                            video_image:res[1].result.videos[i].coverUrl,
                            video_id:res[1].result.videos[i].vid,
                        })
                    }
                    this.search_video = arr_video

                    // 获取歌手搜索结果
                    let arr_singer = []
                    for (let i = 0; i<res[2].result.artists.length;i++ ){
                        arr_singer.push({
                            singer_name:res[2].result.artists[i].name,
                            singer_id:res[2].result.artists[i].id,
                            singer_image:res[2].result.artists[i].img1v1Url,
                        })
                    }
                    this.search_singer = arr_singer

                    //搜索用户结果
                    let arr_user = []
                    for (let i = 0; i<res[3].result.userprofiles.length;i++){
                        arr_user.push({
                            user_name:res[3].result.userprofiles[i].nickname,
                            user_id:res[3].result.userprofiles[i].userId,
                            user_image:res[3].result.userprofiles[i].avatarUrl,
                            user_gender:res[3].result.userprofiles[i].gender,
                        })
                    }
                    this.search_user = arr_user
                }).catch((error)=>{
                    console.log(error);
                })
            }



        },
        mounted() {
            let url_search =  this.$route.path.split('/');
            let url_search_index = url_search.findIndex(item =>item == 'home')
            if (url_search_index != -1){
                this.search_type = 1
            }else {
                this.search_type = 1014
            }

            this.search_value = this.$route.params.value

            if ( this.$route.path.includes('/home')){
              this.cut_page = '综合'
           }else if(this.$route.path.includes('/video')){
               this.cut_page = '视频'
           }

            Promise.all([
                ajax(
                    this.$store.state.api_url+'search?keywords='+this.search_value
                ),
                ajax(
                    this.$store.state.api_url+'cloudsearch?type=1014&keywords='+this.search_value
                ),
                ajax(
                    this.$store.state.api_url+'cloudsearch?type=100&keywords='+this.search_value
                ),
                ajax(
                    this.$store.state.api_url+'cloudsearch?type=1002&keywords='+this.search_value
                )
            ]).then((res)=>{
                console.log(res);
                // 获取搜索歌曲结果
                let arr_song = []
                for (let i = 0; i<res[0].result.songs.length;i++){
                    if (res[0].result.songs[i].id != null){
                        arr_song.push({
                            song_name:res[0].result.songs[i].name,
                            song_id:res[0].result.songs[i].id,
                            song_singer:res[0].result.songs[i].artists[0].name,
                            song_url:'https://music.163.com/song/media/outer/url?id='+res[0].result.songs[i].id+'.mp3',
                            singer_id: res[0].result.songs[i].artists[0].id
                        })
                    }
                }
                this.search_song = arr_song

                // 获取搜索视频结果
                let arr_video = []
                for (let i = 0; i<res[1].result.videos.length;i++){
                    arr_video.push({
                        video_name:res[1].result.videos[i].title,
                        video_user_name:res[1].result.videos[i].creator[0].userName,
                        video_user_id:res[1].result.videos[i].creator[0].userId,
                        video_image:res[1].result.videos[i].coverUrl,
                        video_id:res[1].result.videos[i].vid,
                    })
                }
                this.search_video = arr_video

                // 获取歌手搜索结果
                let arr_singer = []
                for (let i = 0; i<res[2].result.artists.length;i++ ){
                    arr_singer.push({
                        singer_name:res[2].result.artists[i].name,
                        singer_id:res[2].result.artists[i].id,
                        singer_image:res[2].result.artists[i].img1v1Url,
                    })
                }
                this.search_singer = arr_singer

                //搜索用户结果
                let arr_user = []
                for (let i = 0; i<res[3].result.userprofiles.length;i++){
                    arr_user.push({
                        user_name:res[3].result.userprofiles[i].nickname,
                        user_id:res[3].result.userprofiles[i].userId,
                        user_image:res[3].result.userprofiles[i].avatarUrl,
                        user_gender:res[3].result.userprofiles[i].gender,
                    })
                }
                this.search_user = arr_user
            }).catch((error)=>{
                console.log(error);
            })


        },

    }
</script>

<style scoped>
.SearchInterface{
    position: absolute;
    width: 100%;
    height: 100%;
}
.SearchInterface_head{
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 1;
    background-color: white;
}
.search_result{
    position: absolute;
    overflow-x: hidden;
    overflow-y: scroll;
    width: 100%;
    height: 95%;
    /*background-color: #409eff;*/
    margin-top: 10rem;
}
    .Search_box{
        width: 100%;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 3.5rem;

    }
    .Filter_box{
        margin-top: 1rem;
    }

    .music_result{
        margin-top: 0.5rem;
    }

    .single_result{
        margin-top: 1rem;
    }

    .singer_result{
        margin-top: 1rem;
    }

    .SearchInterface_night{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #222225;
        color: white;
    }
    .SearchInterface_head_night{
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 1;
        background-color: #222225;
    }
    .Search_box_night{
        width: 100%;
        background-color: #222225;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 3.5rem;

    }

.back_btn{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1rem;
    height:1.5rem;

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