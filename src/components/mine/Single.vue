<template>
    <div>
        <div class="play_all">
            <!--            播放全部-->
            <svg style="margin-left:0.9rem " xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" viewBox="0 0 31.25 31.25">
                <path id="Icon_ionic-ios-play-circle" data-name="Icon ionic-ios-play-circle" d="M18,3.375A14.625,14.625,0,1,0,32.625,18,14.623,14.623,0,0,0,18,3.375Zm5.892,14.9L14.245,24.11a.313.313,0,0,1-.471-.274V12.164a.312.312,0,0,1,.471-.274l9.647,5.836A.322.322,0,0,1,23.892,18.274Z" transform="translate(-2.375 -2.375)" fill="none" stroke="#5ab4f0" stroke-width="2"/>
            </svg>
            <p>播放全部</p>
        </div>

        <ul>
            <li class="song" v-bind:key="item" v-for="(item,index) in Song_list" >
                <p v-show="dd" class="song_number">{{ item }}</p>
                <div class="song_singer">
                    <span class="song_name">{{ Song_list[index].name }}</span>
                    <span class="singer_name">{{ Song_list[index].ar[0].name }}</span>
                </div>
                <div class="song_svg" @click="operation(item.id,item.ar[0].id,item.name)">
                <svg v-show="dd" class="spacing_zero" xmlns="http://www.w3.org/2000/svg" width="0.18rem" height="0.91rem" viewBox="0 0 3.607 18.224">
                    <g id="Icon_ionic-ios-more" data-name="Icon ionic-ios-more" transform="translate(18.935 -4.5) rotate(90)">
                        <path  d="M17.118,15.328a1.8,1.8,0,1,0,1.8,1.8,1.8,1.8,0,0,0-1.8-1.8Z" transform="translate(-3.515 0)"/>
                        <path  d="M6.3,15.328a1.8,1.8,0,1,0,1.8,1.8,1.8,1.8,0,0,0-1.8-1.8Z" transform="translate(0 0)"/>
                        <path  d="M27.96,15.328a1.8,1.8,0,1,0,1.8,1.8,1.8,1.8,0,0,0-1.8-1.8Z" transform="translate(-7.039 0)"/>
                    </g>
                </svg>
                <svg v-show="!dd" class="spacing_one" xmlns="http://www.w3.org/2000/svg" width="0.18rem" height="0.91rem" viewBox="0 0 3.607 18.224">
                    <g id="Icon_ionic-ios-more" data-name="Icon ionic-ios-more" transform="translate(18.935 -4.5) rotate(90)">
                        <path  d="M17.118,15.328a1.8,1.8,0,1,0,1.8,1.8,1.8,1.8,0,0,0-1.8-1.8Z" transform="translate(-3.515 0)"/>
                        <path  d="M6.3,15.328a1.8,1.8,0,1,0,1.8,1.8,1.8,1.8,0,0,0-1.8-1.8Z" transform="translate(0 0)"/>
                        <path  d="M27.96,15.328a1.8,1.8,0,1,0,1.8,1.8,1.8,1.8,0,0,0-1.8-1.8Z" transform="translate(-7.039 0)"/>
                    </g>
                </svg>
                </div>
                <div class="Touch_Pad" @click="music_play(index,Song_list[index].id)"></div>
            </li>

        </ul>

    </div>
</template>

<script>
    import ajax from "../../http";

    export default {
        name: "Single",
        data() {
            return{
                dd: false,
                Song_list:[],
                Music_cover:[],
                music_information:[],
                xxt:[]

            }
        },
        props: {
            play_later_song_information:{
                type:Array,
                default(){
                    return []
                }
            },
        },
        mounted() {
            this.Song_list.splice(0,this.Song_list.length);
            let id = parseInt(this.$route.params.id)
            console.log(this.$route.params.id)
            if (this.$route.params.id != undefined){
                ajax(
                    // 'http://127.0.0.1:3000/playlist/detail?id='+id
                    this.$store.state.api_url+'playlist/detail?id='+id
                ).then((res)=>{
                    console.log(res.playlist)
                    for (let i = 0; i<res.playlist.tracks.length;i++){
                        this.Song_list.push(res.playlist.tracks[i])
                    }
                    console.log(this.Song_list[0].al.picUrl)

                }).catch((error)=>{
                    console.log(error)
                });
            }


        },

        methods: {
            music_play(index,id) {
                this.$store.commit('advance')

                this.Music_cover = this.Song_list[index]
                this.$router.push({ path: `/home/musicplay/${ id }`})
                this.music_information.push({
                    music_name:this.Song_list[index].name,
                    music_image:this.Song_list[index].al.picUrl,
                    music_id:this.Song_list[index].al.id,
                    music_singer:this.Song_list[index].ar[0].name
                })
                this.$store.commit('get_play_music_information',this.music_information)
                this.$store.commit('get_music_play_id',id)
                this.$store.commit('get_play_song_information_later',this.play_later_song_information)
            },

            operation(index,singer,name) {
                let arr = []
                    arr.song_id = index,
                    arr.singer_id = singer,
                    arr.song_name = name,
                this.$store.commit('show_operation_panel')
                this.$emit('boxClick',arr)
            }
        },


    }
</script>

<style scoped>
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
    .song{
        width: 100%;
        height: 4rem;
        display: flex;
        align-items: center;
        position: relative;
    }
    .song p{
        font-family: "宋体";
        font-weight: bold;

    }
    .spacing_zero{
        /*margin-left: 1rem;*/
        margin-top: -0.25rem;
    }
    .spacing_one{
        /*margin-left: 2rem;*/
        margin-top: -0.25rem;
    }
    .song_number{
        font-size: 21px;
        margin-left: 1.25rem;
    }
    .song_singer{
        width: 75%;
        height: 100%;
        margin-left: 1.5rem;
        /*弹性盒*/
        display: flex;
        /*上下分布*/
        flex-direction: column;
        /*居中*/
        justify-content:center ;
        /*align-items: center;*/

    }
    .song_name{
        font-size: 20px;
        /*color: black;*/
        /*width: 10rem;*/
        /*border: 1px solid black;*/
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }
    .singer_name{
        font-size: 13px;
        color: darkgray;
    }
    .song_svg{
        z-index: 2;
        height: 100%;
        width: 2rem;
        /*background-color: #409eff;*/
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .Touch_Pad{
        width: 100%;
        height: 100%;
        position: absolute;
        margin-top: 0;
        z-index: 1;
        /*background-color: #409eff;*/
    }
</style>