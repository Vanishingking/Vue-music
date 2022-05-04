<template>
    <div class="SongListDetails"  @touchmove='touchmove'>
        <div class="xu" :style="{'opacity':transparency}"> <div class="title"><span>歌单</span></div></div>
        <img :src="Album_cover" class="blur" ref="slide">

        <!--    歌单详情-->
        <div class="Song_list_information">
            <!--        歌单详情-->
            <div class="Album_cover">
                <img :src="Album_cover">
                <div class="Album_cover_p">
                    <span>{{ song_sheet }}</span>
                </div>
            </div>
            <div class="Comment_collection_sharing">
<!--                歌曲评论-->
                <svg @click="song_sheet_comment" xmlns="http://www.w3.org/2000/svg" width="26" height="22.748" viewBox="0 0 26 22.748">
                    <g id="组_29" data-name="组 29" transform="translate(-35.328 -94.72)">
                        <path id="路径_210" data-name="路径 210" d="M184.434,257.442a.673.673,0,0,1-.626-.625v-4.791a2.121,2.121,0,0,1,2.169-2.169h8.677a.673.673,0,0,1,.626.626.415.415,0,0,1-.466.466h-8.824a1.04,1.04,0,0,0-.932,1.091V257C185.059,257.3,184.74,257.442,184.434,257.442Z" transform="translate(-144.271 -150.802)" fill="#fff"/>
                        <path id="路径_211" data-name="路径 211" d="M50.428,117.468a1.518,1.518,0,0,1-1.144-.488l-2.931-2.763H41.818a2.224,2.224,0,0,1-2.275-2.275v-2.931H37.435a2.182,2.182,0,0,1-2.107-2.275V96.827a2.142,2.142,0,0,1,2.107-2.107h14.3a2.321,2.321,0,0,1,2.275,2.275V99.1h5.038a2,2,0,0,1,2.275,2.107v10.565a2.224,2.224,0,0,1-2.275,2.275H54.5l-2.931,3.084a2.694,2.694,0,0,1-1.144.335ZM37.435,95.851a.908.908,0,0,0-.809.977v9.909c0,.656.321.977.809.977h2.6a.705.705,0,0,1,.656.656v3.419a1.115,1.115,0,0,0,1.144,1.144H46.7a.588.588,0,0,1,.488.167l3.084,3.084a.3.3,0,0,0,.488,0l3.084-3.084a.588.588,0,0,1,.488-.167h4.871a1.115,1.115,0,0,0,1.144-1.144V101.224a1.115,1.115,0,0,0-1.144-1.144H53.513a.705.705,0,0,1-.656-.656v-2.6a1.051,1.051,0,0,0-.977-.977Z" fill="#fff"/>
                        <path id="路径_212" data-name="路径 212" d="M312.318,524.4a.673.673,0,0,1-.626.626H297.585a.626.626,0,1,1,0-1.251h14.254C312.158,523.776,312.318,524.1,312.318,524.4Z" transform="translate(-253.625 -417.328)" fill="#fff"/>
                    </g>
                </svg>

                <svg @click="song_collection" xmlns="http://www.w3.org/2000/svg" width="1.9rem" height="1.65rem" viewBox="0 0 38.004 33.505">
                  <path v-if="list_subscribed" id="Icon_awesome-heart" data-name="Icon awesome-heart" d="M32.505,4.4a9.615,9.615,0,0,0-13.12.956L18,6.785,16.615,5.358A9.615,9.615,0,0,0,3.495,4.4,10.1,10.1,0,0,0,2.8,19.02L16.4,33.068a2.2,2.2,0,0,0,3.185,0L33.195,19.02A10.09,10.09,0,0,0,32.505,4.4Z" transform="translate(0.001 -2.248)" fill="#f05a5a"/>
                  <path v-else id="Icon_awesome-heart" data-name="Icon awesome-heart" d="M32.505,4.4a9.615,9.615,0,0,0-13.12.956L18,6.785,16.615,5.358A9.615,9.615,0,0,0,3.495,4.4,10.1,10.1,0,0,0,2.8,19.02L16.4,33.068a2.2,2.2,0,0,0,3.185,0L33.195,19.02A10.09,10.09,0,0,0,32.505,4.4Z" transform="translate(1.003 -1.244)" fill="none" stroke="#ffffff" stroke-width="2"/>
                </svg>

                <svg @click="song_share" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.25rem" viewBox="0 0 29.243 24.75">
                    <g id="Icon_ionic-ios-log-out" data-name="Icon ionic-ios-log-out" transform="translate(-3.375 -5.625)">
                        <path d="M21.938,26.156a.987.987,0,0,0-.984.984,1.269,1.269,0,0,1-1.266,1.266H6.609a1.269,1.269,0,0,1-1.266-1.266V8.859A1.269,1.269,0,0,1,6.609,7.594H19.688a1.269,1.269,0,0,1,1.266,1.266.984.984,0,0,0,1.969,0,3.235,3.235,0,0,0-3.234-3.234H6.609A3.235,3.235,0,0,0,3.375,8.859V27.141a3.235,3.235,0,0,0,3.234,3.234H19.688a3.235,3.235,0,0,0,3.234-3.234A.987.987,0,0,0,21.938,26.156Z" fill="#fff"/>
                        <path d="M26.22,11.116a.978.978,0,0,0-.7-.288.961.961,0,0,0-.7.288.98.98,0,0,0,0,1.392l4.584,4.514H11.391a.984.984,0,0,0,0,1.969H29.433L24.961,23.5a.993.993,0,0,0,0,1.392l.007.007a1.017,1.017,0,0,0,.689.274.95.95,0,0,0,.7-.288l5.808-5.794a1.381,1.381,0,0,0,0-2.053Z" fill="#fff"/>
                    </g>
                </svg>
            </div>
        </div>
