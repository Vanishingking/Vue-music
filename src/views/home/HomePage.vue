<template>
    <div class="HomePage" :class="[$store.state.theme == 'night' ? 'HomePage_night':'']">
        <div class="Song_Search_box" >
            <div style="width: 70%;">
                <van-search v-if="$store.state.theme =='white'" placeholder="请输入搜索关键词" input-align="center"  shape="round" @click-input="show_search"/>
                <Search v-if="$store.state.theme =='night'" @click="show_search" value="请输入搜索关键词"></Search>
            </div>
        </div>
        <div class="HomePage_body" >
          <div class="recommend_time_box">
            <span class="recommend_time_day">{{ recommend_day }}</span>
            <span class="recommend_time_month">{{ recommend_month }}</span>
          </div>
<!--    轮播图-->
            <div class="rotation_box">
                <div style="width: 90%" v-if="Daily_recommendation !=[]">
                    <van-swipe class="my-swipe" :autoplay="3000"  lazy-render indicator-color="white">
                        <van-swipe-item v-for="item in Daily_recommendation" :key="item" @click="song_play(item.song_id)">
                          <RotatePictures :pictures="item.song_cover" :song_name="item.song_name" :song_singer="item.song_singer"></RotatePictures>
                        </van-swipe-item>
                    </van-swipe>
                </div>
            </div>
        <HomeSongList></HomeSongList>
        <RecommendedSongList></RecommendedSongList>
        </div>

<!--        菜单-->
       <div style=" width: 100%;height: 6rem;" >
           <Menu1 :menu_show="1"></Menu1>
       </div>

        <SearchGuide v-if="search_show" @Cancel-search="hide_search" :search_type="1"></SearchGuide>
<!--      v-if="$store.state.music_play_id != 0"-->

        <div style="position: fixed;z-index: 1;bottom: 6.5rem;width: 100%" v-if="$store.state.music_play_id != 0">
            <Open_music @home_play="home_play"  @home_next_song="home_next_song"></Open_music>
        </div>

    </div>
</template>

<script>
    import RecommendedSongList from "../home/RecommendedSongList";
    import HomeSongList from '../../components/home/HomeSongList'
    import SearchGuide from "../../components/home/SearchGuide";
    import Menu1 from "../../components/Menu1";
    import Search from "../../components/mine/Search";
    import Open_music from "./OpenMusic";
    import {computed} from "vue";
    import ajax from "../../http";
    import RotatePictures from '../../components/RotatePictures'
    // import {ColorThief} from '../../../public/js/color-thief.umd'
    export default {
        name: "HomePage",
        components: {
            Open_music,
            Search,
            Menu1,
            SearchGuide,
            RecommendedSongList,
            HomeSongList,
          RotatePictures
        },
        data(){
          return{
              Recommended_Song_List:[
                  // {
                  //     id:0
                  // },{
                  // id: 1
                  // }
              ],
              value:'',
              search_show:false,
            recommended_song_cover:[
              {img:require('../../../public/img/fire.jpg')}
            ],

            recommend_time_day:Number,
            recommend_time_month:'',
            Daily_recommendation:[],
            // background_color:['#E7E0CB','#5E8CCC','#423935','#BC9DDA','#99261A','#BB9C5C','#B89690','#0C2824']
          }

        },
        methods: {
          song_play(id){
            this.$store.commit('advance')
           this.$router.push(`/home/musicplay/${id}`)
          },

            show_search(){
                this.search_show = true
            },
            hide_search(){
                this.search_show = false
            },
            home_play(){
                this.$emit('home_play')
            },
            home_next_song(data){
                this.$emit('home_next_song',data)
            }
        },
        setup() {
            const recommend_day = computed(()=>{
              let date = new Date();
              let d = date.getDate();// 日
              d = d < 10 ? ('0' + d) : d;

              return  d ;
            })
          const recommend_month = computed(()=>{
            let date = new Date();
            let MM = date.getMonth() + 1;// 月
            MM = MM < 10 ? ('0' + MM) : MM;
            switch (MM){
              case '01': MM ='Jan'; break;
              case '02': MM ='Feb'; break;
              case '03': MM ='Mar'; break;
              case '04': MM ='Apr'; break;
              case '05': MM ='May'; break;
              case '06': MM ='Jun'; break;
              case '07': MM ='Jul'; break;
              case '08': MM ='Aug'; break;
              case '09': MM ='Sep'; break;
              case '10': MM ='Oct'; break;
              case '11': MM ='Nov'; break;
              case '12': MM ='Dec'; break;
            }

            return MM ;
          })
            return{
              recommend_day,
              recommend_month
            }
        },
        mounted() {

          if (this.$store.state.user_cookie !=undefined){

            ajax(
                this.$store.state.api_url+'recommend/songs',
                {cookie:this.$store.state.user_cookie}
            ).then((res)=>{
              console.log(res);
                this.Daily_recommendation = []
              for (let i = 0;i<8;i++){
                this.Daily_recommendation.push({
                  song_name:res.data.dailySongs[i].name,
                  song_id:res.data.dailySongs[i].id,
                  song_singer:res.data.dailySongs[i].ar[0].name,
                  singer_id:res.data.dailySongs[i].ar[0].id,
                  song_cover:res.data.dailySongs[i].al.picUrl,
                })
              }


            }).catch((err)=>{
              console.log(err);
            })


          }else {
            ajax(
                this.$store.state.api_url+'personalized/newsong'
            ).then((res)=>{
              console.log(res);
                this.Daily_recommendation = []
              for (let i = 0;i<8;i++){
                this.Daily_recommendation.push({
                  song_name:res.result[i].name,
                  song_id:res.result[i].id,
                  song_singer:res.result[i].song.artists[0].name,
                  singer_id:res.result[i].song.artists[0].id,
                  song_cover:res.result[i].picUrl,

                })
              }
            }).catch((err)=>{
              console.log(err);
            })
          }

        },

    }
</script>

<style scoped>
    .HomePage{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        display: flex;
        flex-direction: column;

    }
    .HomePage::-webkit-scrollbar {
        display: none;/*隐藏滚动条*/
    }
    .Song_Search_box{
        width: 100%;
        /*background-color: white;*/
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 3.5rem;
    }
    .search_box{
        /*background-color: black;*/
    }
    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
    }
    .HomePage_body{
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }
    .recommend_time_box{
      width: 100%;
      height: 3rem;
      margin-top: 1rem;
      display: flex;
     align-items: center;
    }
    .rotation_box{
        width: 100%;
        height: 150px;
        display: flex;
        justify-content: center;

    }
    .my-swipe{
        border-radius: 1rem;
    }

    .HomePage_night{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        display: flex;
        flex-direction: column;
        background-color: #222225;
        color: white;
    }

    .recommend_box{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      /*background-color: #E7E0CB;*/
    }
    .recommend_word{
      width: 60%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height:1.5rem
    }
    .recommend_cover{
      width: 40%;
      height: 100%;
      display: flex;
      justify-content: center;
    }
    .recommend_cover img{
      border-radius: 1rem;
    }

.recommend_time_day{
  font-size: 28px;
  margin-left: 2rem;
  font-family: CSD-Block-Bold;

}
.recommend_time_month{
  font-size: 15px;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
}

</style>