<template>
    <div class="VP_background" :class="[$store.state.theme == 'night' ? 'VP_background_night':'']">
        <div>
            <div style="width: 100%;height: 3.5rem;background-color: white" v-if="$store.state.theme == 'white'"></div>
            <div style="width: 100%;height: 3.5rem;background-color: #222225" v-if="$store.state.theme == 'night'"></div>
            <div class="MV_Search_box" :class="[$store.state.theme == 'night' ? 'MV_Search_box_night':'']">
                <div style="width: 70%;">
                    <van-search v-if="$store.state.theme == 'white'" placeholder="请输入搜索关键词" input-align="center"  shape="round" @click-input="show_search"/>
                    <Search v-if="$store.state.theme =='night'" @click="show_search" value="请输入搜索关键词"></Search>
                </div>
            </div>
        </div>
        <div class="title_box" :class="[$store.state.theme == 'night' ? 'title_box_night':'']">
          <TitleSelect :title="title" @change_topics="change_topics"></TitleSelect>
        </div>
        <div class="mv_body">
        <VideoMv :data_index="select_index" @video_share="video_share"></VideoMv>
        <div class="Placeholder"></div>
        </div>
        <SearchGuide v-if="search_show" @Cancel-search="hide_search" :search_type="1014"></SearchGuide>

        <van-share-sheet
                v-model:show="video_share_show"
                title="立即分享给好友"
                :options="options"
        />
        <div>
            <Menu1 :menu_show="2"></Menu1>
        </div>

    </div>
</template>

<script>
    import Search from '../../components/mine/Search'
    import Menu1 from "../../components/Menu1";
    import VideoMv from "../../components/video/VideoMv";
    import SearchGuide from "../../components/home/SearchGuide";
    import TitleSelect from "../../components/video/TitleSelect";
    export default {
        name: "VideoPage",
        components: {
          TitleSelect,
            SearchGuide,
            VideoMv,
            Menu1,
            Search,

        },
        data(){
          return{
              search_show:false,
            title:[{type:'最新'},{type: '推荐'}],
            select_index:0,
              video_share_show:false,
              options:[
                  [
                      { name: '微信', icon: 'wechat' },
                      { name: '朋友圈', icon: 'wechat-moments' },
                      { name: '微博', icon: 'weibo' },
                      { name: 'QQ', icon: 'qq' },
                  ],
                  [
                      { name: '复制链接', icon: 'link' },
                      { name: '分享海报', icon: 'poster' },
                      { name: '二维码', icon: 'qrcode' },
                      { name: '小程序码', icon: 'weapp-qrcode' },
                  ],
              ]
          }
        },
        methods:{

          change_topics(index){
            this.select_index = index
          },
            show_search(){
                this.search_show = true
            },
            hide_search(){
                this.search_show = false
            },
            video_share(){
                this.video_share_show = true
            }
        },
        mounted() {
        }

    }
</script>

<style scoped>

.VP_background{
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: #E6E6E6;
    /*overflow-x: hidden;*/
    /*overflow-y: scroll;*/
    display: flex;
    flex-direction: column;
}
.VP_background::-webkit-scrollbar {
    display: none;/*隐藏滚动条*/
}
.MV_Search_box{
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    /*margin-top: 3.5rem;*/
}
.MV_Search{
    margin-top: 3rem;
}
    .title{
        width: 100%;
        height: 6.5rem;
        display: flex;
        align-items: center;
        font-weight: bold;
    }
    .title span {
        font-size: 20px;
        /*margin-top: 3.75rem;*/
        /*margin-bottom: 1.25rem;*/
        /*margin-left: 1.75rem;*/
    }
    .title_box{
        width: 100%;
        height: 3rem;
        background-color: white;
        display: flex;
        align-items: center;
    }
    .title_mv_box{
      width: 4rem;
      height: 2rem;
      background-color: #F5F5F5;
      border-radius: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 1rem;

    }
    .title_video_box{
      width: 4rem;
      height: 2rem;
      background-color: #F5F5F5;
      border-radius: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 1rem;
    }
    .mv_body{
        width: 100%;
        height: 100%;
        overflow-y: auto;
        /*background-color: white;*/
    }



.VP_background_night{
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: #2B2B2B;
    /*overflow-x: hidden;*/
    /*overflow-y: scroll;*/
    display: flex;
    flex-direction: column;
    color: white;
}
.title_box_night{
    width: 100%;
    height: 3rem;
    background-color: #222225;
    display: flex;
    align-items: center;
}

.MV_Search_box_night{
    width: 100%;
    background-color: #222225;
    display: flex;
    justify-content: center;
    align-items: center;
    /*margin-top: 3.5rem;*/
}
</style>