<!--        歌曲-->
        <div class="song_details" :class="[$store.state.theme == 'night' ? 'song_details_night':'']">
            <div class="play_all_box" :class="[$store.state.theme == 'night' ? 'play_all_box_night':'']">
                <div class="play_all">
                    <!--            播放全部-->
                    <svg style="margin-left:0.9rem " xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" viewBox="0 0 31.25 31.25">
                        <path id="Icon_ionic-ios-play-circle" data-name="Icon ionic-ios-play-circle" d="M18,3.375A14.625,14.625,0,1,0,32.625,18,14.623,14.623,0,0,0,18,3.375Zm5.892,14.9L14.245,24.11a.313.313,0,0,1-.471-.274V12.164a.312.312,0,0,1,.471-.274l9.647,5.836A.322.322,0,0,1,23.892,18.274Z" transform="translate(-2.375 -2.375)" fill="none" stroke="#5ab4f0" stroke-width="2"/>
                    </svg>
                    <p>播放全部</p>
                </div>
            </div>
            <div style="width: 100%;height: 90%;  overflow-x: hidden; overflow-y: scroll;">

                <Single @box-click="get_song_id" :song_list="Song_details" :play_later_song_information="play_later_song"></Single>

            </div>
        </div>

        <!--        操作面板 歌曲操作-->
        <!--        菜单弹窗-->
        <van-popup v-model:show="song_menu_show" position="bottom" :style="{ height: '45%',backgroundColor:theme_color }" round  closeable>
            <OperationPanel :operation_song_information="operation_song_information"></OperationPanel>
        </van-popup>


<!--        分享歌单-->
        <van-share-sheet
                v-model:show="song_list_show_share"
                title="立即分享给好友"
                :options="options"
        />
        <div style="position: fixed;bottom: 0;z-index: 9;width: 100%">
            <Menu1 :menu_show="1"></Menu1>
        </div>

        <div style="position: fixed; top:3.5rem;left:1rem;z-index: 9">
            <Back :color="2"></Back>
        </div>
    </div>



</template>

<script>
    import Menu1 from "../../components/Menu1";
    import Single from "../../components/mine/Single";
    import OperationPanel from "../../components/home/OperationPanelTow";
    import Back from '../../components/menu/Back'
    import ajax from "../../http";
    export default {
        name: "SongListDetails",
        components: {OperationPanel, Single,Menu1,Back},
        data() {
            return{
                Background_map: '',
                transparency:0,
                operation_song_information:[],
                Song_details:[],
                song_sheet:'',
                Album_cover:'',
                SongCover:'',
                ListAllSongId:[],
                play_later_song:[],
                song_menu_show:false,
                theme_color:'#ffffff',
                song_list_show_share:false,
                list_subscribed:false


            }
        },
        methods: {
            music_play(index) {
                this.$store.commit('advance')
                this.$router.push({ path: `/home/musicplay/${ index }`})
            },
            touchmove() {
                this.transparency = -((this.$refs.slide.getBoundingClientRect().top)/308)
                // console.log(this.$refs.slide.getBoundingClientRect().top)
            },
            operation(){

            },
            get_song_id(data){
                this.song_menu_show = true
               this.operation_song_information = data
                // console.log(this.operation_song_information)
                // console.log(data)
            },
            song_sheet_comment() {
                let id = this.$route.params.id
                this.$store.commit('advance')
                this.$router.push(`/home/songlistcomment/${ id }`)
            },
            async song_collection() {
                let id = this.$route.params.id
                //取消歌单收藏
                if (this.list_subscribed){
                   await ajax(
                        this.$store.state.api_url+'playlist/subscribe',
                        {t:2,id:id,cookie:this.$store.state.user_cookie}
                    ).then((res)=>{
                        console.log(res);
                        this.list_subscribed = false
                        this.$toast('已取消收藏')
                    }).catch((err)=>{
                        console.log(err);
                        this.$toast('取消收藏失败')
                    })
                }else {  //收藏歌单
                    ajax(
                        this.$store.state.api_url+'playlist/subscribe',
                        {t:1,id:id,cookie:this.$store.state.user_cookie}
                    ).then((res)=>{
                        console.log(res);
                        this.list_subscribed = true
                        this.$toast('已收藏')
                    }).catch((err)=>{
                        console.log(err);
                        this.$toast('收藏失败')
                    })

                }

            },

            song_share() {
               this.song_list_show_share = true
            },


        },
        mounted() {
          //获取歌单所有信息
            let id = parseInt(this.$route.params.id)
            ajax(
                // 'http://127.0.0.1:3000/playlist/detail?id='+id
            this.$store.state.api_url+'playlist/detail?id='+id,
                {cookie:this.$store.state.user_cookie}
            ).then((res)=>{
                console.log(res)
                this.song_sheet = res.playlist.name
                this.Album_cover = res.playlist.coverImgUrl
                this.list_subscribed = res.playlist.subscribed
                for (let i = 0; i<res.playlist.tracks.length;i++){
                    this.Song_details.push(res.playlist.tracks[i])
                }
                // // 歌单各歌曲信息
                // console.log(this.Song_details)
                for (let i = 0;i<this.Song_details.length;i++){
                    this.ListAllSongId.push(this.Song_details[i].id)
                    this.play_later_song.push({
                        play_later_song_id:this.Song_details[i].id,
                        play_later_song_name:this.Song_details[i].name,
                        play_later_song_singer:this.Song_details[i].ar[0].name,
                    })
                }
                console.log(this.song_sheet)
            }).catch((error)=>{
                console.log(error)
            });

            if (this.$store.state.theme == 'night'){
                this.theme_color = '#222225'
            }

            //判断是否收藏歌单


        },
        setup(){
            const options = [
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
            ];
            return{
                options
            }
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        font-family: "宋体";
    }

    .SongListDetails{
        width: 100%;
        height: 100%;
        position: absolute;
        overflow-x: hidden;
        overflow-y: scroll;

    }
    .SongListDetails::-webkit-scrollbar {
        display: none;/*隐藏滚动条*/
    }
    .xu{
        width: 100%;
        height: 5rem;
        position: fixed;
        z-index: 7;
        opacity:0;
        background: inherit;
        backdrop-filter: blur(30px); /* Chrome, Opera */


    }

    .Song_list_information{
        width: 100%;
        height: 16.25rem;
        margin-top: 8rem;

    }
    .title{
        font-size: 20px;
        display: flex;
        /*align-items: center*/
        justify-content: center;
        margin-top: 3rem;
        color: white;
    }

    .blur{
        position: absolute;
        width:100%;
        height: 100%;
        z-index: -10;
        /*模糊程度*/
        -webkit-filter: blur(20px); /* Chrome, Opera */
        background: inherit;
    }


    .aa{
        width: 100px;
        height: 100px;
    }
.Album_cover{
    height: 8rem;
    margin-top: 2.75rem;
    margin-left: 2rem;
    display: flex;
    align-items: center;

}
.Album_cover img{
    width: 8rem;
    height: 8rem;
    margin-right: 2rem;
}
.Album_cover_p{
    width: 8rem;
    height: 8rem;
    display: flex;
    align-items: center;
    color: white;
    font-size: 18px;
    line-height: 25px;


}
.Comment_collection_sharing{
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 1.5rem;
}
    .song_details{
        width: 100%;
        height: 90%;
        border-radius: 1.5rem;
        background-color: white;
        overflow-x: hidden; /*x轴禁止滚动*/
        overflow-y: scroll;/*y轴滚动*/
        position: relative;
    }
    .play_all_box{
        width: 100%;
        height: 3rem;
        position: absolute;
        margin-top: 0;
        z-index: 3;
        background-color: white;
    }
    .play_all{
        width: 100%;
        height: 3rem;
        display: flex;
        align-items: center;
    }
    .play_all p{
        margin-left: 0.5rem;
        font-size: 18px;
    }



    .song_details_night{
        width: 100%;
        height: 90%;
        border-radius: 1.5rem;
        background-color: #222225;
        color: white;
        overflow-x: hidden; /*x轴禁止滚动*/
        overflow-y: scroll;/*y轴滚动*/
        position: relative;
    }
    .play_all_box_night{
        width: 100%;
        height: 3rem;
        position: absolute;
        margin-top: 0;
        z-index: 3;
        background-color: #222225;
    }

</style>